'use strict'
require("dotenv").config()
const { MongoClient } = require('mongodb')
const api = require('./lib/api')
const body = require('body-parser')
const co = require('co')
const express = require('express')
const next = require('next')
const cors = require('cors')
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")
const session = require("express-session")
const uid = require('uid-safe')
const authRoutes = require("./lib/auth-routes")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then( async () => {
  console.log(`Connecting to ${process.env.MONGO_URL}`)
  const client = await MongoClient.connect(process.env.MONGO_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
  })
  const db = client.db('stutter')

  const server = express()

  // add session management to Express
  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000 // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true
  };
  server.use(session(sessionConfig))

  // configuring Auth0Strategy
  const auth0Strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
  );

  // configuring Passport
  passport.use(auth0Strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  // adding Passport and authentication routes
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(authRoutes);

  // you are restricting access to some routes
  const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
  };

  server.use("/profile", restrictAccess)

  server.use(body.json())
  server.use((req, res, next) => {
    req.db = db
    next()
  })
  server.use('/api', api(db))
  server.use(cors())

  server.get('*', (req, res) => handle(req, res))

  server.listen(process.env.PORT)
  console.log(`Listening on ${process.env.PORT}`)
}).catch(error => console.error(error))

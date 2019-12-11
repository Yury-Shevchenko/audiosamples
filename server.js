'use strict'

const mongoose = require('mongoose')

require("dotenv").config()
const cookieParser = require('cookie-parser')
// const { MongoClient } = require('mongodb')
// const api = require('./lib/api')
const body = require('body-parser')
const co = require('co')
const express = require('express')
const next = require('next')
const cors = require('cors')
const flash = require('connect-flash');
const passport = require("passport")
const {promisify} = require('es6-promisify');
// const Auth0Strategy = require("passport-auth0")
const session = require("express-session")
const MongoStore = require('connect-mongo')(session);
const uid = require('uid-safe')

// database connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
require('./models/Record')
require('./models/User')

// next app
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// have to require models before using them
require('./handlers/passport')
const authRoutes = require("./lib/auth-routes")
const databaseRoutes = require("./lib/databaseRoutes")

app.prepare().then( async () => {

  // console.log(`Connecting to ${process.env.MONGO_URL}`)
  // const client = await MongoClient.connect(process.env.MONGO_URL, {
  //  useNewUrlParser: true,
  //  useUnifiedTopology: true
  // })
  // const db = client.db('stutter')

  const server = express()
  server.use(express.static('public'))
  server.use(cookieParser())
  server.use(body.json())
  server.use(body.urlencoded({ extended: true }))

  // add session management to Express
  const sessionConfig = {
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  };
  server.use(session(sessionConfig))
  server.use(passport.initialize())
  server.use(passport.session())
  server.use(flash())

  server.use((req, res, next) => {
    res.locals.user = req.user || null
    res.locals.flashes = req.flash()
    next()
  })

  server.use((req, res, next) => {
    req.login = promisify(req.login, req);
    next();
  });

  // configuring Auth0Strategy
  // const auth0Strategy = new Auth0Strategy(
  //   {
  //     domain: process.env.AUTH0_DOMAIN,
  //     clientID: process.env.AUTH0_CLIENT_ID,
  //     clientSecret: process.env.AUTH0_CLIENT_SECRET,
  //     callbackURL: process.env.AUTH0_CALLBACK_URL
  //   },
  //   function(accessToken, refreshToken, extraParams, profile, done) {
  //     return done(null, profile);
  //   }
  // );

  // configuring Passport
  // passport.use(auth0Strategy);
  // passport.serializeUser((user, done) => done(null, user));
  // passport.deserializeUser((user, done) => done(null, user));

  // adding Passport and authentication routes

  server.use(authRoutes)
  server.use('/api', databaseRoutes)

  // you are restricting access to some routes
  const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
  };

  server.use("/profile", restrictAccess)


  // server.use((req, res, next) => {
  //   req.db = db
  //   next()
  // })


  server.use(cors())

  server.get('*', (req, res) => handle(req, res))

  server.listen(process.env.PORT)
  console.log(`Listening on ${process.env.PORT}`)
}).catch(error => console.error(error))

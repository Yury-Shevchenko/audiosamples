const express = require("express")
const passport = require("passport")
const router = express.Router()

// router.get("/login", passport.authenticate("auth0", {
//   scope: "openid email profile"
// }), (req, res) => res.redirect("/"));
//
// router.get("/callback", (req, res, next) => {
//   passport.authenticate("auth0",  (err, user) => {
//     if (err) return next(err);
//     if (!user) return res.redirect("/login");
//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       res.redirect("/");
//     });
//   })(req, res, next);
// });
router.post('/sign',
  passport.authenticate('local-signup', {
    successRedirect : '/record',
    failureRedirect: '/sign',
    failureFlash : true
  }));

// router.post('/login',
//     passport.authenticate('local-login'),
//     function(req, res) {
//       console.log('something happened')
//       // If this function gets called, authentication was successful.
//       // `req.user` contains the authenticated user.
//       console.log('res', res)
//       return res.redirect('/record')
//   })
  // router.post('/login',
  //   passport.authenticate('local-login', function(err, user, info) {
  //       if (err) { return next(err); }
  //       if (!user) { return res.redirect('/login'); }
  //       return res.redirect('/record')
  //     })(req, res, next)
  // )

router.post('/login',
  passport.authenticate('local-login', {
    successRedirect : '/record',
    failureRedirect: '/login',
    failureFlash : true
  }));

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect('/')
});

router.get("/user", (req, res) => {
  console.log('request', req)
  res.send({ hello: 'world' })
});

module.exports = router

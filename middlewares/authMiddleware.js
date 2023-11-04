const express = require("express");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const app = express();

app.use(session({ 
    secret: "your secret line of secretness"
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    {
       usernameField: "username",
       passwordField: "password"
    },
    function(username, password, done) {
      
      console.log("Login-username:", username);
      console.log("Login-password:", password);

      /*userDB.findOne({ where: { username: username } })
      .then(theUser => {
         if (!theUser) {
            return done(null, false, { message: "User does not exist" });
         }
         if (!theUser.validPass(password)) {
            return done(null, false, { message: "Password is not valid." });
         }
         return done(null, true);
      });*/

      return done(null, true);
   }
));

passport.serializeUser(function(user, done) {
   done(null, user.id);
});

passport.deserializeUser(function(user, done) {
   User.findById(id, function (err, user) {
      done(err, user);
   });
});

function isLoggedIn(request, res, next) {
   if (request.user) {
      return next();
   }
   return res.redirect("not logged in");
};

module.exports = {
   passport,
   isLoggedIn,
};
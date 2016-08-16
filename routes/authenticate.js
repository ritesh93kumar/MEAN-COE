var express = require('express');
var express = require('express');
var router = express.Router();

module.exports = function(passport){
    //sends successful login state back to angular
    router.get('/success', function(req, res){
        console.log("login success");
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res){
        res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //sign up donor
    router.post('/donorSignup', passport.authenticate('donorSignup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));
    
      //sign up orphanage
    router.post('/orphanageSignup', passport.authenticate('orphanageSignup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //log out
    router.get('/signout', function(req, res) {
        console.log(req.user.username + " singed out!!");
        req.logout();
        res.redirect('/');
    });

    return router;
};

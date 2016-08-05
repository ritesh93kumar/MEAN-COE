var Donor = require('../models/models');
var mongoose = require('mongoose');
var Donor = mongoose.model('Donors');
var express = require('express');
var router = express.Router();

//Used for routes that must be authenticated.
router.use('/donors', function(req, res, next){
        
    if(!req.isAuthenticated()){
        return res.redirect('/#login');
    }
    
    return next();
});

//api for all donors
router.route('/donors')
    
    //get all donors
    .get(function(req, res){
       /* Donor.find(function(err, Donors){
            if(err){
                return res.send(500, err);
            }
            return res.send(Donors);
        });*/
        res.send({message: 'all donors'});
    })
    //create donor
    .post(function(req, res){
        res.send({message: 'new donor created'});
    });


//api for single donor
router.route('/donors/:id')
    //get donor
    .get(function(req, res){
        return res.send({message: 'get donor' + req.params.id});
    })
    //create donor
    .post(function(req, res){
        return res.send({message: 'create donor' + req.params.id});
    })
    //delete donor
    .delete(function(req, res){
        return res.send({message: 'donor deleted !!' + req.params.id});
    });

module.exports = router;
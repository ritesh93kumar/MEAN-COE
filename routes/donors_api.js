var express = require('express');
var router = express.Router();


//api for all donors
router.route('/donors')
    
    //get all donors
    .get(function(req, res){
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
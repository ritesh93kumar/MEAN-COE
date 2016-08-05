var express = require('express');
var router = express.Router();


//api for all doners
router.route('/donors')
    
    //get all doners
    .get(function(req, res){
        res.send({message: 'all doners'});
    })
    //create doner
    .post(function(req, res){
        res.send({message: 'new doner created'});
    });


//api for single doner
router.route('/donors/:id')
    //get doner
    .get(function(req, res){
        return res.send({message: 'get doner' + req.params.id});
    })
    //create doner
    .post(function(req, res){
        return res.send({message: 'create doner' + req.params.id});
    })
    //delete doner
    .delete(function(req, res){
        return res.send({message: 'doner deleted !!' + req.params.id});
    });

module.exports = router;
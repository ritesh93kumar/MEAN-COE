var express = require('express');
var router = express.Router();


//api for all doners
router.route('/doners')
    
    //get all doners
    .get(function(req, res){
        res.send({message: 'all doners'});
    })
    //create doner
    .psot(function(req, res){
        res.send({message: 'new doner created'});
    });


//api for single doner
router.route('/doners/:id')
    //get doner
    .get(function(req, res){
        return res.send({message: 'get doner' + req.param.id});
    })
    //create doner
    .post(function(req, res){
        return res.send({message: 'create doner' + req.param.id});
    })
    //delete doner
    .delete(function(req, res){
        return res.send({message: 'doner deleted !!' + req.param.id});
    });

module.exports = router;
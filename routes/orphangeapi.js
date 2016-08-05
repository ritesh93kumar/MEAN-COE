var Orphanages=require('../models/models');
var express = require('express');

var mongoose=require('mongoose');

var router = express.Router();


var Orphanages=mongoose.model('Orphanages');
//api for all orphanages
router.route('/orphanages')
    
    //get all doners
    .get(function(req, res){
       Orphanages.find({},function(err,result){
          if(err)
              res.send("Cannot retrieve Orphanages");
           else{
               res.send(result);
           }
       }); 
        
    })
    //create orphanage
    .post(function(req, res){
        orphange=new Orphanages();
        orphange.name=req.body.name;
        orphange.adddress=req.body.address
        orphange.email=req.body.email;
        orphange.contact_no=req.body.contact_no;
        //orphange.adddress.authenticated=req.body.authenticated;
        orphange.no_of_people=req.body.no_of_people;
    
        orphange.save(function(err,result){
           if(err){
               res.send("Cannot Add");
           } 
         
           res.send(result);
            
        });
    });

//api for single orphanage
router.route('/orphanages/:id')
    //get doner
    .get(function(req, res){
         Orphanages.findOne({'_id':req.params.id},function(err,result){
          if(err)
              res.send("Cannot retrieve Orphanages");
           else{
             
               res.send(result);
           }
       }); 
       
    })
   
    //delete orphanage
    .delete(function(req, res){
    
     Orphanages.findOneAndRemove({'_id':req.params.id},function(err,result){
       if(err)
           res.send('Cannot delete');
        else
            res.send("Deleted");
        });
    });

module.exports = router;
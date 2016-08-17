var Donation = require('../models/models');
var mongoose = require('mongoose');
var Donation = mongoose.model('Donations');
var Orphanage = mongoose.model('Orphanages');
var express = require('express');
var router = express.Router();

//Used for routes that must be authenticated.
router.use('/donations', function(req, res, next){
        
    if(!req.isAuthenticated()){
        return res.redirect('/#login');
    }
    
    return next();
});

//api for all donations
router.route('/donations')
    
    //get all donations
    .get(function(req, res){
        Donation.find(function(err, Donations){
            if(err){
                return res.send(500, err);
            }
            return res.send(Donations);
        });
       
    })
    //create new entry for donation
    .post(function(req, res){
        var newDonation = new Donation();
        newDonation.donated_by = req.body.donated_by;
        newDonation.donated_to =req.body.donated_to;
        newDonation.donated_items = req.body.donated_items;
      console.log("donated by"+newDonation.donated_by);

        newDonation.save(function(err, newDonation){
            if(err){
                return res.send(500, err);            
            }
            return res.json(newDonation);
        });    
    });


//api for single donation
router.route('/donations/:id')
    //get donation
    .get(function(req, res){
        Donation.findById(req.params.id, function(err, donation){
            if(err){
                res.send(500, err);
            }
            res.json(donation);
        });
    })
    //create donor
    .put(function(req, res){
        Donation.findById(req.params.id, function(err, donation){
            if(err){
                res.send(500, err);
            }
             for (var i in req.body.donated_items) {
                 var itemObj = { item: req.body.donated_items[i].item, quantity:req.body.donated_items[i].quantity };
                 donation.donated_items.push(itemObj);
            }
            
            donation.save(function(err, donation){
                if(err){
                    res.send(500, err);
                }
                res.json(donation);
            });
        });
  
    });

    //---Statistics--

router.route('/statistics')

    .get(function(req,res){
        
    var statistics;
        Donation.count({},function(err,donationsMade){
            Donation.find().distinct('donated_by', function(error, donors) {
                
            Orphanage.find().distinct('_id', function(error, orphanages) {
                    /*var temp={"donationsMade":donationsMade,"donors":donors.length,"orphanages":orphanages.length};
                    statistics=JSON.stringify(temp);
                    console.log("Statistics  : "+statistics);*/
                     res.json({"donationsMade":donationsMade,"donors":donors.length,"orphanages":orphanages.length});
    
                });
            });
       });
      
    });
    

module.exports = router;
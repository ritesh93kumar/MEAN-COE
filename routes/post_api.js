var Post = require('../models/models');
var mongoose = require('mongoose');
var Post = mongoose.model('Posts');
var express = require('express');
var router = express.Router();

//Used for routes that must be authenticated.
router.use('/posts', function(req, res, next){
    
    if(req.method === 'GET'){
        return next();
    }
    
    if(!req.isAuthenticated()){
        return res.redirect('/#login');
    }
    
    return next();
});

router.route('/posts')

    //get all posts
    .get(function(req, res){
        Post.find(function(err, Posts){
                if(err){
                    return res.send(500, err);
                }
                return res.send(Posts);
            });    
        //return res.send({message:"gee all posts"});
    })
    //create new post
    .post(function(req, res){
        var newPost = new Post();
        newPost.posted_by = req.body.posted_by;
        newPost.claims = req.body.claims;
        newPost.items = req.body.items;
        newPost.expiry_date = req.body.expiry_date;
        newPost.activated = true;

        newPost.save(function(err, newPost){
            if(err){
                    return res.send(500, err);            
                }
                return res.json(newPost);
        });
        //return res.send({message:"new post created"});
    });

router.route('/posts/:id')
    //get post by id
    .get(function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err){
                    res.send(500, err);
                }
                res.json(post);
        });    
        //return res.send({message: 'get post' + req.params.id});
    })
    //create post
    .put(function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err){
                    res.send(500, err);
            }
            
            for (var i in req.body.items) {
                var itemObj = { item: req.body.items[i].item, quantity:req.body.items[i].quantity };
                post.items.push(itemObj);
            }
            
            post.claims.push(req.body.claims[0]);
            post.updation_date = req.body.updation_date;
            post.expiry_date = req.body.expiry_date;
            post.activated = req.body.activated;
            
            post.save(function(err, post){
                if(err){
                    res.send(500, err);
                }
                res.json(post);                
            });                
        });    
        //return res.send({message: 'create post' + req.params.id});
    })
    //delete post
    .delete(function(req, res){
         Post.remove({_id:req.params.id}, function(err){
            if(err){
                    res.send(500, err);
            }
            res.json('Post deleted!!');
        });
        //return res.send({message: 'post deleted !!' + req.params.id});
    });

module.exports = router;
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
        return res.send({message:"gee all posts"});
    })
    //create new post
    .post(function(req, res){
        return res.send({message:"new post created"});
    });

router.route('/posts/:id')
    //get post by id
    .get(function(req, res){
        return res.send({message: 'get post' + req.params.id});
    })
    //create post
    .post(function(req, res){
        return res.send({message: 'create post' + req.params.id});
    })
    //delete post
    .delete(function(req, res){
        return res.send({message: 'post deleted !!' + req.params.id});
    });

module.exports = router;
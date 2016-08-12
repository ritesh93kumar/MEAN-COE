var Schema = require('./models/models');
var mongoose = require('mongoose');
var Donor = mongoose.model('Donors');
//var User = require('./models/models');
var Orphanage =mongoose.model('Orphanages');   
var User = mongoose.model('Login');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
users = {};
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.username);
        //return the unique id for the user
        done(null, user._id);
    });

    //Desieralize user will call with the unique id provided by serializeuser
    passport.deserializeUser(function(id, done) {
        
        User.findById(id, function(err, user){
            console.log('Deserializing user: ' + user.username)
             done(err, user);
        });
        //return done(null, users[username]);
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { 
            
            User.findOne({'username': username}, function(err, user){
                if(err){
                    return done(err);
                }
                if(!user){
                    console.log('user not found with username: ' + username);
                    return done('user dont exists', false);
                }
                if(!isValidPassword(user, password)){
                    console.log('Wrong password');
                    return done('invalid credentials', false);
                }
                console.log('login successful');
                return done(null, user);
            });
           /* if(!users[username]){
                console.log('User Not Found with username ' + username);
                return done(null, false);
            }

            if(isValidPassword(users[username], password)){
                //sucessfully authenticated
                console.log('sucessfully authenticated: ' + username);
                return done(null, users[username]);
            }
            else{
                console.log('Invalid password '+username);
                return done(null, false)
            }*/
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
           
       User.findOne({'username':username}, 
                     function(err, user){
            
            if(err){
                
                return done('Error in singup', err);
            }
            if(user){
                console.log('user already exists');
                return done('user already exisis', false);
            }
            else{
                var newUser = new User();
                var donor = new Donor(); 
                newUser.username = username;
                newUser.password = createHash(password);
                donor.name = username;
                donor.address.country="India";
                donor.address.state="Goa";
                donor.address.city="Margao";
                donor.address.zip_code=590006;
                donor.email=req.body.email;
                donor.contact_no=req.body.pNo;
                newUser.save(function(err){
                    if(err){
                        console.log('error in saving user' + err);
                        throw err;
                    }
                    console.log(newUser.username + 'registration successful');
                  return done(null, newUser);
                });
                donor.save(function(err){
                    if(err){
                        console.log('error in saving Donor Details' + err);
                        throw err;
                    }
                 
                    console.log("Donor details added ");
                });
            }
            
        });
            
            /*if (users[username]){
                console.log('User already exists with username: ' + username);
                return done(null, false);
            }

            users[username] = {
                username: username,
                password: createHash(password)
            }

            console.log(users[username].username + ' Registration successful');
            return done(null, users[username]);*/
        })
    );

    
    passport.use('orphanageSignup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
           
       User.findOne({'username':username}, 
                     function(err, user){
            
            if(err){
                
                return done('Error in singup', err);
            }
            if(user){
                console.log('user already exists');
                return done('user already exisis', false);
            }
            else{
                var newUser = new User();
                var orphanage = new Orphanage(); 
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.role="ORPHANAGE";
                orphanage.name = req.body.name;
                orphanage.address.country="India";
                orphanage.address.state="Goa";
                orphanage.address.city="Margao";
                orphanage.address.zip_code=590006;
                orphanage.email=username;
                orphanage.contact_no=req.body.contact;
                orphanage.no_of_people=req.body.orphansNo;
                orphanage.government_id=req.body.govtId;
                orphanage.save(function(err){
                    if(err){
                        console.log('error in saving Orphanage Details' + err);
                        throw err;
                    }
                 
                    console.log("Orphanage details added ");
                });
                newUser.save(function(err){
                    if(err){
                        console.log('error in saving user' + err);
                        throw err;
                    }
                    console.log(newUser.username + 'registration successful');
                  return done(null, newUser);
                });
                
            }
            
        });
            
            /*if (users[username]){
                console.log('User already exists with username: ' + username);
                return done(null, false);
            }

            users[username] = {
                username: username,
                password: createHash(password)
            }

            console.log(users[username].username + ' Registration successful');
            return done(null, users[username]);*/
        })
    );

    var isValidPassword = function(user, password){
       // console.log("checking pass " + user + " : " + password);
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
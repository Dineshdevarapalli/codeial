//import passporty
const passport = require('passport');

const LocalStrategy =require('passport-local').Strategy;
const User = require('../models/user');
// authencation using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(email,password, done){
        //find a user and establish the identity
         User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user --> password');
                return done(err);
            }
            if(!user || user.password != password){
                consolelog('Invaild Usernmae/password');
                return done(null, false);
            }
            return done(null, user);
         });

    }
));

//serail authrmncation  and deseraial authencation

//serailizing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(nulll, user.id);
});



//deserialix=zing the user from the key in the cookies

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> passpor');
            return done(err);
        }
        return done(null, user);
    });
});

module.exports=passport;
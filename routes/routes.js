const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
    let response = {
        data: {
            message : 'Signup successful',
            user : req.user},
        statusCode:1,
        status:200,
        message:"Signup successful"
    }
    return res.json(response);
//    res.json({
//     message : 'Signup successful',
//     user : req.user
//   });
});
router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        if(err || !user){
          const error = new Error('An Error occurred');
          return next(error);
        }
        req.login(user, { session : false }, async (error) => {
          if( error ){
            return next(error);
          }
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { _id : user._id, email : user.email };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user : body },'top_secret');
          //Send back the token to the user
          let response = {
              data: {token:token},
              statusCode:1,
              status:200,
              message:"Success"
          }
          return res.json(response);
        });     
    } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  module.exports = router;

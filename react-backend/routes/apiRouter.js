var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var config = require('../config');
var User = require('../models/user');

var app = express();
var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({ success: false, message: info.message }) };

        const payload = {
            username: user.local.email
        };

        var token = jwt.sign(payload, config.jwt_secret, { expiresIn: 120 });

        // return the information including token as JSON
        res.json({
            success: true,
            username: user.local.email,
            token: token
        });

    })(req, res, next);
});

apiRoutes.post('/signup', function(req, res, next){

    passport.authenticate('local-signup', function(err,user,info){

        if (err) { return next(err); }

        if (!user) { return res.json({ success: false, message: info.message }) };
        const payload = {
            username: user.local.email
        };

        var token = jwt.sign(payload, config.jwt_secret, { expiresIn: 600 });

        // return the information including token as JSON
        return res.json({
            success: true,
            username: user.local.email,
            token: token
        });

        
    })(req, res, next);
});


// route middleware to verify a token
apiRoutes.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(req.headers['x-access-token']);
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.jwt_secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: err.message});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

apiRoutes.get('/', function (req, res, next) {
    res.json({ message: 'Welcome to API' });
});

apiRoutes.get('/users', function (req, res) {
    User.find({}, (err, users) => {
        res.json(users);
    })
});


module.exports = apiRoutes;
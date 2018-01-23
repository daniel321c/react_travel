var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var config = require('../config');
var Account = require('../models/account');

var app = express();
var apiRoutes = express.Router();


apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to API' });
});

apiRoutes.get('/accounts', function (req, res) {
    Account.find({}, (err, accounts) => {
        res.json(accounts);
    })
});

apiRoutes.post('/authenticate', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({ success: false, message: 'Authentication failed. User not found.' }) };
        
        const payload = {
            username: user.username
        };
        
        var token = jwt.sign(payload, config.jwt_secret, {
        });

        // return the information including token as JSON
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });

    })(req, res, next);
});

module.exports = apiRoutes;
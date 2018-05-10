var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var fetch = require("node-fetch");
var appendQuery = require("append-query");

var googleApi = express.Router();

const Host = 'https://maps.googleapis.com';
const Key = 'AIzaSyAbFWCJYlKzVOrEesawE0X3qpcHaDpFHqI';

googleApi.get('/place/details', function (req, res, next) {
    var path = '/maps/api/place/details/json';
    var query = { 
        key: Key,
        placeid: req.query.placeid
    }
    var url = appendQuery(Host + path, query)

    var requestOptions = {
        method: "GET",
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText)
            }
            return response.json();
        })
        .then(json => {
            res.json(json.result);
        })
        .catch(err => {
            console.log(err);
            res.send("asdasd");
        });

});

googleApi.get('/poi', function (req, res, next) {
    var path = '/maps/api/place/textsearch/json';
    var query = {
        key: Key,
        query: 'things+to+do+in+' + req.query.city
    }

    var url = appendQuery(Host + path, query)
    var requestOptions = {
        method: "GET",
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText)
            }
            return response.json();
        })
        .then(json => {
            res.json(json);
        })
        .catch(err => {
            console.log(err);
            res.send("asdasd");
        });

})

module.exports = googleApi;
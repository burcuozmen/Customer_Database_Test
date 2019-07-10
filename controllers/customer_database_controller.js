var express = require('express');
var db = require('../models/Customer.js');
var moment = require('moment');
var router = express.Router();
var path = require('path');

router.get('/', function (req,res) {
    db.Customer.findAll({}).then(function(data){
        console.log(data);
        res.render("index", {customers: data});
    });
});

router.post('/burger/eat/:id', function(req, res) {
    var idVal = parseInt(req.params.id);
    console.log(idVal);

    db.Customer.update({
    //     devoured: true,
    // }, {
    //     where: {
    //         id: {
    //             $eq: idVal
    //         }
    //     }
    }).then(function(data){
        console.log('update')
        res.redirect('/')
    });
});

router.post('/burger/add', function (req, res) {
    var myObj = {
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        message:req.body.message
        
    };
    console.log(myObj);

    db.Customer.create({
        name: myObj.name,
        email: myObj.email,
        phone: myObj.phone,
        message: myObj.message,
        
    }).then(function(){
        res.redirect('/');
    })
});

router.post('/burger/delete', function(req, res){
    db.Customer.destroy({
        where: {}
    }).then(function(data){
        console.log('destroy all data');
        res.redirect('/');
    })
});



module.exports = router;
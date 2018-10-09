var path = require('path');
var user = require('../../models/userSchema');
var MongoClient = require('mongodb').MongoClient;


module.exports = function (app) {

    app.route('/')
        .get(function (req, res) {
            res.sendFile(path.join(__dirname + '../../../index.html'));
        })

        .post(function (req, res) {
            var credentials = {};

            credentials = {
                email: req.body.email,
                password: req.body.pwd
            }

            // MongoClient.connect(url, function (err, db) {
            //     if (err) throw err;
            //     var dbo = db.db("mydb");
            //     dbo.collection("users").find(credentials).toArray(function (err, result) {
            //         if (err) throw err;
            //         console.log(result);
            //         if (result.length == 0) {
            //             dbo.collection("users").insertOne(credentials, function(err, res){
            //                 if (err) throw err;
            //                 console.log("One user inserted to db!");
            //             });
            //         }else {
            //             console.log("This user already exists!");
            //         }
            //         db.close();
            //     });
            // });

            user.findOne(credentials, function (err, res) {
                console.log(res);
                if (err) throw err;
                if (res == null) {
                    var newUser = new user();
                    newUser.email = credentials.email;
                    newUser.password = credentials.password;

                    newUser.save(function (err, res) {
                        if (err) throw err;
                        console.log("New user added to db");
                    });
                } else if (res.length == 0) {
                    console.log("Invalid email or password");
                } else {
                    console.log("OK");
                }
            });

            res.sendFile(path.join(__dirname + '../../../profile.html'));
        });

    app.route('/views/signup.html')
        .get(function (req, res) {
            res.sendFile(path.join(__dirname + '../../../views/signup.html'));
        });

    app.route('/signup')
        .post(function (req, res) {
            var credentials = {};

            credentials = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                confirm: req.body.confirm
            }

            var hasEmptyField = false;
            for (var field in credentials) {
                console.log(credentials.field);
                if (credentials.field == '') {
                    hasEmptyField = true;
                }
            }

            if (hasEmptyField) {
                console.log("Must fill all fields in form");
            } else if (credentials.password != credentials.confirm) {
                console.log('Password not match')
            }

            res.send("OK");
        });
    app.route('*')
        .get(function (req, res) {
            res.sendFile(path.join(__dirname + '../../../index.html'));
        })
}
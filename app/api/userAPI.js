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

            user.findOne({ email: credentials.email, password: credentials.password }, function (err, res) {
                if (err) throw err;
                if (res == null) {
                    console.log("There is no user with this e-mail and password");
                } else if (res.length == 0) {
                    console.log("There is no user with this e-mail and password");
                } else {
                    console.log("A user logged in to movies calendar");
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
                if (credentials[field] == '') {
                    hasEmptyField = true;
                }
            }

            if (hasEmptyField) {
                console.log("Must fill all fields in form");
            } else if (credentials.password != credentials.confirm) {
                console.log('Password not match')
            } else if (credentials.password.length < 8) {
                console.log("Passwod are not strong. At least 8 characters");
            } else if (check_if_email_exists(credentials.email)) {
                console.log("Wrong email");
            } else if (check_if_username_exists(credentials.username)) {
                console.log("Wrong username");
            } else {
                var newUser = new user();

                newUser.username = credentials.username;
                newUser.email = credentials.email;
                newUser.password = credentials.password;

                newUser.save(function (err, res) {
                    if (err) throw err;
                    console.log("A new user added to db");
                });
            }

            res.send("OK");
        });
    app.route('*')
        .get(function (req, res) {
            res.sendFile(path.join(__dirname + '../../../index.html'));
        })

    function check_if_email_exists(email) {
        user.findOne({ email: email }, function (err, res) {
            if (err) throw err;
            if (!res) {
                console.log("This e-mail already exists. Please give a different e-mail");
                return true;
            }
        });
        return false;
    }

    function check_if_username_exists(username) {
        user.findOne({ username: username }, function (err, res) {
            if (err) throw err;
            if (res != null) {
                console.log("This username already exists.");
                return true;
            }
        });
        return false;
    }
}
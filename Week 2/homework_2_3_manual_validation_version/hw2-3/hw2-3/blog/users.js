var bcrypt = require('bcrypt-nodejs');

/* The UsersDAO must be constructed with a connected database object */
function UsersDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof UsersDAO)) {
        console.log('Warning: UsersDAO constructor called without "new" operator');
        return new UsersDAO(db);
    }

    var users = db.collection("users");

    this.addUser = function(username, password, email, callback) {
        "use strict";

        // Generate password hash
        var salt = bcrypt.genSaltSync();
        var password_hash = bcrypt.hashSync(password, salt);

        // Create user document
        var user = {'_id': username, 'password': password_hash};

        // Add email if set
        if (email != "") {
            user['email'] = email;
        }

        // TODO: hw2.3

        var query = [];
        query['_id'] =  username;

        db.collection('users').findOne(query, function(err, doc) {
            if (err) throw err;
            if (!doc) {

                db.collection('users').insert(user, function(err, inserted) {
                    if(err) throw err;

                    console.dir("Successfully inserted: " + JSON.stringify(inserted));
                    console.log(user)
                    callback(null, user)
                    //return db.close();
                });
            }
            else {
                var ret = {'code': 110000};
                callback(ret, null)
                
            }
        });

        //callback(Error("addUser Not Yet Implemented!"), null);
    }

    this.validateLogin = function(username, password, callback) {
        "use strict";

        // Callback to pass to MongoDB that validates a user document
        function validateUserDoc(err, user) {
            "use strict";

            if (err) return callback(err, null);

            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    callback(null, user);
                }
                else {
                    var invalid_password_error = new Error("Invalid password");
                    // Set an extra field so we can distinguish this from a db error
                    invalid_password_error.invalid_password = true;
                    callback(invalid_password_error, null);
                }
            }
            else {
                var no_such_user_error = new Error("User: " + user + " does not exist");
                // Set an extra field so we can distinguish this from a db error
                no_such_user_error.no_such_user = true;
                callback(no_such_user_error, null);
            }
        }

        // TODO: hw2.3
var query = [];
        query['_id'] =  username;

        db.collection('users').findOne(query, function(err, doc) {
            if (err) throw err;
            if (doc) {
                console.log('found user...');
                console.dir(doc)
                callback(null, doc);

            }
            else {
                var ret = {'code': 110000};
                callback(ret, null)
            }
        });

        //callback(Error("validateLogin Not Yet Implemented!"), null);
    }
}

module.exports.UsersDAO = UsersDAO;

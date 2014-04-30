var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017,localhost:27018,localhost:27019/course?w=10", function(err, db) {
    if (err) throw err;

    // Write concern of one
    db.collection("repl").insert({ 'x' : 1 }, function(err, doc) {
        if (err) throw err;
        console.log(doc);

        // Write concern of two
        db.collection("repl").insert({ 'x' : 2 }, { 'w' : 21 }, function(err, doc) {
            if (err) throw err;
            console.log(doc);
            db.close();
        });
    });
});

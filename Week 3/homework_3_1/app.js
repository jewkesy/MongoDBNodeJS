var MongoClient = require('mongodb').MongoClient;

var dbName = 'school';
var dbColl = 'students';


MongoClient.connect('mongodb://localhost:27017/' + dbName, function(err, db) {
    if(err) throw err;

    var query = {  };
    var cursor = db.collection(dbColl).find(query);

    cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
        	console.dir('no more docs');
            return db.close();
        }
    
        var arrScores = doc.scores;

        var lowest = 100;
        var indx = 0
        var currIndx = 0;

        arrScores.forEach(function(item) {
            if (item.type == 'homework' && item.score < lowest) {
                lowest = item.score;
                indx = currIndx;
            }
            currIndx++;
        });

        arrScores.splice(indx, 1);

        var updateQuery = {"_id": doc._id};
        doc['scores'] = arrScores;
        db.collection(dbColl).update(updateQuery, doc, function(err, updated) {
            if(err) console.log(err);
            console.dir("Successfully updated " + updated + " document!");
        });
    });
});
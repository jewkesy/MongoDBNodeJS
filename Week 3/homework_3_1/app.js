var MongoClient = require('mongodb').MongoClient;

var dbName = 'school';
var dbColl = 'students';


MongoClient.connect('mongodb://localhost:27017/' + dbName, function(err, db) {
    if(err) throw err;


    // db.collection(dbColl).find().limit(2).toArray(function (err, doc) {
    //     if(err) throw err;

    //     console.log(doc);
    //     var arrScores = [];

    //     var lowest = 100;
    //     var indx = 0
    //     var currIndx = 0;

    //     doc.scores.forEach(function(item) {
    //         console.log(item.score);
    //         if (item.score < lowest) {
    //             lowest = item.score;
    //             indx = currIndx;
    //         }
    //         currIndx++;
    //     });

    //     doc.scores.splice(indx, 1)
    //     console.log('lowest: ' + lowest);
    //     console.log('Index to remove: ' + indx);
    //     console.log('')
    //     console.log(doc.scores)
    //     console.log('')

    // });



    var query = {  };
    var sort// = [ ["State",  1], ["Temperature", -1]  ];
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
        //    console.log(item.score);
            if (item.type == 'homework' && item.score < lowest) {
                lowest = item.score;
                indx = currIndx;
            }
            currIndx++;
        });

        arrScores.splice(indx, 1)
//         console.log('lowest: ' + lowest);
//         console.log('Index to remove: ' + indx);
// console.log('')
//        console.log(arrScores)
// console.log('')

        var updateQuery = {"_id": doc._id};
//            console.log(updateQuery);
            doc['scores'] = arrScores;
//console.log(doc);
            db.collection(dbColl).update(updateQuery, doc, function(err, updated) {
                if(err) console.log(err);

                console.dir("Successfully updated " + updated + " document!");

            });

    });
});
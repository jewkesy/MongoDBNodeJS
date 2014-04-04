var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var query = {  };
    var sort = [ ["State",  1], ["Temperature", -1]  ];
    var cursor = db.collection('data').find(query).sort(sort).limit(100000);
var currState = "";
    cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
        	console.dir('no more docs')
            return db.close();
        }

        if (currState != doc.State) {
        	currState = doc.State;
        	console.log('Setting currState to ' + doc.State);
        	console.log('High temp: ' + doc.Temperature);

			var updateQuery = {"_id": doc._id};
			console.log(updateQuery);
	        doc['month_high'] = true

	        db.collection('data').update(query, doc, function(err, updated) {
	            if(err) console.log(err);

	            console.dir("Successfully updated " + updated + " document!");

	            //return db.close();
	        });

        }

        //console.dir(doc.Temperature);
    });
});
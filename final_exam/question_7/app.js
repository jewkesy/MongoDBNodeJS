var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/question7", {native_parser:true})

db.open(function(err, db) {
	if (err) throw err;

    console.log("Connected to question7 database");
	cleanseImages();
});


function cleanseImages() {

	console.log('cleansing...')

	db.collection('images').find().limit().toArray(function(err, items) {
		if (err) throw err
		items.forEach(function(item) {
			var imgId = item._id;
			//console.log('looking for ' + imgId);
			db.collection('albums').find({'images' : {'$in' : [imgId] } }).limit(1).toArray(function(err, item){
				if (err) throw err
				if(item.length == 0) {
					console.log('not found ' + imgId)
				}

			});
		});
	});
}



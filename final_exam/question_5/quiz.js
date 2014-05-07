use question5;

db.fubar.ensureIndex( { 'a': 1, 'b': 1 })
db.fubar.ensureIndex( { 'a': 1, 'c': 1 })
db.fubar.ensureIndex( { 'c': 1 })
db.fubar.ensureIndex( { 'a': 1, 'b': 1, 'c' : -1 })

db.fubar.insert({'a' : 1, 'b' : 5001, 'c' : 10000 });

db.fubar.find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1}).explain();

//db.fubar.getIndexes()

// a_1_b_1
// a_1_c_1
// a_1_c_1
// a_1_b_1_c_-1
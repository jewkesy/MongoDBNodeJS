use question7;


db.images.find({'tags' :{ $in : ['kittens']  } }).count()
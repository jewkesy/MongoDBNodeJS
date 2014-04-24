use week5

db.smallzips.aggregate([
	{
		"$match": {
			"state" : { $in: ["NY", "CA"] }     // answer 44804.78260
			//"state" : { $in: ["CT", "NJ"] }   // answer 38176.6363636363
		}
	},
	{
		"$group" : {
			"_id" : { "state" : "$state", "city" : "$city"},
			"totalPop" : {$sum : "$pop"}
 		}
	},
	{
		"$match" :{
			"totalPop" : {"$gt" : 25000}
		}
	},
	{
	    "$group": {
	 		"_id": "$state", 
	 		"avg": {$avg:"$totalPop"} 
	 	}
	}
])
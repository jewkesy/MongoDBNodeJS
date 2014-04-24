use week5

db.smallzips.aggregate([
	{
		"$match": {
			"state" : { $in: ["NY", "CA"] }
			//"state" : { $in: ["CT", "NJ"] }
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


// db.zips.aggregate([
//     {$match:
//      {
// 	 state:"NY"
//      }
//     },
//     {$group:
//      {
// 	 _id: "$city",
// 	 population: {$sum:"$pop"},
// 	 zip_codes: {$addToSet: "$_id"}
//      }
//     },
//     {$project:
//      {
// 	 _id: 0,
// 	 city: "$_id",
// 	 population: 1,
// 	 zip_codes:1
//      }
//     }
     
// ])

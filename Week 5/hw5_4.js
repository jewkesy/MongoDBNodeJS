use week5
db.zips.aggregate([
	{
		"$project": {
			"first_char": {$substr : ["$city",0,1]},
			"city" : "$city",
			"pop" : "$pop"
     	}	 
   	},
    {
    	"$match" : {
		 	"first_char" : { "$in" : [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]} 
		 }
    },
   	{
   		"$sort" : { "first_char" : 1 }
   	},
   	{
   		"$group" : {
   			"_id": "result",
   			"pop" : { "$sum" : "$pop"  }
   		}
   	}
])


{ "_id" : "result", "pop" : 298015 }

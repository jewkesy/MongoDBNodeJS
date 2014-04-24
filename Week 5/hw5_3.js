use week5
db.grades.aggregate([
	{
		"$unwind": "$scores"	
	},
	{
		"$match" : {
			"scores.type" : { "$nin" : [ "quiz" ]} 
		}
	},
	{
		"$group" : {
			"_id" : {"student_id" : "$student_id", "class_id" : "$class_id"},
			"avgScore" : { "$avg" : "$scores.score" }
		}
	},
	{
		"$group" : {
			"_id" : {"class_id" : "$_id.class_id"},
			"avgScore" : { "$avg" : "$avgScore"}
		}
	},
	{
		"$sort" : {
			"avgScore": -1
		}
	}
])



{ "_id" : { "class_id" : 1 }, "avgScore" : 64.50642324269175 }
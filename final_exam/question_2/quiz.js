use enron;
db.messages.find().count();
db.messages.aggregate(
			{	
			'$unwind' : '$headers.To'
		},
		{	
			'$match' : { 
				'headers.From' : 'susan.mara@enron.com'
				//'headers.From' : 'soblander@carrfut.com'
				//'headers.From' : 'evelyn.metoyer@enron.com'
			}
		},

		{
			'$match' : { 
				//'headers.To' : 'jeff.dasovich@enron.com'
				//'headers.To' : 'richard.shapiro@enron.com' 
				//'headers.To' : 'soblander@carrfut.com' 
				//'headers.To' : 'james.steffes@enron.com' 
				//'headers.To' : 'kate.symes@enron.com' 
				'headers.To' : 'alan.comnes@enron.com' 
			}
		},
		{
			'$group' : {
				'_id' : { 'headers.From' : '$headers.From', 'headers.To' : '$headers.To' },
				'count' : {'$sum' : 1}
			}
		}
).pretty();


//'$project' : { '_id' : 1,  'headers.To' : 1, 'headers.Subject' : 1 } }, 


// answer:
// Which pair of people have the greatest number of messages in the dataset?
// 		susan.mara@enron.com to jeff.dasovich@enron.com 			750
//		susan.mara@enron.com to richard.shapiro@enron.com 			974    <--------
//		soblander@carrfut.com to soblander@carrfut.com 				679
//		susan.mara@enron.com to james.steffes@enron.com 			648
//		evelyn.metoyer@enron.com to kate.symes@enron.com 			567
//		susan.mara@enron.com to alan.comnes@enron.com 				550



// Please use the Enron dataset you imported for the previous problem. For this question 
// you will use the aggregation framework to figure out pairs of people that tend to 
// communicate a lot. To do this, you will need to unwind the To list for each message. 
//
// This problem is a little tricky because a recipient may appear more than once in the To list 
// for a message. You will need to fix that in a stage of the aggregation before doing your 
// grouping and counting of (sender, recipient) pairs. 
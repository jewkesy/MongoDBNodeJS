use blog
db.posts.aggregate([
	{
		$group: {
			"_id": "$comments.author"
		}
	},
	{
		$unwind: "$_id"
	},
	{
		$group: {
			"_id": "$_id",
			numberPosts: {$sum:1}
		}
	},
	{
		$sort: {
			numberPosts:-1
		}
	},
	{
		$limit: 1
	}
]).pretty()

db.posts.aggregate([{$group: {"_id": "$comments.author"}},{$unwind: "$_id"},{$group: {"_id": "$_id",numberPosts: {$sum:1}}},{$sort: {numberPosts:-1}},{$limit: 1}])
{
	"ok" : 1,
	"result" : [
		{
			"_id" : "Gisela Levin",
			"numberPosts" : 112
		}
	]
}
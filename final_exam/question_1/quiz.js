use enron;
db.messages.find().count();
db.messages.find({ 'headers.From' : 'andrew.fastow@enron.com', 'headers.To' : {$in: ['jeff.skilling@enron.com'] } }, ({ 'headers.From' : 1, 'headers.To' : 1 })).pretty();

//answer: 3

//Construct a query to calculate the number of messages sent by Andrew Fastow, CFO, to Jeff Skilling, the president. 
//Andrew Fastow's email addess was andrew.fastow@enron.com. Jeff Skilling's email was jeff.skilling@enron.com. 
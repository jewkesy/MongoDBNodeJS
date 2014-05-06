use enron;
db.messages.find().count();
db.messages.find({ 'headers.Message-ID' : '<8147308.1075851042335.JavaMail.evans@thyme>' }).pretty();
db.messages.update( {'headers.Message-ID' : '<8147308.1075851042335.JavaMail.evans@thyme>'}, { $addToSet: { 'headers.To': 'mrpotatohead@mongodb.com' } } );
db.messages.find({ 'headers.Message-ID' : '<8147308.1075851042335.JavaMail.evans@thyme>' }).pretty();

//answer: vOnRg05kwcqyEFSve96R

// Please add the email address "mrpotatohead@mongodb.com" to the list of addresses in 
// the "headers.To" array for the document with "headers.Message-ID" of "<8147308.1075851042335.JavaMail.evans@thyme>" 
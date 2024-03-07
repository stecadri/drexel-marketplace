const MongoClient = require('mongodb').MongoClient; 

// server location 
const url = 'mongodb://localhost:27017'; 
MongoClient.connect(url).then((client) => { 
	// database name 
	const db = client.db("drexel-marketplace"); 
	
	// collection name 
	db.createCollection("companies");
    db.listCollections(); 
    console.log('Database created'); 
})

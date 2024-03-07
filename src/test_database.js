const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Trying insert...");
    const database = client.db('drexel-marketplace');
    const customers = database.collection('products');
    const myobj = { 
        name: "Product name", 
        description: "product description",
        photo: "path/to/photo.jpg",
        seller: "userID",
        price: "10.99",
        category: ["one", "two", "three"]
    };
    const result = await customers.insertOne(myobj);
    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("Done.");
  }
}
run().catch(console.dir);
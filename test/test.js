const assert = require('assert');
const expect = require('chai').expect;
const { MongoClient } = require('mongodb');
var  client;
var inventoryCollection;

async function initTests()
{
         client= await getClient();
        inventoryCollection = client.db("book-store").collection("inventory");
        await inventoryCollection.deleteMany({});
        await inventoryCollection.insertOne( { "_id": "parks-rec-book", "name": "The Ultimate Parks and Rec Book for the Ultimate Fans", "numberInStock": 5 })
}

(async () => { await initTests() })();

async function getClient()
{
  const uri = 'mongodb+srv://admin:mongodb123@github-testing.nd8bw.mongodb.net/book-store?retryWrites=true&w=majority';

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
       return client;

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

describe('NodeJS Tutorial', function() {
  describe('Inventory Transaction test', function() {
    it('File transaction-inventoryexample.js runs without errors',  function() {
	       //const inventory_example  = () =>  require('../transaction-inventoryexample.js');
               expect(async() => {  await require('../transaction-inventoryexample.js')}).not.to.throw();
               

	});
  it('Transaction completed successfully transaction-inventoryexample.js runs without errors', (done) => {
    //const inventory_example  = () =>  require('../transaction-inventoryexample.js');
        //const client = await getClient();

          /**
           * The inventory collection in the book-store database
           */
           const inventoryCollection = client.db("book-store").collection("inventory");
 
           inventoryCollection.findOne({ "_id": "parks-rec-book"}).then((doc) => {
            expect(doc.numberInStock).to.equal(4);
            done();
           });
          

           
}).timeout(10000);
  });
});

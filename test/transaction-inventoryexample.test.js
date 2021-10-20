const { MongoClient } = require('mongodb');
const transactionInventory = require('../transaction-inventoryexample');

describe('Transaction Inventory test', () => {
    let connection;
    let db;

    beforeAll(async () => {
        const uri = 'mongodb+srv://@github-testing.nd8bw.mongodb.net/book-store?retryWrites=true&w=majority';
        connection = await MongoClient.connect(uri, {
            useNewUrlParser: true,
        });
        db = connection.db('book-store');

        const inventoryCollection = db.collection('inventory');
        await inventoryCollection.deleteMany({});
        await inventoryCollection.insertOne({ "_id": "parks-rec-book", "name": "The Ultimate Parks and Rec Book for the Ultimate Fans", "numberInStock": 5 });
    });

    afterAll(async () => {
        await connection.close();
    });

    it('File transaction-inventoryexample.js runs without errors', async () => {
        await transactionInventory();
    });

    it('Transaction completed successfully transaction-inventoryexample.js runs without errors', async () => {
        const inventoryCollection = db.collection("inventory");

        const document = await inventoryCollection.findOne({ "_id": "parks-rec-book" });
        expect(document.numberInStock).toEqual(4);
    });
});

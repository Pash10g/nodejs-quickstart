const { MongoClient } = require('mongodb');
const aggregation = require('../aggregation');

describe('Aggregation test', () => {
    let connection;
    let db;

    beforeAll(async () => {
        const uri = 'mongodb+srv://<username>:<password>@<your-cluster-url>/book-store?retryWrites=true&w=majority';
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

    it('File aggregation.js runs without errors', async () => {
        await aggregation();
    });

});

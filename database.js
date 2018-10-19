const {MongoClient} = require("mongodb");

const url = "localhost";
const port = "27017";
const database = "formdb";

const db = MongoClient.connect(`mongodb://${url}:${port}/${database}`
	, {useNewUrlParser: true})
	.then(client => client.db(database));

module.exports = db;

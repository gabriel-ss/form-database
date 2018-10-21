const express = require("express");
const {ObjectID} = require("mongodb");
const database = require("../../database.js");
const router = express.Router();

// TODO: Add documentation
router.use(
	express.json(),
	express.urlencoded({extended: true})
);


// Responds with all avaliable users
router.route("/")
	.get(async (request, response) => {

		const db = await database;
		const query = await db.collection("users").find({}).toArray();

		response.send(query);

	});

// Registers a new user the database
router.route("/")
	.post(async (request, response) => {

		const db = await database;
		const query = await db.collection("users")
			.insertOne(request.body);

		response.send(query.ops);

	});

// Responds with info about a specific user
router.route("/:id")
	.get(async (request, response) => {

		const db = await database;
		const query = await db.collection("users")
			.findOne(ObjectID(request.params.id));

		response.send(query);

	});

// Updates information about an user
router.route("/:id")
	.put(async (request, response) => {

		const db = await database;
		const query = await db.collection("users")
			.findOneAndUpdate({_id: ObjectID(request.params.id)},
				{$set: request.body}, {returnOriginal: false});


		response.send(query.value);

	});

// Removes an user from the database
router.route("/:id")
	.delete(async (request, response) => {

		const db = await database;
		const query = await db.collection("users")
			.deleteOne({_id: ObjectID(request.params.id)});

		response.status(query.result.n ? 200 : 204).send();

	});

module.exports = router;

const express = require("express");
const {ObjectID} = require("mongodb");
const database = require("../../database.js");
const router = express.Router();

// TODO: Add documentation
router.use(
	express.json(),
	express.urlencoded({extended: true})
);

// Respond with all avaliable templates
router.route("/")
	.get(async (request, response) => {

		const db = await database;
		const query = await db.collection("forms")
			.find(
				{},
				{projection: {answers: 0}}
			).toArray();

		response.send(query);

	});

// Insert a new form template in the database
router.route("/")
	.post(async (request, response) => {

		const db = await database;
		const query = await db.collection("forms")
			.insertOne(request.body);

		response.send(query.ops);

	});

// Respond with a specific form template
router.route("/:id")
	.get(async (request, response) => {

		const db = await database;
		const query = await db.collection("forms")
			.findOne(
				{_id: ObjectID(request.params.id)},
				{projection: {answers: 0}}
			);

		response.send(query);

	});

// COMBAK: Is modifying a form template a good idea?
// Updates information about a form template
router.route("/:id")
	.put(async (request, response) => {

		const db = await database;
		const query = await db.collection("forms")
			.findOneAndUpdate(
				{_id: ObjectID(request.params.id)},
				{$set: request.body},
				{returnOriginal: false}
			);


		response.send(query.value);

	});

// Removes an specific form template
router.route("/:id")
	.delete(async (request, response) => {


		const db = await database;
		const query = await db.collection("forms")
			.deleteOne({_id: ObjectID(request.params.id)});

		response.status(query.result.n ? 200 : 204).send();

	});


// Respond with all filled forms of the specified template
router.route("/:id/answers")
	.get(async (request, response) => {

		const db = await database;
		const query = await db.collection("forms")
			.findOne(
				{_id: ObjectID(request.params.id)},
				{projection: {answers: 1}}
			);

		response.send(query.answers);

	});

// Updates information about a form template
router.route("/:id/answers")
	.post(async (request, response) => {

		const db = await database;
		const query = await db.collection("forms")
			.updateOne(
				{_id: ObjectID(request.params.id)},
				{$push: {answers: request.body}}
			);


		response.send(query.ops);

	});

// Clears the answers of a form
router.route("/:id/answers")
	.delete(async (request, response) => {

		const db = await database;
		const query = await db.collection("forms")
			.updateOne(
				{_id: ObjectID(request.params.id)},
				{$set: {answers: []}}
			);

		response.status(query.result.n ? 200 : 204).send();

	});


module.exports = router;

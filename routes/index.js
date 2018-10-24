const express = require("express");
const {ObjectID} = require("mongodb");
const database = require("../database.js");
const formRenderer = require("./form-renderer.js");
const router = express.Router();

router.route("/:id")
	.get(async (request, response) => {

		const db = await database;
		const query = await db.collection("forms")
			.findOne(
				{_id: ObjectID(request.params.id)},
				{projection: {answers: 0}}
			);

		response.render("index.ejs", {
			id: query._id,
			title: query.formTitle,
			html: formRenderer(query.template),
		});

	});

module.exports = router;

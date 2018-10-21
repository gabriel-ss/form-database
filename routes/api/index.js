const router = require("express").Router();
const forms = require("./forms.js");
const users = require("./users.js");


router.use("/forms", forms);
router.use("/users", users);


router.get("/", (request, response) => {

	const base_url =
		`${request.protocol}://${request.get("host")}${request.originalUrl}/`;

	response.json({
		forms_url: `${base_url}forms`,
		users_url: `${base_url}users`,
	});

});

module.exports = router;

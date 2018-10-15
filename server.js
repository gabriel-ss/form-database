const express = require("express");
const htmlForm = require("./form-loader.js");

const app = express();
const port = 3000;

app.set("views", "./views");
app.use(express.static("public"));


app.get("/", (request, response) => {

	response.render("index.ejs", {html: htmlForm});

});


app.listen(port, () => {

	console.log(`Listening on the port ${port}`);

});

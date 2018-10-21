const express = require("express");
const htmlForm = require("./form-loader.js");
const api = require("./routes/api");

const app = express();
const port = 3000;

app.set("views", "./views");
app.use(express.static("public"));


app.get("/", (request, response) => {

	response.render("index.ejs", {html: htmlForm});

});

app.use("/api", api);

app.listen(port, () => {

	console.log(`Listening on the port ${port}`);

});

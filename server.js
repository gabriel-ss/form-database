const express = require("express");
const route = require("./routes");
const api = require("./routes/api");

const app = express();
const port = 3000;

app.set("views", "./views");
app.use(express.static("public"));


app.get("/", (request, response) => {

	response.render("dashboard.ejs");

});

app.use("/", route);

app.use("/api", api);

app.listen(port, () => {

	console.log(`Listening on the port ${port}`);

});

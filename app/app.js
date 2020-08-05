const fs = require("fs");
const https = require("https");
const express = require("express");
let app = express();

const port = 5000;
const ACCEPTED_HEADERS = [
	"content-type",
	"x-gofs-context-id",
	"x-timo-devicereg",
	"x-timo-devicekey",
	"token",
];
const acceptedHeaders =
	"Origin, X-Requested-With," + ACCEPTED_HEADERS.join(",");

const mongoose = require("mongoose");
const Task = require("./data/tasks.model");
bodyParser = require("body-parser");

mongoose.Promise = global.Promise;

// connect database
const dbpath = "mongodb://127.0.0.1:27017/todolist";
const mongo = mongoose.connect(dbpath, { useNewUrlParser: true });
mongo
	.then(() => {
		console.log("connected");
	})
	.catch((err) => {
		console.log("err", err);
	});

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", acceptedHeaders);
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// let routes =  require('./routes'); //importing route
// routes(app); //register the route

// mount the router on the app
app.use('/api', require('./routes'));

https
	.createServer(
		{
			key: fs.readFileSync("sslcert/server.key"),
			cert: fs.readFileSync("sslcert/server.cert"),
		},
		app
	)
	.listen(port, () => {
		console.log("Listening port 3000...");
	});

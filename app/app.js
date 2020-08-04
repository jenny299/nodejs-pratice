const fs = require("fs");
const https = require("https");
const express = require("express");
let app = express();

const GLOBAL_CONSTANTS = require("./config/global.constant");
const SIMULATION_FILES = GLOBAL_CONSTANTS.SIMULATION_DATA_FILES;
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

// const ApiHelper = require('./helpers/api.helper');
// const UtilHelper = require('./helpers/util.helper');
// const api = new ApiHelper();
// const util = new UtilHelper();

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

// app.use(express.json());
// app.post('/login', function(req, res){
//     api.makeRequest(req)
//     .then(response => {
//         res.json(response)
//     })
//     .catch(error => {
//         res.send(error)
//     })
// });
// app.post('/user/account/transaction/receipt', (req, res) => {
//    util.readFile(`data/${SIMULATION_FILES.RECEIPT}`);
// });

let routes = require("./routes/tasks.routes"); //importing route
routes(app); //register the route

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

const fs = require('fs');
const https = require('https');
const express = require('express');
let app = express();



const ApiHelper = require('./helpers/api.helper');
const UtilHelper = require('./helpers/util.helper');
const GLOBAL_CONSTANTS = require('./config/global.constant');
const SIMULATION_FILES = GLOBAL_CONSTANTS.SIMULATION_DATA_FILES;

const port = 3000;
const ACCEPTED_HEADERS = ['content-type', 'x-gofs-context-id', 'x-timo-devicereg', 'x-timo-devicekey', 'token'];
const acceptedHeaders = 'Origin, X-Requested-With,' + ACCEPTED_HEADERS.join(',');
const api = new ApiHelper();
const util = new UtilHelper();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", acceptedHeaders);
    next();
});

app.use(express.json());

app.post('/login', function(req, res){
    api.makeRequest(req)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
});

app.post('/user/account/transaction/receipt', (req, res) => {
   util.readFile(`data/${SIMULATION_FILES.RECEIPT}`);
});

https.createServer({
    key: fs.readFileSync('sslcert/server.key'),
    cert: fs.readFileSync('sslcert/server.cert')
}, app).listen(port, () => {
    console.log('Listening port 3000...');
})
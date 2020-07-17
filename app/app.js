const fs = require('fs');
const https = require('https');
const express = require('express');
let app = express();

const apiHelper = require('./helpers/api.helper');

const port = 3000;
const ACCEPTED_HEADERS = ['content-type', 'x-gofs-context-id', 'x-timo-devicereg'];
const acceptedHeaders = 'Origin, X-Requested-With,' + ACCEPTED_HEADERS.join(',');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", acceptedHeaders);
    next();
});

app.use(express.json());

app.post('/login', function(req, res){
    apiHelper.make_API_call(req)
    .then(response => {
        console.log("response", response)
        res.json(response)
    })
    .catch(error => {
        console.log("error", error)
        res.send(error)
    })
});

https.createServer({
    key: fs.readFileSync('sslcert/server.key'),
    cert: fs.readFileSync('sslcert/server.cert')
}, app).listen(port, () => {
    console.log('Listening port 3000...');
})
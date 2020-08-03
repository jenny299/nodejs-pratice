const request = require('request');
const Logger = require('./logger.helper');


const ACCEPTED_HEADERS = ['content-type', 'x-gofs-context-id', 'x-timo-devicereg'];
const ENDPOINT_APIS = 'https://192.168.40.217:8443';
const getHeadersInfo = (requestHeaders) => {
    const finalHeaders = {};
    Object.entries(requestHeaders).forEach(([key,value])=>{
        if (ACCEPTED_HEADERS.includes(key)) {
            finalHeaders[key] = value;
        }
    })
    return finalHeaders;
};

const logger = new Logger();

class ApiHelper {
    
 /*
    ** This method returns a promise
    ** which gets resolved or rejected based
    ** on the result from the API
    */
    makeRequest = (req) => {
        // logger.on('message', data => console.log('call log... ', data));
        const finalHeaders = getHeadersInfo(req.headers);
        const options = {
            url: ENDPOINT_APIS + '/' + req.originalUrl,
            method: req.method,
            headers: finalHeaders,
            body: req.body,
            agentOptions: {
                rejectUnauthorized: false
            },
            json: true
        };
        return new Promise((resolve, reject) => {
            request(options, (err, res, body) => {
            if (err) {
                logger.log(options, err);
                reject(err);
            }

            logger.log(options, body);
            resolve(body)
            });
        })
    }
}

module.exports = ApiHelper;
const EventEmitter = require('events');

class Logger extends EventEmitter {
    log = (req, res) => {
        console.log('Request: ', req);
        console.log('----------------------');
        console.log('Response: ', res);
        console.log('----------------------');
        this.emit('message', res);
    }
    logParams = (name, value) => {
        this.emit(name, value);
    }
}

module.exports = Logger;
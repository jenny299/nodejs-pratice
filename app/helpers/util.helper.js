
const fs = require('fs');

class Util {
    readFile = (path) => {
        // const file = `${DATA_PATH}/${path}`;
        const file = 'receipt.json';
        fs.readFile(file, (err, data) => {
            if (err) {
              if (err.code === 'ENOENT') {
                console.error(`${file} does not exist`);
                return;
              }
          
              throw err;
            }
          
            console.log("fd", data)
    
            // readMyData(fd);
          });
    }
}

module.exports = Util;
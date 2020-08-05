// create new Router instance for api routes
var router = require('express').Router();

router.use('/tasks', require('./tasks.routes'));  

module.exports = router;
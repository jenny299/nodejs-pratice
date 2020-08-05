// create new Router instance for api routes
var router = require('express').Router();
var todoList = require('../controllers/tasks.controller');

// todoList Routes
 router.route('/')
 .get(todoList.list_all_tasks)
 .post(todoList.create_a_task);


router.route('/:taskId')
 .get(todoList.read_a_task)
 .put(todoList.update_a_task)
 .delete(todoList.delete_a_task);

module.exports = router;
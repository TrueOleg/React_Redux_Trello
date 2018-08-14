const express = require('express');
const router = express.Router();

const auth = require(__dirname+'/auth');
const tasks = require(__dirname+'/tasks');
const users = require(__dirname+'/users');
const boards = require(__dirname+'/boards');

router.use('/', auth)
router.use('/api/tasks', tasks)
router.use('/api/boards', boards)
router.use('/api/users', users)

module.exports = router;
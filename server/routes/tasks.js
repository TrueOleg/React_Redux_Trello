const express = require('express');
const router = express.Router();
const { sequelize } = require('../models/sequelize');

const models = require('../models/sequelize');
const auth = require('../helpers/auth');
const verify = auth.verifyToken;
const Op = sequelize.Op;

router.post('/', verify, async (req, res, next) => {
    try {
      
        const {title, content} = req.body.data;
        const {status, boardId, position} = req.body;
        const save = await models.Tasks
                .build({ 
                  title: title,
                  content: content, 
                  board_id: boardId, 
                  status: status,
                  position: position 
                })
                .save();  
           
        res.status(200).send({
            message: 'success',
            result: true,
            
        });        
    } 
    catch(err) {
        next(new Error(err.message));
    }   
});    

router.get('/my', verify, async (req, res, next) => {
    try {     
        const boardId = req.query.board_id;
        const status = req.query.status;  

        const tasks = await models.Tasks.findAll({
            where: {
                board_id: boardId,
                status: status
            },
            raw: true
        });
        
        res.status(200).send({
            message: 'success',
            result: true,
            tasks
        });
       
    } 
    catch(err) {
        next(new Error(err.message));
    }      
}); 

router.put('/my', verify, async (req, res, next) => {
    try {
        const {status, taskId, boardId, position} = req.body;
        let change = await models.Tasks
                .findOne({ 
                    where: { id: taskId } 
                })
                .then(task => {
                   return task.update({ status: status, position: position}, {fields: ['status', 'position']})
                }); 
        const backLogTasks = await models.Tasks.findAll({
                    where: {
                        board_id: boardId,
                        status: 'backLog'
                    },
                    raw: true
                });  
        const todoTasks = await models.Tasks.findAll({
                    where: {
                        board_id: boardId,
                        status: 'todo'
                    },
                    raw: true
                }); 
        const doneTasks = await models.Tasks.findAll({
                    where: {
                        board_id: boardId,
                        status: 'done'
                    },
                    raw: true
                });          
        res.status(200).send({
            message: 'success',
            result: true,
            backLogTasks,
            todoTasks,
            doneTasks
        });        
    } 
    catch(err) {
        next(new Error(err.message));
    }   
}); 

router.delete('/my', verify, async (req, res, next) => {
    try {
        const taskId = req.query.task_id;
        const boardId = req.query.board_id;
        let deleteTask = await models.Tasks
                .findOne({ 
                    where: { id: taskId } 
                })
                .then(task => {
                   return task.destroy()
                }); 
        const backLogTasks = await models.Tasks.findAll({
                    where: {
                        board_id: boardId,
                        status: 'backLog'
                    },
                    raw: true
                });  
        const todoTasks = await models.Tasks.findAll({
                    where: {
                        board_id: boardId,
                        status: 'todo'
                    },
                    raw: true
                }); 
        const doneTasks = await models.Tasks.findAll({
                    where: {
                        board_id: boardId,
                        status: 'done'
                    },
                    raw: true
                });          
        res.status(200).send({
            message: 'success',
            result: true,
            backLogTasks,
            todoTasks,
            doneTasks
        });        
    } 
    catch(err) {
        next(new Error(err.message));
    }   
});  


module.exports = router;
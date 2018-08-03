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
        const {status, boardId} = req.body;
        const save = await models.Tasks
                .build({ 
                  title: title,
                  content: content, 
                  board_id: boardId, 
                  status: status 
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

router.post('/my', verify, async (req, res, next) => {
    try {
      
        
        const {status, taskId} = req.body;
        const change = await models.Tasks
                .findOne({ 
                    where: { id: taskId }
                })
                .then(task => {
                    task.update({ status: status}, {fields: ['status']})
                })  
           
        res.status(200).send({
            message: 'success',
            result: true,
            
        });        
    } 
    catch(err) {
        next(new Error(err.message));
    }   
});  


module.exports = router;
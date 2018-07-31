const express = require('express');
const router = express.Router();
const { sequelize } = require('../models/sequelize');

const models = require('../models/sequelize');
const auth = require('../helpers/auth');
const verify = auth.verifyToken;
const Op = sequelize.Op;

router.post('/', verify, async (req, res, next) => {
    try {
      console.log('body', req.body)
        const {title, content} = req.body.data;
        const {status, boardId} = req.body;
        console.log('title', title)
        console.log('content', content)
        console.log('status', status)
        console.log('boardId', boardId)
        // const userId = req._userId;
        const save = await models.Tasks
                .build({ 
                  title: title,
                  content: content, 
                  board_id: boardId, 
                  status: status 
                })
                .save();
        // const boards = await  models.Boards.findAll({
        //   attributes: ['id', 'title'], 
        //   where: {user_id: userId}, raw: true
        //   });    
           
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
        console.log('tasks', tasks)
        res.status(200).send({
            message: 'success',
            result: true,
            tasks
        });
        // const userId = req._userId;
        // const boards = await models.Boards.findAll({
        //     attributes: ['id', 'title'], 
        //     where: {user_id: userId}, raw: true
        // });
        // res.status(200).send({
        //     message: 'success',
        //     result: true,
        //     boards
        // });
    } 
    catch(err) {
        next(new Error(err.message));
    }      
}); 




module.exports = router;
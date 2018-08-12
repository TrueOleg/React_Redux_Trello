const express = require('express');
const router = express.Router();
const { sequelize } = require('../models/sequelize');
const crypto = require('crypto');

const models = require('../models/sequelize');
const auth = require('../helpers/auth');
const verify = auth.verifyToken;
const Op = sequelize.Op;

router.post('/', verify, async (req, res, next) => {
    try {
        const {title} = req.body;
        
        const userId = req._userId;
        const save = await models.Boards
                .build({ user_id: userId, title: title })
                .save();
        const boards = await  models.Boards.findAll({
          attributes: ['id', 'title'], 
          where: {user_id: userId}, raw: true
          });    
           
        res.status(200).send({
            message: 'success',
            result: true,
            boards
        });        
    } 
    catch(err) {
        next(new Error(err.message));
    }   
});    

router.put('/', verify, async (req, res, next) => {
    try {
        const {boardId} = req.body;
        console.log('boardId', boardId)
        const id = parseInt(boardId.replace(/\D+/g,""));
        console.log('id', id)
        const secretId = String(id);
        const secretHash = crypto.createHash('md5').update(secretId).digest("hex");
        console.log('secret', secretHash)
        const userId = req._userId;
        const change = await models.Boards
                .findOne({
                    where: { id: id }
                })
                .then(board => {
                    return board.update({ secret: secretHash}, {fields: ['secret']})
                 });
          
           
        res.status(200).send({
            message: 'success',
            result: true,
            secretHash
        });        
    } 
    catch(err) {
        next(new Error(err.message));
    }   
});    

router.get('/my', verify, async (req, res, next) => {
    try {        
        const userId = req._userId;
        const boards = await models.Boards.findAll({
            attributes: ['id', 'title'], 
            where: {user_id: userId}, raw: true
        });
        res.status(200).send({
            message: 'success',
            result: true,
            boards
        });
    } 
    catch(err) {
        next(new Error(err.message));
    }      
}); 




module.exports = router;
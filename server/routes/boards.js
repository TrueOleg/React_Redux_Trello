const express = require('express');
const router = express.Router();
const { sequelize } = require('../models/sequelize');

const models = require('../models/sequelize');
const auth = require('../helpers/auth');
const verify = auth.verifyToken;
const Op = sequelize.Op;

router.post('/', verify, async (req, res, next) => {
    try {
        const {title} = req.body;
        const userId = req._userId;
        await models.Boards
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



module.exports = router;
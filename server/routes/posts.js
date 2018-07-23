const express = require('express');
const router = express.Router();
const { sequelize } = require('../models/sequelize');

const models = require('../models/sequelize');
const auth = require('../helpers/auth');
const verify = auth.verifyToken;
const Op = sequelize.Op;

router.post('/', verify, async (req, res, next) => {
    try {
        const {title, content} = req.body;
        const userId = req._userId;
        await models.Posts
                .build({ user_id: userId, title: title, content: content })
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

router.get('/friends', verify, async (req, res, next) => {
    try {        
        const userId = req._userId;
        const arr = await models.Followers.findAll({
                                    attributes: ['following'], 
                                    where: {follower: userId}, raw: true
                                    });                                                 
        var following = await arr.map((item) => {
            for(var following in item) {
                return item[following]
            }
        });
        const posts = await models.Posts.findAll({
                        attributes: ['title', 'content', 'date'],
                        include: {   
                            model: models.Users,
                            attributes: ['name']
                        },
                        where: { user_id: {[Op.in]: following}}, raw: true 
                        });
        res.status(200).send({
            message: 'success',
            result: true,
            posts
        });  
    } 
    catch(err) {
        next(new Error(err.message));
    }      
}); 

router.get('/my', verify, async (req, res, next) => {
    try {        
        const userId = req._userId;
        const posts = await models.Posts.findAll({ attributes: ['title', 'content', 'date'], where: { user_id: userId }, raw: true})
        res.status(200).send({
            message: 'success',
            result: true,
            posts
        });
    } 
    catch(err) {
        next(new Error(err.message));
    }      
}); 

module.exports = router;
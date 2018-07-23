const express = require('express');
const router = express.Router();

const models = require('../models/sequelize');
const auth = require('../helpers/auth');
const verify = auth.verifyToken;

router.post('/', verify, async (req, res, next) => {
    try {
        const followingId = req.query.id;
        const userId = req._userId;
        const follower = await models.Followers.build({ follower: userId, following: followingId})
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

router.delete('/', verify, async (req, res, next) => {
    try {
        const followingId = req.query.id;
        const userId = req._userId;
        const follower = await models.Followers.destroy({where: {follower: userId, following: followingId}})
        await res.status(200).send({
              message: 'delete',
              result: true,
        });
    }
    catch(err) {
        next(new Error(err.message));
    }
});



module.exports = router;
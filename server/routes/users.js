const express = require('express');
const router = express.Router();

const { sequelize } = require('../models/sequelize');
const models = require('../models/sequelize');
const auth = require('../helpers/auth');

const verify = auth.verifyToken;
const Op =sequelize.Op;
const fn = sequelize.fn;
const col = sequelize.col;
const where = sequelize.where;
// select users.id, name, followers.id from users left join followers on users.id = follower
// and following = 1 or following = users.id and follower = 1 
// where users.name ilike '%s%' and not users.id=1
router.get('/search', verify, async (req, res, next) => {
    try {
        const userName = req.query.char;
        const myId = req._userId;
        
        
        // let arr = await models.Users.findAll({ 
        //     attributes: ['id', 'name'],
        //     where: {
        //         [Op.and]: {
        //             name: {
        //                 [Op.iLike]: `${userName}` + '%',
    
        //             },
        //             id: {
        //                 [Op.not]: myId
        //             }
        //         },
        //     },
        //     raw: true 
        // });  
        // console.log('arr', arr);
        // let followers = await arr.map((item) => {
        //     for(var id in item) {
        //         return item[id]
        //     }
        // });
        // console.log('followers', followers);
        // let followings = await models.Followers.findAll({ 
        //     attributes: ['id'],
        //     where: {
        //         'follower': myId,
        //         'following': followers
        //     },
        //     raw: true 
        // });  
        // console.log('followings', followings);

        // const users = await models.Users.findAll({ 
            
        //     where: {
        //         [Op.and]: {
        //             name: {
        //                 [Op.iLike]: `${userName}` + '%',
    
        //             },
        //             id: {
        //                 [Op.not]: myId
        //             },
                    
        //         },
        //     },
        //     raw: true, 
        //     include: [{
                
        //         as: 'Following',
        //         model: models.Users,
                
        //         raw: true,
                   
        //     },
        //     {
        //         as: 'Following',
        //         model: models.Users,
                
        //         raw: true,
        //     }]
            

        // });   

        // console.log('users', users);
        // const usersFollowers = await models.Users.findAll({ 
            
        //     where: {
        //         [Op.and]: {
        //             name: {
        //                 [Op.iLike]: `${userName}` + '%',
    
        //             },
        //             id: {
        //                 [Op.not]: myId
        //             }
        //         },
        //     },
        //     raw: true, 
            
                

        // }); 
        // console.log('usersFollowers', usersFollowers);

        // var id = await usersFollowers.map((item) => {
        //     for(var id in item) {
        //         return item[id]
        //     }
        // });

        // const users = await models.Followers.findAll({ 
        //     attributes: ['id'],
        //     where: {
        //         [Op.and]: {
        //             follower:  myId,
        //             following: id
                    
        //         },
        //     },
        //     raw: true, 
            
                

        // });
        
        // const users  = await models.Users.findAll({ 
        //     attributes: ['id', 'name'],
        //     where: {
        //         [Op.and]: {
        //             name: {
        //                 [Op.iLike]: `${userName}` + '%',
    
        //             },
        //             id: {
        //                 [Op.not]: myId
        //             }
        //         },
        //     },
        //     raw: true, 
        //     include: {
        //         as: 'Following',
        //         model: models.Users,
        //         // where:  where(col('follower'), myId),
                
        //         raw: true   
        //     }    
        // });
        // console.log('users ', users );
        const users  = await models.Users.findAll({ 
            attributes: ['id', 'name'],
            where: {
                [Op.and]: {
                    name: {
                        [Op.iLike]: `${userName}` + '%',
    
                    },
                    id: {
                        [Op.not]: myId
                    }
                },
            },
            raw: true, 
            include: {
                as: 'Following',
                [Op.eq]: null,
                model: models.Users,
                where: where(col('follower'), myId),
                raw: true   
            }
             
        });
        console.log('users', users );   

        

        res.status(200).send({
        message: 'success',
        result: true,
        users
        });     
    }
    catch(err) {
        next(new Error(err.message));
    }
});

module.exports = router;
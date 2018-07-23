const express = require('express');
const router = express.Router();
const jwt = require('../helpers/auth')
const models = require('../models/sequelize');
const crypto = require('crypto');
const config = require('../config/config');
const {secret} = config.jwt
const auth = require('jsonwebtoken');
                    

router.post('/api/singin', async (req, res, next) => {
    try {
        const reqData = req.body;
        const login = reqData.login;
        const user = await models.Users.findOne({ where: {name: login} })
            .then(users => {
                return users.dataValues;
            });       
        const token = crypto.createHash('md5').update(reqData.password).digest("hex") === user.password
            ? jwt.signToken(user.id)
            : null;
        if (token) {
            res.status(200).send({
            message: 'success',
            result: true,
            token 
            });
        } else {
            res.status(401).send({
            message: 'Incorrect password',
            result: false
            });
        }  
           
    }
    catch (err) {
        next(new Error(err.message));
    };
});

router.post('/api/singup', async (req, res, next) => {
    try {
        let {regLogin, regEmail, regPass} = req.body;
        regPass = crypto.createHash('md5').update(regPass).digest("hex");
        const user = await models.Users.findOne({ where: {name: regLogin } });
        if (user) {
            res.status(200).send({
            message: 'This login already exists',
            result: false   
            })
        } else {
            models.Users
                .build({ name: regLogin, email: regEmail, password: regPass })
                .save()
                .then(user => {
                    const token = jwt.signToken(user.id);
                    res.status(200).send({
                    message: 'success',
                    result: true,
                    token
                    });
                })
        }    
           
    }
    catch(err) {
        next(new Error(err.message));
    }
});

router.get('/api/auth', (req, res, next) => {
    auth.verify(req.headers.authorization, secret, function(err, decoded){
        if(err) throw err
          return res.status(200).send({
                 message: 'success',
                 result: true,        
        }); 
      }); 
});


router.get('/', async (req, res, next) => {
    try {   
        res.sendFile(process.cwd()+'/public/index/index.html')
    }
    catch(err) {
        next(new Error(err.message));
    }
});

router.get('/singin', async (req, res, next) => {
    try {
        res.sendFile(process.cwd()+'/public/login/login.html')
    }
    catch(err) {
        next(new Error(err.message));
    }
});

router.get('/home', async (req, res, next) => {
    try {
        res.sendFile(process.cwd()+'/public/home/home.html')
    }
    catch(err) {
        next(new Error(err.message));
    }
})

router.get('/singup', async (req, res, next) => {
    try {
        res.sendFile(process.cwd()+'/public/registration/registration.html')
    }
    catch(err) {
        next(new Error(err.message));
    }
}); 

module.exports = router;
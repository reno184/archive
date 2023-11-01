const functions = require("firebase-functions");
const axios = require('axios')
const fs   = require('fs');
const path = require('path');
var jwt = require('jsonwebtoken');
var publicKEY  = fs.readFileSync(__dirname+'/publickey', 'utf8');
var privateKEY  = fs.readFileSync(__dirname+'/privatekey', 'utf8');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.recaptcha = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
   /* if(request.headers['origin']==='http://localhost:5000'){*/
        if (request.method === 'OPTIONS') {
            response.set('Access-Control-Allow-Methods', 'GET');
            response.set('Access-Control-Allow-Headers', 'g-recaptcha-response');
            response.sendStatus(204);
        } else {
            if (request.headers['g-recaptcha-response']) {
                const url = 'https://www.google.com/recaptcha/api/siteverify'
                const secret = '6LerzhobAAAAABu-NZmbbM18fmdEP-YKAQIhwCG8'
                const recaptchaResponse = request.headers['g-recaptcha-response']
                const remoteip = request.headers["x-forwarded-for"] || request.headers['x-appengine-user-ip'] || ''
                axios.post(`${url}?secret=${secret}&response=${recaptchaResponse}&remoteip=${remoteip}`)
                    .then(res => {
                        if(res.data){
                            if(res.data.success){
                                const token = jwt.sign({
                                    geoposition: request.query["geoposition"]
                                }, privateKEY, { algorithm:  "RS256", expiresIn: 60 });
                                response.status(200).json({ token, code : request.query["geoposition"]});
                            }else{
                                throw  new Error(res.data['error-codes'])
                            }
                        }else {
                            throw new Error('Missing siteverify response')
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        response.status(500).send(error.toString());
                    })
            } else {
                response.sendStatus(401);
            }
        }
   /* }else{
        response.sendStatus(401);
    }*/
});

exports.verify = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    if(request.headers['origin']==='http://localhost:5000') {
        if (request.method === 'OPTIONS') {
            response.set('Access-Control-Allow-Methods', 'GET');
            response.set('Access-Control-Allow-Headers', 'authorization');
            response.sendStatus(204);
        } else {
            if (request.headers['authorization']) {
                try{
                    jwt.verify(request.headers['authorization'], publicKEY, {algorithm:  "RS256"}, function(err, decoded) {
                        if(err){
                            response.status(401).send(err.message)
                        }else{
                            response.sendStatus(200)
                        }
                    });
                }catch (err){
                    response.status(500).send(err.message)
                }
            }else{
                response.sendStatus(401)
            }
        }
    }
});

exports.getQuestions = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).json(require('./dbResponse.json'))
})
exports.getPrice = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).json(require('./dbPrice.json'))
})

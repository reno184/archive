const functions = require("firebase-functions");
var admin = require("firebase-admin");
const moment = require("moment");
admin.initializeApp();
var db = admin.database();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
let counter = 0
exports.piTest = functions.https.onRequest( (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'content-type');
    response.sendStatus(200)
});

exports.piSetTimestamp = functions.https.onRequest( (request, response) => {
    counter++
    /*    console.log(`-----------------essai : ${counter}-------------------`)*/
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'content-type');

    /*  console.log('body before parse',request.body)
      console.log('request content type', request.headers['content-type'])
      console.log('req.headers.origin', request.headers['origin'])
      console.log('user-agent', request.headers['user-agent'])
      console.log('x-appengine-user-ip', request.headers['x-appengine-user-ip'])*/

    let body =  request.headers['content-type'] === 'application/json' ? request.body :  JSON.parse(request.body);
    /* console.error('body after parse',body)*/
    if(!body.timestamp || !body.id){
        response.status(503).send("il manque le timestamp ou l'id");
    }
    try{
        let flic_timestampClient = moment(body.timestamp).clone().format();
        let flic_dateUTCstring = body.dateUTCstring;
        let flic_timestampServer = moment().format();
        new Promise((resolve, reject)=>{
            // let rep = "pas de table, table crée" + request.query.id;
            let tableRef = db.ref().child("table"+  parseInt(body.id));
            tableRef.set({  num : parseInt(body.id),flic_dateUTCstring, flic_timestampClient, flic_timestampServer })
                .then(()=> resolve())
                .catch(err=>reject(err));

        }).then(()=>{
            response.sendStatus(200);
        },(err=>response.sendStatus(501))).catch(err=> response.sendStatus(501));
    }catch (err){
        // console.error('problème convert date')
        response.sendStatus(502);
    }
});
exports.mobileCheckTimestamp = functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'content-type');
    /*  console.log(`-----------------essai mobile check-------------------`)*/
    let body = request.headers['content-type'] === 'application/json' ? request.body :  JSON.parse(request.body);
    // console.log('body after parse',body)
    let timestampClient = moment(body.timestamp);

    new Promise((resolve, reject)=>{
        // let rep = "pas de table, table crée" + request.query.id;
        let tableRef = db.ref().child("table"+ body.id);
        tableRef.get().then((doc)=> {
            if(doc.exists() && !!doc.val().flic_timestampClient ){
                let flic_timestampClient = moment(doc.val().flic_timestampClient);
                // console.log('e',oldMoment)
                const interval = timestampClient.diff(flic_timestampClient, 'seconds')
                const mobile_timestampClient = timestampClient.clone().format()
                const mobile_timestampServer = moment().format();
                //  console.log('date diff',interval)
                tableRef.update({  mobile_dateUTCstring : body.dateUTCstring, mobile_timestampClient,mobile_timestampServer, interval })
                /* if(interval <= 3){*/
                resolve({
                    flic_timestampClient : doc.val().flic_timestampClient,
                    flic_timestampServer : doc.val().flic_timestampServer,
                    flic_dateUTCstring : doc.val().flic_dateUTCstring,
                    mobile_timestampClient,
                    mobile_timestampServer,
                    mobile_dateUTCstring : body.dateUTCstring,
                    interval : interval +' seconde(s)'
                });
                /*  }else{
                      reject('Appel supérieur à 3 secondes')
                  }*/
            }else{
                reject('Table not exist')
            }
        })
    }).then(data=>{
        response.status(200).json(data)
    }).catch(err=> response.sendStatus(401))
})

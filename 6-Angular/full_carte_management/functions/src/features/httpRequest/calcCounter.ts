import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

const _counterReponse = async function (placeId: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try{
        const questionsSnapShot = await db.collection('resto/' + placeId + '/question').get();
        const promises: any = []
        questionsSnapShot.forEach((doc) => {
            promises.push(db.runTransaction(async () => {
                const questionRef = db.doc('resto/' + placeId + '/question/' + doc.id);
                const reponseCol = await questionRef.collection('answer').get()
                if (parseInt(doc.data().counter) !== reponseCol.size) {
                    await questionRef.update({counter: reponseCol.size})
                    console.log("update counterReponse", doc.id);
                }
                await Promise.resolve()
            }).catch(err=>reject(err)))
        });
        Promise.all(promises).then(() => resolve('ok')).catch((err) => reject(err));
        }catch(err){
            reject(err)
        }
    });
}

const _counterPriceArticle = async function (placeId: string): Promise<void> {
    return new Promise(async (resolve,reject) => {
        try{
            const articleRef = db.collection('resto/' + placeId + '/article')
            const articlesSnapShot = await articleRef.get();
            const promises: any = [];
            articlesSnapShot.forEach((doc) => {
                const oldCounterBlock = doc.data().counterBlock
                promises.push(db.runTransaction(async () => {
                    const articlesFiltered = await db.collection('resto/' + placeId + '/price').where('articleId', '==', doc.id).get()
                    if (parseInt(oldCounterBlock) !== articlesFiltered.size) {
                        await articleRef.doc(doc.id).update({counterBlock: articlesFiltered.size })
                        console.log("update counterPriceArticle", doc.id);
                    }
                    if(doc.data().questions && doc.data().questions.length >0){
                        if(doc.data().counter !== doc.data().questions.length){
                            await articleRef.doc(doc.id).update({counter: doc.data().questions.length })
                        }
                    }
                    await Promise.resolve();
                }).catch((err) => reject(err)));
            })
            Promise.all(promises).then(() => resolve()).catch((err) => reject(err));
        }catch(err){
            reject(err)
        }
    })
}

const _counterArticleQuestion = async function (placeId: string): Promise<void> {
    return new Promise(async (resolve,reject) => {
        try{
            const articleRef = db.collection('resto/' + placeId + '/article')
            const articlesSnapShot = await articleRef.get();
            const promises: any = [];
            articlesSnapShot.forEach((doc) => {
                const data = doc.data()
                if(data.questions){
                    let count = 0
                    for(const questionKey in data.questions){
                        if(data.questions[questionKey]){
                            count++
                        }
                    }
                    if(data.counter !== count){
                        promises.push(articleRef.doc(doc.id).update({counter: count }))
                    }
                }
            })
            Promise.all(promises).then(() => resolve()).catch((err) => reject(err));
        }catch(err){
            reject(err)
        }
    })
}

const _counterPriceBlockFormule = function (placeId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try{
        const formuleRef = db.collection('resto/' + placeId + '/formule')
        const formulesSnapShot = await formuleRef.get();
        const promises: any = [];
        formulesSnapShot.forEach((doc) => {
            const datas = doc.data();
            for (const compositionKey in datas.compositions) {
                const composition = datas.compositions[compositionKey];
                for (const blockKey in composition.blocks) {
                    promises.push(db.runTransaction(async () => {
                        const blocksFiltered = await db.collection('resto/' + placeId + '/price').where('blockId', '==', blockKey).get();
                        if (parseInt(datas.compositions[compositionKey].blocks[blockKey].counter) !== blocksFiltered.size) {
                            const temp = { ...datas};
                            temp.compositions[compositionKey].blocks[blockKey].counter = blocksFiltered.size
                            await formuleRef.doc(doc.id).update(temp)
                            console.log("update counterPriceBlockFormule",doc.id)
                        }
                        await Promise.resolve();
                    }))
                }
            }
        })
        Promise.all(promises).then(() => resolve()).catch((err) => reject(err));
        }catch(err){
            reject(err)
        }
    })
}

const _counterPriceBlockGroup = async function (placeId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try{
        const groupRef = db.collection('resto/' + placeId + '/group')
        const groupsSnapShot = await groupRef.get();
        const promises: any = [];
        groupsSnapShot.forEach( (doc) => {
            const datas = doc.data();
            let _counter = 0;
            for (const blockKey in datas.blocks) {
                _counter++
                const block = datas.blocks[blockKey]
                 promises.push(db.runTransaction(async () => {
                     const blocksFiltered = await db.collection('resto/' + placeId +'/price').where('blockId', '==', block.id).get();
                      if (parseInt(datas.blocks[blockKey].counter) !== blocksFiltered.size) {
                          const temp = {...datas};
                          temp.blocks[blockKey].counter = blocksFiltered.size
                          temp.counter = _counter
                          await groupRef.doc(doc.id).update(temp)
                          console.log("update counterPriceBlockGroup",doc.id)
                      }
                      await Promise.resolve();
                 }).catch(err=>Promise.reject(err)))
            }
        })
        Promise.all(promises).then(() => resolve()).catch((err) => reject(err));
        }catch(err){
            reject(err)
        }
    })
}

const _counterStats = function (placeId: string): Promise<void> {
    return new Promise((resolve, reject) => {
            const promises: any = [];
            ['formule', 'group', 'question', 'article'].forEach( function (item) {
                promises.push(
                  db.runTransaction(async () => {
                  const counterSnapShot = await db.collection('resto/' + placeId + '/'+item).get()
                  if(counterSnapShot && counterSnapShot.size >0){
                      await db.collection('resto/' + placeId + '/stat').doc(item).update({counter: counterSnapShot.size })
                  }
                  await Promise.resolve()
                }).catch(err=>Promise.reject(err)))
            })
            Promise.all(promises).then(() => resolve()).catch(err => reject(err))
    })
}

exports.default = functions
    .region('europe-west1')
    .https.onRequest( (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', 'authorization');
            res.set('Access-Control-Allow-Headers', 'responseType');
            res.status(204).send('');
        } else {
            const placeId = req.query['place-id'] || '' as string;
            _counterReponse(placeId.toString())
              .then(()=> _counterArticleQuestion(placeId.toString()))
              .then(()=> _counterPriceArticle(placeId.toString()))
              .then(()=>_counterPriceBlockFormule(placeId.toString()))
              .then(()=> _counterPriceBlockGroup(placeId.toString()))
              .then(()=>_counterStats(placeId.toString()))
              .then(()=> res.sendStatus(200))
              .catch(()=> res.sendStatus(500))
        }
    });

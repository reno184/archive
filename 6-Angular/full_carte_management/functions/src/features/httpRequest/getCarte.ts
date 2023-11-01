import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
const auth = admin.auth();

exports.default = functions
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        // res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        if (req.method === 'OPTIONS') {
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', 'authorization');
            res.sendStatus(204);
        } else {
            const decotedToken = await auth.verifyIdToken((req.headers && req.headers.authorization) || '');
            if (decotedToken.uid) {

                const placeId = req.query['place-id']

                const groupSnapShot = await db.collection('resto/' + placeId + '/group').get()
                const groupes: any = {}
                groupSnapShot.forEach(doc => groupes[doc.id] = Object.assign({},doc.data(), { type : 'group'}));

                const formulesSnapShot = await db.collection('resto/' + placeId + '/formule').get();
                const formules: any = {}
                formulesSnapShot.forEach(doc => formules[doc.id] = Object.assign({},doc.data(), { type : 'formule'}));

                const articlesSnapShot = await db.collection('resto/' + placeId + '/article').get();
                const articles: any = {}
                articlesSnapShot.forEach(doc => articles[doc.id] = doc.data());

                const questionsSnapShot = await db.collection('resto/' + placeId + '/question').get();

                const questions: any = {}
                questionsSnapShot.forEach((doc) => {
                    questions[doc.id] = doc.data()
                    questions[doc.id].answers = {};
                    questions[doc.id].type ="question"
                });

                    const populateanswer = async () => {
                        for (const key in questions) {
                            const answerSnapShot = await db.collection('resto/' + placeId + '/question').doc(key).collection('answer').get();
                            answerSnapShot.forEach(doc => questions[key].answers[doc.id] =Object.assign({},doc.data(), { type : 'answer'}));
                        }
                    };
                    await populateanswer();

                    for (const articleKey in articles) {
                        const article = articles[articleKey];
                        for (const articleQuestionKey in article.questions) {
                            const articleQuestion = article.questions[articleQuestionKey];
                            for (const questionsKey in questions) {
                                const question = questions[questionsKey]
                                if (question.id === articleQuestion.id) {
                                    articles[articleKey].questions[articleQuestionKey] = question;
                                }
                            }
                        }
                    }

                const priceSnapShot = await db.collection('resto/' + placeId + '/price').get();
                const prices: any = {}
                priceSnapShot.forEach(doc => prices[doc.id] = doc.data());


                for (const priceKey in prices) {
                    if (priceKey.split('_').length === 3)
                        for (const groupeKey in groupes) {
                            groupes[groupeKey].blocks.forEach((block: any, index: number) => {
                                if (groupes[groupeKey].blocks[index].articles === undefined) {
                                    groupes[groupeKey].blocks[index].articles = []
                                }

                                if (block.id === prices[priceKey].blockId) {
                                    if(!!articles[prices[priceKey].articleId]){
                                        const temp = Object.assign(articles[prices[priceKey].articleId], {price: prices[priceKey].price, type : 'article'})
                                        groupes[groupeKey].blocks[index].articles.push(temp)
                                    }else{
                                        console.error(`${prices[priceKey].articleId} not exist in articles list`)
                                    }
                                }
                            });
                        }
                }
                for (const priceKey in prices) {
                    if (priceKey.split('_').length === 4)
                        for (const fKey in formules) {
                            for (const cKey in formules[fKey].compositions) {
                                for (const bKey in formules[fKey].compositions[cKey].blocks) {
                                    if (bKey === prices[priceKey].blockId) {
                                        if (formules[fKey].compositions[cKey].blocks[bKey].articles === undefined) {
                                            formules[fKey].compositions[cKey].blocks[bKey].articles = []
                                        }
                                        if(!!articles[prices[priceKey].articleId]) {
                                            const temp = Object.assign(articles[prices[priceKey].articleId], {
                                                price: prices[priceKey].price,
                                                rank: prices[priceKey].rank,
                                                type : 'article'
                                            })
                                            formules[fKey].compositions[cKey].blocks[bKey].articles.push(temp)
                                        }else{
                                                console.error(`${prices[priceKey].articleId} not exist in articles list`)
                                        }
                                    }
                                }
                            }
                        }
                }

                res.status(200).json({ groupes, formules});

            } else {
                res.status(401).send('decodedtoken invalid')
            }
        }
    });

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore ();
// const auth = admin.auth ();

exports.default = functions
	.region ('europe-west1')
	.https.onRequest (async (req, res) => {
			res.set ('Access-Control-Allow-Origin', '*');
			if (req.method === 'OPTIONS') {
				res.set ('Access-Control-Allow-Methods', 'GET');
				res.set ('Access-Control-Allow-Headers', 'authorization');
				res.sendStatus (204);
			} else {

				const placeId = req.query['place-id'];
				if (placeId) {
					const groupSnapShot = await db.collection ('resto/' + placeId + '/group').get ()
					const alacarte_temp: any = {};
					// permet de récupérer le nom de la group
					groupSnapShot.forEach ((doc: any) => {
						const blocks = doc.data ().blocks;
						for (const blocksKey in blocks) {
							const block = blocks[blocksKey];
							alacarte_temp[block.id] = block.name
						}
					});
					// permet de récupérer le nom de la formules
					const formulesSnapShot = await db.collection ('resto/' + placeId + '/formule').get ();
					const formules_temp: any = {}
					const formulePrice_temp: any = {}
					formulesSnapShot.forEach ((doc: any) => {
						const compositions = doc.data ().compositions;
						for (const compositionKey in compositions) {
							const composition = compositions[compositionKey];
							formulePrice_temp[compositionKey] = { name:  '(' + doc.data ().name + ') '+ composition.name, price: composition.price };
							for (const blocksKey in composition.blocks) {
								const block = composition.blocks[blocksKey];
								formules_temp[block.id] = '(' + doc.data ().name + ') ' + block.name
							}
						}
					});
					// permet de récupérer le nom et le desc
					const articlesSnapShot = await db.collection ('resto/' + placeId + '/article').get ()
					const articles_temp: any = {}
					articlesSnapShot.forEach (doc => {
						articles_temp[doc.id] = {name: doc.data ().name, desc: doc.data ().desc}
					});
					// permet de récupérer le price et rattache les infos
					const priceSnapShot = await db.collection ('resto/' + placeId + '/price').get ()
					const prices_temp:any[] = [];
					priceSnapShot.forEach (doc => {
						const article = doc.data()
						if(articles_temp[article.articleId]){
							prices_temp.push( {
								id: doc.id,
								price: article.price,
								name: articles_temp[article.articleId].name,
								desc: articles_temp[article.articleId].desc,
								parent: formules_temp[article.blockId] || alacarte_temp[article.blockId]
							})
						}else{
							console.log(article.articleId + 'in price, not exist as entity')
						}
					})
					const formulePrice: any[] = []
					for(const key in formulePrice_temp){
						formulePrice.push(Object.assign(formulePrice_temp[key],{ id: key  }))
					}
					res.status (200).json({ articlePrice : prices_temp, formulePrice } )
				} else {
					res.status (404).send('place id no found')
				}
			}
		}
	);

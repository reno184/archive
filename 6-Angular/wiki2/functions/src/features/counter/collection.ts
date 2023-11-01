import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DocumentData} from '@angular/fire/compat/firestore';

const db = admin.firestore();

exports.default = functions.https.onRequest( async (request, response) => {
  const snapShot = await db.collection('wiki').get();

  snapShot.forEach((element) =>{
    const data: DocumentData = element.data();
    if (data.desc) {
      const temp : string[] = (data.desc as string).toLowerCase().split(' ');
      const temp2 : string[] = [];
      for (let i = 0; i < temp.length; i++) {
        if (!temp2.includes(temp[i])) {
          temp2.push(temp[i]);
        }
      }


      temp.forEach((entry) => {
        db.runTransaction(async () => {
          const doc: DocumentData = await db.collection('stats/desc/').doc(entry).get();
          console.log('renaud, entry', doc);
          if (doc.exists) {
            return db.doc('/stats/desc/'+entry).update({counter: admin.firestore.FieldValue.increment(1)});
          } else {
            return db.collection('/stats/desc/').add({counter: 1});
          }
        });
      });
    }
  });
  response.sendStatus(200);
});

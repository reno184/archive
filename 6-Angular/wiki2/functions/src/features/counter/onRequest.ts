import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DocumentData} from '@angular/fire/compat/firestore';

const db = admin.firestore();

type TypeSource = 'grafikart' | 'blogspot' | 'github' | 'youtube'| 'stackoverflow'
interface TypeContent { all :number, notEmpty :number}

exports.default = functions.https.onRequest( async (request, response) => {
  const temp = {
    content: {all: 0, notEmpty: 0} as TypeContent,
    source: {'grafikart': 0, 'blogspot': 0, 'github': 0, 'youtube': 0, 'stackoverflow': 0},
  };


  const snapShot = await db.collection('wiki').get();
  snapShot.forEach((element) =>{
    const data: DocumentData = element.data();
    temp.content.all++;
    if ((data.content as string) !== '') {
      temp.content.notEmpty++;
    }
    for (const [key] of Object.entries(temp.source)) {
      if (data.url && data.url.toLowerCase().indexOf(key)>-1) {
        temp.source[key as TypeSource]++;
      }
    }
  });

  await db.collection('/stats').doc('core').set(temp);

  response.json(temp).status(200);
});

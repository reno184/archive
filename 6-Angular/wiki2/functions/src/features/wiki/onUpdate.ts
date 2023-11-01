import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const db = admin.firestore();
import {DocumentData} from '@angular/fire/compat/firestore';
exports.default = functions
    .region('europe-west1')
    .firestore.document('wiki/{wikiId}')
    .onUpdate(async (change) => {
      const afterElements: string[] = (change.after.data().desc as string).toLowerCase().split(' ');
      const beforeElements: string[] = (change.before.data().desc as string).toLowerCase().split(' ');
      const elementRemoved: string[] = [];
      const elementAdded: string[] = [];

      for (let i = 0; i < afterElements.length; i++) {
        if (!beforeElements.includes(afterElements[i].toLowerCase())) {
          elementRemoved.push(afterElements[i]);
        }
      }
      console.log(elementRemoved);
      for (let i = 0; i < beforeElements.length; i++) {
        if (!afterElements.includes(beforeElements[i].toLowerCase())) {
          elementAdded.push(beforeElements[i]);
        }
      }
      return db.runTransaction(async () => {
        const element: DocumentData = await db.doc('stats/desc').get();
        const clone = {...element.data()};
        for (let i = 0; i < elementAdded.length; i++) {
          clone[elementAdded[i]] = element.data()[elementAdded[i]] as number -1;
        }
        for (let i = 0; i < elementRemoved.length; i++) {
          clone[elementRemoved[i]] = element.data()[elementRemoved[i]] as number +1;
        }
        return db.doc('stats/desc').update(clone);
      });
    });

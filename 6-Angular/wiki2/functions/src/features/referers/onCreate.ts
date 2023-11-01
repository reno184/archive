import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

exports.default = functions.region('europe-west1').firestore
    .document('setting/ref/tag/{tagId}')
    .onCreate(() => {
      const statRef = db.doc('stat/tag');
      statRef.update({
        count: admin.firestore.FieldValue.increment(1),
      }).then(() => {
        return statRef.get();
      });
    });


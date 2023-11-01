const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
const fs = require('fs');
const spawn = require('child-process-promise').spawn;

module.exports = functions.firestore.document('crm_contentFul/lesson/items/{itemId}').onCreate(async (snap, context) => {
    const course = snap.data();
    const bucket = admin.storage().bucket();
    const tempFilePath = path.join(os.tmpdir(), 'tempFile');
    await bucket.file('crm/contentful/' + course.path).download({destination: tempFilePath});
    const thumb_path = tempFilePath + '-thumb';
    const resized_path = tempFilePath + '-resized';
    await spawn('convert', [tempFilePath, '-thumbnail', '20x20', thumb_path])
    await spawn('convert', [tempFilePath, '-thumbnail', '200x200', resized_path]);
    await bucket.upload(thumb_path, {
        destination: `crm/contentful/thumb/${course.path}`,
        metadata: {contentType: 'image/jpeg'}
    });
    await bucket.upload(resized_path, {
        destination: `crm/contentful/resized/${course.path}`,
        metadata: {contentType: 'image/jpeg'}
    });
    fs.unlinkSync(tempFilePath);
    fs.unlinkSync(thumb_path);
    fs.unlinkSync(resized_path);
    return;
});

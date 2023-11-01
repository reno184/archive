const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage()
const prefix = 'crm/contentful/thumb_20x20_'
module.exports = functions.storage.object().onDelete(async (object, context) => {

    const bucket = storage.bucket(object.bucket);
    const srcFilePath = object.name;
    console.log(srcFilePath);// crm/contentful/img_1610649368607
    if (srcFilePath.indexOf('thumb') > -1) {
        return;
    }
    const temp = srcFilePath.split('/')
    await bucket.file('crm/contentful/' + 'thumb_200x200_' + temp[2]).delete();
    await bucket.file('crm/contentful/' + 'thumb_20x20_' + temp[2]).delete();
    return;
});

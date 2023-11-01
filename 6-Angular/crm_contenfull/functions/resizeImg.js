const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
const fs = require('fs');
// permet de lancer des processus en asynchrone un peu comme une requête ajax côté front
const spawn = require('child-process-promise').spawn;

const storage = new Storage()
let counter = 0

module.exports = functions.storage.object().onFinalize(async (object, context) => {
    counter++;
    console.log("trigger from", object.name)
    console.log("counter", counter)
    const prefix = 'thumb_'; // ne pas efacer sinon boucle infinie
    const bucket = storage.bucket(object.bucket);
    const srcFilePath = object.name; // File path in the bucket.
    const fileName = path.basename(srcFilePath);

    // 'srcFilePath' => crm/contentful/img_1610638951200
    //  'srcFilePath' => crm/contentful/thumb_200x200_img_1610638951200
    // 'fileName' =>img_1610638951200

    const tempFilePath = path.join(os.tmpdir(), 'tempFile');
    // 'tempFilePath' => /tmp/tempFile

    const contentType = object.contentType; // File content type.
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
    //'contentType'= > image/jpeg


    if (!contentType.startsWith('image/')) {
        return console.log('This is not an image.');
    }

    // la ligne la plus importante elle évite une boucle infinie après que génère les upload si dessous
    if (fileName.startsWith(prefix)) {
        return console.log('Already a Thumbnail.');
    }

    // if(counter >6){
    //     return console.log('Calls more than 6');
    // }

    await bucket.file(srcFilePath).download({destination: tempFilePath});

    const thumbnail_20_temp_path = tempFilePath + '-20x20'
    const thumbnail_200_temp_path = tempFilePath + '-200'

    // lancement de deux taches async (nodejs spawn = promise) qui font une conversion cela peut prendre du temps.
    // convert est une fonction nodejs qui utilise un lib (interne à node) magicImage,
    // attention -thumbnail est une variable de spawn (ce n'est pas dans le path)
    await spawn('convert', [tempFilePath, '-thumbnail', '20x20', thumbnail_20_temp_path]);
    await spawn('convert', [tempFilePath, '-thumbnail', '200x200', thumbnail_200_temp_path]);

    const t = await bucket.upload(thumbnail_20_temp_path, {
        destination: path.join(path.dirname(srcFilePath), `${prefix}20x20_${fileName}`),
        metadata: {contentType: contentType}
    });
    console.log('renadu', t);

    await bucket.upload(thumbnail_200_temp_path, {
        destination: path.join(path.dirname(srcFilePath), `${prefix}200x200_${fileName}`),
        metadata: {contentType: contentType}
    });
    fs.unlinkSync(tempFilePath);
    fs.unlinkSync(thumbnail_200_temp_path);
    fs.unlinkSync(thumbnail_20_temp_path);
    return;
});

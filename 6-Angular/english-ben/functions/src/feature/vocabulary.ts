import * as express from "express";
import {Router} from "express";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import DocumentData = firestore.DocumentData;

export default function(db: Firestore) {
  const router: Router = express.Router();
  const pathName = "english/vocabulary";

  router.get("/", async function(req, res) {
    const snapshot = await db.collection(pathName).get();
    const t : DocumentData[] = [];
    snapshot.forEach((doc) =>{
      t.push({...doc.data(), id: doc.id});
    });
    res.status(200).json(t);
  });

  router.get("/:id", async function(req, res) {
    const doc = await db.doc(pathName+req.params.id).get();
    res.status(200).json({...doc.data(), id: doc.id});
  });

  router.post("/", async function(req, res) {
    const docRef = await db.collection(pathName).add(JSON.parse(req.body));
    res.status(200).send(docRef.id);
  });

  router.put("/:id", async function(req, res) {
    await db.doc(pathName+req.params.id).set(JSON.parse(req.body));
    res.sendStatus(200);
  });
  return {
    router,
  };
}

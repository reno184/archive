const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Carte:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The book id
 *         price:
 *           type: string
 *           description: The book title
 *         name:
 *           type: string
 *           description: The book author
 *         desc:
 *           type: string
 *           description: The book title
 *         parent:
 *           type: string
 *           description: The book author
 *       example:
 *         name: Bordeaux A.O.C
 *         desc: 37cl
 *         parent: Vins rouges
 *         price: 0
 */

/**
 * @swagger
 * tags:
 *   name: Carte
 *   description: The carte managing API
 */

/**
 * @swagger
 * /carte:
 *   get:
 *     summary: Returns the carte
 *     tags: [Carte]
 *     responses:
 *       200:
 *         description: Returns the carte
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carte'
 *       404:
 *         description: The user order was not found
 */

router.get("/", (req, res) => {
    const carte = req.app.dbCarte.get("carte");
    res.send(carte);
});

module.exports = router;

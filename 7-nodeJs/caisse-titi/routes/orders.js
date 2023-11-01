const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The article ordered title
 *       example:
 *         title: Café décaféiné
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

/**
 * @swagger
 * /basket/users/{uid}/orders:
 *   get:
 *     summary: Returns the list of all the orders for one user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user uid
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

router.get("/users/:uid/orders", (req, res) => {
    const orders = req.app.dbOrder.get("users").find({ uid : parseInt(req.params.uid) }).get('orders');
    res.send(orders);
});

/**
 * @swagger
 * /basket/users/{uid}/orders/{id}:
 *   get:
 *     summary: Get the user order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user uid
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The order by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The user order was not found
 */

router.get("/users/:uid/orders/:id", (req, res) => {
    const order = req.app.dbOrder.get("users").find({ uid: parseInt(req.params.uid) }).get('orders').find({ id: parseInt(req.params.id) }).value();
    if(!order){
        res.sendStatus(404)
    }
    res.send(order);
});


/**
 * @swagger
 * /basket/users/{uid}/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user uid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The user order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 */

router.post("/users/:uid/orders", (req, res) => {
    try {
        const order = {
            id: nanoid(),
            ...req.body,
        };
        const re =req.app.dbOrder.get("users").find({ uid: parseInt(req.params.uid) }).get('orders')
        re.push(order).write();
        res.send(order)
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /basket/users/{uid}/orders/{id}:
 *  put:
 *    summary: Update the order by the id
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: The user uid
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The order id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      200:
 *        description: The order was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      404:
 *        description: The order was not found
 *      500:
 *        description: Some error happened
 */

router.put("/users/:uid/orders/:id", (req, res) => {
    try {
        req.app.dbOrder.get("users").find({ uid: parseInt(req.params.uid) }).get('orders').find({ id: req.params.id }).assign(req.body).write();
        res.send(req.app.dbOrder.get("users").find({ uid: parseInt(req.params.uid) }).get('orders').find({ id: req.params.id }));
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /basket/users/{uid}/orders/{id}:
 *   delete:
 *     summary: Remove the user order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user uid
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The user order was deleted
 *       404:
 *         description: The user order was not found
 */

router.delete("/users/:uid/orders/:id", (req, res) => {
    req.app.dbOrder.get("users").find({ uid: parseInt(req.params.uid) }).get('orders').remove({ id: req.params.id }).write();
    res.sendStatus(200);
});

module.exports = router;

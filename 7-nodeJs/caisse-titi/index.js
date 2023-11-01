const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const fs   = require('fs');
var jwt = require('jsonwebtoken');
var publicKEY  = fs.readFileSync('./publickey.pub', 'utf8');

const PORT = process.env.PORT || 4000;

const FileSync = require("lowdb/adapters/FileSync");

const ordersRouter = require("./routes/orders");
const adapterOrder = new FileSync("dbOrders.json");
const dbOrder = low(adapterOrder);
dbOrder.defaults({ orders: [] }).write();

const booksRouter = require("./routes/books");
const adapterBook = new FileSync("dbBooks.json");
const dbBook = low(adapterBook);
dbBook.defaults({ books: [] }).write();

const carteRouter = require("./routes/carte");
const adapterCarte = new FileSync("dbCarte.json");
const dbCarte = low(adapterCarte);
dbCarte.defaults({ carte: [] }).write();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.get("/test/:uid", (req, res) => {
    const orders = req.app.dbOrder.get("users").find({ uid : parseInt(req.params.uid) }).get('orders');
    res.send(orders);
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.dbOrder = dbOrder;
app.dbBook = dbBook;
app.dbCarte = dbCarte;

app.use(cors());
app.use(express.json()); // parse incoming request to json
app.use(morgan("dev"));// permet de logger sous ce format :method :url :status :response-time ms - :res[content-length]

app.use("/books", booksRouter);
app.use("/basket", ordersRouter);
app.use("/carte", carteRouter);

app.use((req, res, next) => {
    if (req.headers['authorization']) {
        next()
    } else {
        res.status(402).send('headers failed')
    }
});
app.use((req, res, next) => {
    jwt.verify(req.headers['authorization'], publicKEY,  {  },function(err, decoded) {
        if(err){
            res.status(401).send(err.message)
        }else{
            next()
        }
    });
});
app.use("/books-s", booksRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

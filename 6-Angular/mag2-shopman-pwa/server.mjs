import express from 'express';

const app = express();

app.use(express.static('./dist/app1/'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: '/dist/app1/'}),
);

console.log(`Server is running on port: http://localhost:${process.env.PORT || 8080}`);
app.listen(process.env.PORT || 8080);

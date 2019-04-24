const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/api/getSql', (req, res) => {
    let sql = `SELECT * FROM ${req.body.sql}`;
    res.send(sql);
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
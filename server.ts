import { getSql } from "./sqlTranslator";

const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/getSql', (req, res) => {
    let sql = getSql(req.body.conditions);
    res.send(sql);
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
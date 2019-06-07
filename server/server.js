const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./configMensaje');
const PropertiesReader = require('properties-reader');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const prop = PropertiesReader('config.properties');

app.listen(prop.get('server.port'), () => {
    console.log(prop.get('server.message'));
});

app.get("/", function(req, res) {
    res.send('Hola Mundo!');
})

app.post("/api/email", function(req, res) {
    configMensaje(req.body);
    res.send(prop.get('messages.result'));
})
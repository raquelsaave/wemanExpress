"use strict";
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.all('/hello', (request, response) => {
    response.send('hello world!');
});
app.all('/bye', (request, response) => {
    response.send('Bye bye!');
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.listen(port, () => console.log('El servidor esta corriendo'));


// Hacer 3 métodos diferentes con respuesta de status
app.get('/get', (request,response ) => {
    response.status(280).send('Metodo GET');
});
app.patch('/patch', (request,response ) => {
    response.status(418).send({Metodo: "PATCH", Respuesta : "Hola!"});
});
app.delete('/delete', (request,response ) => {
    response.status(404).send('Metodo DELETE . Nada para borrar');
});
//Segundo Ejercicio
//middleware
app.all( '*', (request,response,next ) => {
   console.log("Usuario menganito hizo una peticion a: ", request.path)
    next();
});
app.get('/igual', (request,response ) => {
    response.send("Ya entraste!");
});

app.get('/igual', (request,response ) => {
    response.send("Ya entraste por segunda vez!");
});

app.get('/diferente', (request,response ) => {
    response.send("Asegurate!");
});

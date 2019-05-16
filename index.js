"use strict";
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');


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

// Primer Ejercicio ---------------------------------------------------
// Hacer 3 métodos diferentes con respuesta de status
app.get('/get', (request, response) => {
    response.status(280).send('Metodo GET');
});
app.patch('/patch', (request, response) => {
    response.status(418).send({ Metodo: "PATCH", Respuesta: "Hola!" });
});
app.delete('/delete', (request, response) => {
    response.status(404).send('Metodo DELETE . Nada para borrar');
});
// Segundo Ejercicio --------------------------------------------------
// Middleware
app.all('*', (request, response, next) => {
    console.log("Usuario menganito hizo una peticion a: ", request.path)
    next();
});
app.get('/igual', (request, response) => {
    response.send("Ya entraste!");
});

app.get('/igual', (request, response) => {
    response.send("Ya entraste por segunda vez!");
});

app.get('/diferente', (request, response) => {
    response.send("Asegurate!");
});
// Tercer Ejercicio --------------------------------------------------

let usuarios = [];

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/body', (request, response) => {
    console.log(request.body);
    response.send(request.body);
});

app.get('/cookie', (request, response) => {
    console.log(request.cookies);
    response.send(request.cookies);
});

app.get('/usuarios', (request, response) => {
    response.status(200).send({ Lista: usuarios });
});

app.post('/usuarios', (request, response) => {
    if (request.body.usuario && request.body.contra) {
        usuarios.push(request.body);
        response.status(201).send("Usuario agregado!");
    } else {
        response.status(400).send({ error: ' El usuario no se agrego! , Intentalo de nuevo ( Revisa los nombres )' });
    }
});

// Cuarto Ejercicio --------------------------------------------------

//endpoint de autorizacion
const privateKey = "yaestalisto";


app.post('/auth/signin', (request, response) => {
    if (!(request.body.user && request.body.pass)) {
        response.status(400).send("Se necesita usuario y contraseña!")
    } else {

        jwt.sign({ user: request.body.user, theme: 'black' }, privateKey, function (err, token) {
            if (err) {
                response.send(500).end();
            } else {
                response.status(200).send({ token: token })
            }
        });
    }
});

//middleware
app.use((request, response, next) => {
    jwt.verify(request.headers.authorization, privateKey, function (err, decoded) {
        if (err) {
            response.status(500).end('uuuuuuyyyyyy somethings wrong')
        } else {
            console.log(decoded)
            // checar ese usuario en la base datos a ver si existe
            next();
        }
    });
});

//otro endpoint
app.get('/fin', (request, response) => {
    response.send("¡Acabaste! Felicidades!");
});

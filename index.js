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

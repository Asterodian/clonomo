const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware for CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// Middleware for parsing URL-encoded and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Middleware for logging methods and URLs
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Serving static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint POST for '/player/login/dashboard'
app.post('/player/login/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

// Endpoint POST for '/player/growid/login/validate'
app.post('/player/growid/login/validate', (req, res) => {
    // Extracting data from the request body
    const _token = req.body._token;
    const growId = req.body.growId;
    const password = req.body.password;

    // Clear the token
    res.send(
        `{"status":"success","message":"Account Validated.","token":"","url":"","accountType":"growtopia"}`
    );
});

// Endpoint POST for '/player/validate/close'
app.post('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

// Endpoint GET for root
app.get('/', function (req, res) {
    res.send('ClonePS 200 Connection');
});

// Endpoint GET for '/player/login/dashboard'
app.get('/player/login/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

// Endpoint GET for '/player/growid/login/validate'
app.get('/player/growid/login/validate', (req, res) => {
    // Responding to GET request with empty token
    res.send(
        `{"status":"success","message":"Account Validated.","token":"","url":"","accountType":"growtopia"}`
    );
});

// Endpoint GET for '/player/validate/close'
app.get('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

// Endpoint to serve 'hosts/preview.html' as '/hosts'
app.get('/hosts', (req, res) => {
    res.sendFile(path.join(__dirname, 'hosts', 'preview.html'));
});

// Start the server on port 5000
app.listen(5000, function () {
    console.log('Listening on port 5000');
});

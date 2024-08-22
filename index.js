const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware untuk CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// Middleware untuk parsing URL-encoded dan JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Middleware untuk logging metode dan URL
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Endpoint POST untuk '/player/login/dashboard'
app.post('/player/login/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

// Endpoint POST untuk '/player/growid/login/validate'
app.post('/player/growid/login/validate', (req, res) => {
    // Extracting data from the request body
    const _token = req.body._token;
    const growId = req.body.growId;
    const password = req.body.password;

    // Kosongkan token
    const token = Buffer.from(
        `_token=&growId=${growId}&password=${password}`
    ).toString('base64');

    res.send(
        `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`
    );
});

// Endpoint POST untuk '/player/validate/close'
app.post('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

// Endpoint GET untuk root
app.get('/', function (req, res) {
    res.send('ClonePS 200 Connection');
});

// Endpoint GET untuk '/player/login/dashboard'
app.get('/player/login/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

// Endpoint GET untuk '/player/growid/login/validate'
app.get('/player/growid/login/validate', (req, res) => {
    // Menanggapi permintaan GET dengan token kosong
    const _token = '';
    const growId = '';
    const password = '';

    const token = Buffer.from(
        `_token=${_token}&growId=${growId}&password=${password}`
    ).toString('base64');

    res.send(
        `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`
    );
});

// Endpoint GET untuk '/player/validate/close'
app.get('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

// Menjalankan server pada port 5000
app.listen(5000, function () {
    console.log('Listening on port 5000');
});

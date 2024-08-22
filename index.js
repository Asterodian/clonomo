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

// Middleware untuk parsing URL-encoded body
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk logging
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Middleware untuk parsing JSON body
app.use(express.json());

// Route untuk '/player/login/dashboard'
app.post('/player/login/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

// Route untuk '/player/growid/login/validate'
app.post('/player/growid/login/validate', (req, res) => {
    // Extracting data from the request body
    const _token = req.body._token;
    const growId = req.body.growId;
    const password = req.body.password;

    // Menghasilkan token kosong
    const token = Buffer.from(
        `_token=&growId=${growId}&password=${password}`,
    ).toString('base64');

    res.send(
        `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`
    );
});

// Route untuk '/player/validate/close'
app.post('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

// Route untuk '/'
app.get('/', function (req, res) {
    res.send('ClonePS 200 Connection');
});

// Mendengarkan pada port 5000
app.listen(5000, function () {
    console.log('Listening on port 5000');
});

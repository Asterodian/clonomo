const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

// Using compression middleware
app.use(compression({
    level: 9,
    threshold: 0,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));
app.set('trust proxy', 1);

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
app.all('/player/login/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

// Endpoint POST for '/player/growid/login/validate'
app.post('/player/growid/login/validate', (req, res) => {
    res.send(
        `{"status":"success","message":"Account Validated.","token":"","url":"","accountType":"growtopia"}`
    );
});

// Endpoint POST for '/player/validate/close'
app.all('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

// Endpoint GET for root
app.get('/', function (req, res) {
    res.send('ClonePS 200 Connection');
});

// Start the server on port 5000
app.listen(5000, function () {
    console.log('Listening on port 5000');
});

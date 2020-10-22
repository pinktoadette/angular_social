//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials","true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header(
        'Access-Control-Expose-Headers', 'X-Access-Token, x-refresh-token'
    );
    next();
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
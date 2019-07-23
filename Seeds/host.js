var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    app = express();

//get port from arguments
try {
    var port = getPort(process.argv);
    startServer(port);
} catch (err) {
    console.log(err.message);
}

//start server
function startServer(port) {
    app.use('/scripts', express.static(__dirname + '/node_modules/'));
    app.use(express.static('app'));

    app.listen(port);
    console.log('Listening on port %d...', port);
}

//parse port from arguments
function getPort(args) {
    if (args.length < 3) {
        throw new Error("Please set a port for the server");
    } else {
        var port = args[2];
        if (isNaN(port)) {
            throw new Error("Invalid port - Not a number");
        }
        return parseInt(port);
    }
}
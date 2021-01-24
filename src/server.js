const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./util/jwt');
const errorHandler = require('./util/error-handler');
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// setup server socket
const socket = require('./sockets')(http);

// Register API routes
const router = require('./routes');
app.use('/', router);

// global error handler
app.use(errorHandler);

// start server
const port = config.port;
const server = http.listen(port, function () {
    console.log('Server listening on port ' + port);
});

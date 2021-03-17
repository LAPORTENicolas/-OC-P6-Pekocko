const http  = require('http');
const app   = require('./app');

app.set('port', 3000 || process.env.PORT);
server      = http.createServer(app);

server.listen(3000 || process.env.PORT);
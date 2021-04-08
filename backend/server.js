const http          = require('http');
const app           = require('./app');

const getPort       = port => {
    const portInt   = parseInt(port, 10);

    if (isNaN(portInt)){
        return port;
    } else if (portInt >= 0){
        return portInt;
    }
    return false;
};

const port          = getPort(process.env.PORT || 3000);
app.set('port', port);

const gestionErreur = err => {
    if (err.syscall !== 'listen'){
        throw err;
    }
    const adresse   = server.address();
    const bind      = typeof adresse === 'string' ? 'pipe' + adresse : 'port: ' + port;
    switch (err.code){
        case 'EACCES':
            console.error(bind, ' Manque de privilèges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind, ' Port déjà utilisé');
            process.exit(1);
            break;
        default:
            throw err;
    }
}

const server        = http.createServer(app);

server.on('error', gestionErreur);
server.on('listening', () => {
    const adresse   = server.address();
    const bind  = typeof adresse === 'string' ? 'pipe ' + adresse : ' port ' + port;
    console.info('Serveur lancé ' + bind);
})

server.listen(port);
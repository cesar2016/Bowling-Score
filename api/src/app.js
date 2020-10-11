const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

const { Client } = require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

///////// HARDCOD CLIENTES //////

server.post('/registerhd', (req, res) => {

const client1 = {
  name: 'Cesar',
  lastname: "Sanchez",
  password: 1234
}

Client.create(client1)

  const client2 = {
    name: 'Facundo',
    lastname: "Sadava",
    password: 1234
  }
  
Client.create(client2)

const client3 = {
  name: 'Alex',
  lastname: "Velazquez",
  password: 1234
}

Client.create(client3)

  const client4 = {
    name: 'Leonel',
    lastname: "Messi",
    password: 1234
  }
  
Client.create(client4)

const client5 = {
  name: 'Sergio',
  lastname: "Aguero",
  password: 1234
}

Client.create(client5)

  const client6 = {
    name: 'Diego',
    lastname: "Acosta",
    password: 1234
  }
  
Client.create(client6)

const client7 = {
  name: 'Andrea',
  lastname: "Anderson",
  password: 1234
}

Client.create(client7)

  const client8 = {
    name: 'Carola',
    lastname: "Bianco",
    password: 1234
  }
  
Client.create(client8)



   
})




module.exports = server;


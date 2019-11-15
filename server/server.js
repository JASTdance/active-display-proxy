require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rp = require('request-promise');
var proxy = require('http-proxy-middleware');

const app = express();
const port = 3059;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use('/api/song/:id/comments', proxy({ target: 'http://ec2-13-56-194-113.us-west-1.compute.amazonaws.com/' }));

app.use('/song/:id', proxy({ target: 'http://ec2-18-222-200-230.us-east-2.compute.amazonaws.com/' }));

app.use('/songs/:id', proxy({ target: 'http://ec2-34-208-139-238.us-west-2.compute.amazonaws.com'}));

app.use('/related_tracks/:id', proxy({ target: 'http://ec2-35-162-104-81.us-west-2.compute.amazonaws.com/' }));

app.get('/', (_, response) => {
  response.send(express.static(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log('Proxy server is up and running on port', port);
});

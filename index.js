const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./config/routes');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { port, dbURI } = require('./config/environment');
const customResponses = require('./lib/customResponses');

const app = express();

mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(customResponses);

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));


app.listen(port, () => console.log(`Express has started on port: ${port}`));

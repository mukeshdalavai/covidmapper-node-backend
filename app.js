const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const service = require('./service');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/', service.router);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port} ....`));

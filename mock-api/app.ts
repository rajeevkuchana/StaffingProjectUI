const express = require('express');
const apiMocker = require('connect-api-mocker');
const path = require('path');
var cors = require('cors')

const port = 9001;
const app = express();
 
app.use(cors())

 app.use('/api', apiMocker('mock-api'));
//app.use('/api', apiMocker(path.resolve('./mock-api')));

 
console.log(`Mock API Server is up and running at: http://localhost:${port}`);
app.listen(port);
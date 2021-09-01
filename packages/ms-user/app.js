const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const dbConfig = require('./config/database.config')
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const logger = require('logger/')

mongoose.Promise = global.Promise

dotEnv.config()

const app = express()

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    logger.info('Successfully connected to the database');
}).catch(reason => {
    logger.error('Cannot connect to database: ' + reason);
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get(process.env.ROOT_PATH, (req, res) => {
    res.json({message: 'This is a microservice about user!'})
})

require('./app/src/components/account/account.route')(app);


app.listen(process.env.PORT, () => {
    logger.info('Server is listening on port: ' + process.env.PORT);
});
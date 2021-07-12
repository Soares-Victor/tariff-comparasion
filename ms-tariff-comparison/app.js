const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const dbConfig = require('./config/database.config')
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

mongoose.Promise = global.Promise

dotEnv.config()

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database')
}).catch(reason => {
    console.log('Cannot connect to database: ' + reason);
    process.exit();
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get(process.env.ROOT_PATH, (req, res) => {
    res.json({message: 'This is a microservice about tariff comparison!'})
})

require('./app/src/components/costs/costs.route')(app);
require('./app/src/components/products/product.route')(app);


app.listen(process.env.PORT, () => {
    console.log('Server is listening on port: ' + process.env.PORT);
});
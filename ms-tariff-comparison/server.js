const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const dbConfig = require('./app/src/config/database.config')
const mongoose = require('mongoose')
const constants = require('./app/src/utils/constants')

mongoose.Promise = global.Promise

dotEnv.config()

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(constants.mongoDbConnected)
}).catch(reason => {
    console.log(constants.cannotConnectToDatabase + reason);
    process.exit();
})


app.get(process.env.ROOT_PATH, (req, res) => {
    res.json({message: constants.aboutTariffComparison})
})

require('./app/src/routes/costs.route')(app);
require('./app/src/routes/product.route')(app);


app.listen(process.env.PORT, () => {
    console.log(constants.serverIsListeningOnPort + process.env.PORT);
});
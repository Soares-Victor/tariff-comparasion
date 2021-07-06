import 'reflect-metadata'
import 'graphql-import-node';
import dotenv from "dotenv";
import express from "express"
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import schema from './graphql/app.module';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import { createLightship } from 'lightship';
import log from './logger/log';
import helmet from 'helmet';
import bodyParser from 'body-parser'

// initialize configuration
dotenv.config();
const nodeEnv = process.env.NODE_ENV;
const port = process.env.SERVER_PORT;
const path = process.env.CONTEXT_PATH;
const managementPort = process.env.MANAGEMENT_PORT;

// setup express

const app = express();
app.use('*', cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser({limit: '900mb'}));
app.use(bodyParser.json({limit: '900mb'}));
app.use(express.json({limit: '900mb'}));
app.use(bodyParser.urlencoded({ limit: '900mb', extended: true, parameterLimit: 90000000 }));

export let TOKEN_HEADER;

// setup apollo server
const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    context: ({ req }) => {
        this.TOKEN_HEADER = req.headers.authorization;
        // get token from http headers
        let user;
        if (req.headers && req.headers.authentication) {
            const token = req.headers.authentication[0].split(' ')[1] || '';
            user = getUser(token);
        }

        return { user }
    },
    cacheControl: true,
    plugins: [responseCachePlugin()],
    tracing: true,
});
server.applyMiddleware({ app, path });

// setup lightship
const lightship = createLightship({
    detectKubernetes: false,
    port: managementPort
});
lightship.registerShutdownHandler(() => {
    httpServer.close();
});

// start http server
const httpServer = createServer(app);
httpServer.listen(port, () => {
    log.info('Using Node Environment %s', nodeEnv);
    log.info('Probe listening on port %d', lightship.server.address().port);
    log.info('Listening on port %d at context %s', port, path);
    if (nodeEnv !== 'production') {
        log.info('GET /bff-common/graphql')
    }
    lightship.signalReady();
});

function getUser(token) {
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    return {
        username: credentials.split(':')[0],
        roles: ['ADMIN'] // mock
    }
}

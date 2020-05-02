import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import cors from 'cors';
import compression from 'compression';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash.merge';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import { Context } from './type';
require('dotenv');

import Diocese from 'diocese/typeDefs';
// import dioceseResolvers from 'diocese/resolvers';
import Provinces from 'provinces/typeDefs';
import provincesResolvers from 'provinces/resolvers';
import Maisons from 'maisons/typeDefs';
import maisonsResolvers from 'maisons/resolvers';

const prisma = new PrismaClient();

async function main() {
    const schema = makeExecutableSchema({
        typeDefs: [Diocese, Provinces, Maisons],
        resolvers: merge(provincesResolvers, maisonsResolvers),
    });

    const server = new ApolloServer({
        validationRules: [depthLimit(7)],
        schema,
        context: async ({ req }): Promise<Context> => {
            let authToken = null;
            let currentUser = null;
            try {
                authToken = req.headers['authorization'];

                // if (authToken) {
                //     currentUser = await tradeTokenForUser(authToken, db);
                // }
            } catch (e) {
                console.log(`Unable to authenticate: ${authToken}`, e);
            }
            return { currentUser, prisma };
        },
    });

    const app = express();
    app.use('*', cors());
    app.use(compression());
    app.use(helmet());
    app.disable('x-powered-by');
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.disconnect();
    });

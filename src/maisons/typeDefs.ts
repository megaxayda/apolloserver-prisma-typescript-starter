const { gql } = require('apollo-server-express');

export default gql`
    type Maisons {
        N__MAISON: String
        NOM_MAISON: String
        VILLE: String
        dioc_ses: Diocese
        provinces: provinces
    }

    extend type Query {
        getMaison(N__MAISON: String): Maisons
        getMaisons(filter: String, offset: Int!, limit: Int!): [Maisons]
    }
`;

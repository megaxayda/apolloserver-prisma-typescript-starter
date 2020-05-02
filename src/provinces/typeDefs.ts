const { gql } = require('apollo-server-express');

export default gql`
    type provinces {
        N__PCE: Int
        NOM_PROVINCE: String
    }

    type Query {
        getProvince(N__PCE: Int!): provinces
        getProvinces(filter: String, offset: Int!, limit: Int!): [provinces]
    }
`;

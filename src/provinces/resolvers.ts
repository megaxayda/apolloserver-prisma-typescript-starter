import { IResolvers } from 'graphql-tools';
import { Context } from 'type';

const resolvers: IResolvers = {
    Query: {
        getProvince: async (_, { N__PCE }, { prisma }: Context) => {
            return await prisma.provinces.findOne({ where: { N__PCE } });
        },
        getProvinces: async (_, { filter = '', offset = 0, limit = 1 }, { prisma }: Context) => {
            //use raw to search case-insensitive
            return await prisma.raw(
                `SELECT provinces."N° PCE" as "N__PCE", provinces."NOM PROVINCE" as "NOM_PROVINCE"
                FROM provinces 
                where "NOM PROVINCE" ilike '%${filter}%' OFFSET ${offset} LIMIT ${limit}`,
            );
        },
    },
};

export default resolvers;

import { IResolvers } from 'graphql-tools';
import { Context } from 'type';

const resolvers: IResolvers = {
    Query: {
        getMaison: async (_, { N__MAISON }, { prisma }: Context) => {
            return await prisma.maisons.findOne({
                select: { N__MAISON: true, NOM_MAISON: true, VILLE: true, dioc_ses: true },
                where: { N__MAISON: N__MAISON },
            });
        },
        getMaisons: async (_, { filter = '', offset = 0, limit = 1 }, { prisma }: Context) => {
            //use raw to search case-insensitive
            return await prisma.raw(
                `SELECT maisons."N° MAISON" as "N__MAISON", maisons."NOM MAISON" as "NOM_MAISON", maisons."VILLE"
                FROM maisons
                where "NOM MAISON" ilike '%${filter}%' OFFSET ${offset} LIMIT ${limit}`,
            );
        },
    },
};

export default resolvers;

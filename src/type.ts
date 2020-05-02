import { PrismaClient } from '@prisma/client';

interface CurrentUser {
    id: string;
}

export interface Context {
    currentUser: null | CurrentUser;
    prisma: PrismaClient<{}>;
}

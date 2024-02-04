import { serial, text, pgTable, pgSchema, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as z from 'zod'


export const chainsTable=pgTable("chains",{
    chainId:text('chainid').primaryKey().unique().notNull(),
    name:text("name").notNull().unique(),
    type:text("type").notNull(),
    rpcurl:text('rpcurl').notNull(),
    isActive:boolean('isactive').default(false).notNull()
})


export const Z_SELECT_ChainType = createSelectSchema(chainsTable);
export const Z_INSERT_ChainType = createInsertSchema(chainsTable);

export type Type_SELECT_ChainType = z.infer<typeof Z_SELECT_ChainType>;
export type Type_INSERT_ChainType = z.infer<typeof Z_INSERT_ChainType>;

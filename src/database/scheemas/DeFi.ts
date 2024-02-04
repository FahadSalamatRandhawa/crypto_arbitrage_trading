import { serial, text, pgTable, pgSchema, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { chainsTable } from "./chains";
import * as z from 'zod'

export const DefiTable=pgTable("defi",{
    serial:serial("serial"),
    name:text("name").notNull(),
    contractAddress:text("contractaddress").primaryKey().unique(),
    loanFunctionSignature:text('loanfunctionsignature').notNull(),
    isActive:boolean("isactive").default(true).notNull(),
    chain:text('chain').notNull().references(()=>chainsTable.chainId),
})

export const Z_INSERT_DefiType=createInsertSchema(DefiTable);
export const Z_SELECT_DefiType=createSelectSchema(DefiTable)

export type Type_INSERT_DefiType=z.infer<typeof Z_INSERT_DefiType>
export type Type_SELECT_DefiType=z.infer<typeof Z_SELECT_DefiType>
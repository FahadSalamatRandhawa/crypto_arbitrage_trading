import { serial, text, pgTable, pgSchema, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as z from 'zod'
import { chainsTable } from "./chains";


export const TokensTable=pgTable("tokens",{
    '#':serial("#"),
    address:text("address").primaryKey().unique(),
    name:text("name").notNull(),
    symbol:text("symbol").notNull(),
    isActive:boolean("isactive").notNull(),
    currencyType:text("currencytype").notNull(),
    chain:text("chain").notNull().references(()=>chainsTable.chainId),
})

export const Z_SELECT_TokenType=createSelectSchema(TokensTable)
export const Z_INSERT_TokenType=createInsertSchema(TokensTable)

export type Type_SELECT_TokenType=z.infer<typeof Z_SELECT_TokenType>
export type Type_INSERT_TokenType=z.infer<typeof Z_INSERT_TokenType>

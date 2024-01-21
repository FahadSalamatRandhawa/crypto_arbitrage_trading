import { serial, text, pgTable, pgSchema, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as z from 'zod'

export const TokensTable=pgTable("tokens_table",{
    '#':serial("#"),
    address:text("address").primaryKey().unique(),
    name:text("name").notNull(),
    symbol:text("symbol").notNull(),
    isActive:boolean("isActive").notNull(),
    currencyType:text("currencyType").notNull()
})

// export type INSERT_TokenType= InferInsertModel<typeof TokensTable>
// export type SELECT_TokenType=InferSelectModel<typeof TokensTable>

export const Z_SELECT_TokenType=createSelectSchema(TokensTable)
export const Z_INSERT_TokenType=createInsertSchema(TokensTable)

export type Type_SELECT_TokenType=z.infer<typeof Z_SELECT_TokenType>
export type Type_INSERT_TokenType=z.infer<typeof Z_INSERT_TokenType>

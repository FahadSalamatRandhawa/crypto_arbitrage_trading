import { serial, text, pgTable, pgSchema, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

const DefiTable=pgTable("tokens_table",{
    serial:serial("serial"),
    contract_address:text("contract_address").primaryKey(),
    name:text("name").notNull(),
    isActive:boolean("is_active").default(true)
})

export const INSERT_DefiType=createInsertSchema(DefiTable);
export const SELECT_DefiType=createSelectSchema(DefiTable)
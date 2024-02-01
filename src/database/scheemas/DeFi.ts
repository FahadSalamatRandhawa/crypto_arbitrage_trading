import { serial, text, pgTable, pgSchema, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { chainsTable } from "./chains";

export const DefiTable=pgTable("defi_table",{
    serial:serial("serial"),
    name:text("name").notNull(),
    contract_address:text("contract_address").primaryKey(),
    isActive:boolean("is_active").default(true),
    chain:text('chain').notNull().references(()=>chainsTable.name),
})

export const INSERT_DefiType=createInsertSchema(DefiTable);
export const SELECT_DefiType=createSelectSchema(DefiTable)
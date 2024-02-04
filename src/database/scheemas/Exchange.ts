import { text, boolean, pgTable, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as z from 'zod';
import { chainsTable } from "./chains";
import { relations } from "drizzle-orm";

export const ExchangeTable = pgTable("exchange_table", {
    name: text("name").notNull(),
    factoryContractAddress: text('factorycontractaddress').primaryKey().notNull(),
    getPairsFunctionSignature: text('factorypairsfunctionsignature').notNull(),
    additionalPairParameters: text('additionalpairparameters').notNull(),

    isActive: boolean('isactive').notNull(),

    getTokenReservesFunctionSignature: text('gettokenreservesfunctionsignature').notNull(),
    additionalTokenReserveParameters: text('additionaltokenreserveparameters').notNull(),

    pairSwapFunctionSignature: text('pairswapfunctionsignature').notNull(),
    pairSwapAdditionalParameters: text('pairswapadditionalparameters').notNull(),

    chain_id: text("chain_id").notNull().references(()=>chainsTable.chainId),
});


export const Z_SELECT_ExchangeType = createSelectSchema(ExchangeTable);
export const Z_INSERT_ExchangeType = createInsertSchema(ExchangeTable);

export type Type_SELECT_ExchangeType = z.infer<typeof Z_SELECT_ExchangeType>;
export type Type_INSERT_ExchangeType = z.infer<typeof Z_INSERT_ExchangeType>;


export const chainsRelations = relations(chainsTable, ({ many }) => ({
    exchanges: many(ExchangeTable),
  }));

export const exchangeRelations = relations(ExchangeTable, ({ one }) => ({
    chain: one(chainsTable, {
        fields: [ExchangeTable.chain_id],
        references: [chainsTable.chainId],
    }),
}));
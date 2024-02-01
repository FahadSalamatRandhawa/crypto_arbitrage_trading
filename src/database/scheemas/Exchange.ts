import { text, boolean, pgTable, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as z from 'zod';
import { chainsTable } from "./chains";
import { relations } from "drizzle-orm";

export const ExchangeTable = pgTable("exchange_table", {
    name: text("name").notNull(),
    factoryContractAddress:text('factoryContractAddress').primaryKey().notNull(),
    factoryContractABI: text("factoryContractABI").notNull(),

    getPairFunction: text("getPairFunction").notNull(),
    additionalPairParameters:text('additionalPairParameters').notNull(),
    isActive: boolean("isActive").notNull(),

    tokenPairContractABI: text("tokenPairContractABI").notNull(),
    getTokenReservesFunction: text("getTokenReservesFunction").notNull(),
    additionalTokenReserveParameters:text('additionalTokenReserveParameters').notNull(),
    pairSwapFunction:text('pairSwapFunction').notNull(),
    pairSwapAdditionalParameters:text('pairSwapAdditionalParameters').notNull(),
    pairSwapFunctionSignature:text('pairSwapFunctionSignature').notNull(),

    chain_id: integer("chain_id").notNull().references(()=>chainsTable.chainId),
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
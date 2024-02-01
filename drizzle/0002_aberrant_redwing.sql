CREATE TABLE IF NOT EXISTS "chains" (
	"id" text NOT NULL,
	"name" text NOT NULL,
	"type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens_table" (
	"#" serial NOT NULL,
	"address" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"symbol" text NOT NULL,
	"isActive" boolean NOT NULL,
	"currencyType" text NOT NULL,
	"chain" text NOT NULL,
	CONSTRAINT "tokens_table_address_unique" UNIQUE("address")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exchange_table" (
	"name" text NOT NULL,
	"factoryContractAddress" text PRIMARY KEY NOT NULL,
	"factoryContractABI" text NOT NULL,
	"getPairFunction" text NOT NULL,
	"additionalPairParameters" text NOT NULL,
	"isActive" boolean NOT NULL,
	"tokenPairContractABI" text NOT NULL,
	"getTokenReservesFunction" text NOT NULL,
	"additionalTokenReserveParameters" text NOT NULL,
	"chain" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "defi_table" (
	"serial" serial NOT NULL,
	"name" text NOT NULL,
	"contract_address" text PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true,
	"chain" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokens_table" ADD CONSTRAINT "tokens_table_chain_chains_name_fk" FOREIGN KEY ("chain") REFERENCES "public"."chains"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exchange_table" ADD CONSTRAINT "exchange_table_chain_chains_name_fk" FOREIGN KEY ("chain") REFERENCES "public"."chains"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "defi_table" ADD CONSTRAINT "defi_table_chain_chains_name_fk" FOREIGN KEY ("chain") REFERENCES "public"."chains"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

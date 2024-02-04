import { db } from "@/database/connection";
import { ExchangeTable } from "@/database/scheemas/Exchange";
import { TokensTable } from "@/database/scheemas/Tokens";
import { chainsTable } from "@/database/scheemas/chains";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        console.log("groupByChain GET API")
        const allData = await db.select().from(chainsTable).innerJoin(ExchangeTable, eq(chainsTable.chainId, ExchangeTable.chain_id)).innerJoin(TokensTable, eq(chainsTable.chainId,TokensTable.chain));
        console.log("Group by API",allData)
        return NextResponse.json({sucess:true,message:'List fetched',data:allData})
    }catch(err){
        console.log(err)
        return NextResponse.json({sucess:false,message:'Faced an error'},{status:500})
    }
    
}
import { db } from "@/database/connection";
import { ExchangeTable, Z_INSERT_ExchangeType } from "@/database/scheemas/Exchange";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    console.log("Exchanges GET API")
    try{
        const Exchanges=await db.select().from(ExchangeTable);
        console.log(Exchanges)

        return NextResponse.json({success:true,message:"Exchanges fetched",data:Exchanges})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Faced an error while fetching"},{status:500})
    }
}

export async function POST(request:NextRequest){
    console.log("Exchanges POST API")
    try{
        const Exchange=await request.json();
        console.log(Exchange);
        const newExchange=Z_INSERT_ExchangeType.parse(Exchange)
        const insertExchange=await db.insert(ExchangeTable).values(newExchange).onConflictDoNothing().returning();

        return NextResponse.json({success:true,message:"Exchange Added"})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Faced an error while fetching"},{status:500})
    }
}

export async function PUT(request:NextRequest){
    console.log("Exchanges PUT API")
    try{
        const Exchange=await request.json();
        console.log(Exchange);
        const updateExchange=Z_INSERT_ExchangeType.parse(Exchange)
        const insertExchange=await db.update(ExchangeTable).set(updateExchange).where(eq(ExchangeTable.factoryContractAddress,updateExchange.factoryContractAddress)).returning();
        console.log(insertExchange)
        return NextResponse.json({success:true,message:"Exchange updated"})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Faced an error while fetching"},{status:500})
    }
}

export async function DELETE(request:NextRequest){
    console.log("Exchanges DELETE API")
    try{
        const {factoryAddress}=await request.json();
        console.log(factoryAddress);
        const deleteExchange=await db.delete(ExchangeTable).where(eq(ExchangeTable.factoryContractAddress,factoryAddress)).returning();
        console.log(deleteExchange)

        return NextResponse.json({success:true,message:"Exchange deleted"})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Faced an error while fetching"},{status:500})
    }
}
import { db } from "@/database/connection";
import { DefiTable, Z_INSERT_DefiType, Z_SELECT_DefiType } from "@/database/scheemas/DeFi";
import { ExchangeTable, Z_INSERT_ExchangeType } from "@/database/scheemas/Exchange";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    console.log("Defi GET API")
    try{
        const Defi=await db.select().from(DefiTable);
        console.log(Defi)

        return NextResponse.json({success:true,message:"Defi fetched",data:Defi})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Faced an error while fetching"},{status:500})
    }
}

export async function POST(request:NextRequest){
    console.log("Defi POST API")
    try{
        const Exchange=await request.json();
        console.log(Exchange);
        const newDefi=Z_INSERT_DefiType.parse(Exchange)
        const insertDefi=await db.insert(DefiTable).values(newDefi).onConflictDoNothing().returning();

        return NextResponse.json({success:true,message:"Defi Added"})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Faced an error while puting"},{status:500})
    }
}

export async function PUT(request:NextRequest){
    console.log("Defi PUT API")
    try{
        const Exchange=await request.json();
        console.log(Exchange);
        const updateDefi=Z_SELECT_DefiType.parse(Exchange)
        const insertDefi=await db.update(DefiTable).set(updateDefi).where(eq(DefiTable.serial,updateDefi.serial)).returning();
        console.log(insertDefi)
        return NextResponse.json({success:true,message:"Defi updated"})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Faced an error while updating"},{status:500})
    }
}

export async function DELETE(request:NextRequest){
    console.log("Defi DELETE API")
    try{
        const {serial}=await request.json();
        const deleteDefi=await db.delete(DefiTable).where(eq(DefiTable.serial,serial)).returning();
        console.log(deleteDefi)

        return NextResponse.json({success:true,message:"Defi deleted"})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false,message:"Faced an error while deleting"},{status:500})
    }
}
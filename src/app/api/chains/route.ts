import { db } from "@/database/connection";
import { chainsTable } from "@/database/scheemas/chains";
import { NextRequest, NextResponse } from "next/server";
import { Z_INSERT_ChainType } from "@/database/scheemas/chains";
import { eq } from "drizzle-orm";

 

export async function GET(){
    console.log("Running chains GET API")
    try{
        const chains=await db.select().from(chainsTable);

        return NextResponse.json({data:chains,success:true,message:"chain fetched successfully"});
    }catch(e:unknown){
        return NextResponse.json({success:true,message:e},{status:500})
    }
}


export async function POST(request:NextRequest){
    console.log("Running Chains POST API")
    try{
        const newChain=await request.json();
        const myChain=Z_INSERT_ChainType.parse(newChain)
        console.log("Type parsing",myChain )
        
        const inserted=await db.insert(chainsTable).values(myChain).onConflictDoNothing().returning();

        return NextResponse.json({success:true,message:"chain added successfully"});
    }catch(e:unknown){
        console.log(e)
        return NextResponse.json({success:false,message:"An error occurred"},{status:500})
    }
}

export async function PUT(request:NextRequest){
    console.log("Running Chains PUT API")
    try{
        const newChain=await request.json();
        const myChain=Z_INSERT_ChainType.parse(newChain)
        console.log("Type parsing",myChain )
        
        const updated=await db.update(chainsTable).set(myChain).where(eq(chainsTable.chainId,myChain.chainId)).returning();
        console.log(updated)

        return NextResponse.json({success:true,message:"chain updated successfully"});
    }catch(e:unknown){
        console.log(e)
        return NextResponse.json({success:false,message:"An error occurred"},{status:500})
    }
}


export async function DELETE(request:NextRequest){
    console.log("Running Chains DELETE API")
    try{
        const {chainId}=await request.json();
        
        const deleted=await db.delete(chainsTable).where(eq(chainsTable.chainId,chainId)).returning();

        return NextResponse.json({success:true,message:"chain deleted successfully"});
    }catch(e:unknown){
        console.log(e)
        return NextResponse.json({success:false,message:"An error occurred"},{status:500})
    }
}
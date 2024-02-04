import { db } from "@/database/connection";
import { TokensTable, Z_INSERT_TokenType, Z_SELECT_TokenType } from "@/database/scheemas/Tokens";
import { error } from "console";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    console.log("Inside GET Tokens API")
    try{
        const tokens = await db.select().from(TokensTable);
        console.log(tokens)

        return NextResponse.json({data:tokens,message: 'get tokens successful',success: true});
    }catch(err){
        console.log("Faced an error\n",err)
        return new Error("Error in db connection")
//        return NextResponse.json({message:"error occured",success:false},{status:400});
}
}
export async function POST(request:NextRequest) {
    try{
        const data =await request.json()
    //console.log(data)
    const NewToken=Z_INSERT_TokenType.parse(data);
    console.log("Type verified")
    const insertResult=await db.insert(TokensTable).values(NewToken).onConflictDoNothing().returning()
    console.log(insertResult)

    return NextResponse.json({success:true,message:"inserted successfully",data:insertResult})
    }catch(e:unknown){
        console.log(e)
        return NextResponse.json({success:false,message:"Faced an error",error:e},{status:400})
    }
}

export async function PUT(request:NextRequest) {
    try{
        const data =await request.json()

    const NewToken=Z_SELECT_TokenType.parse(data);
    console.log("Type verified",NewToken)
    const updatedResult=await db.update(TokensTable).set(NewToken).where(eq(TokensTable["#"],NewToken["#"])).returning()
    console.log(updatedResult)

    return NextResponse.json({success:true,message:"Updated successfully",data:updatedResult})
    }catch(e:unknown){
        console.log(e)
        return NextResponse.json({success:false,message:"Faced an error",error:e},{status:400})
    }
}


export async function DELETE(request:NextRequest) {
    try{
        const {id} =await request.json()

    const deletedResult=await db.delete(TokensTable).where(eq(TokensTable["#"],id)).returning()
    console.log(deletedResult)

    return NextResponse.json({success:true,message:"DELETED successfully",data:deletedResult})
    }catch(e:unknown){
        console.log(e)
        return NextResponse.json({success:false,message:"Faced an error",error:e},{status:400})
    }
}
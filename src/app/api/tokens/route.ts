import { db } from "@/database/connection";
import { TokensTable, Z_INSERT_TokenType, Z_SELECT_TokenType } from "@/database/scheemas/Tokens";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    console.log("Inside GET Tokens API")
    try{
        const tokens = await db.select().from(TokensTable);

        return NextResponse.json({message: tokens,success: true});
    }catch(err){
        return NextResponse.json({message:"error occured",success:false},{status:400,});
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

    return NextResponse.json({insertResult})
    }catch(e:unknown){
        console.log(e)
        return NextResponse.json({error:e},{status:400})
    }
}
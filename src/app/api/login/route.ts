import { NextRequest, NextResponse } from "next/server";

import * as dotenv from 'dotenv'
import * as jose from 'jose'
import { cookies } from 'next/headers'
dotenv.config()

export async function POST(request:NextRequest){
    try{
        const {username,password}=await request.json()

    
    if(username==process.env.user_name&&password==process.env.password){
        const cookieStore = cookies()
        const secret=new TextEncoder().encode(process.env.SECRET)

        const token=await new jose.SignJWT({password}).setProtectedHeader({alg:"HS256"}).setExpirationTime('2h').sign(secret);
        cookieStore.set("JWT",token,{secure:true});

        return NextResponse.json({success:true,message:"logging you in"})
    }
    return NextResponse.json({success:false,message:"wrong credentials"})
    }catch(e:unknown){
        console.log(e)
        return NextResponse.json({success:false,message:JSON.stringify(e as any)})
    }
}
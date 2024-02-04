import { NextRequest, NextResponse } from "next/server";

import * as dotenv from 'dotenv'
import * as jose from 'jose'
import { cookies } from 'next/headers'


export async function POST(req:NextRequest,response:NextResponse){
    console.log("logout api")
    try{

        const cookieStore = cookies()
        const JWT=cookieStore.has("JWT")
       
            const JWT_Token=cookieStore.get("JWT")?.value;
            //console.log("Fetched JWT for matching", JWT_Token)
            const secret=new TextEncoder().encode(process.env.SECRET)
            const verified=JWT && await jose.jwtVerify(JWT_Token!,secret)
            if(verified){
                //console.log("Inside verified")
                return NextResponse.next();
            }

        response.cookies.delete("JWT")
        response=NextResponse.redirect(new URL("/",req.url)) ; 
        
        return response
       
    }catch(e:unknown){
        console.log("in error")
        const response=NextResponse.redirect(new URL("/",req.url));
        response.cookies.delete("JWT")
        return response
    }
}
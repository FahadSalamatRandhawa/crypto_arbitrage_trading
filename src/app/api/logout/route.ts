import { NextRequest, NextResponse } from "next/server";

import * as dotenv from 'dotenv'
import * as jose from 'jose'
import { cookies } from 'next/headers'


export async function POST(req:NextRequest,response:NextResponse){
    console.log("logout api")
    try{

        const cookieStore = cookies()
        const JWT=cookieStore.has("JWT")

        
        if(JWT){
            const JWT_Token=cookieStore.get("JWT")?.value;
            console.log("JWT ", JWT_Token)  
            response.cookies.delete("JWT")
        }

        console.log("Logging out")
        response=NextResponse.redirect(new URL("/",req.url)) ; 
        
        return response
       
    }catch(e:unknown){
        console.log("in error")
        console.log(e)
        const response=NextResponse.redirect(new URL("/",req.url));
        const cookieStore = cookies()
        const JWT=cookieStore.has("JWT")
        if(JWT){
            response.cookies.delete("JWT")
        }
        return response
    }
}
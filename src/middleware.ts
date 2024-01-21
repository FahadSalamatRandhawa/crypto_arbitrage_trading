import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import * as jose from 'jose'

export async function middleware(req:NextRequest,response:NextResponse){
    try{

        const cookieStore = cookies()
        const JWT=cookieStore.has("JWT")
        //console.log("Middleware running --- ")
       
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

export const config = {
    matcher: '/dashboard/:path*',
  }
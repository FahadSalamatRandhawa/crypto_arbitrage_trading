"use client"
import Link from "next/link";
import {ethers} from 'ethers'
import { DummyData, Ethereum_Tokens } from "@/TestingDataSet";
import { useState } from "react";

declare global {
    interface Window {
      ethereum: any // or a more specific type
    }
  }
  


export default  function DashBoard(){
    const [isRunning,setIsRunning] =useState(false)
    console.log(typeof window)
    // if(typeof window!='undefined'){
        
    //     const provider=new ethers.BrowserProvider(window.ethereum)

    //     console.log(DummyData)

    //     //Loop chains
    //     for (const [key, defiExchanges] of Object.entries(DummyData)) {
    //         let pairPrice=0;
    //         console.log('Chain : ',key)
    //         //Loop tokens for each chain
    //         for(let i=0;i<Ethereum_Tokens.length-1;i++){
                
    //             for(let j=i+1;j<Ethereum_Tokens.length;j++){

    //                 console.log("Token pair : ",Ethereum_Tokens[i],Ethereum_Tokens[j])
                    
                    
    //                 //Check pair prices across all exchanges
    //                 for(const exchange of defiExchanges){

    //                     console.log(exchange.name)
    //                     const {ABI,contractFactoryAddress,getPairFunctionName,additionalParameters,tokenPairABI,tokenPoolPriceFunctionName,tokenPoolAdditionalParameters}=exchange;
    //                     const exchangeContract=new ethers.Contract(contractFactoryAddress,ABI,provider)
    //                     const pairAddress=await exchangeContract[getPairFunctionName](Ethereum_Tokens[i],Ethereum_Tokens[j]);
    //                     console.log(pairAddress)
        
    //                     const pairContract= new ethers.Contract(pairAddress,tokenPairABI,provider);
    //                     const result = await pairContract[tokenPoolPriceFunctionName]();
    //                     pairPrice=result;
    //                     console.log(result.toString())
    //                 }
    //             }
    //         }
    //     }  


    //     console.log("After loop ends")
    // }

    return(
        <main className=" min-h-screen flex flex-col justify-evenly text-white">
            <div className=" w-full md:max-w-[300px] flex flex-col gap-5 p-1 md:p-5">
                    <Link href="/ManageDefi" className=" w-full p-2 rounded-md text-center border hover:bg-lime-egg hover:text-black">Manage Defi</Link>
                    <Link href="/dashboarad/ManageExchange" className=" w-full p-2 rounded-md text-center border hover:bg-lime-egg hover:text-black" >Manage Exchange</Link>
                    <Link href="/dashboard/ManageTokens" className=" w-full p-2 rounded-md text-center border hover:bg-lime-egg delay-100 hover:text-black" >Manage Token</Link>
            </div>
            <button onClick={()=>setIsRunning(!isRunning)} className={` w-[120px] h-[120px] absolute top-[20%] self-center p-2 rounded-full ${isRunning?"hover:ring-red-400 bg-green-400":"hover:ring-green-400 bg-red-400"} delay-100 hover:ring-[3px] hover:ring-offset-2 hover:ring-offset-transparent text-2xl `}>Start</button>
            <div className=" lg:w-[60%] justify-between flex flex-col md:flex-row">
                <div className=" w-[300px] bg-slate-100/20 p-2 ">
                    Scanning
                </div>
                <div className=" w-[300px] bg-slate-100/20 h-36 p-2 ">
                    Sum
                </div>
            </div>
        </main>
    )
}
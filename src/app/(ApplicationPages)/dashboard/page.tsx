"use client"
import Link from "next/link";
import {ethers} from 'ethers'
import { DummyData, Ethereum_Tokens } from "@/TestingDataSet";
import { useState } from "react";
import Big from 'big.js'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

declare global {
    interface Window {
      ethereum: any // or a more specific type
    }
  }
  


export default  function DashBoard(){
    const [isRunning,setIsRunning] =useState(false)
    console.log(typeof window)
    if(typeof window!='undefined'){
        const provider=new ethers.BrowserProvider(window.ethereum)
        console.log(provider)
        if(isRunning){
            loopThroughTokensandExchanges(provider,DummyData,Ethereum_Tokens);
        }
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map((label,index) => index*.25/4),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map((label,index) => index*.25/4),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Data list',
          },
        },
      };

    return(
        <main className=" min-h-screen flex flex-col justify-evenly text-white">

            <div className=" flex justify-between p-1 md:p-5">
                <div className=" w-full md:max-w-[300px] flex flex-col gap-5">
                        <Link href="/dashboard/ManageDefi" className=" w-full p-3 rounded-md text-center border hover:bg-lime-egg hover:text-black">Manage Defi</Link>
                        <Link href="/dashboard/ManageExchange" className=" w-full p-3 rounded-md text-center border hover:bg-lime-egg hover:text-black" >Manage Exchange</Link>
                        <Link href="/dashboard/ManageTokens" className=" w-full p-3 rounded-md text-center border hover:bg-lime-egg delay-100 hover:text-black" >Manage Token</Link>
                        <Link href="/dashboard/ManageChains" className=" w-full p-3 rounded-md text-center border hover:bg-lime-egg delay-100 hover:text-black" >Manage Chains</Link>
                </div>
                <div className=" w-[600px] min-h-[500px]" dangerouslySetInnerHTML={{__html:`
<div style="height:433px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F; padding: 0px; margin: 0px; width: 100%;"><div style="height:413px; padding:0px; margin:0px; width: 100%;"><iframe src="https://widget.coinlib.io/widget?type=full_v2&theme=light&cnt=6&pref_coin_id=1505&graph=yes" width="100%" height="409px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0" style="border:0;margin:0;padding:0;"></iframe></div><div style="color: #FFFFFF; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;"><a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #FFFFFF; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>                `}}>
                    {/* {<Bar options={options} data={data} />} */}
                </div>
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


async function loopThroughTokensandExchanges(provider:ethers.BrowserProvider,_exchangeList:typeof DummyData,_tokensList:string[]){
        console.log("Starting loop through tokens")

        //Loop chains
        for (const [key, defiExchanges] of Object.entries(DummyData)) {
            let token1Price;
            let token2Price;
            console.log('Chain : ',key)
            //Loop tokens for each chain
            for(let i=0;i<Ethereum_Tokens.length-1;i++){
                
                for(let j=i+1;j<Ethereum_Tokens.length;j++){

                    console.log("Token pair : ",Ethereum_Tokens[i],Ethereum_Tokens[j])
                    
                    
                    //Check pair prices across all exchanges
                    for(const exchange of defiExchanges){

                        console.log(exchange.name)
                        const {factoryContractABI,factoryContractAddress,getPairFunction,additionalPairParameters,tokenPairContractABI,getTokenReservesFunction,additionalTokenReserveParameters}=exchange;
                        const exchangeContract=new ethers.Contract(factoryContractAddress,factoryContractABI,provider)
                        const pairAddress=await exchangeContract[getPairFunction](Ethereum_Tokens[i],Ethereum_Tokens[j]);
                        
                        
                        //Pair functions
                        const pairContract= new ethers.Contract(pairAddress,tokenPairContractABI,provider);
                        
                        const name=await pairContract.name();
                        const result = await pairContract[getTokenReservesFunction](); //Will return array with BigInt values for each pair
                        
                        
                        const [token1Reserves,token2Reserves,blockSamp]=result;
                        token1Price=Big(token1Reserves.toString()).div(token2Reserves.toString()).toString(); 
                        token2Price=Big(token2Reserves.toString()).div(token1Reserves.toString()).toString();
                        
                        console.log(name," : ",pairAddress)
                        console.log("Prices \n",token1Price,token2Price,blockSamp)
                    }
                }
            }
        }  


        console.log("After loop ends")
}
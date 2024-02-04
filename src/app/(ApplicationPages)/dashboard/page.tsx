"use client"
import Link from "next/link";
import {JsonRpcProvider, ethers} from 'ethers'
import { Chains_List, DummyData, Ethereum_Tokens } from "@/TestingDataSet";
import { Suspense, useState } from "react";
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
import { apiCallGET, getFunctionSignature } from "@/utils";
import useSWR from "swr";
import { Type_SELECT_ChainType } from "@/database/scheemas/chains";
import { Type_SELECT_TokenType } from "@/database/scheemas/Tokens";
import { Type_SELECT_ExchangeType } from "@/database/scheemas/Exchange";
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
  
type AnalysisDataType = { [key: string]: { chain: Type_SELECT_ChainType, tokens: Type_SELECT_TokenType[], exchanges: Type_SELECT_ExchangeType[] } };
export default  function DashBoard(){
  const [isRunning,setIsRunning] =useState(false)
    
  const {data,error,isLoading}=useSWR("/api/groupByChain",apiCallGET)
  let chartdata:any;

  if(data){

    let groupedByChainName: AnalysisDataType = {};
    for (let item of data) {
        let chainName = item.chains.name;
        if (!groupedByChainName[chainName]) {
            groupedByChainName[chainName] = {
                chain: item.chains,
                tokens: [],
                exchanges: []
            };
        }
        groupedByChainName[chainName].tokens.push(item.tokens);
        groupedByChainName[chainName].exchanges.push(item.exchange_table);
    }
    console.log("outside function");
    
    if(isRunning){
      loopThroughTokensandExchanges(groupedByChainName); 
      }


      let exchangesArrayLength = [];
      let tokenarraylength = [];

      for (let chain in groupedByChainName) {
          exchangesArrayLength.push(groupedByChainName[chain].exchanges.length);
          tokenarraylength.push(groupedByChainName[chain].tokens.length);
      }

      const labels = Object.keys(groupedByChainName);
      chartdata = {
          labels,
          datasets: [
              {
                  label: 'Exchanges',
                  data: exchangesArrayLength,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                  label: 'Tokens',
                  data: tokenarraylength,
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
          ],
      };

      console.log(chartdata)

  }

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
        <main className=" min-h-screen flex flex-col justify-evenly ">

            <div className=" flex justify-between p-1 md:p-5">
                <div className=" w-full md:max-w-[300px] flex flex-col gap-5">
                        <Link href="/dashboard/ManageDefi" className=" w-full p-3 rounded-md text-center border bg-primary/70 hover:bg-primary/90 hover:text-lime-egg">Manage Defi</Link>
                        <Link href="/dashboard/ManageExchange" className=" w-full p-3 rounded-md text-center border bg-primary/70 hover:bg-primary/90 hover:text-lime-egg" >Manage Exchange</Link>
                        <Link href="/dashboard/ManageTokens" className=" w-full p-3 rounded-md text-center border bg-primary/70 hover:bg-primary/90 hover:text-lime-egg" >Manage Token</Link>
                        <Link href="/dashboard/ManageChains" className=" w-full p-3 rounded-md text-center border bg-primary/70 hover:bg-primary/90 hover:text-lime-egg" >Manage Chains</Link>
                </div>
                <Suspense fallback={<div>{"loading .... :)"}</div>}>
                <div className=" w-[600px] min-h-[500px]" dangerouslySetInnerHTML={{__html:`
<div style="height:433px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F; padding: 0px; margin: 0px; width: 100%;"><div style="height:413px; padding:0px; margin:0px; width: 100%;"><iframe src="https://widget.coinlib.io/widget?type=full_v2&theme=light&cnt=6&pref_coin_id=1505&graph=yes" width="100%" height="409px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0" style="border:0;margin:0;padding:0;"></iframe></div><div style="color: #FFFFFF; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;"><a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #FFFFFF; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>                `}}>
                </div>
                </Suspense>
            </div>

            <button disabled={isLoading} onClick={()=>setIsRunning(!isRunning)} className={` w-[120px] h-[120px] absolute top-[20%] self-center p-2 rounded-full ${isRunning?"hover:ring-red-400 bg-green-400":"hover:ring-green-400 bg-red-400"} delay-100 hover:ring-[3px] hover:ring-offset-2 hover:ring-offset-transparent text-2xl `}>Start</button>
            <div className=" lg:w-[60%] justify-between flex flex-col md:flex-row">
                {data&&<Bar data={chartdata} options={options} />}
            </div>
        </main>
    )
}


// async function loopThroughTokensandExchanges(provider:ethers.BrowserProvider,_exchangeList:typeof DummyData,_tokensList:string[]){
//         console.log("Starting loop through tokens")

//         //Loop chains
//         for (const [key, defiExchanges] of Object.entries(DummyData)) {
//             let token1Price;
//             let token2Price;
//             console.log('Chain : ',key)
            
//             //Loop tokens for each chain
//             for(let i=0;i<Ethereum_Tokens.length-1;i++){
                
//                 for(let j=i+1;j<Ethereum_Tokens.length;j++){

//                     console.log("Token pair : ",Ethereum_Tokens[i],Ethereum_Tokens[j])
                    
                    
//                     //Check pair prices across all exchanges
//                     for(const exchange of defiExchanges){

//                         console.log(exchange.name)
//                         const {factoryContractABI,factoryContractAddress,getPairFunction,additionalPairParameters,tokenPairContractABI,getTokenReservesFunction,additionalTokenReserveParameters}=exchange;
//                         const exchangeContract=new ethers.Contract(factoryContractAddress,factoryContractABI,provider)
//                         const pairAddress=await exchangeContract[getPairFunction](Ethereum_Tokens[i],Ethereum_Tokens[j]);
                        
                        
//                         //Pair functions
//                         const pairContract= new ethers.Contract(pairAddress,tokenPairContractABI,provider);
                        
//                         const name=await pairContract.name();
//                         const result = await pairContract[getTokenReservesFunction](); //Will return array with BigInt values for each pair
                        
                        
//                         const [token1Reserves,token2Reserves,blockSamp]=result;
//                         token1Price=Big(token1Reserves.toString()).div(token2Reserves.toString()).toString(); 
//                         token2Price=Big(token2Reserves.toString()).div(token1Reserves.toString()).toString();
                        
//                         console.log(name," : ",pairAddress)
//                         console.log("Prices \n",token1Price,token2Price,blockSamp)
//                     }
//                 }
//             }
//         }  


//         console.log("After loop ends")
// }


async function loopThroughTokensandExchanges(CombinedData: AnalysisDataType) {
  console.log("Starting loop through tokens")

  // Loop through each chain in CombinedData
  for (const [chainName, items] of Object.entries(CombinedData)) {
      console.log('Chain : ', chainName)

      // Loop through each item in the chain
          const chain = items.chain;  // Type_SELECT_ChainType
          const defiExchanges = items.exchanges;  // Type_SELECT_ExchangeType
          const Ethereum_Tokens = items.tokens;  // Type_SELECT_TokenType

          const provider = new JsonRpcProvider(chain.rpcurl, undefined, {
              staticNetwork: true
          })
          console.log(await provider.getBlockNumber())

          // Loop tokens for each chain
          for (let i = 0; i < Ethereum_Tokens.length - 1; i++) {
              for (let j = i + 1; j < Ethereum_Tokens.length; j++) {
                  console.log("Token pair : ", Ethereum_Tokens[i].address, Ethereum_Tokens[j].address)

                  // Check pair prices across all exchanges
                  for (const exchange of defiExchanges) {
                      console.log(exchange.name)
                      const { getPairsFunctionSignature, factoryContractAddress, additionalPairParameters, getTokenReservesFunctionSignature, additionalTokenReserveParameters } = exchange;

                      // encoding getPair function
                      const getPairsFunctionSelector = ethers.id(exchange.getPairsFunctionSignature).slice(0, 10);
                      const encoder = await ethers.AbiCoder.defaultAbiCoder()
                      const encodedParameters = encoder.encode(['address', 'address'], [Ethereum_Tokens[i].address, Ethereum_Tokens[j].address]);
                      const data = getPairsFunctionSelector + encodedParameters.slice(2);

                      // Getting pair address
                      const pairAddress = await provider.call({ to:exchange.factoryContractAddress, data: data });
                      const checksummedAddress = ethers.getAddress(ethers.stripZerosLeft(pairAddress));
                      console.log("Token pair address : ", checksummedAddress)

                      // Pair functions
                      // const pairContract= new ethers.Contract(checksummedAddress,[],provider);
                      // const result = await pairContractgetTokenReservesFunction; // Will return array with BigInt values for each pair

                      // encoding and getting token reserves
                      const getReservesSignature = getFunctionSignature(exchange.getTokenReservesFunctionSignature)
                      const result = await provider.call({ to: checksummedAddress, data: getReservesSignature });

                      const [token1Reserves, token2Reserves, blockSamp] = hexStringToBigInts(result);

                      const token1Price = Big(token1Reserves.toString()).div(Big(token2Reserves.toString())).toString();
                      const token2Price = Big(token2Reserves.toString()).div(Big(token1Reserves.toString())).toString();

                      console.log("Prices \n", token1Price, token2Price, blockSamp)
                  }
              }
          
      }
  }

  console.log("After loop ends")
}


 function hexStringToBigInts(_hexString:string){

  const hex_string = _hexString.substring(2);

  // Split the string into chunks of 64 digits
  const hex_values = hex_string.match(/.{1,64}/g);

  // Convert each chunk to a decimal number
  const decimal_values = hex_values!.map(hex_value => BigInt('0x' + hex_value).toString());

  return decimal_values;
}



import * as z from 'zod'
import { Z_INSERT_ExchangeType } from "./database/scheemas/Exchange";
export const DummyData:Record<string,Array<z.infer<typeof Z_INSERT_ExchangeType>>>={
    'ethereum':[
        {
            name:'Uniswap',
            getPairsFunctionSignature:'getPair(address,address)',
            factoryContractAddress:"0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
            additionalPairParameters:"",
            isActive:true,
            getTokenReservesFunctionSignature:"getReserves()",
            additionalTokenReserveParameters:"",
            chain_id:'1',
            pairSwapFunctionSignature:"",
            pairSwapAdditionalParameters:"",
        }
    ]
}


export const Ethereum_Tokens=["0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9","0xdAC17F958D2ee523a2206206994597C13D831ec7", "0x514910771AF9Ca656af840dff83E8264EcF986CA"]

export const Chains_List=[
    {
        name:'Ethereum',
        url:"https://eth.llamarpc.com"
    }
]


"use client"

import { ChainCard } from "@/components/Chains/ChainCard"
import { baseURL, fetchChains } from "@/utils"
import { Suspense } from "react"
import useSWR from 'swr'
import { Type_INSERT_ChainType } from "@/database/scheemas/chains";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { AddExchangeForm } from "@/components/Exchange/AddExchange";
import { ExchangeCard } from "@/components/Exchange/ExchangeCard"
import { Type_INSERT_ExchangeType } from "@/database/scheemas/Exchange"
import { PieChartComponent } from "@/components/PieChart"
import { Toaster } from "@/components/ui/toaster"

export default function ExchangesView(){
    const {data,error,isLoading}=useSWR("/api/exchanges",fetchChains)
    return (
        <div className=" flex flex-col justify-between p-2 md:p-5 ">
            <div className=" flex flex-col md:flex-row justify-between">
                <div className=" min-w-[300px] w-[60%] md:w-[400px] xl:w-[500px] flex flex-col gap-[5px] md:gap-[10px] xl:gap-[20px]">
                    <Dialog>
                        <DialogTrigger className="w-full md:w-[200px] p-2 rounded-md text-center border bg-button hover:bg-button/80 text-white self-end">Add new</DialogTrigger>
                        <DialogContent className=" overflow-y-scroll max-h-none max-w-none p-0 w-full md:w-[80%] lg:w-[40%] ">
                            <AddExchangeForm className=" text-black" />
                        </DialogContent>
                    </Dialog>
                    {
                        isLoading?<text>fetching please wait ....</text>:
                        <div className=" grid grid-cols-1 space-y-3 ">
                            {data.length>0?data.map((chain:Type_INSERT_ExchangeType)=>(
                                <ExchangeCard data={chain} />
                            ))
                            :
                            <div>no exchanges found</div>
                        }
                        </div>
                    }
                </div>

                <div className=" self-center flex justify-center w-full h-full lg:w-[40%] lg:h-[500px] mt-[10%] ">
                    {data&&<PieChartComponent chartdata={data} />}
                </div>
            </div>
            <Toaster/>
        </div>
        
    )
}
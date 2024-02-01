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

export default function ExchangesView(){
    const {data,error,isLoading}=useSWR("/api/chains",fetchChains)
    return (
        <div className=" flex flex-col justify-between p1 md:p-5 text-white">
            <div className=" flex justify-between">
                <div className="w-full h-auto md:w-[300px] lg:w-[400px] xl:w-[500px] flex flex-col gap-[5px] md:gap-[10px] xl:gap-[20px]">
                    <Dialog>
                        <DialogTrigger className="w-full md:w-[200px] p-2 rounded-md text-center border hover:bg-lime-egg hover:text-black self-end">Add new</DialogTrigger>
                        <DialogContent className=" overflow-scroll max-w-none p-0">
                            <AddExchangeForm className=" text-black" />
                        </DialogContent>
                    </Dialog>
                    {
                        isLoading?<text>fetching please wait ....</text>:
                        <div className=" grid grid-cols-1 space-y-3 ">
                            {data.map((chain:Type_INSERT_ExchangeType)=>(
                                <ExchangeCard data={chain} />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
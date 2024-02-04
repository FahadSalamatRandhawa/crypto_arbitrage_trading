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
import { PieChartComponent } from "@/components/PieChart"
import { AddDefiForm } from "@/components/Defi/AddDefiForm"
import { DefiCard } from "@/components/Defi/DefiCard"
import { Type_SELECT_DefiType } from "@/database/scheemas/DeFi"

export default function DefiView(){
    const {data,error,isLoading}=useSWR("/api/defi",fetchChains)
    return (
        <div className=" flex flex-col justify-between p1 md:p-5 ">
            <div className=" flex flex-col md:flex-row justify-between">
                <div className="w-full h-auto md:w-[300px] lg:w-[400px] xl:w-[500px] flex flex-col gap-[5px] md:gap-[10px] xl:gap-[20px]">
                    <Dialog>
                        <DialogTrigger className="w-full md:w-[200px] p-2 rounded-md text-center border border-primary bg-primary/60 text-white hover:bg-lime-egg hover:text-black self-end">Add new</DialogTrigger>
                        <DialogContent className=" overflow-scroll max-w-none p-0 w-full md:w-[80%] lg:w-[40%] ">
                            <AddDefiForm className=" text-black" />
                        </DialogContent>
                    </Dialog>
                    {
                        isLoading?<text>fetching please wait ....</text>:
                        <div className=" grid grid-cols-1 space-y-3 ">
                            {data.length>0?data.map((chain:Type_SELECT_DefiType)=>(
                                <DefiCard data={chain} />
                            ))
                            :
                            <div>no exchanges found</div>
                        }
                        </div>
                    }
                </div>

                <div className=" self-center flex justify-center w-full h-full lg:w-[40%] lg:h-[500px] mt-[10%] ">
                    {data&&data.length>0&&<PieChartComponent chartdata={data} />}
                </div>
            </div>
        </div>
    )
}
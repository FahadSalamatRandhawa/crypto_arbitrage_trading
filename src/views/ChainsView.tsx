"use client"

import { ChainCard } from "@/components/Chains/ChainCard"
import { baseURL, fetchChains } from "@/utils"
import { Suspense } from "react"
import useSWR from 'swr'
import { Type_INSERT_ChainType, Type_SELECT_ChainType } from "@/database/scheemas/chains";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { AddChain } from "@/components/Chains/clientComponents"
import { Toaster } from "@/components/ui/toaster"
import { PieChartComponent } from "@/components/PieChart"
  

export default function ChainsView(){
    const {data,error,isLoading}=useSWR("/api/chains",fetchChains)
    return (
        <>
            <div className=" flex flex-col justify-between p-2 md:p-5 ">
                <div className="w-full flex flex-col md:flex-row  justify-between">
                    <div className=" h-auto min-w-[300px] w-[60%] md:w-[400px] xl:w-[500px] flex flex-col gap-[5px] md:gap-[10px] xl:gap-[20px]">
                        <Dialog>
                            <DialogTrigger className="w-full md:w-[200px] p-2 rounded-md text-center border bg-button hover:bg-button/80 text-white self-end">Add new</DialogTrigger>
                            <DialogContent className="absolute p-0">
                                <AddChain className=" text-black" />
                            </DialogContent>
                        </Dialog>
                        {
                            isLoading?<text>fetching please wait ....</text>:
                            <div className=" grid grid-cols-1 space-y-3 ">
                                {data.length>0?data.map((chain:Type_SELECT_ChainType)=>(
                                    <ChainCard data={chain} />
                                ))
                                :
                                <div>no chains found</div>
                            }
                            </div>
                        }
                    </div>

                    <div className=" self-center flex  justify-center w-full h-full lg:w-[40%] lg:h-[500px] mt-[10%] ">
                        {data&&<PieChartComponent chartdata={data} />}
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

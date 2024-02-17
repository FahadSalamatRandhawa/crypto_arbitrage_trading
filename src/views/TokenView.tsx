"use client"

import { ChainCard } from "@/components/Chains/ChainCard"
import { baseURL, fetchChains } from "@/utils"
import useSWR from 'swr'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { TokenCard } from "@/components/Tokens/TokenCard"
import { Type_SELECT_TokenType } from "@/database/scheemas/Tokens"
import { TokenAddForm } from "@/components/Tokens/clientComponents"
import { Toaster } from "@/components/ui/toaster"
import { PieChartComponent } from "@/components/PieChart"

export default function TokensView(){
    const {data,error,isLoading}=useSWR("/api/tokens",fetchChains)
    if(data){
        console.log(data)
    }

    return (
        <>
            <div className=" flex flex-col justify-between p-2 md:p-5 ">
                <div className=" flex flex-col lg:flex-row justify-between">
                    <div className=" h-auto min-w-[300px] w-[60%] md:w-[400px] xl:w-[500px] flex flex-col gap-[5px] md:gap-[10px] xl:gap-[20px]">
                        <Dialog>
                            <DialogTrigger className="w-full md:w-[200px] p-2 rounded-md text-center border bg-button hover:bg-button/80 text-white self-end">Add new</DialogTrigger>
                            <DialogContent className=" overflow-scroll max-w-none p-0 w-full md:w-[500px] lg:w-[600px]">
                                <TokenAddForm className=" text-black" />
                            </DialogContent>
                        </Dialog>
                        {
                            isLoading?<text>fetching please wait ....</text>:
                            <div className=" grid grid-cols-1 space-y-3 ">
                                {data?data.map((token:Type_SELECT_TokenType)=>(
                                    <TokenCard data={token} />
                                )):
                                    <div>no tokens found</div>
                                }
                                {
                                    error&&<text>faced an error</text>
                                }
                            </div>
                        }
                    </div>

                    {/** chart */}

                    <div className=" self-center flex justify-center w-full h-full lg:w-[40%] lg:h-[500px] mt-[10%] ">
                    {data&&<PieChartComponent chartdata={data} />}
                </div>
                </div>
            </div>
            <Toaster/>
        </>
    )
}
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { AddChain } from "@/components/Chains/clientComponents"
import { useToast } from "../ui/use-toast"
import { baseURL } from "@/utils"
import { useRouter } from "next/navigation"
import { Toaster } from "../ui/toaster"
import { Type_INSERT_ExchangeType } from "@/database/scheemas/Exchange"
import { AddExchangeForm } from "./AddExchange"

export function ExchangeCard({data}:{data:Type_INSERT_ExchangeType}) {
  const [open, setOpen] = React.useState(false)
  const [update,setUpdate]=React.useState(false)
  const {toast}=useToast()

  const router=useRouter()

  async function deleteExchange({factoryAddress}:{factoryAddress:string}){
    try{
        const requestdeleteChain=await fetch(baseURL+"/api/exchanges",{method:"DELETE",cache:"no-cache",body:JSON.stringify({factoryAddress})})
        const deletedChain=await requestdeleteChain.json();
    if(requestdeleteChain.ok){
        toast({title:"Success",description:deletedChain.message})
    }else{
        toast({title:"Failure",description:deletedChain.message})
    }
    router.refresh()
    }catch(err){
        toast({title:"Failure",variant:"destructive",description:'Error in API call'})
    }
  }

  return (
    <>
    <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
      <p className="text-sm font-medium leading-none">
        <span className=" min-w-[100px] mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground">
          {data.chain_id}
        </span>
        <span className="text-muted-foreground">{data.name}</span>
      </p>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            ....
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={()=>setUpdate(true)} >Update</DropdownMenuItem>            
            <DropdownMenuItem onClick={()=>deleteExchange({factoryAddress:data.factoryContractAddress})} className="text-red-600">
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={update} onOpenChange={()=>setUpdate(false)} >
        <DialogTrigger className="invisible hidden">Open Sim Sim</DialogTrigger>
          <DialogContent className="max-w-none p-0">
              <AddExchangeForm default_value={data} className=" text-black" />
          </DialogContent>
      </Dialog>
    </div>
    <Toaster />
    </>
  )
}


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
import { Type_INSERT_ChainType } from "@/database/scheemas/chains"

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
import { TokenAddForm } from "./clientComponents"
import { Type_INSERT_TokenType, Type_SELECT_TokenType } from "@/database/scheemas/Tokens"

export function TokenCard({data}:{data:Type_SELECT_TokenType}) {
  const [open, setOpen] = React.useState(false)
  const [update,setUpdate]=React.useState(false)
  const {toast}=useToast()

  const router=useRouter()

  async function deleteToken({id}:{id:number}){
    try{
        const requestdeleteChain=await fetch(baseURL+"/api/tokens",{method:"DELETE",cache:"no-cache",body:JSON.stringify({id})})
        const deletedChain=await requestdeleteChain.json();
    if(requestdeleteChain.ok){
        toast({title:"Success",description:deletedChain.message})
        router.refresh()
    }else{
        toast({title:"Failure",description:deletedChain.message})
    }
    
    }catch(err){
        toast({title:"Failure",variant:"destructive",description:'Error in API call'})
    }
  }

  return (
    <>
    <div className=" min-h-[80px] flex w-full flex-col items-start justify-between rounded-md border border-black/30 hover:bg-primary/30 px-4 py-3 sm:flex-row sm:items-center">
      <p className="text-sm font-medium leading-none">
        <span className=" min-w-[100px] mr-2 rounded-lg text-lime-egg bg-primary px-2 py-1 text-xs text-primary-foreground">
          {data.symbol}
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
            <DropdownMenuItem onClick={()=>deleteToken({id:data['#']})} className="text-red-600">
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={update} onOpenChange={()=>setUpdate(false)} >
        <DialogTrigger className="invisible hidden">Open Sim Sim</DialogTrigger>
          <DialogContent className=" p-0">
              <TokenAddForm default_value={data} className=" text-black" />
          </DialogContent>
      </Dialog>
    </div>
    <Toaster />
    </>
  )
}



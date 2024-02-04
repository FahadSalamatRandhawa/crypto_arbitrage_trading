"use client"

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

import { baseURL } from "@/utils"
import { useRouter } from "next/navigation"

import * as React from "react"
import { useToast } from "./ui/use-toast"

export default function Navigation(){
    const [open, setOpen] = React.useState(false)
    const [update,setUpdate]=React.useState(false)
    const {toast}=useToast()

    async function handleLogOut(){
        const logoutCall=await fetch(baseURL+"/api/logout",{method:"POST",cache:"no-cache"})
        if(logoutCall.ok){
            toast({title:"Success",description:" logging you out"})
        }else{
            toast({title:"Failure",description:"please try again"})
        }
    }

    const router=useRouter()
    return(
        <nav className="flex justify-end text-lime-egg items-center bg-primary min-h-[60px] px-[10px]">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    Account
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={()=>setUpdate(true)} >Logout</DropdownMenuItem>            
                    
                </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}
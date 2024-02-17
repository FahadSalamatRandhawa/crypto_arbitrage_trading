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
    const {toast}=useToast()
    const router=useRouter()

    async function handleLogOut(){
        const logoutCall=await fetch(baseURL+"/api/logout",{method:"POST",cache:"no-cache"})
        if(logoutCall.ok){
            toast({title:"Success",description:" logging you out"})
        }else{
            toast({title:"Failure",description:"please try again"})
        }

        router.refresh()
    }

    return(
        <nav className="flex justify-end text-white items-center bg-white min-h-[70px] px-[10px]">
            <button onClick={handleLogOut} className=" bg-button p-3 min-w-[100px]">
                Logout
            </button>
        </nav>
    )
}
"use client"

import { Type_INSERT_TokenType, Type_SELECT_TokenType, Z_INSERT_TokenType, Z_SELECT_TokenType } from "@/database/scheemas/Tokens"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, 
  } from "@/components/ui/form"
  import { Value } from '@sinclair/typebox/value';
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { baseURL, fetchChains } from "@/utils"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "../ui/use-toast"
import { Type_INSERT_DefiType, Type_SELECT_DefiType, Z_INSERT_DefiType, Z_SELECT_DefiType } from "@/database/scheemas/DeFi"

export const TokenType=z.object({
    name:z.string({required_error:"required"}),
    symbol:z.string({required_error:"required"}),
    address:z.string().min(15,{message:"addresses have more than 15 length"}),
    isActive:z.boolean().default(false),
    currencyType:z.string().default(""),
    chain:z.string({required_error:"required"})
})
const default_Token_Value:Type_INSERT_TokenType={name:"Ethereum",address:"1234456awdnabdsa",isActive:false,symbol:"ETH",currencyType:"",chain:"ethereum"}


export const AddDefiForm=({default_value,className}:{default_value?:Type_SELECT_DefiType,className:string})=>{
    const router=useRouter()
    const [loading,setLoading]=useState(false)
    const {toast}=useToast()

    const {data,error,isLoading}=useSWR("/api/chains",fetchChains)

    const form=useForm<Type_INSERT_DefiType>({resolver:zodResolver(default_value?Z_SELECT_DefiType:Z_INSERT_DefiType),defaultValues:default_value})

    async function AddDefiHandler(data:Type_INSERT_DefiType){
        console.log("tokenform api handler")
        console.log(data)
        try{
            const apiCall=await fetch("/api/defi",{method:default_value?"PUT":"POST",body:JSON.stringify(data)})
            const jsonResponse=await apiCall.json()
            console.log(jsonResponse)
            if(apiCall.ok){
                toast({title:'Success',description:jsonResponse.message})
            }else{
                toast({title:'Failure',description:jsonResponse.message})
            }
            
            router.refresh()
        }catch(err){
            toast({title:'Error',description:"Face error in calling API"})
        }
    }

    async function deleteDefi({id}:{id:number}){
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
        <Form {...form} >
            <form  onSubmit={form.handleSubmit(AddDefiHandler)} className={" grid grid-cols-1 place-content-end justify-between gap-[20px] p-3 "+className}>
                <FormField control={form.control} name="name" render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input className=" bg-transparent " {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="chain" render={({field})=>(
                    <FormItem>
                        <FormLabel>Chain</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                        <SelectTrigger className="w-[180px] bg-transparent ">
                            <SelectValue placeholder="Select chain" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {
                                data&&data.map(({chainId,name}:{chainId:string,name:string})=>(
                                <SelectItem key={chainId} value={chainId}>{name}</SelectItem>
                            ))
                            }
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="contractAddress" render={({field})=>(
                    <FormItem className=" ">
                        <FormLabel>Contract Address</FormLabel>
                        <FormControl>
                            <Input className="  bg-transparent " {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />
                <FormField control={form.control} name="isActive" render={({field})=>(
                    <FormItem className=" w-min  justify-self-end" >
                    <FormLabel>Active</FormLabel>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage/>
                    </FormItem>
                )} />

                <FormField control={form.control} name="loanFunctionSignature" render={({field})=>(
                    <FormItem className=" md:col-span-2 ">
                        <FormLabel>Function Signature</FormLabel>
                        <FormControl>
                            <Input className=" w-full bg-transparent " {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />
                
                
                
                
                <Button disabled={loading} type="submit" className={!default_value?"md:col-span-2 self-end  ":"self-end "} >{default_value?"Update":"Add"}</Button>
                {
                    default_value&&<Button onClick={()=>deleteDefi({id:default_value.serial})} disabled={loading}  type="button" className="self-end " variant={"destructive"} >{"Delete"}</Button>
                }

            </form>
        </Form>
    )
}

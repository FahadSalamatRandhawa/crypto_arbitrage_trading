"use client"
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
import { Type_INSERT_ExchangeType, Type_SELECT_ExchangeType, Z_INSERT_ExchangeType, Z_SELECT_ExchangeType } from "@/database/scheemas/Exchange"
import { Textarea } from "../ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import useSWR from 'swr'
import { baseURL, fetchChains, getFunctionSignature } from "@/utils"
import { Z_INSERT_ChainType } from "@/database/scheemas/chains"
import { useState } from "react"
import { useToast } from "../ui/use-toast"

// export const Exchange_Type=z.object({
//     name:z.string({required_error:"required"}),
//     factoryContractABI:z.string({required_error:"required"}),
//     factoryContractAddress:z.string({required_error:"required"}).min(15,{message:"addresses have more than 15 length"}),
//     getPairFunction:z.string({required_error:"required"}),
//     additionalPairParameters:z.string().default(""),
    
//     isActive:z.boolean().default(false),
    
//     tokenPairContractABI:z.string({required_error:"required"}),
//     getTokenReservesFunction:z.string({required_error:"required"}),
//     additionalTokenReserveParameters:z.string().default(""),
    
//     chain_id:z.number({required_error:"required"}),
    
//     pairSwapAdditionalParameters:z.string({required_error:"required"}),
//     pairSwapFunction:z.string({required_error:"required"}),
//     pairSwapFunctionSignature:z.string({required_error:"required"}),
// })

// const Exchange_Type=Z_INSERT_ExchangeType.deepen({
//   name: Z_INSERT_ExchangeType.shape.name.refine(value => value !== '', 'Name is required'),
//   factoryContractAddress: Z_INSERT_ExchangeType.shape.factoryContractAddress.refine(value => value.length >= 15, 'Addresses have more than 15 length'),
//   getPairsFunctionSignature: Z_INSERT_ExchangeType.shape.getPairsFunctionSignature.refine(value => value !== '', 'getPairsFunctionSignature is required'),
//   // Add more fields if needed
// });

export function AddExchangeForm({default_value,className}:{default_value?:Type_SELECT_ExchangeType,className?:string}){
  const [loading,setLoading]=useState(false)
  const {toast}=useToast()

  const {data,error,isLoading}=useSWR("/api/chains",fetchChains)
  const router=useRouter();
  const form=useForm<Type_INSERT_ExchangeType>({resolver:zodResolver(Z_INSERT_ExchangeType),defaultValues:default_value})
  

   async function addExchange(body:Type_INSERT_ExchangeType){
    console.log("add exchange function")
    try{
      setLoading(true)
    const apiCall=await fetch(baseURL+"/api/exchanges",{method:"POST",cache:"no-cache",body:JSON.stringify(body)});
    const resultData=await apiCall.json()
    if(apiCall.ok){
      toast({title:"Success",description:resultData.message})
      router.refresh()
    }else{
      toast({title:"Failure",description:resultData.message})
      router.refresh()
    }
      setLoading(false)
      router.refresh()
    }catch(err){
        setLoading(false)
        console.log("Error while adding chains",err)
        toast({title:"Error",variant:"destructive",description:'could not add chain'})
        router.refresh()
    }
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(addExchange)} className={"h-auto grid grid-cols-1 gap-5 space-y-3 bg-lime-egg/30 p-1 md:p-5 "+className}>
        
          <FormField control={form.control} name="name" render={({field})=>(
            <FormItem className=" self-end">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className=" bg-transparent " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="chain_id" render={({field})=>(
            <FormItem className="">
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

          <FormField control={form.control} name="factoryContractAddress" render={({field})=>(
            <FormItem className=" md:col-span-2">
              <FormLabel>Factory contract address</FormLabel>
              <FormControl>
                <Input className=" bg-transparent " {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

          <FormField control={form.control} name="getPairsFunctionSignature" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Get pair function signature</FormLabel>
              <FormControl>
                <Input className=" w-full bg-transparent " {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

          <FormField control={form.control} name="additionalPairParameters" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Additional pair parameters</FormLabel>
              <FormControl>
                <Textarea className=" w-full bg-transparent " {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

          <FormField control={form.control} name="getTokenReservesFunctionSignature" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Token reserves function signature</FormLabel>
              <FormControl>
                <Input className=" w-full bg-transparent " {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
        
        
        

        {/**Split here */}
        
          <FormField control={form.control} name="additionalTokenReserveParameters" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Additional token reserves parameters</FormLabel>
              <FormControl>
                <Textarea className=" w-full bg-transparent " {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />
          <FormField control={form.control} name="pairSwapFunctionSignature" render={({field})=>(
            <FormItem className=" ">
              <FormLabel>Pair swap function signature</FormLabel>
              <FormControl>
                <Input className=" w-full bg-transparent " {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />
          <FormField control={form.control} name="pairSwapAdditionalParameters" render={({field})=>(
            <FormItem className="  ">
              <FormLabel>Pairswap additional parameters</FormLabel>
              <FormControl>
                <Textarea className=" w-full bg-transparent " {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

          <Button type="submit" className={!default_value?" self-end  ":"self-end "} >{default_value?"Update":"Add"}</Button>
          {
            default_value&&<Button type="button" className="self-end " variant={"destructive"} >{"Delete"}</Button>
          }
          <FormField control={form.control} name="isActive" render={({field})=>(
            <FormItem className=" w-min  justify-self-end" >
              <FormLabel>Active</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />
        
      </form>
    </Form>
  )
}

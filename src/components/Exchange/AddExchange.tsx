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
import { Type_INSERT_ExchangeType } from "@/database/scheemas/Exchange"
import { Textarea } from "../ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import useSWR from 'swr'
import { fetchChains } from "@/utils"

export const Exchange_Type=z.object({
    name:z.string({required_error:"required"}),
    factoryContractABI:z.string({required_error:"required"}),
    factoryContractAddress:z.string({required_error:"required"}).min(15,{message:"addresses have more than 15 length"}),
    getPairFunction:z.string({required_error:"required"}),
    additionalPairParameters:z.string().default(""),
    
    isActive:z.boolean().default(false),
    
    tokenPairContractABI:z.string({required_error:"required"}),
    getTokenReservesFunction:z.string({required_error:"required"}),
    additionalTokenReserveParameters:z.string().default(""),
    
    chain_id:z.number({required_error:"required"}),
    
    pairSwapAdditionalParameters:z.string({required_error:"required"}),
    pairSwapFunction:z.string({required_error:"required"}),
    pairSwapFunctionSignature:z.string({required_error:"required"}),
})

export function AddExchangeForm({default_value,className}:{default_value?:Type_INSERT_ExchangeType,className?:string}){

  const {data,error,isLoading}=useSWR("/api/chains",fetchChains)

  const router=useRouter();

  const form=useForm<z.infer<typeof Exchange_Type>>({resolver:zodResolver(Exchange_Type),defaultValues:default_value})

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(()=>console.log("Exchange form submitted"))} className={" h-auto grid grid-cols-1 gap-5 space-y-3 md:grid-cols-2 bg-lime-egg/30 p-1 md:p-5 "+className}>
        <div className=" grid grid-cols-1 space-x-2 space-y-3 justify-between">
          <FormField control={form.control} name="name" render={({field})=>(
            <FormItem className=" self-end">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className=" bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="chain_id" render={({field})=>(
            <FormItem className="">
              <FormLabel>Chain</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
              <FormControl>
              <SelectTrigger className="w-[180px] bg-transparent text-lime-egg">
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              </FormControl>
              <SelectContent>
                {
                  data&&data.map(({chainId,name}:{chainId:number,name:string})=>(
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
                <Input className=" bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

          <FormField control={form.control} name="factoryContractABI" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Factory contract ABI</FormLabel>
              <FormControl>
                <Textarea className=" w-full bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />
          <FormField control={form.control} name="getPairFunction" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Get pair function</FormLabel>
              <FormControl>
                <Input className=" w-full bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

          <FormField control={form.control} name="additionalPairParameters" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Additional pair parameters</FormLabel>
              <FormControl>
                <Input className=" w-full bg-transparent text-lime-egg" {...field} />
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
          <FormField control={form.control} name="tokenPairContractABI" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Token pair contract ABI</FormLabel>
              <FormControl>
                <Textarea className=" w-full bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
        </div>
        
        

        {/**Split here */}
        <div className=" grid grid-cols-1 space-x-2 space-y-3 justify-between">
          <FormField control={form.control} name="getTokenReservesFunction" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Get token reserves function</FormLabel>
              <FormControl>
                <Input className=" w-full bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
          <FormField control={form.control} name="additionalTokenReserveParameters" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Additional token reserves parameters</FormLabel>
              <FormControl>
                <Input className=" w-full bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />
          <FormField control={form.control} name="pairSwapFunction" render={({field})=>(
            <FormItem className=" ">
              <FormLabel>Pair swap function</FormLabel>
              <FormControl>
                <Input className=" w-full bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />
          <FormField control={form.control} name="pairSwapAdditionalParameters" render={({field})=>(
            <FormItem className="  ">
              <FormLabel>Pair swap additional parameters</FormLabel>
              <FormControl>
                <Input className=" w-full bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />
          <FormField control={form.control} name="pairSwapFunctionSignature" render={({field})=>(
            <FormItem className=" md:col-span-2 ">
              <FormLabel>Pair swap function Signature</FormLabel>
              <FormControl>
                <Textarea className=" w-full bg-transparent text-lime-egg" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

          <Button type="submit" className={!default_value?" self-end  ":"self-end "} >{default_value?"Update":"Add"}</Button>
          {
            default_value&&<Button type="button" className="self-end " variant={"destructive"} >{"Delete"}</Button>
          }
        </div>
        
      </form>
    </Form>
  )
}


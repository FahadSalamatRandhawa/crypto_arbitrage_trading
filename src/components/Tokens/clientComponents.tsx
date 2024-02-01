"use client"

import { Type_INSERT_TokenType, Type_SELECT_TokenType, Z_INSERT_TokenType } from "@/database/scheemas/Tokens"

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


export const TokenType=z.object({
    name:z.string({required_error:"required"}),
    symbol:z.string({required_error:"required"}),
    address:z.string().min(15,{message:"addresses have more than 15 length"}),
    isActive:z.boolean().default(false),
    currencyType:z.string().default(""),
    chain:z.string({required_error:"required"})
})
const default_Token_Value:Type_INSERT_TokenType={name:"Ethereum",address:"1234456awdnabdsa",isActive:false,symbol:"ETH",currencyType:"",chain:"ethereum"}


export const TokenAddForm=({default_value}:{default_value?:Type_INSERT_TokenType})=>{
    const router=useRouter()

    const form=useForm<z.infer<typeof TokenType>>({resolver:zodResolver(TokenType),defaultValues:default_value?default_value:default_Token_Value})

    async function AddTokenHandler(data:z.infer<typeof TokenType>){
        const apiCall=await fetch("/api/tokens",{method:"POST",body:JSON.stringify(data)})
        console.log(await apiCall.json())
        router.refresh()
    }
    
    return (
        <Form {...form} >
            <form  onSubmit={form.handleSubmit(AddTokenHandler)} className=" grid grid-cols-1 md:grid-cols-3 place-content-end justify-between gap-[20px] bg-lime-egg/30 p-3 ">
                <FormField control={form.control} name="name" render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input className=" bg-transparent text-lime-egg" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="chain" render={({field})=>(
                    <FormItem>
                        <FormLabel>Chain</FormLabel>
                        <FormControl>
                            <Input className=" w-[200px] bg-transparent text-lime-egg" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="symbol" render={({field})=>(
                    <FormItem className=" w-min justify-self-end">
                        <FormLabel>Symbol</FormLabel>
                        <FormControl>
                            <Input className=" w-[100px] bg-transparent text-lime-egg" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />

                <FormField control={form.control} name="address" render={({field})=>(
                    <FormItem className=" md:col-span-2 ">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input className=" w-full bg-transparent text-lime-egg" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />
                
                
                
                <FormField control={form.control} name="currencyType" render={({field})=>(
                    <FormItem className=" w-min justify-self-end">
                        <FormLabel>Token type</FormLabel>
                        <FormControl>
                            <Input type="text" className=" w-[100px] bg-transparent text-lime-egg" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />
                
                
                <Button type="submit" className={!default_value?"md:col-span-2 self-end  ":"self-end "} >{default_value?"Update":"Add"}</Button>
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
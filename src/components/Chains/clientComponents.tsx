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
import { Type_INSERT_ChainType, Type_SELECT_ChainType, Z_INSERT_ChainType } from "@/database/scheemas/chains";
import { useToast } from "../ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"
import { useState } from "react"


// const ChainType=z.object({
//     chainId:z.string({required_error:"required"}).transform((d)=>parseInt(d)),
//     name:z.string({required_error:"required"}),
//     type:z.string({required_error:"required"}),
// })

export function AddChain({default_value,className}:{default_value?:Type_SELECT_ChainType,className?:string}){
    const [isLoading,setIsLoading]=useState(false)
    const router=useRouter()
    const form=useForm<z.infer<typeof Z_INSERT_ChainType>>({resolver:zodResolver(Z_INSERT_ChainType),defaultValues:default_value})
    const {toast}=useToast()
    async function InsertChain(data:z.infer<typeof Z_INSERT_ChainType>){
        console.log("Inserting chain",data)
        try{
            setIsLoading(true)
            const result:any=await fetch('http://localhost:3000/api/chains',{method:default_value?'PUT':'POST',cache:"no-cache",body:JSON.stringify(data)})
            const resultData=await result.json()
            console.log(resultData)
            console.log(result)
            if(result.ok){
                console.log("response ok")
                toast({title:"Success",description:resultData.message})
                router.refresh()
            }else{
                console.log("response not ok")
                toast({title:"Failure",description:resultData.message})
            }
        }catch(err){
            toast({title:"Failure",description:"faced an error"})
        }

        router.refresh()
        setIsLoading(false)
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(InsertChain)} className={" grid grid-cols-1 rounded-md space-y-3 space-x-2 p-1 md:p-5 "+className}>
                <FormField control={form.control} name="chainId" render={({field})=>(
                    <FormItem>
                        <FormLabel>Chain id</FormLabel>
                        <FormControl>
                            <Input className="w-full bg-transparent " {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="name" render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input className="w-full bg-transparent " {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex justify-between ">
                    <FormField control={form.control} name="type" render={({field})=>(
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input className=" w-full bg-transparent " {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="isActive" render={({field})=>(
                        <FormItem className="grid h-full self-end mt-[3px] mr-[10px]">
                            <FormLabel>Active</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="rpcurl" render={({field})=>(
                    <FormItem>
                        <FormLabel>Rpc url</FormLabel>
                        <FormControl>
                            <Input className=" w-full bg-transparent " {...field} />
                        </FormControl>
                        <FormDescription>
                            you can get a url from private providers or from <code>https://chainlist.org/</code>
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" disabled={isLoading} className={!default_value?" self-end  ":"self-end "} >{default_value?"Update":"Add"}</Button>
                {
                    default_value&&<Button type="button" disabled={isLoading} className="self-end " variant={"destructive"} >{"Delete"}</Button>
                }
            </form>
        </Form>
    )
}
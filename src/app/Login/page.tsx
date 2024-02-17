'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
 


export const LoginPage=()=>{
    const router=useRouter()
    const { toast } = useToast()


    const formSchema = z.object({
        username: z.string().min(2,{message:"minimum 2 cahracters"}).max(50),
        password:z.string({required_error:"required"})
      })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username:"",
            password:""
        }
      })

      async function handleSubmit(data:z.infer<typeof formSchema>){
        const response=(await fetch("/api/login",{method:"POST",body:JSON.stringify(data)}))
        const res= await response.json()
        if(res.success){
            toast({title:"Success",description:res.message})
            router.push("/dashboard")
        }
        else{
            toast({title:"Failure",description:res.message})
        }
      }

    return(
    <div>
        <div className=" flex flex-col bg-gradient-to-tr  h-screen items-center p-5 text-white gap-[40%] ">
        <Popover>
            <PopoverTrigger className=" self-start rounded-xl border bg-button p-3 animate-wiggle ">Login Here</PopoverTrigger>
            <PopoverContent className="  text-black/80 bg-white/80 placeholder:text-white/20 w-screen md:min-w-[400px] md:w-auto ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} >
                        <FormField control={form.control} name="username" render={({field})=>(
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="enter your username" className="bg-transparent placeholder:text-white/80" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="enter your password" className=" bg-transparent placeholder:text-white/80" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <Button className=" mt-2" type="submit">Submit</Button>
                        
                    </form>
                </Form>
            </PopoverContent>
        </Popover>

        
        <div className=' text-4xl font-medium'>Wlecome to the future of trading, low risk high reward</div>
        
    </div>
    <Toaster/>
    </div>
    )
}
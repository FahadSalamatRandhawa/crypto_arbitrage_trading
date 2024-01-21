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

export const Exchange_Type=z.object({
    name:z.string({required_error:"required"}),
    factoryContractABI:z.string({required_error:"required"}),
    factoryContractAddress:z.string().min(15,{message:"addresses have more than 15 length"}),
    getPairFunction:z.string({required_error:"required"}),
    additionalPairParameters:z.string().optional(),
    isActive:z.boolean().default(false),
    tokenPairContractABI:z.string({required_error:"required"}),
    getTokenReservesFunction:z.string({required_error:"required"}),
    additionalTokenResercesParameters:z.string().optional(),
    chain:z.string({required_error:"required"}),
})


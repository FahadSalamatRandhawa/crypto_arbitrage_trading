export async function fetchChains(url:string){
    console.log("fetchChains function")
    try{
    const getChains=await fetch(`http://localhost:3000${url}`,{method:"GET",cache:"no-cache"});
    if(getChains.ok){
      const {data}=await getChains.json()
      console.log(data)
      return data;
    }else{
      return new Error("Error in chain API");
    }
    
    }catch(err){
        console.log("Error while fetching chains",err)
        return new Error("Error while fetching chains");
    }
  }

  export async function apiCallGET(url:string){
    console.log("get api call function")
    try{
    const apiCall=await fetch(`http://localhost:3000${url}`,{method:"GET",cache:"no-cache"});
    if(apiCall.ok){
      const {data}=await apiCall.json()
      console.log(data)
      return data;
    }else{
      return new Error("Error in calling API");
    }
    
    }catch(err){
        console.log("Error while fetching chains",err)
        return new Error("Error while fetching chains");
    }
  }

  export async function apiCallPOST(url:string,body:any){
    console.log("fetchChains function")
    try{
    const apiCall=await fetch(`http://localhost:3000${url}`,{method:"POST",cache:"no-cache",body:JSON.stringify(body)});
    if(apiCall.ok){
      const {data}=await apiCall.json()
      console.log(data)
      return data;
    }else{
      return new Error("Error in calling API");
    }
    
    }catch(err){
        console.log("Error while fetching chains",err)
        return new Error("Error while fetching chains");
    }
  }


  export const baseURL="http://localhost:3000"


import {keccak256, toUtf8Bytes} from 'ethers'
export function getFunctionSignature(functionName:string){
  
  return keccak256(toUtf8Bytes(functionName))
}
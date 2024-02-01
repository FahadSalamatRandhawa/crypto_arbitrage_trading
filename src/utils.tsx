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

  export const baseURL="http://localhost:300"
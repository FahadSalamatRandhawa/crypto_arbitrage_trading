import { Type_SELECT_TokenType } from "@/database/scheemas/Tokens";
import { TokenAddForm } from "../../../../components/Tokens/clientComponents";


export default async function ManageToken(){
    const tokensGet=await fetch("http://localhost:3000//api/tokens",{method:"GET"});
    const tokens:Type_SELECT_TokenType[]=(await tokensGet.json()).message
    return(
        <div className=" min-h-screen flex justify-between pt-[20px] lg:pt-[200px] text-white ">
            <div className=" w-full md:w-[400px] lg:w-[500px] xl:w-[600px] h-min flex flex-col space-y-5 py-[20px] px-[10px] ">
                {
                    tokens.map((token)=>{
                        return(
                            <TokenAddForm default_value={token} key={token['#']} />
                        )
                    })
                }
                <TokenAddForm />
            </div>
        </div>
    )
}

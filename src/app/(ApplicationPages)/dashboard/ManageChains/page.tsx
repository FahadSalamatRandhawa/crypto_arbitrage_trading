import { AddChain } from "@/components/Chains/clientComponents";
import ChainsView from "@/views/ChainsView";

export default async function ManageChains(){
    return(
        <div className=" min-h-screen flex text-white p-1 md:p-5">
            <ChainsView />
        </div>
    )
}
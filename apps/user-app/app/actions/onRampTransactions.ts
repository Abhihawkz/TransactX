import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client";

export default async function OnRampTransactionCreate({amount,provider,status}:{amount:number,provider:string,status:string}){
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;
    if(!userId){
        return{
            message:"Unauthenticated Request"
        }
    }
    const token = "tooakfhafafjdfahf";
    await prisma.onRampTransaction.create({
        data:{
            provider,
            amount:amount*100,
            startTime: new Date(),
            status : "Processing",
            token:token,
            userId:Number(session?.user?.userId)
        }
    });
    return {
        message:"done"
    }
}
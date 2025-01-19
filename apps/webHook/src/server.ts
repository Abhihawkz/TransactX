import express from "express";
import client from "@repo/db/client"


const app = express()
const port = 3003;
app.use(express.json())

interface paymentInfo {
    token:string,
    userId:string,
    amount:string
}

app.post('/bankWebHook',async(req,res)=>{
    const payment:paymentInfo = {
        token:req.body.token,
        userId:req.body.userId,
        amount:req.body.amount
    } 

    try {
        await client.$transaction([
            client.balance.updateMany({
                where:{
                    userId:Number(payment.userId),
                },
                data:{
                    amount:{
                        increment:Number(payment.amount)
                    }
                }
            }),
            client.onRampTransactions.updateMany({
                where:{
                    token:payment.token
                },
                data:{
                    status:"Success",
                }
            })
        ]);
        res.json({
            message:"Captured"
        })


    } catch (error) {
        console.error(error)
        res.status(411).json({msg:"Error while processing webhook "})
    }


})

app.listen(port,()=>{
    console.log(`Server : http://localhost:${port}`)
})
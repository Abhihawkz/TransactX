import { NextResponse } from "next/server"
import {PrismaClient} from "@repo/orm/client"

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "adafdsd",
            name: "adsaafdads"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}
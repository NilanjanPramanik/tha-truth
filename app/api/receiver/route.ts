import { NextResponse } from "next/server";
import db from '@/lib/db'

export async function POST(req: Request){
    const {receiverId} = await req.json();

    if (!receiverId) {
        return NextResponse.json({ error: "Invalid URL"}, {status: 404})
    }

    try {
        const receiver = await db.user.findUnique({
            where: {id: receiverId}
        })
        
        if (!receiver) {
            return NextResponse.json({error: "Reciver is not found"}, {status: 404})
        }

        const safeReciver = {
            name: receiver?.name,
            username: receiver?.username,
            isAcceptingMsg: receiver.isAcceptingMesseges
        }

        return NextResponse.json(safeReciver);
        
    } catch (error) {
        return NextResponse.json(error);    
    }

}
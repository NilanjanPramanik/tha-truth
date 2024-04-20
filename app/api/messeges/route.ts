import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import db from '@/lib/db'
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    console.log(session)
    
    if (!session?.user._id) {
        return NextResponse.json({error: "User not logged in"}, { status: 401 })
    }

    try {
        const user = await db.user.findUnique({
            where: { id: session.user._id },
            include: {
                messeges: {
                    orderBy: { createdAt: 'desc' }
                }
            },
        })

        if (!user) {
            return NextResponse.json({error: "User not exist."}, {status: 404})
        }

        const messeges = user.messeges;

        if (!messeges) {
            return NextResponse.json({error: "No messeges found."}, {status: 404})
        }

        return NextResponse.json(messeges)
        
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}
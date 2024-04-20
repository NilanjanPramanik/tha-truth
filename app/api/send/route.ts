import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";
import db from '@/lib/db'

export async function POST(req: Request) {
    const { text, recipentId } = await req.json();

    try {
        const existedUser = await db.user.findUnique({
            where: {id: recipentId}
        })

        if (!existedUser) {
            return NextResponse.json<ApiResponse>({
                success: false,
                messege: "User not exist."
            }, { status: 404 })
        }

        if (!existedUser.isAcceptingMesseges) {
            return NextResponse.json<ApiResponse>({
                success: false,
                messege: `${existedUser.username} is currently not accepting messeges.`
            }, { status: 401 })
        }

        const createdMsg = await db.messege.create({
            data: {
                text,
                recipentId,
            },
            include: {
                recipent: true
            },
        })

        if (!createdMsg) {
            return NextResponse.json<ApiResponse>({
                success: false,
                messege: "Failed to send messege"
            }, { status: 500 })
        }
        
        return NextResponse.json<ApiResponse>({
            success: true,
            messege: "Messege sent"
        }) 
        
    } catch (error) {
        return NextResponse.json<ApiResponse>({
            success: false,
            messege: "Something went wrong"
        }, { status: 500 })
    }
}
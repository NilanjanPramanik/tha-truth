import { NextResponse } from "next/server";
import db from '@/lib/db'

export async function POST(req: Request) {
    const { email, code } = await req.json();

    console.log(email)
    console.log(Number(code))

    try {
        const verifyingUser = await db.user.findFirst({
            where: {email}
        })

        if (verifyingUser?.isVerified === true) {
            return NextResponse.json("User is already verified.")
        }

        if (!verifyingUser) {
            return NextResponse.json({error: "User not exists"}, {status: 404});
        }
        
        if (verifyingUser.verifyCodeExpiry < new Date()) {
            return NextResponse.json({error: "Verification code expires."}, {status: 401});
        }
        
        if (verifyingUser.verifyCode !== Number(code)) {
            return NextResponse.json({error: "Verification code not matched."}, {status: 401});
        }

        await db.user.update({
            where: {id: verifyingUser.id},
            data: {
                isVerified: true
            }
        })

        return NextResponse.json("User verified successfully. Please login")

        
    } catch (error) {
        console.log("Failed to verify user.")
        return NextResponse.json({ error: "Failed to verify user."}, { status: 400 });
    }
}
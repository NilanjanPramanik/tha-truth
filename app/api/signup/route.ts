import { NextResponse } from "next/server";
import { Resend } from 'resend'
import bcrypt from 'bcryptjs';

import db from '@/lib/db';
import VerifyEmailTemplate from "@/emails/verification-email";

export async function POST(req: Request) {
    const { username, email, password } = await req.json();

    try {
        const userByEmail = await db.user.findFirst({
            where: { email }
        })

        if (userByEmail) {
            if (userByEmail.isVerified) {
                console.log("User by email is already verified.")

                return NextResponse.json({ error: "This email is already taken please use another email." }, { status: 400 })
            }

            if (userByEmail.verifyCodeExpiry > new Date()) {
                console.log("Verify code send already.")
                return NextResponse.json( "Verify code send already.", { status: 201 })
            }

            const verifyCode = Math.floor(100000 + Math.random() * 900000);
            const verifyCodeExpiry = new Date(Date.now() + 1000 * 3600);

            const updatedUser = await db.user.update({
                where: { email },
                data: {
                    verifyCode,
                    verifyCodeExpiry
                }
            })

            if (!updatedUser) {
                return NextResponse.json({ error: "Unable to update user." }, { status: 500 })
            }

            const resend = new Resend(process.env.RESEND_API_KEY);

            try {
                await resend.emails.send({
                    from: 'onbording@nilanjan.tech',
                    to: email,
                    subject: 'Email Verification',
                    text: `Hi ${username}`,
                    react: VerifyEmailTemplate({ username, verifyCode })
                });

                return NextResponse.json("Email sent successfully.");
            } catch (error) {
                console.log(error)
                return NextResponse.json({ error: "Faild to send verification email." }, { status: 500 });
            }
        }

        const userByUsername = await db.user.findUnique({
            where: { email: '', username: username },
        })

        if (userByUsername) {
            console.log("This username is already taken please use another username.")

            return NextResponse.json({ error: "This username is already taken please use another username." }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyCode = Math.floor(100000 + Math.random() * 900000)

        const user = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: new Date(Date.now() + 1000 * 3600)
            }
        })

        console.log("[NEW CREATED USER]", {user})

        if (!user) {
            return NextResponse.json({ error: "Unable to create user." }, { status: 500 })
        }

        if (user.isVerified) {
            return NextResponse.json({ error: "User is already verified." }, { status: 400 })
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Email Verification',
                text: `Hi ${username}`,
                react: VerifyEmailTemplate({ username, verifyCode })
            });

            return NextResponse.json("Email sent");
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: "Faild to send verification email." }, { status: 500 });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }

}
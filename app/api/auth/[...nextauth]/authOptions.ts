import db from '@/lib/db';
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'

// const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = ({
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials): Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalis credentials.");
                }

                try {
                    const user = await db.user.findFirst({
                        where: { email: credentials?.email }
                    })

                    if (!user) {
                        throw new Error("User not exists.");
                    }

                    if (!user.isVerified) {
                        throw new Error("User is not verified. Verify your email first.")
                    }

                    if (!user.password) {
                        throw new Error("No password.")
                    }

                    const comparePassword = await bcrypt.compare(credentials?.password!, user.password)

                    if (!comparePassword) {
                        return new Error("Incorrect password.");
                    }

                    return user;

                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.isVerified = user.isVerified,
                token.isAcceptingMesseges = user.isAcceptingMesseges,
                token.username = user.username
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user._id = token.sub,
                session.user.isVerified = token.isVerified,
                session.user.isAcceptingMesseges = token.isAcceptingMesseges,
                session.user.username = token?.username
            }
            return session
        },
    },

    pages: {
        signIn: '/login'
    },

    debug: process.env.NODE_ENV === 'development',

    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET

})
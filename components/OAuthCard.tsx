'use client'

import { signIn } from "next-auth/react"

const OAuthCard = () => {
    return (
        <div className="flex flex-col border border-zinc-700 rounded w-full items-center justify-center gap-4 p-4 sm:w-[400px]">
            <h3 className="text-zinc-500"> Or continue with</h3>
            <div className="flex gap-4 justify-evenly w-full">
                <button
                    onClick={() => signIn('google')}
                    className="border border-zinc-700 rounded  px-3 py-1 bg-zinc-800 text-zinc-400 w-[45%] hover:bg-zinc-900"
                >
                    Google
                </button>
                <button
                    className="border border-zinc-700 rounded  px-3 py-1 bg-zinc-800 text-zinc-400 w-[45%] hover:bg-zinc-900"
                >
                    Instagram
                </button>
            </div>
        </div>
    )
}

export default OAuthCard
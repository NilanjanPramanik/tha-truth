'use client'

import { signOut, useSession } from "next-auth/react"
import ThemeModeToggle from "./ThemeModeToggle"
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const TopBar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="bg-zinc-800 flex items-center justify-between px-8 h-[70px]">
            <h1
                onClick={() => router.push('/')}
                className="relative text-xl font-semibold text-orange-600 z-10"
            >
                Tha Truth
            </h1>
            <div className="absolute h-[20px] w-[20px] rounded-full bg-orange-700 opacity-20" />
            <div className="absolute h-[25px] w-[25px] rounded-full bg-orange-600 opacity-10" />
            <div className="absolute h-[30px] w-[30px] rounded-full bg-orange-500 opacity-10" />
            <div className="absolute h-[35px] w-[35px] rounded-full bg-orange-400 opacity-10" />
            <div className="absolute h-[40px] w-[40px] rounded-full bg-orange-300 opacity-10" />
            <div className="absolute h-[45px] w-[45px] rounded-full bg-orange-100 opacity-10" />
            <div className="flex gap-3 items-center hover:cursor-pointer">
                {session && <FaSignOutAlt size={24} onClick={() => signOut()} />}
                <ThemeModeToggle />
            </div>
        </div>
    )
}

export default TopBar
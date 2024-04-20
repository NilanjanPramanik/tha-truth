"use client"

import { BASE_URL } from "@/constant"
import { getSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import { toast } from "react-toast"

const CopyLinkCard = () => {
    const userId = useRef<string | undefined>();
    
    const pasteToClipbord = () => {
        const url = `${BASE_URL}/send?to=${userId.current}`
        navigator.clipboard.writeText(url)
        toast.success("Link coppied")
    }
    
    useEffect(() => {
        const session = getSession();
        session.then((res) => {
            if(res?.user) {      
                userId.current = res?.user._id
            }
        })
    }, [])

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-semibold text-zinc-500">Start getting messeges...</h2>
            <button
                onClick={pasteToClipbord}
                className="border border-zinc-700 hover:bg-zinc-800 px-3 py-1 rounded-xl"
            >Click</button>
        </div>
    )
}

export default CopyLinkCard
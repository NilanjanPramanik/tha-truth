"use client"

import { BASE_URL } from "@/constant"
import { getSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import { toast } from "react-toast"
import { useToast } from "./ui/use-toast"

const CopyLinkCard = () => {
    const { toast } = useToast()
    const userId = useRef<string | undefined>();
    
    const pasteToClipbord = () => {
        const url = `https://${process.env.NEXT_PUBLIC_API_URL}/send?to=${userId.current}`
        navigator.clipboard.writeText(url)
        toast({
            description: "Link copied to clipboard",
            style: {backgroundColor: 'black', borderRadius: '10px'}
        });
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
            <h2 className="text-md font-semibold text-zinc-500">Click the button to copy the link</h2>
            <button
                onClick={pasteToClipbord}
                className="border border-zinc-700 hover:bg-zinc-800 px-3 py-1 rounded-xl"
            >Copy</button>
        </div>
    )
}

export default CopyLinkCard
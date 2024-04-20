'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toast"


const ComposeMsgContainer = () => {
    const params = useSearchParams();
    const [value, setValue] = useState('');

    const onSubmit = async () => {
        if (value.length < 3) {
            return toast.error("Minimun required 3 charecters")
        }
        await axios.post('/api/send', { text: value, recipentId: params.get('to') })
            .then((res) => {
                // console.log(res)
                toast.success("Messege sent!")
            })
            .catch(() => {
                toast.error("Unable to send messeges.")
            })
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 h-screen gap-6">
            <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={10}
                maxLength={300}
                className="w-full sm:w-[500px] rounded bg-zinc-900"
            />
            <Button onClick={onSubmit} className="border border-zinc-700 rounded w-full sm:w-[500px] hover:bg-zinc-800">Send</Button>
        </div>
    )
}

export default ComposeMsgContainer
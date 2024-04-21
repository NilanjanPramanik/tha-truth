'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import MoonLoader from "react-spinners/MoonLoader"
import { toast } from "react-toast"
import TopBar from "./TopBar"
import { SafeReceiver } from "@/types"


const ComposeMsgContainer = () => {
    const params = useSearchParams();
    const [value, setValue] = useState('');
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [isPageReady, setPageReady] = useState(false);
    const [isOneMsgSent, setOneMsgSent] = useState(false);

    const [receiverData, setReceiverData] = useState<SafeReceiver | null>(null)

    const onSubmit = async () => {
        if (value.length < 3) {
            return toast.error("Minimun required 3 charecters")
        }
        setIsBtnLoading(true);

        await axios.post('/api/send', { text: value, recipentId: params.get('to') })
            .then((res) => {
                // console.log(res)
                setOneMsgSent(true);
                setValue('');
                toast.success("Messege sent!")
            })
            .catch(() => {
                toast.error("Unable to send messeges.")
            })
            .finally(() => {
                setIsBtnLoading(false)
            })
    }

    const getReceiver = useCallback(async () => {
        const receiverId = params.get('to');
        if (receiverId) {
            await axios.post('/api/receiver', { receiverId })
                .then((res) => {
                    // console.log(res.data)
                    setReceiverData({
                        name: res.data.name as string,
                        username: res.data.username,
                        isAcceptingMsg: res.data.isAcceptingMsg as boolean
                    })
                    return res.data
                })
                .catch((err) => {
                    console.log(err)
                    return null
                })
                .finally(() => setPageReady(true))
        }

    }, [params, setReceiverData]);

    useEffect(() => {
        getReceiver()
    }, [getReceiver]);


    return (
        <div className=" h-screen ">
            <div className="z-20">
                <TopBar />
            </div>
            {!isPageReady && (
                <MoonLoader
                    color='#ffffff'
                    size={60}
                    speedMultiplier={1.5}
                    className="mx-auto my-12"
                />
            )}

            {isPageReady && !receiverData?.isAcceptingMsg && (
                <p>Woops! {receiverData?.name || receiverData?.username} is not accepting messeges.</p>
            )}

            {isPageReady && receiverData?.isAcceptingMsg && (
                <div className="flex flex-col gap-10">
                    <h2 className="text-center pt-6">Send any thing to {receiverData?.name || receiverData?.username}</h2>

                    <div className="p-4 flex flex-col sm:items-center sm:justify-center gap-6">
                        <Textarea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            rows={10}
                            maxLength={300}
                            className="w-full sm:w-[500px] rounded bg-zinc-900"
                        />
                        <Button disabled={isBtnLoading} onClick={onSubmit} className="border border-zinc-700 rounded w-full sm:w-[500px] hover:bg-zinc-800">
                            {isBtnLoading ? (
                                <MoonLoader
                                    color='#ffffff'
                                    size={20}
                                    speedMultiplier={1.5}
                                />
                            ) : "Send"}
                        </Button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ComposeMsgContainer
import ComposeMsgContainer from "@/components/ComposeMsgContainer"
import { Suspense } from "react"
import MoonLoader from "react-spinners/MoonLoader"

const MessegeSendingPage = () => {
    return (
        <Suspense
            fallback={
                <div>
                    <MoonLoader
                        color='#ffffff'
                        size={20}
                        speedMultiplier={1.5} />
                </div>
            }
        >
            <ComposeMsgContainer />
        </Suspense>
    )
}

export default MessegeSendingPage
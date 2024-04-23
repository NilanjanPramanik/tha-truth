'use client'

import { Messege } from "@prisma/client";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import MsgCard from "./MsgCard";
import ClipLoader from "react-spinners/ClipLoader";
import { TbReload } from "react-icons/tb";

const MsgContainer = ({refresh}: {refresh: boolean}) => {
  const [isLoading, setLoading] = useState(true)
  const [messeges, setMesseges] = useState<[Messege] | []>([]);


  const getMesseges = useCallback(async () => {
    setLoading(true)
    console.log("Use callback ran.")

    await axios.get('/api/messeges')
      .then((res) => {
        setMesseges(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))

  }, [setLoading, setMesseges]);


  useEffect(() => {
    console.log("Use effect ran.")
    getMesseges()

  }, [refresh, getMesseges])

  if (isLoading) {
    return (
      <div className="flex mt-12 items-center justify-center">
        <ClipLoader
          color='#ffffff'
          size={50}
          speedMultiplier={1.5}
        />
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-4 sm:grid grid-cols-2 lg:grid-cols-3 pb-6">
      {isLoading && messeges.length === 0 ? (
          <h4>You dont have messeges yet!</h4>
      ) : messeges.map((msg) => (
        <MsgCard key={msg.id} text={msg.text} time={msg.createdAt} />
      ))}
    </div>
  )
}

export default MsgContainer
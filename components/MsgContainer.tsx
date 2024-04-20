'use client'

import { Messege } from "@prisma/client";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react"
import MsgCard from "./MsgCard";
import ClipLoader from "react-spinners/ClipLoader";

const MsgContainer = () => {
  const [isLoading, setLoading] = useState(true)
  const [messeges, setMesseges] = useState<[Messege] | []>([]);

  useEffect(() => {
    setLoading(true)

    axios.get('/api/messeges')
      .then((res) => {
        setMesseges(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))

  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <ClipLoader
          color='#ffffff'
          size={50}
          speedMultiplier={1.5}
        />
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-4 p-8">
      {isLoading && messeges.length === 0 ? (
        <h4>You dont have messeges yet!</h4>
      ) : messeges.map((msg) => (
        <MsgCard key={msg.id} text={msg.text} time={msg.createdAt}/>
      ))}
    </div>
  )
}

export default MsgContainer
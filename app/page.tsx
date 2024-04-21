"use client"

import ThemeModeToggle from "@/components/ThemeModeToggle";
import Image from "next/image";
import { getCurrentUser } from "../actions/getCurrentUser";
import CopyLinkCard from "@/components/CopyLinkCard";
import MsgContainer from "@/components/MsgContainer";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TopBar from "@/components/TopBar";
import { TbReload } from "react-icons/tb";


export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const [refresh, setRefresh] = useState(false);

  const handleRedirect = useCallback(() => {
    // console.log("ROuter run")
    if (!session?.user) {
      router.push('/login')
    }
  }, [session?.user, router])

  useEffect(() => {
    handleRedirect()

  }, [handleRedirect]);

  useCallback(() => {
    if (!session?.user) {
      return (
        <p>You are not logged in.</p>
      )
    }
  }, [session?.user]);

  return (
    <main className="h-screen overflow-hidden ">
      <TopBar />

      {session?.user && (
        <div className="flex flex-col gap-4 h-full">
          <div className="text-center p-4">
            <h2 className="text-xl font-light text-zinc-300">Welcome&nbsp;
              <span className="text-2xl font-semibold">{session.user.name || session.user.username}</span>
            </h2>
            <p className="text-zinc-500">Start the game of truth and lies.</p>
          </div>
          <CopyLinkCard />

          <hr className=" opacity-30 mx-8" />

          <div className="flex flex-col gap-2 items-center h-4/5 relative">
            <h4 className="text-center text-lg text-zinc-600">Your messeges</h4>
            <TbReload onClick={() => setRefresh((val) => !val)} size={25} className="absolute right-8 text-zinc-600 hover:cursor-pointer"/>
            <div className="h-3/4 overflow-y-scroll scroll-smooth pb-12">
              <MsgContainer refresh={refresh}/>
            </div>
          </div>
        </div>
      )
      }
    </main>
  );
}

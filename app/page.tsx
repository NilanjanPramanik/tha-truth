"use client"

import ThemeModeToggle from "@/components/ThemeModeToggle";
import Image from "next/image";
import { getCurrentUser } from "../actions/getCurrentUser";
import CopyLinkCard from "@/components/CopyLinkCard";
import MsgContainer from "@/components/MsgContainer";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function Home() {
  // const session = await getCurrentUser();
  const {data: session} = useSession();
  const router = useRouter();

  const handleRedirect = useCallback(() => {
    console.log("ROuter run")
    if(!session?.user) {
      router.push('/login')
    }
  }, [session?.user]) 

  useEffect(() => {
    handleRedirect()

  }, []);

  useCallback(() => {
    if (!session?.user) {
      return (
        <p>You are not logged in.</p>
      )
    }
  }, [session?.user]);
  
  return (
    <main>
      <ThemeModeToggle />
      <CopyLinkCard />
      { session?.user && (
        <MsgContainer />
      )
      }
    </main>
  );
}

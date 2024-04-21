"use client"

import ThemeModeToggle from "@/components/ThemeModeToggle";
import Image from "next/image";
import { getCurrentUser } from "../actions/getCurrentUser";
import CopyLinkCard from "@/components/CopyLinkCard";
import MsgContainer from "@/components/MsgContainer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default async function Home() {
  // const session = await getCurrentUser();
  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user._id) {
      router.push('/login');
    }
  } , [session?.user._id])
  
  return (
    <main>
      <ThemeModeToggle />
      <CopyLinkCard />
      <MsgContainer />
    </main>
  );
}

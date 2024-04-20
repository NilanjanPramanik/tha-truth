import ThemeModeToggle from "@/components/ThemeModeToggle";
import Image from "next/image";
import { getCurrentUser } from "../actions/getCurrentUser";
import CopyLinkCard from "@/components/CopyLinkCard";
import MsgContainer from "@/components/MsgContainer";


export default async function Home() {
  const session = await getCurrentUser();
  
  return (
    <main>
      <ThemeModeToggle />
      <CopyLinkCard />
      <MsgContainer />
    </main>
  );
}

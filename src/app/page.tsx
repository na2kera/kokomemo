import Send from "./components/Send";
import Room from "./components/Room";
import { UserButton } from "@clerk/nextjs";
require("dotenv").config();

export default function Home() {
  return (
    <>
      <Room />
      <UserButton afterSignOutUrl="/" />
      <Send />
    </>
  );
}

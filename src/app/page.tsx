import Send from "./components/Send";
import Room from "./components/Room";
require("dotenv").config();

export default function Home() {
  return (
    <>
      <Room />
      <Send />
    </>
  );
}

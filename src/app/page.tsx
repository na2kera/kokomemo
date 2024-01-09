import Link from "next/link";
import Post from "./components/Post";
require("dotenv").config();

export default function Home() {
  return (
    <>
      <Link href="/map">
        <button
          className="w-1/10 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
        >
          地図を表示
        </button>
      </Link>

      <Post />
    </>
  );
}

"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const Room = () => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/map/${roomNameRef.current?.value}`);
  };

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <input
            id="roomName"
            name="roomName"
            ref={roomNameRef}
            type="text"
            required
            className="mt-1 block  border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="ルーム名を入力"
          />
          <button
            className="w-1/10 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            地図を表示
          </button>
        </div>
      </form>
    </div>
  );
};

export default Room;

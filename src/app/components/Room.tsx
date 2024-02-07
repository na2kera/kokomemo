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
        <div>
          <label htmlFor="roomName">ルーム名</label>
          <input
            id="roomName"
            name="roomName"
            ref={roomNameRef}
            type="text"
            required
          />
        </div>
        <button
          className="w-1/10 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          地図を表示
        </button>
      </form>
    </div>
  );
};

export default Room;

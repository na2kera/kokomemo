"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Send = () => {
  const [username, setUsername] = useState<String>("");
  const [detail, setDetail] = useState<String>("");
  const [roomKey, setRoomKey] = useState<String>("");
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const router = useRouter();

  const getLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    function success(pos: any) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      setLatitude(crd.latitude);
      setLongitude(crd.longitude);
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //ここで新規登録を行うAPIを叩く
    try {
      e.preventDefault();
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const formData = new FormData(e.currentTarget);

      const objectFormData = Object.fromEntries(formData);
      objectFormData.latitude = latitude.toString();
      objectFormData.longitude = longitude.toString();

      const response = await fetch(`http://localhost:3000/api/list`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(objectFormData),
      });
      const data = await response.json();
      console.log(data);
      router.push(`/map/${objectFormData.roomKey}`);
    } catch (err) {
      alert("入力内容が正しくありません。");
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="flex flex-col justify-center sm:px-6 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          メモを作成
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                username
              </label>
              <input
                id="user"
                name="user"
                type="text"
                autoComplete="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="detail"
                className="block text-sm font-medium text-gray-700"
              >
                detail
              </label>
              <input
                id="detail"
                name="detail"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDetail(e.target.value)
                }
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="detail"
                className="block text-sm font-medium text-gray-700"
              >
                room-key
              </label>
              <input
                id="roomKey"
                name="roomKey"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRoomKey(e.target.value)
                }
              />
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="w-1/10 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={getLocation}
              >
                現在地を所得
              </button>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                新規メモを追加
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Send;

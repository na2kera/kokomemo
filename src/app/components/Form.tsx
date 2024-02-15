import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

const Form = () => {
  const [username, setUsername] = useState<String>("");
  const [detail, setDetail] = useState<String>("");
  const [roomKey, setRoomKey] = useState<String>("");
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [bool, setBool] = useState(true);
  const router = useRouter();

  const { user } = useUser();

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

      const response = await fetch(`/api/list`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(objectFormData),
      });
      const data = await response.json();
      console.log(data);
      router.push(`/Map/${objectFormData.roomKey}`);
    } catch (err) {
      alert("入力内容が正しくありません。");
    }
  };

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
      setBool(false);
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setBool(true);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div className="bg-white pb-20 px-4 mt-3 shadow sm:rounded-lg sm:px-10">
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-700 pt-6"
          >
            名前
          </label>
          <input
            id="user"
            name="user"
            value={user?.firstName || ""}
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
            コメント
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
            htmlFor="roomKey"
            className="block text-sm font-medium text-gray-700"
          >
            ルーム名
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
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={getLocation}
          >
            現在地を所得
          </button>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={bool}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-200"
          >
            新規メモを追加
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

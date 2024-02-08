"use client";
import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import getLocationData from "./getLocationData";
import Link from "next/link";

const map = ({ params }: { params: { roomKey: string } }) => {
  const [latitudeNow, setLatitudeNow] = useState(34.6133956);
  const [longitudeNow, setLongitudeNow] = useState(140.1015564);
  const [locationData, setLocationData] = useState([]);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      const locationData = await getLocationData(params.roomKey);
      setLocationData(locationData);
    };
    console.log(locationData);
    fetchLocationData();
  }, []);
  const container = {
    width: "100%",
    height: "100vh",
  };
  const position = { lat: latitudeNow, lng: longitudeNow };

  const getLocationNow = () => {
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

      setLatitudeNow(crd.latitude);
      setLongitudeNow(crd.longitude);
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const handleActiveMarker = (markerId: number) => {
    if (markerId === activeMarker) {
      return setActiveMarker(null);
    }
    setActiveMarker(markerId);
  };

  return (
    <>
      <div className="wrap">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
        >
          <GoogleMap mapContainerStyle={container} center={position} zoom={20}>
            {locationData.map((data: Data) => (
              <MarkerF
                key={data.id}
                position={{
                  lat: parseFloat(data.latitude),
                  lng: parseFloat(data.longitude),
                }}
                label={data.user}
                onClick={() => handleActiveMarker(data.id)}
              >
                {activeMarker === data.id ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <h2>{data.user}</h2>
                      <p>表示しました</p>
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            ))}
          </GoogleMap>
        </LoadScript>
        <Link href="/" className="fixed left-0 bottom-0">
          <button
            className="w-1/10 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
          >
            戻る
          </button>
        </Link>
        <button
          className="fixed right-0 bottom-0 w-1/10 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
          onClick={getLocationNow}
        >
          現在位置
        </button>
      </div>
    </>
  );
};

export default map;

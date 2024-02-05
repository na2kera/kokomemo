"use client";
import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import getLocationData from "./getLocationData";

const map = ({ params }: { params: { roomKey: string } }) => {
  const [locationData, setLocationData] = useState([]);

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
  const position = { lat: 35.6133956, lng: 140.1015564 };

  return (
    <>
      <div className="wrap">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
        >
          <GoogleMap mapContainerStyle={container} center={position} zoom={15}>
            {locationData.map((data: Data) => (
              <MarkerF
                key={data.id}
                position={{
                  lat: parseFloat(data.latitude),
                  lng: parseFloat(data.longitude),
                }}
                label={data.detail}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};

export default map;

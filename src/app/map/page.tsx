"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
require("dotenv").config();

function map() {
  const container = {
    width: "100%",
    height: "100vh",
  };
  const position = { lat: 61.2176, lng: -149.8997 };

  return (
    <>
      <div className="wrap">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
        >
          <GoogleMap
            mapContainerStyle={container}
            center={position}
            zoom={15}
          ></GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default map;

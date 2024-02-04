"use client";
import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
require("dotenv").config();

const map = async () => {
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
            <MarkerF position={position} label="label" />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};

export default map;

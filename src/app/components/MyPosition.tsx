import { MarkerF } from "@react-google-maps/api";
import React from "react";

type TProps = {
  latNow: number;
  lonNow: number;
};

const MyPosition: React.FC<TProps> = ({ latNow, lonNow }) => {
  return (
    <MarkerF
      position={{
        lat: latNow,
        lng: lonNow,
      }}
      icon={"https://maps.google.com/mapfiles/kml/pal3/icon28.png"}
      zIndex={999}
    />
  );
};

export default MyPosition;

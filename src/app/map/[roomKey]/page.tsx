"use client";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import getLocationData from "./getLocationData";
import { IconButton } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import BackButton from "@/app/components/BackButton";
import MyPosition from "@/app/components/MyPosition";
import PositionPins from "@/app/components/PositionPins";

const libraries: ("geometry" | "drawing")[] = ["geometry", "drawing"];

const Map = ({ params }: { params: { roomKey: string } }) => {
  const [latitudeNow, setLatitudeNow] = useState(135);
  const [longitudeNow, setLongitudeNow] = useState(35);
  const [screenLongitude, setScreenLongitude] = useState(135);
  const [screenLatitude, setScreenLatitude] = useState(35);
  const [locationData, setLocationData] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    const fetchLocationData = async () => {
      const locationData = await getLocationData(params.roomKey);
      setLocationData(locationData);
    };
    fetchLocationData();
    getLocationNow();
  }, []);

  const container = {
    width: "100%",
    height: "100vh",
  };

  const position = { lat: screenLatitude, lng: screenLongitude };

  const getLocationNow = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    function success(pos: any) {
      const crd = pos.coords;

      setLatitudeNow(crd.latitude);
      setLongitudeNow(crd.longitude);
      setScreenLatitude(crd.latitude);
      setScreenLongitude(crd.longitude);
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <>
      <div className="wrap">
        {isLoaded && (
          <GoogleMap mapContainerStyle={container} center={position} zoom={20}>
            <MyPosition latNow={latitudeNow} lonNow={longitudeNow} />
            <PositionPins locationData={locationData} />
          </GoogleMap>
        )}
        <BackButton />
        <IconButton
          onClick={getLocationNow}
          sx={{
            borderRadius: "50%",
            height: 50,
            width: 50,
            position: "fixed",
            right: 20,
            bottom: 15,
            backgroundColor: "#4F46E5 !important",
            "&:focus": {
              outline: "none",
              boxShadow: `0 0 0 2px #fff, 0 0 0 4px #3f51b5`,
            },
          }}
        >
          <NearMeIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
    </>
  );
};

export default Map;

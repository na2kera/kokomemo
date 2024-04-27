import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";

type TProps = {
  locationData: Data[];
};

const PositionPins: React.FC<TProps> = ({ locationData }) => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const handleActiveMarker = (markerId: number) => {
    if (markerId === activeMarker) {
      return setActiveMarker(null);
    }
    setActiveMarker(markerId);
  };

  const japanDate = (data: string) => {
    const date = new Date(data);
    return Date.parse(date.toLocaleString("ja-JP"));
  };

  const agoDate = (data: string) => {
    const agoDate = Date.now() - japanDate(data);
    const min = Math.floor(agoDate / 1000 / 60);
    return min;
  };
  return (
    <>
      {locationData
        .filter((data: Data) => agoDate(data.date) < 15)
        .map((data: Data) => (
          <MarkerF
            key={data.id}
            position={{
              lat: parseFloat(data.latitude),
              lng: parseFloat(data.longitude),
            }}
            label={data.user}
            zIndex={998}
            onClick={() => handleActiveMarker(data.id)}
          >
            {activeMarker === data.id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <p>{data.user}</p>
                  <p className="text-xl">{data.detail}</p>
                  <p>{agoDate(data.date)}分前</p>
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}
      {locationData
        .filter(
          (data: Data) => agoDate(data.date) >= 15 && agoDate(data.date) < 60
        )
        .map((data: Data) => (
          <MarkerF
            key={data.id}
            position={{
              lat: parseFloat(data.latitude),
              lng: parseFloat(data.longitude),
            }}
            icon={"https://maps.google.com/mapfiles/ms/micons/blue.png"}
            onClick={() => handleActiveMarker(data.id)}
          >
            {activeMarker === data.id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <p>{data.user}</p>
                  <p className="text-xl">{data.detail}</p>
                  <p>{agoDate(data.date)}分前</p>
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}
    </>
  );
};

export default PositionPins;

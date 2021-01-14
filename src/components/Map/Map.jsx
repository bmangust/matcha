import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import MyMarker from "./MyMarker/MyMarker";

const SetBoundingRect = ({ strangers }) => {
  const map = useMap();
  const getBounds = (strangers) => {
    if (!strangers || !strangers.length) return null;
    return strangers.reduce(
      (accumulator, cur) => {
        const acc = [[...accumulator[0]], [...accumulator[1]]];
        if (acc[0][0] > cur.position.lat) acc[0][0] = cur.position.lat;
        if (acc[0][1] > cur.position.lon) acc[0][1] = cur.position.lon;
        if (acc[1][0] < cur.position.lat) acc[1][0] = cur.position.lat;
        if (acc[1][1] < cur.position.lat) acc[1][1] = cur.position.lon;
        return acc;
      },
      [
        [90, 360],
        [-90, 0],
      ]
    );
  };

  const bounds = useMemo(() => getBounds(strangers), [strangers]);

  useEffect(() => {
    if (!bounds) return;
    map.fitBounds(bounds);
  });

  return null;
};

const Map = ({ strangers }) => {
  const {
    position: { lat, lon },
  } = useSelector((state) => state.general);
  console.log(lat, lon);
  return (
    <MapContainer
      style={{ height: "70vh", width: "100%", zIndex: 10 }}
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {strangers &&
        strangers.map((user) => <MyMarker key={user.id} user={user} />)}
      <SetBoundingRect strangers={strangers} />
    </MapContainer>
  );
};

export default Map;

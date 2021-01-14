import React, { useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MyMarker from "./MyMarker/MyMarker";

const GetBoundingRect = ({ strangers }) => {
  const map = useMap();
  const getBounds = (strangers) => {
    if (!strangers || !strangers.length)
      return [
        [0, 0],
        [0, 0],
      ];
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

  const getCenter = (min, max) =>
    min < max ? min + (max - min) / 2 : max + (min - max) / 2;

  const bounds = useMemo(() => getBounds(strangers), [strangers]);
  const center = [
    getCenter(bounds[0][0], bounds[1][0]),
    getCenter(bounds[0][1], bounds[1][1]),
  ];
  React.useEffect(() => {
    // console.log(map, bounds);
    map.fitBounds(bounds);
  }, [bounds, center, map]);

  return null;
};

const Map = ({ strangers }) => {
  console.log(strangers);
  return (
    <MapContainer
      style={{ height: "70vh", width: "100%", zIndex: 10 }}
      center={[0, 0]}
      zoom={3}
      scrollWheelZoom={true}
    >
      <GetBoundingRect />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {strangers &&
        strangers.map((user) => <MyMarker key={user.id} user={user} />)}
    </MapContainer>
  );
};

export default Map;

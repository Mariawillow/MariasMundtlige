"use client";

const MakeEventLocationClient = ({ locations }) => {
  return (
    <ul>
      {locations.map((location) => (
        <li key={location.id}>{location.address}</li>
      ))}
    </ul>
  );
};

export default MakeEventLocationClient;

import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

// styles: snazzymaps stlye
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Place = () => {
  const [libraries] = useState(["places"]);
  const [center, setCenter] = useState({
    lat: 22.3061193,
    lng: 114.260494,
  });
  const [showInfoWindow, setshowInfoWindow] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });

  const infoWindowHandler = () => {
    setshowInfoWindow(!showInfoWindow);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";
  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={options}
      >
        {/* Marker props
        icon={{
          url: "/assets/img", 
          scaledSize: new window.google.maps.Size(30, 30), 
          origin: new window.google.maps.Point(0, 0), 
          anchor: new window.google.map.Point(15, 15)
        }} */}
        <Marker position={center} onClick={infoWindowHandler} />
        {showInfoWindow && (
          <InfoWindow position={center} onCloseClick={infoWindowHandler}>
            <h1>hi</h1>
          </InfoWindow>
        )}
      </GoogleMap>
    </Wrapper>
  );
};

export default Place;

const Wrapper = styled.div``;

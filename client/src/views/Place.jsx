import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Container from "@material-ui/core/Container";
import { FaThumbtack } from "react-icons/fa";
import Heart from "react-animated-heart";
import Chart from "../components/Chart";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
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

  const [fav, setFav] = useState(false);

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
      <CustomContainer>
        <Info>
          <NameWrapper>
            <Name>Fishing Heya</Name>
            <Heart isClick={fav} onClick={() => setFav(!fav)} />
          </NameWrapper>
          <Address>
            Shop B3, Treasure World, Site 11, Whampoa Garden, Hung Hom, Hong
            Kong
          </Address>
          <Rating>3.9</Rating>
          <LocationWrapper>
            <FaThumbtack />
            <Location>22.3061193, 114.260494</Location>
          </LocationWrapper>
        </Info>
        <Chart />

        <Comments>
          <CommentsTitle>Comments</CommentsTitle>
        </Comments>
      </CustomContainer>
    </Wrapper>
  );
};

export default Place;

const Wrapper = styled.div``;

const CustomContainer = styled(Container)``;

const Info = styled.div`
  padding-top: 80px;
  margin-bottom: 60px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Name = styled.h2`
  font-size: 30px;
  font-weight: 600;
`;

const Address = styled.span`
  font-size: 18px;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
`;

const Rating = styled.span`
  font-size: 18px;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Location = styled.span`
  font-size: 18px;
  font-weight: 500;
  display: block;
  margin-left: 12px;
`;

const Comments = styled.div``;

const CommentsTitle = styled.span`
  display: block;
  font-size: 30px;
  font-weight: 700;
`;

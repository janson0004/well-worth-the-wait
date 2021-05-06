import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Container from "@material-ui/core/Container";
import { FaThumbtack, FaStar } from "react-icons/fa";
import Heart from "react-animated-heart";
import Chart from "../components/Chart";
import { MEDIA_BREAK } from "../components/GlobalStyle";
import Comment from "../components/Comment";
import TextField from "@material-ui/core/TextField";
import { IoMdSend } from "react-icons/io";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

// styles: snazzymaps stlye
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const waitTimeData = {
  ten_hour_wait: [0, 0, 0, 0, 0, 15, 15, 0, 0, 0],
  seven_day_wait: [0, 0, 0, 0, 0, 0, 0],
};

const waitTimeLabel = {
  ten_hour_wait: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  seven_day_wait: [1, 2, 3, 4, 5, 6, 7],
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
        <LeftWrapper>
          <Info>
            <NameWrapper>
              <Name>Fishing Heya</Name>
              <Heart isClick={fav} onClick={() => setFav(!fav)} />
            </NameWrapper>
            <Address>
              Shop B3, Treasure World, Site 11, Whampoa Garden, Hung Hom, Hong
              Kong
            </Address>
            <RatingWrapper>
              <Rating>3.9</Rating>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </RatingWrapper>
            <LocationWrapper>
              <FaThumbtack />
              <Location>22.3061193, 114.260494</Location>
            </LocationWrapper>
          </Info>
          <Chart
            title="Waiting Time in the past 10 hours"
            data={waitTimeData.ten_hour_wait}
            labels={waitTimeLabel.ten_hour_wait}
          />
          <Chart
            title="Waiting Time in this hour of past 7 days"
            data={waitTimeData.seven_day_wait}
            labels={waitTimeLabel.seven_day_wait}
          />
        </LeftWrapper>
        <RightWrapper>
          <Comments>
            <CommentsTitle>Comments</CommentsTitle>
            <TextFieldWrapper>
              <CustomTextField
                multiline
                variant="filled"
                label="Enter your comment..."
                InputProps={{ disableUnderline: true }}
                rows={3}
              ></CustomTextField>
              <Button>
                <IoMdSend />
              </Button>
            </TextFieldWrapper>

            <Comment />
          </Comments>
        </RightWrapper>
      </CustomContainer>
    </Wrapper>
  );
};

export default Place;

const Wrapper = styled.div`
  padding-bottom: 180px;
`;

const CustomContainer = styled(Container)`
  &.MuiContainer-root {
    display: flex;
    flex-wrap: wrap;
  }
`;

const LeftWrapper = styled.div`
  width: 100%;

  @media (min-width: ${MEDIA_BREAK.lg}) {
    flex: 0 0 70%;
    max-width: 70%;
  }
`;

const RightWrapper = styled.div`
  width: 100%;

  @media (min-width: ${MEDIA_BREAK.lg}) {
    flex: 0 0 30%;
    max-width: 30%;
  }
`;

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
  margin-bottom: 12px;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: top;
  margin-bottom: 12px;

  svg {
    font-size: 18px;
    color: #ffb800;
    margin-right: 8px;
  }
`;

const Rating = styled.span`
  font-size: 18px;
  font-weight: 500;
  display: block;
  margin-right: 15px;
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

const Comments = styled.div`
  padding-top: 114px;
`;

const CustomTextField = styled(TextField)`
  width: 100%;

  .MuiInputBase-root.MuiFilledInput-root.MuiInputBase-formControl.MuiInputBase-multiline.MuiFilledInput-multiline {
    border-radius: 12px;
  }

  .MuiInputBase-input.MuiFilledInput-input.MuiInputBase-inputMultiline.MuiFilledInput-inputMultiline {
    color: ${({ theme }) => theme.mono.secondary};
  }
`;

const TextFieldWrapper = styled.div`
  position: relative;
  margin-bottom: 25px;
`;

const Button = styled.button`
  position: absolute;
  bottom: 4px;
  right: 4px;
  border: none;
  outline: none;
  border-radius: 12px;
  padding: 10px;
  background-color: ${({ theme }) => theme.theme.main};
  color: ${({ theme }) => theme.mono.contrast};
`;

const CommentsTitle = styled.span`
  display: block;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 12px;
`;

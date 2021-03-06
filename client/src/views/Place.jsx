import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { MEDIA_BREAK } from "../components/GlobalStyle";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { FaThumbtack, FaStar } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Heart from "../components/ReactAnimatedHeart";
import Skeleton from "react-loading-skeleton";
import Chart from "../components/Chart";
import Comment from "../components/Comment";
import { RestaurantsContext } from "../contexts/RestaurantsContext";
import RestaurantService from "../services/RestaurantsService";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

// styles: snazzymaps style
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Place = () => {
  const { id } = useParams();

  const [libraries] = useState(["places"]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });
  const [match, setMatch] = useState(true);

  const [showInfoWindow, setshowInfoWindow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [restaurant, setRestaurant] = useState(null);
  const [waitTime, setWaitTime] = useState(null);
  const [popularTime, setPopularTime] = useState(null);
  const [Label, setLabel] = useState({
    ten_hour: [],
    seven_day: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    const zeroPad = (num, size) => {
      num = num.toString();
      while (num.length < size) {
        num = "0" + num;
      }
      return num;
    };

    const timeRange = (num) => {
      if (num < 0) {
        num += 24;
      }
      return num;
    };

    // Get current time and generate label
    let date = new Date();
    let hour = date.getHours();
    let labels = [];
    for (let i = hour - 9; i <= hour; i++) {
      labels.push(`${zeroPad(timeRange(i), 2)}:00`);
    }
    setLabel({ ...Label, ten_hour: labels });

    // Get if user have fav this place

    setFav(auth.fav_place.find((place) => place.placeId === id) ? true : false);
  }, []);

  useEffect(() => {
    const result = restaurants.find((restaurant) => restaurant.placeId === id);
    if (result) setRestaurant(result);
    else setMatch(false);
  }, [restaurants, id]);

  useEffect(() => {
    if (restaurant) {
      RestaurantService.getWaitTime(id)
        .then((res) => {
          setWaitTime(res.data);
          RestaurantService.getPopularTime(id)
            .then((res) => {
              setPopularTime(res.data);
              setLoading(false);
            })
            .catch((error) => {
              console.log("Error getting popular time");
            });
        })
        .catch((error) => {
          console.log("Error getting wait time");
        });
    }
  }, [restaurant, id]);

  const infoWindowHandler = () => {
    setshowInfoWindow(!showInfoWindow);
  };

  const favPlaceHandler = () => {
    RestaurantService.favPlace({ placeId: restaurant._id, isFav: fav })
      .then((res) => {
        if (fav) {
          setAuth({
            ...auth,
            fav_place: auth.fav_place.filter((place) => place.placeId !== id),
          });
        } else {
          setAuth({ ...auth, fav_place: [...auth.fav_place, restaurant] });
        }
        setFav(!fav);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEnterPressHandler = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      addCommentHandler();
    }
  };

  const addCommentHandler = () => {
    RestaurantService.addComment({ placeId: id, message: input })
      .then((res) => {
        setRestaurants(
          restaurants.map((restaurant) => {
            if (restaurant.placeId === id) {
              restaurant.comment.push(res.data);
            }
            return restaurant;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });

    setInput("");
  };

  if (loadError) return "";
  if (!isLoaded) return "";
  if (!match) return <NotFound />;
  return (
    <Wrapper>
      <>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={20}
          center={{ lat: restaurant.latitude, lng: restaurant.longitude }}
          options={options}
        >
          {/* Marker props
        icon={{
          url: "/assets/img", 
          scaledSize: new window.google.maps.Size(30, 30), 
          origin: new window.google.maps.Point(0, 0), 
          anchor: new window.google.map.Point(15, 15)
        }} */}
          <Marker
            position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
            onClick={infoWindowHandler}
          />
          {showInfoWindow && (
            <InfoWindow
              position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
              onCloseClick={infoWindowHandler}
              options={{ pixelOffset: new window.google.maps.Size(0, -50) }}
            >
              <>
                <InfoWindowName>{restaurant.name}</InfoWindowName>
                <InfoWindowAddress>{restaurant.address}</InfoWindowAddress>
              </>
            </InfoWindow>
          )}
        </GoogleMap>

        <CustomContainer>
          <LeftWrapper>
            <Info>
              <NameWrapper>
                <Name>{restaurant.name}</Name>
                <Heart clicked={fav ? 1 : 0} onClick={favPlaceHandler} />
              </NameWrapper>
              <Address>{restaurant.address}</Address>
              <RatingWrapper>
                <Rating>{restaurant.rating}</Rating>
                {[...Array(Math.round(restaurant.rating))].map(
                  (star, index) => (
                    <CustomFaStar key={index} active={true ? 1 : 0} />
                  )
                )}

                {[...Array(5 - Math.round(restaurant.rating))].map(
                  (star, index) => (
                    <CustomFaStar key={index} active={false ? 1 : 0} />
                  )
                )}
              </RatingWrapper>
              <LocationWrapper>
                <FaThumbtack />
                <Location>{`${restaurant.latitude}, ${restaurant.longitude}`}</Location>
              </LocationWrapper>
            </Info>
            {!loading && (
              <>
                <Chart
                  title="Waiting Time in the past 10 hours"
                  data={waitTime.ten_hour}
                  label="Waiting Time"
                  labels={Label.ten_hour}
                />
                <Chart
                  title="Waiting Time in this hour of past 7 days"
                  data={waitTime.seven_day}
                  label="Waiting Time"
                  labels={Label.seven_day}
                />
                <Chart
                  title="Popular Time in the past 10 hours"
                  data={popularTime.ten_hour}
                  label="Popular Time"
                  labels={Label.ten_hour}
                />
                <Chart
                  title="Popular Time in this hour of past 7 days"
                  data={popularTime.seven_day}
                  label="Popular Time"
                  labels={Label.seven_day}
                />
              </>
            )}
            {loading && (
              <>
                <CustomSkeleton height={40} />
                <CustomSkeleton height={400} />
                <CustomSkeleton height={40} />
                <CustomSkeleton height={400} />
                <CustomSkeleton height={40} />
                <CustomSkeleton height={400} />
                <CustomSkeleton height={40} />
                <CustomSkeleton height={400} />
              </>
            )}
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
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onEnterPressHandler}
                />
                <Button onClick={addCommentHandler}>
                  <IoMdSend />
                </Button>
              </TextFieldWrapper>
              {restaurant.comment.map((item) => (
                <Comment key={item._id} comment={item} />
              ))}
            </Comments>
          </RightWrapper>
        </CustomContainer>
      </>
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

const InfoWindowName = styled.h2`
  font-size: 16px;
  font-weight: 500;
`;

const InfoWindowAddress = styled.span`
  font-size: 16px;
  font-weight: 400;
  display: block;
  margin-bottom: 12px;
`;

const LeftWrapper = styled.div`
  width: 100%;

  @media (min-width: ${MEDIA_BREAK.lg}) {
    flex: 0 0 70%;
    max-width: 70%;
    padding-right: 30px;
  }
`;

const RightWrapper = styled.div`
  width: 100%;

  @media (min-width: ${MEDIA_BREAK.lg}) {
    flex: 0 0 30%;
    max-width: 30%;
    padding-left: 30px;
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
`;

const Rating = styled.span`
  font-size: 18px;
  font-weight: 500;
  display: block;
  margin-right: 15px;
`;

const CustomFaStar = styled(FaStar)`
  font-size: 18px;
  color: ${(props) => (props.active ? "#ffb800" : "#aab8c2")};
  margin-right: 8px;
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

const CustomSkeleton = styled(Skeleton)`
  margin-bottom: 20px;
`;

import React from "react";
import styled from "styled-components/macro";
import Container from "@material-ui/core/Container";
import FavPlace from "../components/FavPlace";

const restaurants = [
  {
    placeId: "ChIJc91gg_IDBDQRTSK8--GRgCI",
    name: "Fishing Heya",
    address:
      "Shop B3, Treasure World, Site 11, Whampoa Garden, Hung Hom, Hong Kong",
    rating: 3.9,
    latitude: 22.3061193,
    longitude: 114.260494,
  },
  {
    placeId: "ChIJc91gg_IDBDQRTSK8--GRgCI",
    name: "Fishing Heya",
    address:
      "Shop B3, Treasure World, Site 11, Whampoa Garden, Hung Hom, Hong Kong",
    rating: 3.9,
    latitude: 22.3061193,
    longitude: 114.260494,
  },

  {
    placeId: "ChIJc91gg_IDBDQRTSK8--GRgCI",
    name: "Fishing Heya",
    address:
      "Shop B3, Treasure World, Site 11, Whampoa Garden, Hung Hom, Hong Kong",
    rating: 3.9,
    latitude: 22.3061193,
    longitude: 114.260494,
  },

  {
    placeId: "ChIJc91gg_IDBDQRTSK8--GRgCI",
    name: "Fishing Heya",
    address:
      "Shop B3, Treasure World, Site 11, Whampoa Garden, Hung Hom, Hong Kong",
    rating: 3.9,
    latitude: 22.3061193,
    longitude: 114.260494,
  },

  {
    placeId: "ChIJc91gg_IDBDQRTSK8--GRgCI",
    name: "Fishing Heya",
    address:
      "Shop B3, Treasure World, Site 11, Whampoa Garden, Hung Hom, Hong Kong",
    rating: 3.9,
    latitude: 22.3061193,
    longitude: 114.260494,
  },
];

const FavPlaces = () => {
  return (
    <Wrapper>
      <CustomContainer>
        <Title>Favourite Places</Title>
        <Places>
          {restaurants.map((restaurant) => (
            <FavPlace key={restaurant.placeId} restaurant={restaurant} />
          ))}
        </Places>
      </CustomContainer>
    </Wrapper>
  );
};

export default FavPlaces;

const Wrapper = styled.div``;

const CustomContainer = styled(Container)``;

const Places = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px -20px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
`;

import React, { useContext } from "react";
import styled from "styled-components/macro";
import Container from "@material-ui/core/Container";
import FavPlace from "../components/FavPlace";
import { RestaurantsContext } from "../contexts/RestaurantsContext";

const FavPlaces = () => {
  const { restaurants } = useContext(RestaurantsContext);

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

const CustomContainer = styled(Container)`
  padding-top: 40px;
`;

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

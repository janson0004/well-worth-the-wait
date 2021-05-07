import React, { useContext } from "react";
import styled from "styled-components/macro";
import Container from "@material-ui/core/Container";
import FavPlace from "../components/FavPlace";
import { AuthContext } from "../contexts/AuthContext";

const FavPlaces = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Favourite Places</Title>
        <Places>
          {auth.fav_place.map((restaurant) => (
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

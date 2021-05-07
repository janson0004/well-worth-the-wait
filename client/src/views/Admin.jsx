import React, { useContext } from "react";
import styled from "styled-components/macro";
import Container from "@material-ui/core/Container";
import AdminPlace from "../components/AdminPlace";
import AdminService from "../services/AdminService";

import { RestaurantsContext } from "../contexts/RestaurantsContext";

const Admin = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  return (
    <Wrapper>
      <CustomContainer>
        <Title>Places</Title>
        <Places>
          {restaurants.map((restaurant) => (
            <AdminPlace key={restaurant.placeId} restaurant={restaurant} />
          ))}
        </Places>
        <Title>Users</Title>
      </CustomContainer>
    </Wrapper>
  );
};

export default Admin;

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

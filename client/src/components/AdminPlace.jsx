import React, { useContext } from "react";
import styled from "styled-components/macro";
import AdminService from "../services/AdminService";
import { IoMdRefresh } from "react-icons/io";
import { RestaurantsContext } from "../contexts/RestaurantsContext";
const AdminPlace = ({ restaurant, setShowModal, setSelectedPlace }) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const onClickDelete = (placeId) => {
    AdminService.deletePlace(placeId)
      .then((res) => {
        setRestaurants(
          restaurants.filter((restaurant) => restaurant.placeId !== placeId)
        );
        alert("Deleted successfully");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const onClickRefresh = (placeId) => {
    AdminService.refreshPlace(placeId)
      .then((res) => {
        console.log(res.data.result);
        setRestaurants(
          restaurants.map((restaurant) => {
            if (restaurant.placeId === placeId) {
              return res.data.result;
            }
            return restaurant;
          })
        );
        console.log("refreshed");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editHandler = () => {
    setShowModal((prev) => !prev);
    setSelectedPlace(restaurant);
  };

  return (
    <Wrapper>
      <Name>{restaurant.name}</Name>
      <Address>{restaurant.address}</Address>
      <FlexDiv>
        <EditFlexDiv>
          <Button onClick={editHandler}>Edit</Button>
          <DeleteButton onClick={() => onClickDelete(restaurant.placeId)}>
            Delete
          </DeleteButton>
        </EditFlexDiv>
        <RefreshButton onClick={() => onClickRefresh(restaurant.placeId)}>
          <ItemText>
            <IoMdRefresh />
          </ItemText>
        </RefreshButton>
      </FlexDiv>
    </Wrapper>
  );
};

export default AdminPlace;

const Wrapper = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => theme.bg.main};
  border-radius: 12px;
  width: 384px;
  margin: 10px 20px;
`;

const Name = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Address = styled.span`
  font-size: 16px;
  font-weight: 500;
  display: block;
  margin-bottom: 12px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: #4b4b4b;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.mono.contrast};
  padding: 9px 16px;
  border: none;
  border-radius: 12px;
`;

const DeleteButton = styled.button`
  background-color: #ff6868;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.mono.contrast};
  padding: 9px 16px;
  border: none;
  border-radius: 12px;
  margin-left: 10px;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RefreshButton = styled.button`
  background-color: #8c9daf;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.mono.contrast};

  border: none;
  border-radius: 12px;
  margin-left: 10px;
  height: 35px;
  width: 35px;
`;

const EditFlexDiv = styled.div`
  display: flex;
`;

const ItemText = styled.span`
  font-size: 18px;
`;

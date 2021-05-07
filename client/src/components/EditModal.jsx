import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/macro";
import Overlay from "../components/Overlay";
import TextField from "@material-ui/core/TextField";
import AdminService from "../services/AdminService";
import { RestaurantsContext } from "../contexts/RestaurantsContext";

const EditModal = ({ showModal, setShowModal, selectedPlace }) => {
  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [latInput, setLatInput] = useState("");
  const [lngInput, setLngInput] = useState("");

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    setNameInput(selectedPlace.name);
    setAddressInput(selectedPlace.address);
    setRatingInput(selectedPlace.rating);
    setLatInput(selectedPlace.latitude);
    setLngInput(selectedPlace.latitude);
  }, [selectedPlace]);

  const saveEditHandler = () => {
    const data = {
      name: nameInput,
      rating: ratingInput,
      address: addressInput,
      latitude: latInput,
      longitude: lngInput,
    };
    AdminService.editPlace(selectedPlace.placeId, data)
      .then((res) => {
        console.log(res.data);
        setRestaurants(
          restaurants.map((restaurant) => {
            if (restaurant.placeId === selectedPlace.placeId) {
              return { ...restaurant, ...data };
            }
            return restaurant;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(false);
  };

  return (
    <>
      <Overlay showModal={showModal} setShowModal={setShowModal} />
      <Wrapper showModal={showModal}>
        <Card showModal={showModal}>
          <Title>Edit place</Title>
          <CustomTextField
            small={false}
            variant="filled"
            label="New name"
            InputProps={{ disableUnderline: true }}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <CustomTextField
            small={false}
            variant="filled"
            label="New address"
            InputProps={{ disableUnderline: true }}
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
          />
          <CustomTextField
            small={false}
            variant="filled"
            label="New rating"
            InputProps={{ disableUnderline: true }}
            value={ratingInput}
            onChange={(e) => setRatingInput(e.target.value)}
          />
          <FieldWrapper>
            <CustomTextField
              small={true}
              variant="filled"
              label="New latitude"
              InputProps={{ disableUnderline: true }}
              value={latInput}
              type="number"
              onChange={(e) => setLatInput(e.target.value)}
            />
            <CustomTextField
              small={true}
              variant="filled"
              label="New longitude"
              InputProps={{ disableUnderline: true }}
              value={lngInput}
              type="number"
              onChange={(e) => setLngInput(e.target.value)}
            />
          </FieldWrapper>
          <Button onClick={saveEditHandler}>Save</Button>
        </Card>
      </Wrapper>
    </>
  );
};

export default EditModal;

const Wrapper = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  z-index: 3000;
  width: 100%;
  transform: translate(-50%, 50%);
  padding: 20px;
  opacity: ${(props) => (props.showModal ? "100%" : "0%")};
  pointer-events: none;
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
`;

const Card = styled.div`
  max-width: 370px;
  background-color: ${({ theme }) => theme.bg.tinted};
  border-radius: 12px;
  padding: 40px 30px;
  margin-left: auto;
  margin-right: auto;
  pointer-events: ${(props) => (props.showModal ? "all" : "none")};
`;

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.mono.primary};
`;

const Label = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.font.primary};
`;

const Input = styled.input`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.bg.shade};
  border: none;
  outline: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.font.primary};
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 16px;

  &::placeholder {
    color: ${({ theme }) => theme.font.secondary};
  }
`;

const Button = styled.button`
  display: block;
  padding: 8px 15px;
  background-color: ${({ theme }) => theme.theme.main};
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: auto;
  margin-right: left;
  color: white;
  cursor: pointer;
`;

const FieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomTextField = styled(TextField)`
  width: ${(props) => (props.small ? "48%" : "100%")};

  .MuiInputBase-root.MuiFilledInput-root.MuiInputBase-formControl {
    border-radius: 12px;
    margin-bottom: 8px;
  }

  .MuiInputBase-input.MuiFilledInput-input.MuiInputBase-inputMultiline.MuiFilledInput-inputMultiline {
    color: ${({ theme }) => theme.mono.secondary};
  }
`;

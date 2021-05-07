import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/macro";
import Container from "@material-ui/core/Container";
import AdminPlace from "../components/AdminPlace";
import AdminService from "../services/AdminService";
import Users from "../components/Users";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { RestaurantsContext } from "../contexts/RestaurantsContext";

const Admin = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [open, setOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    axios
      .get("/user/all", { withCredentials: true })
      .then((response) => {
        setUserInfo(response.data);
        console.log(userInfo);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  const createUser = () => {
    axios
      .post("/user/signup", { username, password }, { withCredentials: true })
      .then((response) => {
        handleClose();
        console.log("created");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createUser();
  };

  const createPlace = () => {
    AdminService.createPlace({ placeId })
      .then((response) => {
        handleSignUpClose();
        console.log("created a new place");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const createPlaceHandler = (e) => {
    e.preventDefault();
    createPlace();
  };

  return (
    <Wrapper>
      <CustomContainer>
        <FlexDiv>
          <Title>Places</Title>
          <Button onClick={handleSignUpOpen}>Create Places</Button>
        </FlexDiv>
        <Places>
          {restaurants.map((restaurant) => (
            <AdminPlace key={restaurant.placeId} restaurant={restaurant} />
          ))}
        </Places>
        <FlexDiv>
          <Title>Users</Title>{" "}
          <Button onClick={handleClickOpen}>Create User</Button>
        </FlexDiv>
        <Places>
          {userInfo.map((user) => (
            <Users key={user._id} user={user} />
          ))}
        </Places>

        <Dialog
          open={signUpOpen}
          onClose={handleSignUpClose}
          aria-labelledby="form-dialog-title"
          fullWidth={100}
        >
          <CreatePlaceform method="POST" onSubmit={createPlaceHandler}>
            <DialogTitle id="form-dialog-title">Create New Place</DialogTitle>
            <DialogContent>
              <TextField
                required
                autoFocus
                margin="dense"
                id="placeId"
                label="placeId"
                onChange={(e) => setPlaceId(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <CreateButton onClick={handleSignUpClose} color="primary">
                Cancel
              </CreateButton>
              <CreateButton>Create</CreateButton>
            </DialogActions>
          </CreatePlaceform>
        </Dialog>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <SignupForm method="POST" onSubmit={submitHandler}>
            <DialogTitle id="form-dialog-title">Create User</DialogTitle>
            <DialogContent>
              <TextField
                required
                autoFocus
                margin="dense"
                id="username"
                label="username"
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
              <TextField
                required
                autoFocus
                margin="dense"
                id="password"
                label="password"
                type="password"
                autoComplete="current-password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary">Create</Button>
            </DialogActions>
          </SignupForm>
        </Dialog>
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

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #7d68ff;
  height: 35px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.mono.contrast};
  padding: 9px 24px;
  border: none;
  border-radius: 12px;
  margin-left: 10px;
`;

const SignupForm = styled.form`
  display: block;
`;

const CreatePlaceform = styled.form`
  display: block;
`;

const CreateButton = styled.button`
  background-color: #8c9daf;
  height: 35px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.mono.contrast};
  padding: 9px 24px;
  border: none;
  border-radius: 12px;
  margin-left: 10px;
`;

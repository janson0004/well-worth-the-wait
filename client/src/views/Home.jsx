import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { FaChevronDown, FaSearch } from "react-icons/fa";

import { RestaurantsContext } from "../contexts/RestaurantsContext";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const mapContainerStyle = {
  width: "100%",
  height: "700px",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Home = () => {
  const classes = useStyles();
  const [libraries] = useState(["places"]);
  const history = useHistory();
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [clicked, setClicked] = useState(false);

  const [center, setCenter] = useState({
    lat: 22.310993034714123,
    lng: 114.24018913494935,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });

  const toggleSort = () => {
    const ordered = restaurants;
    ordered.sort((a, b) => a.name.localeCompare(b.name));
    return ordered;
  };

  const reverseSort = () => {
    const ordered = restaurants;
    ordered.sort((b, a) => a.name.localeCompare(b.name));
    return ordered;
  };
  console.log(reverseSort());

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const sortOnlickHandler = (clicked) => {
    setClicked(!clicked);
  };

  return (
    <Wrapper>
      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
      >
        {restaurants.map((marker) => (
          <Marker
            key={marker.name}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => history.push(`/place/${marker.placeId}`)}
          />
        ))}
      </GoogleMap>
      <CustomContainer>
        <FlexDiv>
          <Title>Places</Title>
          <SearchRightDiv>
            <ButtonDiv>
              Name
              <ItemText>
                <FaChevronDown />
              </ItemText>
            </ButtonDiv>

            <SearchDiv>
              <ItemText>
                <ConstantFaSearch />
              </ItemText>
              Search places
            </SearchDiv>
          </SearchRightDiv>
        </FlexDiv>

        {/* Table */}
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Name
                <ItemText>
                  <CustomFaChevronDown
                    clicked={clicked ? 1 : 0}
                    onClick={() => sortOnlickHandler(clicked)}
                  />
                </ItemText>
              </TableCell>
              <TableCell align="left">Adress</TableCell>
              <TableCell align="left">Latitude, Longitude</TableCell>
            </TableRow>
          </TableHead>
          {!clicked && (
            <TableBody>
              {toggleSort().map((row) => (
                <CustomTableRow
                  key={row.name}
                  onClick={() => {
                    history.push(`/place/${row.placeId}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">
                    {row.latitude}, {row.longitude}
                  </TableCell>
                </CustomTableRow>
              ))}
            </TableBody>
          )}
          {clicked && (
            <TableBody>
              {reverseSort().map((row) => (
                <CustomTableRow
                  key={row.name}
                  onClick={() => {
                    history.push(`/place/${row.placeId}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">
                    {row.latitude}, {row.longitude}
                  </TableCell>
                </CustomTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </CustomContainer>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div``;

const CustomContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
`;

const Title = styled.div`
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 700;
`;

const ButtonDiv = styled.div`
  background-color: #eff0f1;
  border-radius: 12px;
  display: flex;
  width: 125px;
  height: 35px;
  color: #787878;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
`;

const ItemText = styled.span`
  font-size: 16px;
`;

const SearchDiv = styled.div`
  background-color: #eff0f1;
  border-radius: 12px;
  display: flex;
  width: 281px;
  height: 35px;
  color: #787878;
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-left: 11px;
`;

const SearchRightDiv = styled.div`
  display: flex;
`;

const ConstantFaSearch = styled(FaSearch)`
  margin-right: 16.5px;
`;

const CustomFaChevronDown = styled(FaChevronDown)`
  margin-left: 19px;
  cursor: pointer;
  transform: ${(props) => (props.clicked ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 200ms cubic-bezier(0.87, 0, 0.11, 1.4);
`;

const CustomTableRow = styled(TableRow)`
  cursor: pointer;
`;

import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import styled from "styled-components/macro";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { MdSearch } from "react-icons/md";

import { RestaurantsContext } from "../contexts/RestaurantsContext";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

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
  const { restaurants } = useContext(RestaurantsContext);
  const [reverse, setReverse] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  const googleMap = useRef();
  const onMapLoad = useCallback((map) => {
    googleMap.current = map;
  }, []);

  const panTo = useCallback((pan, zoom) => {
    googleMap.current.panTo(pan);
    googleMap.current.setZoom(zoom);
  }, []);

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

  const sorting = () => {
    if (reverse) {
      return reverseSort();
    } else {
      return toggleSort();
    }
  };

  const filterSearch = (item) => {
    if (searchInput) {
      let result;
      if (searchBy === "coordinates") {
        result = (item["latitude"] + ", " + item["longitude"])
          .toString()
          .includes(searchInput.toLowerCase());
      } else {
        result = item[searchBy]
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      }
      if (result) {
        console.log(item);
      }
      return result;
    }
    return true;
  };

  const sortOnlickHandler = () => {
    setReverse(!reverse);
  };

  useEffect(() => {
    try {
      let searchResult = restaurants.filter(filterSearch);
      if (searchResult.length === 1) {
        panTo(
          {
            lat: searchResult[0].latitude,
            lng: searchResult[0].longitude,
          },
          20
        );
      } else {
        panTo(
          {
            lat: 22.310993034714123,
            lng: 114.24018913494935,
          },
          15
        );
      }

      console.log(searchResult);
      console.log(center);
    } catch (error) {
      console.log(error);
    }
  }, [searchInput]);

  if (loadError) return "";
  if (!isLoaded) return "";

  return (
    <Wrapper>
      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        ref={googleMap}
        onLoad={onMapLoad}
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
          <SearchWrapper>
            <TextField
              select
              value={searchBy}
              variant="filled"
              onChange={(e) => {
                setSearchBy(e.target.value);
              }}
              InputProps={{ disableUnderline: true }}
            >
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"address"}>Address</MenuItem>
              <MenuItem value={"coordinates"}>Coordinates</MenuItem>
            </TextField>
            <SearchField>
              <MdSearch />
              <SearchInput
                placeholder="Search places"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </SearchField>
          </SearchWrapper>
          {/* <SearchRightDiv>
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
          </SearchRightDiv> */}
        </FlexDiv>

        {/* Table */}
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                  <ItemText>
                    <CustomFaChevronDown
                      reverse={reverse ? 1 : 0}
                      onClick={sortOnlickHandler}
                    />
                  </ItemText>
                </TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Latitude, Longitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorting()
                .filter(filterSearch)
                .map((row) => (
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
          </Table>
        </TableContainer>
      </CustomContainer>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  padding-bottom: 100px;
`;

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
  transform: ${(props) => (props.reverse ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 200ms cubic-bezier(0.87, 0, 0.11, 1.4);
`;

const CustomTableRow = styled(TableRow)`
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  display: flex;

  .MuiFormControl-root.MuiTextField-root {
    width: 100%;
  }

  .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiSelect-filled.MuiInputBase-input.MuiFilledInput-input {
    padding: 10px 12px 10px;
    padding-right: 32px;
  }

  .MuiInputBase-root.MuiFilledInput-root.MuiInputBase-formControl {
    background-color: ${({ theme }) => theme.bg.shaded};
    border-radius: 12px;
  }
`;

const SearchField = styled.div`
  display: flex;
  align-items: center;
  flex-basis: calc(100% - 35px - 4px);
  border: none;
  background-color: ${({ theme }) => theme.bg.shaded};
  color: ${({ theme }) => theme.mono.primary};
  padding: 8px 20px;
  border-radius: 12px;
  outline: none;
  font-size: 16px;
  margin-left: 21px;

  svg {
    color: ${({ theme }) => theme.mono.secondary};
    font-size: 20px;
    margin-right: 8px;
  }
`;

const SearchInput = styled.input`
  display: block;
  border: none;
  background-color: ${({ theme }) => theme.bg.shaded};
  color: ${({ theme }) => theme.mono.primary};
  border-radius: 12px;
  outline: none;
  font-size: 16px;

  ::placeholder {
    color: ${({ theme }) => theme.mono.secondary};
  }
`;

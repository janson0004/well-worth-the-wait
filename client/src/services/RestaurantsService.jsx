import axios from "axios";

const RestaurantService = {
  getAll: () => {
    return axios.get("/restaurant", { withCredentials: true });
  },
  getWaitTime: (placeId) => {
    return axios.get(`/restaurant/wait/${placeId}`, { withCredentials: true });
  },
  getPopularTime: (placeId) => {
    return axios.get(`/restaurant/popular/${placeId}`, {
      withCredentials: true,
    });
  },
  favPlace: (data) => {
    return axios.post("/restaurant/fav", data, { withCredentials: true });
  },
  addComment: (data) => {
    return axios.post("/restaurant/comment", data, { withCredentials: true });
  },
};

export default RestaurantService;

import axios from "axios";

const RestaurantService = {
  getAll: () => {
    return axios.get("/restaurant", { withCredentials: true });
  },
  getTime: (placeId) => {
    return axios.get(`/restaurant/time/${placeId}`, { withCredentials: true });
  },
  favPlace: (data) => {
    return axios.post("/restaurant/fav", data, { withCredentials: true });
  },
};

export default RestaurantService;

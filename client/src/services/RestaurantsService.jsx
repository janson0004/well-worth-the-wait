import axios from "axios";

const RestaurantService = {
  getAll: () => {
    return axios.get("/restaurant", { withCredentials: true });
  },
  getTime: (placeId) => {
    return axios.get(`/restaurant/time/${placeId}`, { withCredentials: true });
  },
};

export default RestaurantService;

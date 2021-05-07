import axios from "axios";

const RestaurantService = {
  getAll: () => {
    return axios.get("/restaurant", { withCredentials: true });
  },
};

export default RestaurantService;

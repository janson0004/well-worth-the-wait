import axios from "axios";

const AdminService = {
  deletePlace: (placeId) => {
    return axios.delete(`/restaurant/${placeId}`, { withCredentials: true });
  },
  editPlace: (placeId, data) => {
    return axios.put(`/restaurant/${placeId}`, data, { withCredentials: true });
  },
  createPlace: (data) => {
    return axios.post("/restaurant", data, { withCredentials: true });
  },
  deleteUser: () => {
    return axios.delete("/user", { withCredentials: true });
  },
  getAll: () => {
    return axios.get("/user/all", { withCredentials: true });
  },
};

export default AdminService;

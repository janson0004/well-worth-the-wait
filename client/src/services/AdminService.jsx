import axios from "axios";

const AdminService = {
  deletePlace: (placeId) => {
    return axios.delete(`/restaurant/${placeId}`, { withCredentials: true });
  },
  editPlace: (placeId) => {
    return axios.put(`/restaurant/${placeId}`, { withCredentials: true });
  },
  deleteUser: () => {
    return axios.delete("/user", { withCredentials: true });
  },
  getAll: () => {
    return axios.get("/user/all", { withCredentials: true });
  },
};

export default AdminService;

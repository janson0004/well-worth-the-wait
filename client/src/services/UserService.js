import axios from "axios";

const UserService = {
  login: (data) => {
    return axios.post("/user/login", data, { withCredentials: true });
  },
  signup: (data) => {
    return axios.post("/user/signup", data, { withCredentials: true });
  },
  logout: () => {
    return axios.post("/user/logout", { withCredentials: true });
  },
  getUser: () => {
    return axios.get("/user", { withCredentials: true });
  },
};

export default UserService;

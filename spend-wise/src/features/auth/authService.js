import axiosConfig from "../../app/axiosConfig";

const API_URL = "/api/v1/";

const register = async (userData) => {
  const response = await axiosConfig.post(API_URL + "register-user", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axiosConfig.post(API_URL + "login-user", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;

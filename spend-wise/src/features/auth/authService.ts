import axiosConfig, { removeFromLocalStorage } from "../../app/axiosConfig";

const API_URL = "/api/v1/";

interface UserData {
  username: string;
  password: string;
  [key: string]: any;
}

const setUserToLocalStorage = (data: any) => {
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
};

export const register = async (userData: UserData) => {
  const { data } = await axiosConfig.post(`${API_URL}register-user`, userData);
  setUserToLocalStorage(data);
  return data;
};

export const login = async (userData: UserData) => {
    const { data } = await axiosConfig.post(`${API_URL}login-user`, userData);
    setUserToLocalStorage(data);
    return data;
};

export const logout = async (userId: any) => {
  const { data } = await axiosConfig.post(`${API_URL}logout-user`, userId);

  removeFromLocalStorage("user");
  removeFromLocalStorage("refreshToken");

  return data;
};

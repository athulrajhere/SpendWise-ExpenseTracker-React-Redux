import axiosConfig from "../../app/axiosConfig";

const API_URL = "/api/v1/";

const createIncome = async (incomeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosConfig.post(
    API_URL + "add-income",
    incomeData,
    config
  );

  return response.data;
};

const getIncomes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosConfig.get(API_URL + "get-incomes", config);

  return response.data;
};

const incomeService = {
  createIncome,
  getIncomes,
};

export default incomeService;

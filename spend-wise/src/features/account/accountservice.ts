import axiosConfig from "../../app/axiosConfig";

const API_URL = "/api/v1/";

const createAccount = async (accountData) => {
  const response = await axiosConfig.post(
    API_URL + "add-account",
    accountData
  );

  return response.data;
};

const getAccounts = async () => {
  const response = await axiosConfig.get(API_URL + "get-accounts");

  return response.data;
};

const deleteAccount = async (accountId) => {

  const response = await axiosConfig.delete(
    API_URL + "delete-account/" + accountId
  );

  return response.data;
};

const updateAccount = async (accountId, accountUpdateData) => {

  const response = await axiosConfig.put(
    API_URL + "update-account/" + accountId,
    accountUpdateData
  );

  return response.data;
};

const accountService = {
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
};

export default accountService;

import axios from "axios";
import { notification } from "antd";
import { userConstants } from "../Constants/UserConstants";
import { apiUrl } from "../../Helpers/config";

const apiSuccessNew = (response) => notification['success']({ description: response?.message || 'Success!' });
const apiErrorNew = (err) => notification['error']({ description: err?.message || 'Something is wrong!' });

const headersAuth = () => {
  return {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };
};

export const getUser = (callback = () => { }) => (dispatch) => {
  axios
    .get(`${apiUrl}posts`, headersAuth())
    .then((response) => {
      callback()
      dispatch({ type: userConstants.USERS, data: response.data })
      apiSuccessNew(response.data.data);
    })
    .catch((err) => {
      callback()
      apiErrorNew(err.response.data)
    });
};

export const postRecord = (payload, callback = () => { }) => (dispatch) => {
  axios
    .post(`${apiUrl}posts`, payload, headersAuth())
    .then((response) => {
      callback()
      apiSuccessNew(response.data.data);
    })
    .catch((err) => {
      callback()
      apiErrorNew(err.response.data)
    });
};

export const updateRecord = (payload, callback = () => { }) => (dispatch) => {
  axios
    .put(`${apiUrl}posts/${payload.id}`, payload, headersAuth())
    .then((response) => {
      callback()
      apiSuccessNew(response.data.data);
    })
    .catch((err) => {
      callback()
      apiErrorNew(err.response.data)
    });
};

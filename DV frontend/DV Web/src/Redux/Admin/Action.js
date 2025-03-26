import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  DELETE_USER_SUCCESS,
  FETCH_DATASETS_REQUEST,
  FETCH_DATASETS_SUCCESS,
  FETCH_DATASETS_FAIL,
  FETCH_GRAPHS_REQUEST,
  FETCH_GRAPHS_SUCCESS,
  FETCH_GRAPHS_FAIL,
  ADMIN_LOGOUT,
  DELETE_DATASET_SUCCESS,
  DELETE_GRAPH_SUCCESS,
} from "./ActionType";

// ✅ Admin Login Action
export const adminLogin = (email, password) => async (dispatch) => {
  try {
    
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    
    const {data} = await axios.post(`${API_BASE_URL}/admin/login`, { email, password });
    console.log("Admin Data:", data.admin);
    console.log("Token:", data.token);

    const resolvedPayload = { admin: data.admin, token: data.token };

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: resolvedPayload });

    localStorage.setItem("adminInfo", JSON.stringify(data.token));
  } catch (error) {
    dispatch({ type: ADMIN_LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const adminLogout = () => (dispatch) => {
  dispatch({ type: ADMIN_LOGOUT});
  localStorage.clear();
  window.location.reload();
  console.log("hii ",localStorage.getItem("adminInfo"));
};

// ✅ Fetch Users
export const fetchUsers = () => async (dispatch, getState) => {
  const { adminLogin: { adminInfo } } = getState();
  console.log("data1 ",adminInfo);
  try {
    dispatch({ type: FETCH_USERS_REQUEST });


    const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };

    const { data } = await axios.get(`${API_BASE_URL}/admin/users`, config);
    console.log("data ",data);

    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error1 ", error);
    dispatch({ type: FETCH_USERS_FAIL, payload: error });
  }
};


// ✅ Delete User
export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    const { adminLogin: { adminInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };

    await axios.delete(`${API_BASE_URL}/admin/user/${userId}`, config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
    console.error("Error deleting user:", error.response.data.message);
  }
};

// ✅ Fetch Datasets
export const fetchDatasets = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_DATASETS_REQUEST });

    const { adminLogin: { adminInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };

    const { data } = await axios.get(`${API_BASE_URL}/admin/datasets`, config);
    console.log('action file ', data);

    dispatch({ type: FETCH_DATASETS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error2 ", error);
    dispatch({ type: FETCH_DATASETS_FAIL, payload: error.response.data.message });
  }
};

// ✅ Fetch Graphs
export const fetchGraphs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_GRAPHS_REQUEST });

    const { adminLogin: { adminInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };

    const { data } = await axios.get(`${API_BASE_URL}/admin/graphs`, config);
    console.log("ftech graph ",data)

    dispatch({ type: FETCH_GRAPHS_SUCCESS, payload: data });
  } catch (error) {
    console.log("fetch error",error)
    dispatch({ type: FETCH_GRAPHS_FAIL, payload: error.response.data.message });
  }
};

export const deleteDataset = (datasetId) => async (dispatch, getState) => {
  try {
    const { adminLogin: { adminInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };

    await axios.delete(`${API_BASE_URL}/admin/datasets/${datasetId}`, config);

    dispatch({ type: DELETE_DATASET_SUCCESS, payload: datasetId });
  } catch (error) {
    console.error("Error deleting dataset:", error);
  }
};

export const deleteGraph = (graphId) => async (dispatch, getState) => {
  try {
    const { adminLogin: { adminInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };

    await axios.delete(`${API_BASE_URL}/admin/graphs/${graphId}`, config);

    dispatch({ type: DELETE_GRAPH_SUCCESS, payload: graphId });
  } catch (error) {
    console.error("Error deleting graph:", error.response?.data?.message);
  }
};

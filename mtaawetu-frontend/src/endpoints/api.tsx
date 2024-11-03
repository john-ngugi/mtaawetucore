import axios from "axios";

// const BASE_URL = "https://kisii.mtaawetu.com/api/kisii/";
const BASE_URL = "http://127.0.0.1:8001/api/kisii/";
const LOGIN_URL = `${BASE_URL}token/`;
const REPORT_URL = `${BASE_URL}reports/`;
const REFRESH_URL = `${BASE_URL}token/refresh/`;
const LOGOUT_URL = `${BASE_URL}logout/`;
const AUTH_URL = `${BASE_URL}authenticated/`;
const REGISTER_URL = `${BASE_URL}register/`;
const MAKE_REPORT_URL = `${BASE_URL}make_report/`;
const GET_ALL_REPORTS = `${BASE_URL}reports/all/`;



export const GET_USER_INFO = () =>
{
  return `${BASE_URL}getUserInfo/`
}

export const login = async (username: any, password: any) => {
  const response = await axios.post(
    LOGIN_URL,
    { username: username, password: password },
    { withCredentials: true }
  );
  console.log("Response from login API:", response.data); // Add this line to inspect response
  return response.data.Success;
};

export const refresh_token = async () => {
  try {
    await axios.post(REFRESH_URL, {}, { withCredentials: true });
    return true;
  } catch (error) {
    return false;
  }
};

export const get_reports = async () => {
  try {
    const response = await axios.get(REPORT_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return call_refresh(
      error,
      axios.get(REPORT_URL, { withCredentials: true })
    );
  }
};


export const get_all_reports = async () =>{
    const response = await axios.get(GET_ALL_REPORTS);
    return response.data;
}

const call_refresh = async (error: any, func: any) => {
  if (error.response && error.response.status === 401) {
    const tokenRefreshed = await refresh_token();

    if (tokenRefreshed) {
      const retryResponse = await func();
      return retryResponse;
    }
  }

  return false;
};

export const logout = async () => {
  try {
    await axios.post(LOGOUT_URL, {}, { withCredentials: true });
    return true;
  } catch (error) {
    return false;
  }
};

export const is_authenticated = async () => {
  try {
    const response = await axios.post(AUTH_URL, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const register = async (firstname:any,lastname:any,username: any,phonenumber: any, password: any,ward:any,residency:any,communicationMode:any) => {
  const response = await axios.post(REGISTER_URL, {
    firstname:firstname,
    lastname:lastname,
    username: username,
    phonenumber:phonenumber,
    password: password,
    ward:ward,
    residency:residency,
    communicationMode:communicationMode,
  });
  console.log("Response from register API:", response.data); // Add this line to inspect response
  return response.data;
};

export const make_report = async (
  lon: any,
  lat: any,
  grivance_description: any,
  category_of_grivance: any,
  category_of_complaint: any,
  subOption:any,
) => {
  try {
    const response = await axios.post(
      MAKE_REPORT_URL,
      {
        lat: lat,
        lon: lon,
        category_of_complaint: category_of_complaint,
        category_of_grivance: category_of_grivance,
        grivance_description: grivance_description,
        suboption:subOption,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

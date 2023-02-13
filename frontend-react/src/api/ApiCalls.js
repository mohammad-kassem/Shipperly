import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

const login = async (authData) => {
  localStorage.clear();
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/auth/login",
      headers: {
        "Content-type": "application/json",
      },
      data: JSON.stringify(authData),
    });
    localStorage.setItem("token", res.data.token);
    return res;
  } catch (err) {
    err.response.status === 400
      ? alert(Object.values(err.response.data))
      : alert(err.response.data.error[0]);
  }
};

const register = async (authData) => {
  localStorage.clear();
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/auth/register",
      headers: {
        "Content-type": "application/json",
      },
      data: JSON.stringify(authData),
    });
    localStorage.setItem("token", res.data.token);
    return res;
  } catch (err) {
    // alert(err.response.data.error[0]);
    err.response.status === 400
      ? alert(Object.values(err.response.data))
      : alert(err.response.data.error[0]);
  }
};

export { login, register };

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
    err.response.status === 400
      ? alert(Object.values(err.response.data))
      : alert(err.response.data.error[0]);
  }
};

const getShipments = async (token, id = null) => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/shipment" + `${id ? '/' +id : ''}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.result;
  } catch (err) {
    err.response.status === 400
      ? alert(Object.values(err.response.data))
      : alert(err.response.data.error);
  }
};

const deleteShipment = async (token, id) => {
  try {
    const res = await axios({
      method: "delete",
      url: BASE_URL + "/shipment/" + id,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    return res.data.result;
  } catch (err) {
    err.response.status === 400
      ? alert(Object.values(err.response.data))
      : alert(err.response.data.error);
  }
};

const addShipment = async (shipData, token) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/shipment",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(shipData),
    });
    return res;
  } catch (err) {
    err.response.status === 400
      ? alert(Object.values(err.response.data))
      : alert(err.response.data.error);
  }
};

const editShipment = async (shipData, token) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/shipment/update",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(shipData),
    });
    console.log(typeof res.status);
    return res;
  } catch (err) {
    err.response.status === 400
      ? alert(Object.values(err.response.data))
      : alert(err.response.data.error);
  }
};

export { login, register, getShipments, deleteShipment, addShipment, editShipment };

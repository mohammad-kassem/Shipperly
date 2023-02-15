import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./ShipForm.scss";
import { addShipment, editShipment, getShipments } from "../api/ApiCalls";
import { useShipment } from "../utilities/ShipContext";

const ShipForm = ({ type }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [waybill, setWaybill] = useState(null);
  const [fileName, setFileName] = useState("");
  const { shipment, setShipment } = useShipment();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getShipments(token, shipment.id);
      setName(res.cname);
      setAddress(res.caddress);
      setPhone(res.cphone);
      setWaybill(res.waybill);
      setFileName(res.waybill.split("/").pop());
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res =
      type === "edit"
        ? await editShipment(
            {
              cname: name,
              cphone: phone,
              caddress: address,
              waybill,
              id: shipment.id,
            },
            token
          )
        : await addShipment(
            { cname: name, cphone: phone, caddress: address, waybill },
            token
          );
    res.status === 200 && navigate("/");
    setShipment({});
  };

  return (
    <form className="shipment-form" onSubmit={onSubmit}>
      <div className="shipment-header">
        <h1>Shipment details</h1>
      </div>
      <div className="form-content">
        <div className="input-container">
          <label>Full name</label>
          <input
            type="text"
            id="full-name"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="input-container">
          <label>Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            required
            onChange={function (e) {
              setPhone(e.target.value);
            }}
          ></input>
        </div>
        <div className="input-container">
          <label>Address</label>
          <textarea
            id="address"
            required
            value={address}
            row="3"
            column="50"
            onChange={function (e) {
              setAddress(e.target.value);
            }}
          >
            {address}
          </textarea>
        </div>
        <label for="waybill" className="upload-label">
          <FaCloudUploadAlt className="icons" />
          <div>{waybill ? fileName : "Upload waybill"}</div>
        </label>
        <input
          type="file"
          id="waybill"
          accept="application/pdf"
          onChange={(e) => {
            let reader = new FileReader();
            reader.fileName = e.target.files[0].name;
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
              if (reader.result) {
                setFileName(reader.fileName);
                setWaybill(reader.result);
              }
            };
          }}
        />
        <div className="btn-container">
          <button
            type="button"
            className="btn red"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit" className="btn green">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShipForm;

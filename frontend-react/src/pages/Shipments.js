import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Shipments.scss";
import { FaTrash, FaEdit, FaCopy } from "react-icons/fa";
import Button from "../components/Button";
import FilterBar from "../components/FilterBar";
import { deleteShipment, getShipments } from "../api/ApiCalls";
import { useShipment } from "../utilities/ShipContext";

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [original, setOriginal] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { setShipment } = useShipment();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  !token && navigate("/login");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getShipments(token);
      setShipments(res);
      setOriginal(res);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Shipments List</h1>
        <button className="btn green" onClick={() => navigate("/add")}>
          Add
        </button>
      </div>
      <div className="row-container">
        <div className="name">Full name</div>
        <div className="phone">Phone number</div>
        <div className="address">Address</div>
        <div className="waybill">Waybill</div>
        <div className="btn-div">
          <Button
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            shipments={original}
            setShipments={setShipments}
          />
        </div>
      </div>
      {showFilter && (
        <FilterBar shipments={original} setShipments={setShipments} />
      )}
      {shipments.map((shipment, index) => {
        return (
          <div key={index} className="row-container" id={shipment.id}>
            <div className="name">{shipment.cname}</div>
            <div className="phone">{shipment.cphone}</div>
            <div className="address">{shipment.caddress}</div>
            <div className="waybill">
              <a href={shipment.waybill} target="_blank">
                {shipment.cname} waybill
              </a>
            </div>
            <div className="icons-container">
              <FaTrash
                className="icons delete"
                onClick={() => {
                  deleteShipment(token, shipment.id);
                  setShipments(
                    shipments.filter((item) => shipment.id !== item.id)
                  );
                }}
              />
                <FaEdit
                  className="icons"
                  onClick={() => {
                    setShipment(shipment);
                    navigate("/edit");
                  }}
                />
              <FaCopy className="icons copy" onClick={() => setShipment(shipment)}/>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Shipments;

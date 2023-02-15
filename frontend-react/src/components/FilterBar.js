import React from "react";
import { useState } from "react";
import "./FilterBar.scss";

function FilterBar({ shipments, setShipments }) {
  const [filters, setFilters] = useState({ name: "", phone: "", address: "" });

  function onChange(name, phone, address) {
    setShipments(
      shipments.filter((shipment) => {
        return (
          shipment.cname.toUpperCase().includes(name.toUpperCase()) &&
          shipment.cphone.toUpperCase().includes(phone.toUpperCase()) &&
          shipment.caddress.toUpperCase().includes(address.toUpperCase())
        );
      })
    );
  }

  return (
    <>
      <div className="row-container bg">
        <div className={"filter-container name"}>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => {
              setFilters({ ...filters, name: e.target.value });
              onChange(e.target.value, filters.phone, filters.address);
            }}
          ></input>
        </div>
        <div className={"filter-container phone"}>
          <input
            type="text"
            value={filters.phone}
            onChange={(e) => {
              setFilters({ ...filters, phone: e.target.value });
              onChange(filters.name, e.target.value, filters.address);
            }}
          ></input>
        </div>
        <div className={"filter-container address"}>
          <input
            type="text"
            value={filters.address}
            onChange={(e) => {
              setFilters({ ...filters, address: e.target.value });
              onChange(filters.name, filters.phone, e.target.value);
            }}
          ></input>
        </div>
        <div className="empty-div"></div>
      </div>
    </>
  );
}

export default FilterBar;

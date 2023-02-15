import React from "react";
import { useState } from "react";
import "./FilterBar.scss";

function FilterBar({ shipments, setShipments }) {
  const [filters, setFilters] = useState({ name: "", phone: "", address: "" });

  function onChange(e, i) {
    setShipments(
      shipments.filter((shipment) => {
        if (i === 0)
          return shipment.cname
            .toUpperCase()
            .includes(e.target.value.toUpperCase());
        else if (i === 1) {
          return shipment.cphone
            .toUpperCase()
            .includes(e.target.value.toUpperCase());
        } else
          return shipment.caddress
            .toUpperCase()
            .includes(e.target.value.toUpperCase());
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
              onChange(e, 0);
            }}
          ></input>
        </div>
        <div className={"filter-container phone"}>
          <input
            type="text"
            value={filters.phone}
            onChange={(e) => {
              setFilters({ ...filters, phone: e.target.value });
              onChange(e, 1);
            }}
          ></input>
        </div>
        <div className={"filter-container address"}>
          <input
            type="text"
            value={filters.address}
            onChange={(e) => {
              setFilters({ ...filters, address: e.target.value });
              onChange(e, 2);
            }}
          ></input>
        </div>
        <div className="empty-div"></div>
      </div>
    </>
  );
}

export default FilterBar;

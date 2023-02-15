import React from "react";

function Button({ showFilter, setShowFilter, shipments, setShipments }) {
  return (
    <button
      className={showFilter ? `btn btn-header red` : `btn btn-header`}
      onClick={() => {
        setShipments(shipments);
        setShowFilter(!showFilter);
      }}
    >
      {showFilter ? "Clear" : "Filter"}
    </button>
  );
}

export default Button;

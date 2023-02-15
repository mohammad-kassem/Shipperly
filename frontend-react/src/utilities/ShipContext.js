import React, { useState } from "react";

export const ShipContext = React.createContext();

const ShipProvider = ({ children }) => {
  const [shipment, setShipment] = useState({});

  return (
    <ShipContext.Provider value={{ shipment, setShipment }}>
      {children}
    </ShipContext.Provider>
  );
};

export const useShipment = () => {
  const { shipment, setShipment } = React.useContext(ShipContext);
  return { shipment, setShipment };
};

export default ShipProvider;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddShip from "./pages/AddShip";
import EditShip from "./pages/EditShip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shipments from "./pages/Shipments";
import ShipProvider from "./utilities/ShipContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <ShipProvider>
        <Routes>
          <Route path="/" element={<Shipments />}></Route>
          <Route path="/add" element={<AddShip />}></Route>
          <Route path="/edit" element={<EditShip />}></Route>
        </Routes>
      </ShipProvider>
    </BrowserRouter>
  );
}

export default App;

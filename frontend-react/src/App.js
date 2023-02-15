import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddShip from "./pages/AddShip";
import EditShip from "./pages/EditShip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shipments from "./pages/Shipments";
import ShipProvider from "./utilities/ShipContext";
import UserProvider from "./utilities/UserContext";

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <ShipProvider>
        <Routes>
          <Route
            path="/"
            element={
              <NavBar>
                <Shipments />
              </NavBar>
            }
          ></Route>
          <Route
            path="/add"
            element={
              <NavBar>
                <AddShip />
              </NavBar>
            }
          ></Route>
          <Route
            path="/edit"
            element={
              <NavBar>
                <EditShip />
              </NavBar>
            }
          ></Route>
        </Routes>
      </ShipProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./NavBar.scss";
import { useUser } from "../utilities/UserContext";

const NavBar = ({ children }) => {
  const {user} = useUser();
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <>
      <nav>
        <h1>Welcome {user.name}</h1>
        <div>
          <CgProfile className='icons' size={40} onClick={onClick} />
        </div>
      </nav>
      {children}
    </>
  );
};

export default NavBar;

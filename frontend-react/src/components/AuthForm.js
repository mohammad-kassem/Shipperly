import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../api/ApiCalls";
import "./AuthForm.scss";

const AuthForm = ({ type }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (type === "login") {
      const res = await login({ email, password });
      res && navigate("/");
    } else {
      const res = await register({ fname, lname, email, password });
      res && navigate("/");
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-content">
        <h1>{type === "register" ? "Register" : "Log In"} </h1>
        {type === "register" && (
          <>
            <input
              type="text"
              id="fname"
              value={fname}
              placeholder="First name"
              onChange={function (e) {
                setFname(e.target.value);
              }}
            ></input>
            <input
              type="text"
              id="lname"
              value={lname}
              placeholder="Last name"
              onChange={function (e) {
                setLname(e.target.value);
              }}
            ></input>
          </>
        )}
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Email address"
          required
          onChange={function (e) {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          required
          onChange={function (e) {
            setPassword(e.target.value);
          }}
        ></input>
        <button type="submit" className="btn btn-large">
          {type === "register" ? "Register" : "Log In"}
        </button>
        <div className="link">
          {type === "register" ? (
            <Link to="/login"> Already Have An Account? </Link>
          ) : (
            <Link to="/register"> Create New Account </Link>
          )}
        </div>
      </div>
    </form>
  );
};

export default AuthForm;

import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking Site</span>
        </Link>
        {/*  if there will be a user it will show the username on the top right side */}
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button onClick={handleClickLogin} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import "./header.scss";
import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const menu =
    splitLocation[1] === ""
      ? "Home"
      : splitLocation[1].charAt(0).toUpperCase() + splitLocation[1].slice(1);
  return (
    <div className="header-container">
      <div className="page-heading">
        <span>{menu}</span>
      </div>
      {user ? (
        <div className="header-search-container">
          <Link
            className="header-notification"
            style={{ textDecoration: "none" }}
          >
            <MdNotifications />
          </Link>
          <Link className="header-search" style={{ textDecoration: "none" }}>
            <BsSearch />
            <input placeholder="Search" />
          </Link>
          <button className="btn" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      ) : (
        <div className="header-search-container">
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

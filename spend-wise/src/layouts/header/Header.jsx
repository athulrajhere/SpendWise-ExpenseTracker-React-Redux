import { Link } from "react-router-dom";
import "./header.scss";
import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

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
      </div>
    </div>
  );
};

export default Header;

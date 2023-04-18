import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {
  const navigationLinks = [
    { title: "Home", slug: "/" },
    { title: "Explore", slug: "/explore" },
  ];

  const [loggedIn, setLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") ? true : false);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    )
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
    // console.log("Location updated!");
    // console.log({ location });
    // console.log({ navigate });
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <footer>
      {
        <ul className="primary-nav">
          {navigationLinks.map((link, idx) => (
            <li className="footer-bar" key={idx}>
              <Link to={link.slug}>{link.title}</Link>
            </li>
          ))}
        </ul>
      }
      <ul className="secondary-nav">
        {loggedIn ? (
          <>
            <li>
              <Link to="/my-list">My List</Link>
            </li>
            <li className="footer-item" onClick={onLogout}>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li className="footer-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="footer-item">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </footer>
  );
};

export default Footer;

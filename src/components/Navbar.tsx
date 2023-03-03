import { Link } from "react-router-dom";
import { User } from "../models/model";

import styles from "./Navbar.module.css";

interface NavbarProps {
  user: User | undefined;
}

const Navbar = ({ user }: NavbarProps) => {
  let loginLogOut: any;

  if (user) {
    loginLogOut = (
      <Link to="/logout" style={{ marginLeft: "auto" }}>
        {user.userName}
      </Link>
    );
  } else {
    loginLogOut = (
      <Link to="/login" style={{ marginLeft: "auto" }}>
        Login
      </Link>
    );
  }
  return (
    <div className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/spaces">Spaces</Link>
      {loginLogOut}
    </div>
  );
};

export default Navbar;

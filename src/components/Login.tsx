import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/model";
import { AuthService } from "../services/AuthService";

import styles from "./Login.module.css";

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void;
}

interface CustomEvent {
  target: HTMLInputElement;
}

const Login = (props: LoginProps) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const navigate = useNavigate();

  function updatePassword(e: CustomEvent) {
    setPassword(e.target.value);
  }

  function updateUserName(e: CustomEvent) {
    setUserName(e.target.value);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const result = await props.authService.login(userName, password);
    setLoginAttempted(true);

    if (result) {
      setLoginSuccessful(true);
      props.setUser(result);
      navigate("/profile");
    } else {
      console.log("error");
    }
  }

  let loginMessage: any;
  if (loginAttempted) {
    if (loginSuccessful) {
      loginMessage = <label>Login successful</label>;
    } else {
      loginMessage = <label>Login failed</label>;
    }
  }

  return (
    <div>
      <h2 className={styles.header}>Please Login</h2>
      <form>
        <input value={userName} onChange={updateUserName} />
        <br />
        <input value={password} type="password" onChange={updatePassword} />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      {loginMessage}
    </div>
  );
};

export default Login;

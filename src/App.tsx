import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import CreateSpace from "./components/spaces/CreateSpace";
import Spaces from "./components/spaces/Spaces";
import { User } from "./models/model";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";

function App(props: any) {
  const [activeUser, setActiveUser] = useState<User>();
  const authService: AuthService = new AuthService();
  const dataService: DataService = new DataService();

  async function setUser(user: User) {
    setActiveUser(user);
    await authService.getAWSTemporaryCreds(user.cognitoUser);
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Navbar user={activeUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<Profile user={activeUser} authService={authService} />}
          />
          <Route
            path="/login"
            element={<Login authService={authService} setUser={setUser} />}
          />
          <Route
            path="/spaces"
            element={<Spaces dateService={dataService} />}
          />
          <Route
            path="/create-space"
            element={<CreateSpace dataService={dataService} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

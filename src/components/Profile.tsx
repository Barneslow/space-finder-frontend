import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, UserAttribute } from "../models/model";
import { AuthService } from "../services/AuthService";

interface ProfileProps {
  user: User | undefined;
  authService: AuthService;
}

const Profile = ({ user, authService }: ProfileProps) => {
  const [userAttributes, setUserAttributes] = useState<UserAttribute[]>([]);
  let profileSpace;

  useEffect(() => {
    async function loadAttributes() {
      if (user) {
        const userAtrs = await authService.getUserAttributes(user);
        setUserAttributes(userAtrs);
      }
    }

    loadAttributes();
  }, [user]);

  function renderUserAttributes() {
    const rows = [];
    for (const attribute of userAttributes) {
      rows.push(
        <tr key={attribute.Name}>
          <td>{attribute.Name}</td>
          <td>{attribute.Value}</td>
        </tr>
      );
    }
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  if (user) {
    profileSpace = (
      <div>
        <h3>Hello {user.userName}</h3>
        Here are your attributes
        {renderUserAttributes()}
      </div>
    );
  } else {
    profileSpace = <Link to="/login">Login</Link>;
  }

  return <div>Profile page {profileSpace}</div>;
};

export default Profile;

import React, { useContext } from "react";
import { UserContext } from "../../User Context/UserContext";

function Profile() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      <h2>Welcome, {userData.username}!</h2>
      <p>Email: {userData.email}</p>
      {/* Add more profile information here */}
    </div>
  );
}

export default Profile;
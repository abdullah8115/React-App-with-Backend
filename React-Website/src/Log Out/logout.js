import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../User Context/UserContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { saveUserData } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const response = await fetch('/logout');
      if (response.ok) {
        localStorage.removeItem('userData');
        saveUserData({});
        navigate('/form1');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
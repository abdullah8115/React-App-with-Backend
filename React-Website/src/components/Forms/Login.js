import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import loginformgirl from "../Images/loginformgirl.jpg";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data =  await response.json();
      if (data) {
        console.log(data);
        alert(data.message);
        navigate("/"); // Redirect to homepage upon successful login
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="login-imgbox1">
        <img className="login-image1" src={loginformgirl} alt="loginformgirl" />
      </div>
      <div className="login-container">
        <div className="login-form">
          <span className="fasco-login">FASCO</span>
          <div className="login-buttons">
            <button type="button" className="google-button">
              Log In with Google
            </button>
            <button type="button" className="fb-button">
              Log In with Facebook
            </button>
          </div>
          <h2>Log In To Fasco</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type In Your Email Here"
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Type In Your Password Here"
                required
              />
            </label>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;

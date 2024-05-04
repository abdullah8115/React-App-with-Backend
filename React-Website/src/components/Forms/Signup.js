import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import signupformgirl from "../Images/signupformgirl.jpg";
import "./Signup.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert("Signup successful");
        navigate("/form1");
      } else if (response.status === 409) {
        setError("Email already in use. Please use a different email.");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("Signup failed");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="login-imgbox2">
        <img
          className="login-image2"
          src={signupformgirl}
          alt="signupformgirl"
        />
      </div>
      <div className="login-container">
        <div className="login-form">
          <h2>Create a New Account</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Full Name:
              <br />
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Type In Your Full Name"
                required
              />
            </label>
            <br />
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
                placeholder="Type In Your Valid Password"
                required
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Your Password"
                required
              />
            </label>
            <br />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
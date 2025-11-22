import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({email: "",password: "",level: 0,});

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.email) newErrors.email = "Email chưa nhập";
    if (!form.password) newErrors.password = "Password chưa nhập";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await axios.post(
        "http://localhost/laravel8/laravel8/public/api/login",
        form
      );

      console.log("API login trả về:", res.data);

      if (res.data.token) {

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("auth", JSON.stringify(res.data.auth));

        alert("Đăng nhập thành công!");
        navigate("/"); 
      } else {
        alert("Đăng nhập thất bại!");
      }
    } catch (error) {
      alert("Lỗi khi gửi API!");
      console.error(error);
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleInput}
        />
        <p style={{ color: "red" }}>{errors.email}</p>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInput}
        />
        <p style={{ color: "red" }}>{errors.password}</p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

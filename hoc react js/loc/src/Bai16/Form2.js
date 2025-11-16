import React, { useState } from "react";
import Error from "./Error";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // lưu lỗi dạng object
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    if (form.email === "") {
      newErrors.email = "Email không được để trống";
    }

    if (form.password === "") {
      newErrors.password = "Password không được để trống";
    }

    setErrors(newErrors);

    // Nếu hết lỗi
    if (Object.keys(newErrors).length === 0) {
      alert("Submit thành công!");
    }
  }

  return (
    <div>
      <h2>Login Form</h2>

      {/* đưa errors xuống Error component */}
      <Error errors={errors} />

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default LoginForm;

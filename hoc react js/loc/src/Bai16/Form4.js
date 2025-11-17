import React, { useState } from "react";
import Error from "./Error";

function Form4() {
  const [inputs, setInputs] = useState({email: "",pass: ""});
  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const checkEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let flag = true;

    if (inputs.email === "") {
      newErrors.email = "chưa nhập email";
      flag = false;
    } else if (!checkEmail(inputs.email)) {
      newErrors.email = "Email không đúng định dạng";
      flag = false;
    }

    if (inputs.pass === "") {
      newErrors.pass = "chưa nhập mật khẩu";
      flag = false;
    }

    if (!flag) {
      setErrors(newErrors);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("chưa có tài khoản");
      return;
    }
    if (inputs.email === user.email && inputs.pass === user.pass) {
      alert("Login thành công!");
    } else {
      alert("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div style={{ width: "300px", margin: "40px auto" }}>
      <Error errors={errors} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={inputs.email}
          onChange={handleInput}
          placeholder="Email"
          style={styles.input}
        />

        <input
          type="password"
          name="pass"
          value={inputs.pass}
          onChange={handleInput}
          placeholder="Password"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Form4;

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px"
  }
};

import React, { useState } from "react";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPass, setErrPass] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
    if (errEmail !== "") setErrEmail("");
  }

  function handlePass(e) {
    setPass(e.target.value);
    if (errPass !== "") setErrPass("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    let valid = true;
    if (email === "") {
      setErrEmail("chưa nhập email");
      valid = false;
    }
    if (pass === "") {
      setErrPass("chưa nhập mật khẩu");
      valid = false;
    }
    if (valid) {
      alert("đăng nhập thành công ");
    }
  }

  return (
    <div style={{ width: "700px" }}>
      <form onSubmit={handleSubmit}>
        <input type="text" 
          placeholder="Email..."
          value={email}
          onChange={handleEmail}
        />
        <p style={{ color: "red" }}>{errEmail}</p>

        <input
          type="password"
          placeholder="Password..."
          value={pass}
          onChange={handlePass}
        />
        <p style={{ color: "red" }}>{errPass}</p>

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default FormLogin;

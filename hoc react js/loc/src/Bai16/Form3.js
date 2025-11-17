import React, { useState } from "react";
import Error from "./Error"; 

function Form3() {
  const arrSex = [
    { id: "", name: "Vui lòng chọn" },
    { id: "1", name: "Male" },
    { id: "2", name: "Female" }
  ];

  const [inputs, setInputs] = useState({email: "",pass: "",sex: ""
  });

  const [avatar, setAvatar] = useState(null); 
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

  const handleFile = (e) => {
    console.log(e.target.files); 
    let file = e.target.files[0];

    setAvatar(file);

    setErrors((prev) => ({
      ...prev,
      avatar: ""
    }));
  };

  const isEmail = (email) => {
    let pattern = /^\S+@\S+\.\S+$/;
    return pattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let flag = true;

    if (inputs.email.trim() === "") {
      newErrors.email = "chưa nhập email";
      flag = false;
    } else if (!isEmail(inputs.email)) {
      newErrors.email = "Email không đúng định dạng";
      flag = false;
    }

    if (inputs.pass.trim() === "") {
      newErrors.pass = "chưa nhập pass";
      flag = false;
    }

    if (inputs.sex === "") {
      newErrors.sex = "chưa chọn giới tính";
      flag = false;
    }

    if (!avatar) {
      newErrors.avatar = "chưa chọn ảnh đại diện";
      flag = false;
    } else {
      if (!avatar.type.startsWith("image/")) {
        newErrors.avatar = "File không phải hình ảnh";
        flag = false;
      }

      if (avatar.size > 1024 * 1024) {
        newErrors.avatar = "Dung lượng ảnh phải <= 1MB";
        flag = false;
      }
    }

    setErrors(newErrors);

    if (flag) {
      alert("Đăng ký thành công!");
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: inputs.email,
          pass: inputs.pass
        })
      );

      setInputs({ email: "", pass: "", sex: "" });
      setAvatar(null);
    }
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={handleSubmit}
        style={styles.form}
        encType="multipart/form-data"
      >
        <Error errors={errors} />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleInput}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name="pass"
          value={inputs.pass}
          onChange={handleInput}
          style={styles.input}
        />

        <select
          name="sex"
          value={inputs.sex}
          onChange={handleInput}
          style={styles.input}
        >
          {arrSex.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={handleFile}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Form3;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f2f2"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    background: "#fff",
    borderRadius: "6px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
  },
  input: {
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "15px"
  },
  button: {
    padding: "10px",
    marginTop: "5px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

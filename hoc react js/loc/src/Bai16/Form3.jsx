import React, { useState } from "react";
import Error from "./Error"; // dùng component lỗi của bạn

function Form3() {
  // Dữ liệu cho select Sex
  const arrSex = [
    { id: "", name: "Vui lòng chọn" },
    { id: "1", name: "Male" },
    { id: "2", name: "Female" }
  ];

  // State cho các field
  const [inputs, setInputs] = useState({
    email: "",
    pass: "",
    sex: ""
  });

  const [avatar, setAvatar] = useState(null); // file
  const [errors, setErrors] = useState({});   // object lỗi


  // handle input text/select
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));

    // Xóa lỗi khi user nhập lại
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  // handle file
  const handleFile = (e) => {
    console.log(e.target.files); // xem cấu trúc file
    let file = e.target.files[0];

    setAvatar(file);

    // Xóa lỗi avatar khi chọn lại
    setErrors((prev) => ({
      ...prev,
      avatar: ""
    }));
  };

  // Validate email bằng regex đơn giản
  const isEmail = (email) => {
    let pattern = /^\S+@\S+\.\S+$/;
    return pattern.test(email);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let flag = true;

    // Validate email
    if (inputs.email.trim() === "") {
      newErrors.email = "Vui lòng nhập email";
      flag = false;
    } else if (!isEmail(inputs.email)) {
      newErrors.email = "Email không đúng định dạng";
      flag = false;
    }

    // Validate pass
    if (inputs.pass.trim() === "") {
      newErrors.pass = "Vui lòng nhập pass";
      flag = false;
    }

    // Validate sex
    if (inputs.sex === "") {
      newErrors.sex = "Vui lòng chọn giới tính";
      flag = false;
    }

    // Validate avatar
    if (!avatar) {
      newErrors.avatar = "Vui lòng chọn ảnh đại diện";
      flag = false;
    } else {
      // Check type
      if (!avatar.type.startsWith("image/")) {
        newErrors.avatar = "File phải là hình ảnh";
        flag = false;
      }

      // Check size <= 1MB
      if (avatar.size > 1024 * 1024) {
        newErrors.avatar = "Dung lượng ảnh phải <= 1MB";
        flag = false;
      }
    }

    setErrors(newErrors);

    // Nếu hợp lệ hết
    if (flag) {
      alert("Đăng ký thành công!");

      // Lưu vào localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: inputs.email,
          pass: inputs.pass
        })
      );

      // Xóa form
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

        {/* HIỂN THỊ TẤT CẢ LỖI */}
        <Error errors={errors} />

        {/* EMAIL */}
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleInput}
          style={styles.input}
        />

        {/* PASS */}
        <input
          type="password"
          placeholder="Password"
          name="pass"
          value={inputs.pass}
          onChange={handleInput}
          style={styles.input}
        />

        {/* SEX */}
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

        {/* AVATAR */}
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

// CSS object
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

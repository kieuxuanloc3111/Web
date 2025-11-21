import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    level: 0, 
  });

  const [file, setFile] = useState(null); 
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e) => {
    let fileData = e.target.files[0];
    let reader = new FileReader();

    reader.onload = (event) => {
      setForm({ ...form, avatar: event.target.result }); 
      setFile(fileData); 
    };

    reader.readAsDataURL(fileData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.name) newErrors.name = "Chưa nhập name";
    if (!form.email) newErrors.email = "Chưa nhập Email";
    if (!form.password) newErrors.password = "Chưa nhập pass";
    if (!form.phone) newErrors.phone = "Chưa nhập phone";
    if (!form.address) newErrors.address = "Chưa nhập address";

    if (!file) {
      newErrors.avatar = "Chưa chọn avatar";
    } else {
      if (!file.type.includes("image")) newErrors.avatar = "File phải là hình ảnh";
      if (file.size > 1024 * 1024) newErrors.avatar = "Ảnh phải dưới 1MB";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});


    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("phone", form.phone);
    formData.append("address", form.address);
    formData.append("level", form.level);
    formData.append("avatar", file);

    try {
      const res = await axios.post(
        "http://localhost/laravel8/laravel8/public/api/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("API trả về:", res.data);

    } catch (error) {
      console.error("Lỗi API:", error);
      alert("Đăng ký thất bại");
    }
  };


  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleInput} placeholder="Name" />
        <p style={{ color: "red" }}>{errors.name}</p>

        <input name="email" onChange={handleInput} placeholder="Email" />
        <p style={{ color: "red" }}>{errors.email}</p>

        <input name="password" onChange={handleInput} placeholder="Password" />
        <p style={{ color: "red" }}>{errors.password}</p>

        <input name="phone" onChange={handleInput} placeholder="Phone" />
        <p style={{ color: "red" }}>{errors.phone}</p>

        <input name="address" onChange={handleInput} placeholder="Address" />
        <p style={{ color: "red" }}>{errors.address}</p>

        <input type="file" onChange={handleAvatar} />
        <p style={{ color: "red" }}>{errors.avatar}</p>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

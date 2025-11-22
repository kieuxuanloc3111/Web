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
  const [apiError, setApiError] = useState(""); 

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

    setApiError(""); 

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
      console.log("thong tin ảnh :",file);


      if (res.data.errors) {
        if (res.data.errors.email) {
          setApiError(res.data.errors.email[0]); // ví dụ: "email da ton tai"
          return; 
        }
      }

      alert("Đăng ký thành công!");

    } catch (error) {
      console.error("Lỗi thực sự:", error);
      setApiError("Không thể kết nối server");
    }

  };

  return (
    <section id="form" style={{ marginTop: "50px" }}>
      <div className="container">
        <div className="row">

          <div className="col-sm-8 col-sm-offset-2">
            <div className="signup-form">

              <h2>New User Signup!</h2>

              {/* ❗ Hiện lỗi từ backend */}
              {apiError && (
                <p style={{ color: "red", fontWeight: "bold" }}>{apiError}</p>
              )}

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.name}</p>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="form-control"
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.email}</p>

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.password}</p>

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="form-control"
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.phone}</p>

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control"
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.address}</p>

                <label style={{ marginTop: "10px" }}>Avatar:</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleAvatar}
                />
                <p style={{ color: "red" }}>{errors.avatar}</p>

                <button type="submit" className="btn btn-default">
                  Signup
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Register;

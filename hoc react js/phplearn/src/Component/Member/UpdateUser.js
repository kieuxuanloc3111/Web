import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "", // base64 string
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);

  // =========================================
  // LẤY USER TỪ LOCAL STORAGE
  // =========================================
  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      const user = JSON.parse(auth);

      setUserId(user.id);

      setForm({
        name: user.name,
        email: user.email,
        password: "",
        phone: user.phone,
        address: user.address,
        avatar: "",
      });

      setFile(null);
      setErrors({});
    }
  }, []);

  // =========================================
  // INPUT TEXT
  // =========================================
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================================
  // HANDLE AVATAR
  // =========================================
  const handleAvatar = (e) => {
    let fileData = e.target.files[0];
    if (!fileData) return;

    let reader = new FileReader();
    reader.onload = (event) => {
      setForm({ ...form, avatar: event.target.result });
      setFile(fileData);
    };

    reader.readAsDataURL(fileData);
  };

  // =========================================
  // SUBMIT UPDATE
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit updating user...");

    let newErrors = {};

    if (!form.name) newErrors.name = "Chưa nhập name";
    if (!form.phone) newErrors.phone = "Chưa nhập phone";
    if (!form.address) newErrors.address = "Chưa nhập address";

    if (file) {
      if (!file.type.includes("image"))
        newErrors.avatar = "File phải là hình ảnh";
      if (file.size > 1024 * 1024)
        newErrors.avatar = "Ảnh phải dưới 1MB";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const newdata = {
      name: form.name,
      email: form.email,
      password: form.password ? form.password : "",
      phone: form.phone,
      address: form.address,
      avatar: form.avatar,
    };

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost/laravel8/laravel8/public/api/user/update/${userId}`,
        newdata,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API update trả về:", res.data);

      if (res.data.Auth && res.data.token) {
        localStorage.setItem("auth", JSON.stringify(res.data.Auth));
        localStorage.setItem("token", res.data.token);

        alert("Cập nhật thành công!");

        // window.location.reload();
      }

    } catch (err) {
      console.log("Lỗi API update:", err);
    }
  };

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Update User</h2>

        <div className="signup-form">

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInput}
            />
            <p style={{ color: "red" }}>{errors.name}</p>

            {/* EMAIL (readonly) */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              readOnly
              style={{ background: "#e9e9e9" }}
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password (optional)"
              value={form.password}
              onChange={handleInput}
            />

            {/* PHONE */}
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleInput}
            />
            <p style={{ color: "red" }}>{errors.phone}</p>

            {/* ADDRESS */}
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleInput}
            />
            <p style={{ color: "red" }}>{errors.address}</p>

            {/* AVATAR */}
            <label style={{ marginTop: "10px" }}>Avatar:</label>
            <input type="file" onChange={handleAvatar} />
            <p style={{ color: "red" }}>{errors.avatar}</p>

            {/* PREVIEW */}
            {form.avatar && (
              <img
                src={form.avatar}
                alt="preview"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 5,
                  marginTop: 10,
                }}
              />
            )}

            <button type="submit" className="btn btn-default">
              Update
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

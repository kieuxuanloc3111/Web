import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",   
    level: 0
  });

  const [file, setFile] = useState(null); 
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
  };

  const handleAvatar = (e) => {
    const f = e.target.files[0];

    if (!f) return;

    if (!f.type.startsWith("image/")) {
      setErrors({ ...errors, avatar: "File phải là hình ảnh" });
      return;
    }

    if (f.size > 1024 * 1024) {
      setErrors({ ...errors, avatar: "Dung lượng phải nhỏ hơn 1MB" });
      return;
    }

    setErrors({ ...errors, avatar: "" });
    setFile(f);

    const reader = new FileReader();
    reader.onload = (e) => {
      setForm({ 
        ...form, 
        avatar: e.target.result
      });
    };

    reader.readAsDataURL(f);
  };

  const validate = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Tên bắt buộc";
    if (!form.email.trim()) temp.email = "Email bắt buộc";
    if (!form.password.trim()) temp.password = "Password bắt buộc";
    if (!form.phone.trim()) temp.phone = "Phone bắt buộc";
    if (!form.address.trim()) temp.address = "Địa chỉ bắt buộc";

    if (!file) temp.avatar = "Vui lòng chọn hình ảnh";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // ⭐⭐ LOG THÔNG TIN TRƯỚC KHI GỬI API ⭐⭐
    console.log("===== FORM GỬI API =====");
    console.log(form);

    console.log("===== FILE THẬT (DÙNG ĐỂ CHECK) =====");
    console.log(file);

    try {
      const res = await axios.post(
        "http://localhost/laravel8/laravel8/public/api/register",
        form
      );

      setSuccessMsg("Đăng ký thành công!");

      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
        level: 0
      });

      setFile(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ width: "400px", margin: "30px auto" }}>
      <h2>Register</h2>

      {successMsg && (
        <p style={{ color: "green", marginBottom: "10px" }}>{successMsg}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.name}</p>
        </div>

        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.email}</p>
        </div>

        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.password}</p>
        </div>

        <div>
          <label>Phone:</label>
          <input 
            type="text" 
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.phone}</p>
        </div>

        <div>
          <label>Address:</label>
          <input 
            type="text" 
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.address}</p>
        </div>

        <div>
          <label>Avatar:</label>
          <input 
            type="file"
            accept="image/*"
            onChange={handleAvatar}
          />
          <p style={{ color: "red" }}>{errors.avatar}</p>
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

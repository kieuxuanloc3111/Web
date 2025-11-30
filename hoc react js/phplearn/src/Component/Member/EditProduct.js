import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // lấy id product từ URL

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: 1,
    sale: "",
    company: "",
    detail: "",
  });

  const [avatar, setAvatar] = useState([]); // CHỈ chứa ảnh mới
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = localStorage.getItem("token");

  // LOAD CATEGORY + BRAND
  useEffect(() => {
    axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
      .then((res) => {
        setCategories(res.data.category || []);
        setBrands(res.data.brand || []);
      });
  }, []);

  // LOAD PRODUCT INFO
  useEffect(() => {
    axios.get(
      `http://localhost/laravel8/laravel8/public/api/user/product/${id}`,
      {
        headers: { Authorization: "Bearer " + token }
      }
    )
    .then((res) => {
      const data = res.data.data;

      setForm({
        name: data.name,
        price: data.price,
        category: data.id_category,
        brand: data.id_brand,
        status: data.status,
        sale: data.sale || "",
        company: data.company_profile,
        detail: data.detail,
      });
    })
    .catch(err => console.log("ERROR LOAD PRODUCT:", err));
  }, [id, token]);

  // INPUT CHANGE
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e) => {
    const value = Number(e.target.value);

    setForm({
      ...form,
      status: value,
      sale: value === 1 ? "" : form.sale,
    });
  };

  // UPLOAD ẢNH MỚI (max 3)
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    if (avatar.length + files.length > 3) {
      setErrors({ images: "Upload tối đa 3 ảnh!" });
      return;
    }

    setErrors({});
    setAvatar((prev) => [...prev, ...files]);
  };

  // SUBMIT UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.name) newErrors.name = "Chưa nhập tên";
    if (!form.price) newErrors.price = "Chưa nhập giá";
    if (!form.category) newErrors.category = "Chưa chọn category";
    if (!form.brand) newErrors.brand = "Chưa chọn brand";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("user_id", auth.id);
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("status", form.status);
    formData.append("sale", form.status === 0 ? form.sale : "");
    formData.append("company", form.company);
    formData.append("detail", form.detail);

    // CHỈ GỬI ẢNH MỚI
    avatar.forEach((file) => {
      formData.append("file[]", file);
    });

    try {
      const res = await axios.post(
        `http://localhost/laravel8/laravel8/public/api/user/product/update/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update Response:", res.data);
      alert("Cập nhật thành công!");

    } catch (err) {
      console.log("Lỗi API:", err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Edit Product</h2>

        <div className="signup-form">
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInput}
            />
            <p style={{ color: "red" }}>{errors.name}</p>

            <input
              type="text"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleInput}
            />
            <p style={{ color: "red" }}>{errors.price}</p>

            <select
              name="category"
              value={form.category}
              onChange={handleInput}
              className="form-control"
              style={{ marginBottom: 15 }}
            >
              <option value="">Choose category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>{item.category}</option>
              ))}
            </select>

            <select
              name="brand"
              value={form.brand}
              onChange={handleInput}
              className="form-control"
              style={{ marginBottom: 15 }}
            >
              <option value="">Choose brand</option>
              {brands.map((item) => (
                <option key={item.id} value={item.id}>{item.brand}</option>
              ))}
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleStatusChange}
              className="form-control"
              style={{ marginBottom: 15 }}
            >
              <option value={1}>New</option>
              <option value={0}>Sale</option>
            </select>

            {form.status === 0 && (
              <div style={{ marginBottom: 15 }}>
                <input
                  type="text"
                  name="sale"
                  placeholder="Sale"
                  value={form.sale}
                  onChange={handleInput}
                />
              </div>
            )}

            <input
              type="text"
              name="company"
              placeholder="Company profile"
              value={form.company}
              onChange={handleInput}
            />

            <br /><br />

            <label>Upload Images (max 3):</label>
            <input
              type="file"
              multiple
              onChange={handleFiles}
              style={{ marginBottom: 10 }}
            />
            <p style={{ color: "red" }}>{errors.images}</p>

            {/* Preview ảnh mới */}
            {avatar.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
                {avatar.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt=""
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 5,
                    }}
                  />
                ))}
              </div>
            )}

            <textarea
              name="detail"
              rows="5"
              placeholder="Detail"
              value={form.detail}
              onChange={handleInput}
            ></textarea>

            <button type="submit" className="btn btn-default" style={{ marginTop: 15 }}>
              Update Product
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

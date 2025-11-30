// EditProduct.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");

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

  // existing images names (from API) e.g. ["a.jpg","b.jpg"]
  const [existingImages, setExistingImages] = useState([]);
  // names marked for deletion (avatarCheckBox[])
  const [toDelete, setToDelete] = useState([]);
  // new File objects selected by user
  const [avatar, setAvatar] = useState([]);
  // local preview URLs for new files
  const [newPreviews, setNewPreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const inputFileRef = useRef(null);

  // load category & brand
  useEffect(() => {
    axios
      .get("http://localhost/laravel8/laravel8/public/api/category-brand")
      .then((res) => {
        setCategories(res.data.category || []);
        setBrands(res.data.brand || []);
      })
      .catch((err) => {
        console.log("ERROR LOAD CATEGORY-BRAND:", err);
      });
  }, []);

  // load product
  useEffect(() => {
    if (!token) return;
    axios
      .get(`http://localhost/laravel8/laravel8/public/api/user/product/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const data = res.data.data;
        if (!data) {
          console.log("No product data");
          return;
        }

        // set basic fields
        setForm({
          name: data.name || "",
          price: data.price || "",
          category: data.id_category || "",
          brand: data.id_brand || "",
          status: typeof data.status !== "undefined" ? data.status : 1,
          sale: data.sale || "",
          company: data.company_profile || "",
          detail: data.detail || "",
        });

        // parse image JSON string -> array
        let imgs = [];
        try {
          imgs = Array.isArray(data.image) ? data.image : JSON.parse(data.image || "[]");
        } catch (e) {
          imgs = [];
        }
        setExistingImages(imgs);
      })
      .catch((err) => {
        console.log("ERROR LOAD PRODUCT:", err);
      });
  }, [id, token]);

  // cleanup created object URLs when avatar or component unmount changes
  useEffect(() => {
    // create previews for new avatar files
    const urls = avatar.map((file) => URL.createObjectURL(file));
    setNewPreviews(urls);

    return () => {
      // revoke previous urls
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [avatar]);

  // handle input changes
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e) => {
    const value = Number(e.target.value);
    setForm((prev) => ({
      ...prev,
      status: value,
      sale: value === 1 ? "" : prev.sale,
    }));
  };

  // toggle checkbox to mark existing image for deletion
  const toggleDelete = (filename) => {
    setToDelete((prev) => {
      if (prev.includes(filename)) {
        return prev.filter((f) => f !== filename);
      } else {
        return [...prev, filename];
      }
    });
  };

  // handle selecting new files (max 3 total)
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // calculate current kept existing images (not marked delete)
    const keptExisting = existingImages.length - toDelete.length;
    const totalAfter = keptExisting + avatar.length + files.length;

    if (totalAfter > 3) {
      setErrors({ images: `Tổng ảnh cuối cùng không được vượt quá 3. (hiện tại giữ: ${keptExisting}, đã chọn mới: ${avatar.length})` });
      // reset input value so user can reselect
      if (inputFileRef.current) inputFileRef.current.value = "";
      return;
    }

    // append new files
    setAvatar((prev) => [...prev, ...files]);
    setErrors({});
    // reset input value to allow selecting same file again if needed
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  // remove one new selected file before submit
  const handleRemoveNewFile = (index) => {
    setAvatar((prev) => prev.filter((_, i) => i !== index));
  };

  // helper to build image URL for existing images
  const getExistingImageUrl = (filename) => {
    // Use product owner's id if available from auth or existingImages owner unknown.
    // If API response included id_user earlier you can use that; for now try auth.id
    const userId = auth?.id || "0";
    return `http://localhost/laravel8/laravel8/public/upload/product/${userId}/${filename}`;
  };

  // submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.name) newErrors.name = "Chưa nhập tên";
    if (!form.price) newErrors.price = "Chưa nhập giá";
    if (!form.category) newErrors.category = "Chưa chọn category";
    if (!form.brand) newErrors.brand = "Chưa chọn brand";

    // compute final images count after deletions and adding new ones
    const keptExisting = existingImages.length - toDelete.length;
    const finalCount = keptExisting + avatar.length;

    if (finalCount === 0) {
      newErrors.images = "Phải có ít nhất 1 ảnh (upload mới hoặc giữ ảnh cũ).";
    } else if (finalCount > 3) {
      newErrors.images = "Tổng ảnh cuối cùng không được lớn hơn 3.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // build formdata
    const formData = new FormData();
    formData.append("id", id);
    formData.append("user_id", auth?.id || "");
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("status", form.status);
    formData.append("sale", form.status === 0 ? form.sale : "");
    formData.append("company", form.company);
    formData.append("detail", form.detail);

    // append new files
    avatar.forEach((file) => {
      formData.append("file[]", file);
    });

    // append avatarCheckBox[] for each filename the user marked to delete
    toDelete.forEach((filename) => {
      formData.append("avatarCheckBox[]", filename);
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
      // optionally navigate back to product list
      // navigate("/account/product/list");
    } catch (err) {
      console.log("Lỗi API:", err);
      // if backend returns validation errors, you can map them to setErrors here
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
            <p style={{ color: "red" }}>{errors.category}</p>

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
            <p style={{ color: "red" }}>{errors.brand}</p>

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

            <label>Existing Images (check to delete):</label>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
              {existingImages.length === 0 && <div style={{ color: "gray" }}>No existing images</div>}
              {existingImages.map((filename) => {
                const checked = toDelete.includes(filename);
                return (
                  <div key={filename} style={{ textAlign: "center" }}>
                    <img
                      src={getExistingImageUrl(filename)}
                      alt={filename}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 6,
                        opacity: checked ? 0.35 : 1,
                        transition: "opacity .15s",
                        display: "block",
                      }}
                    />
                    <label style={{ display: "block", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDelete(filename)}
                        style={{ marginRight: 6 }}
                      />
                      Delete
                    </label>
                    <div style={{ maxWidth: 100, wordBreak: "break-word", fontSize: 12 }}>{filename}</div>
                  </div>
                );
              })}
            </div>

            <label>Upload New Images (max total 3):</label>
            <input
              ref={inputFileRef}
              type="file"
              multiple
              onChange={handleFiles}
              style={{ marginBottom: 10, display: "block" }}
              accept="image/*"
            />
            <p style={{ color: "red" }}>{errors.images}</p>

            {/* Preview new images with remove button */}
            {newPreviews.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
                {newPreviews.map((src, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <img
                      src={src}
                      alt={`new-${index}`}
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 5 }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewFile(index)}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: 22,
                        height: 22,
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </div>
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

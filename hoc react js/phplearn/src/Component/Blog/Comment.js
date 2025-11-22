import React, { useState } from "react";
import axios from "axios";

const Comment = ({ idBlog, onAddComment }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  let token = localStorage.getItem("token");
  let auth = localStorage.getItem("auth");
  let user = auth ? JSON.parse(auth) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !user) {
      alert("Vui lòng đăng nhập trước khi bình luận!");
      return;
    }

    if (!comment.trim()) {
      setError("Bạn chưa nhập bình luận!");
      return;
    }

    setError("");

    console.log("idBlog:", idBlog);
    console.log("user:", user);

    const url =
      "http://localhost/laravel8/laravel8/public/api/blog/comment/" + idBlog;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("id_blog", idBlog);
    formData.append("id_user", user.id);
    formData.append("comment", comment);
    formData.append("name_user", user.name);
    formData.append("image_user", user.avatar);
    formData.append("id_comment", 0);

    // debug
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const res = await axios.post(url, formData, config);

      console.log("Comment API Response:", res.data);

      if (res.data.data) {
        onAddComment({
          id_user: user.id,
          name_user: user.name,
          image_user: user.avatar,
          comment: comment,
        });

        setComment("");
      } else {
        alert("Comment thất bại!");
      }
    } catch (error) {
      console.log(error);
      alert("Lỗi khi gửi bình luận!");
    }
  };

  return (
    <div className="replay-box">
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Nhập bình luận..."
        ></textarea>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="btn btn-primary" type="submit">
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default Comment;

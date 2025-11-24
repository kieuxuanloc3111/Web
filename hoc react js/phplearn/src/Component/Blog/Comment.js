// Comment.js
import React, { useState } from "react";
import axios from "axios";

const Comment = ({ idBlog, parentId = 0, onAddComment }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const auth = localStorage.getItem("auth");
  const user = auth ? JSON.parse(auth) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      alert("Vui lòng đăng nhập trước!");
      return;
    }

    if (!comment.trim()) {
      setError("Bạn chưa nhập bình luận!");
      return;
    }

    setError("");

    const url = `http://localhost/laravel8/laravel8/public/api/blog/comment/${idBlog}`;
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
    formData.append("id_comment", parentId); // parent id (0 for root)

    try {
      const res = await axios.post(url, formData, config);

      if (res.data && res.data.data) {
        const returned = res.data.data;

        const newCmt = {
          id: returned.id,
          id_user: returned.id_user,
          name_user: returned.name_user,
          image_user: returned.image_user,
          comment: returned.comment,
          id_comment: returned.id_comment,
          created_at: returned.created_at
        };

        onAddComment(newCmt);
        setComment("");
      }

    } catch (err) {
      console.log(err);
      alert("Lỗi khi gửi bình luận!");
    }

  };

  return (
    <div className="replay-box">
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={parentId === 0 ? "Nhập bình luận..." : "Nhập trả lời..."}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="btn btn-primary" type="submit">
          {parentId === 0 ? "Gửi bình luận" : "Gửi trả lời"}
        </button>
      </form>
    </div>
  );
};

export default Comment;

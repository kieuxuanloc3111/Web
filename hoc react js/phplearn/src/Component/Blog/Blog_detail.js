import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Rate from "./Rate";
import ListComment from "./List_comment";
import Comment from "./Comment";

const Blog_detail = () => {
  const params = useParams();
  const [data, setData] = useState(null);

  // danh sách comment mới
  const [newComments, setNewComments] = useState([]);

  const handleAddComment = (cmt) => {
    setNewComments((prev) => [cmt, ...prev]);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          "http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id
        );
        setData(res.data.data);
      } catch (error) {
        console.log("Lỗi API:", error);
      }
    };

    fetchDetail();
  }, [params.id]);

  if (!data) return <p>Đang tải...</p>;

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-9">

            {/* BÀI VIẾT */}
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>

              <div className="single-blog-post">
                <h3>{data.title}</h3>

                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Author ID: {data.id_auth}</li>
                    <li><i className="fa fa-calendar" /> {data.created_at}</li>
                  </ul>
                </div>

                <img
                  src={`http://localhost/laravel8/laravel8/public/upload/Blog/image/${data.image}`}
                  alt={data.title}
                />

                <p>{data.description}</p>

                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>

                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RATE */}
            <Rate />

            {/* SHARE */}
            <div className="socials-share">
              <a href=""><img src="/frontend/images/blog/socials.png" alt="" /></a>
            </div>

            {/* LIST COMMENT (NHẬN COMMENT MỚI) */}
            <ListComment newComments={newComments} />

            {/* FORM COMMENT */}
            <Comment idBlog={params.id} onAddComment={handleAddComment} />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog_detail;

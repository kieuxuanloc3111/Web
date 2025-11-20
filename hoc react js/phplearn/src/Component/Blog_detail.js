import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Blog_detail = () => {
  const params = useParams(); // lấy id trên URL
  const [data, setData] = useState(null);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          "http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id
        );

        setData(res.data.data);
        setComment(res.data.data.comment || []);
      } catch (error) {
        console.log("Lỗi API:", error);
      }
    };

    fetchDetail();
  }, [params.id]);

  if (!data) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">{data.title}</h2>

              <div className="single-blog-post">

                {/* TITLE */}
                <h3>{data.title}</h3>

                {/* META */}
                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Tác giả ID: {data.id_auth}</li>
                    <li><i className="fa fa-calendar" /> {data.created_at}</li>
                  </ul>
                </div>

                {/* IMAGE */}
                <img
                  src={`http://localhost/laravel8/laravel8/public/upload/Blog/image/${data.image}`}
                  alt=""
                  style={{ width: "100%", marginBottom: "20px" }}
                />

                {/* DESCRIPTION */}
                <p>{data.description}</p>

                {/* CONTENT (đã là HTML nên phải render bằng dangerouslySetInnerHTML) */}
                <div
                  dangerouslySetInnerHTML={{ __html: data.content }}
                ></div>

              </div>
            </div>

            {/* COMMENTS */}
            <div className="response-area">
              <h2>{comment.length} RESPONSES</h2>

              <ul className="media-list">
                {comment.map((cmt, index) => (
                  <li className="media" key={index}>
                    <a className="pull-left" href="#">
                      <img
                        className="media-object"
                        src={`/frontend/images/blog/man-two.jpg`}
                        alt=""
                      />
                    </a>

                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li><i className="fa fa-user" /> {cmt.name}</li>
                        <li><i className="fa fa-calendar" /> {cmt.created_at}</li>
                      </ul>

                      <p>{cmt.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog_detail;

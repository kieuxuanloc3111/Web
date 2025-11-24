// Blog_detail.js
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Rate from "./Rate";
import ListComment from "./List_comment";
import Comment from "./Comment";

const Blog_detail = () => {
  const params = useParams();
  const [data, setData] = useState(null);

  // flat list of comments (from API + newly added)
  const [comments, setComments] = useState([]);

  // reply target: object { id, name_user } or null
  const [replyTarget, setReplyTarget] = useState(null);

  // ref to the comment form for scrolling
  const commentBoxRef = useRef(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost/laravel8/laravel8/public/api/blog/detail/${params.id}`
        );
        setData(res.data.data);

        const apiComments = res.data.data.comment;
        setComments(Array.isArray(apiComments) ? apiComments : []);
      } catch (error) {
        console.log("Lỗi API:", error);
        setComments([]);
      }
    };

    fetchDetail();
  }, [params.id]);

  // add new comment (from Comment component)
  const handleAddComment = (cmt) => {
    // cmt expected to be an object with at least: id, id_comment (parent), name_user, image_user, comment, created_at
    setComments((prev) => [cmt, ...prev]);
    // reset reply target
    setReplyTarget(null);
  };

  // when user clicks Reply on a particular comment
  const handleReply = (comment) => {
    // comment: the comment object user clicked reply on
    setReplyTarget(comment);

    // scroll to form
    setTimeout(() => {
      commentBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      // focus textarea via DOM (Comment will not automatically focus, but user can)
      const textarea = commentBoxRef.current?.querySelector("textarea");
      if (textarea) textarea.focus();
    }, 120);
  };

  const handleCancelReply = () => {
    setReplyTarget(null);
  };

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
              </div>
            </div>

            <Rate idBlog={params.id} />


            {/* LIST COMMENT */}
            <ListComment
              comments={comments}
              idBlog={params.id}
              onReply={handleReply}
              replyTargetId={replyTarget ? replyTarget.id : null}
            />

            {/* COMMENT FORM (cha hoặc con tùy replyTarget) */}
            <div ref={commentBoxRef} style={{ marginTop: 20 }}>
              {replyTarget && (
                <div style={{
                  marginBottom: 8,
                  padding: 8,
                  borderLeft: "4px solid #007bff",
                  background: "#f8fbff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    Đang trả lời: <b>{replyTarget.name_user}</b>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-secondary" onClick={handleCancelReply}>
                      Hủy
                    </button>
                  </div>
                </div>
              )}

              <Comment
                idBlog={params.id}
                parentId={replyTarget ? replyTarget.id : 0}
                onAddComment={handleAddComment}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog_detail;

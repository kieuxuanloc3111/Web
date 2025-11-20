import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Blog_detail = () => {
  const params = useParams();
  const [data, setData] = useState(null);

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

                <div
                  dangerouslySetInnerHTML={{ __html: data.content }}
                ></div>

                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
            </div>


     
            <div className="rating-area">
              <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                  <i className="fa fa-star color" />
                  <i className="fa fa-star color" />
                  <i className="fa fa-star color" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </li>
                <li className="color">(6 votes)</li>
              </ul>

              <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href="">Pink <span>/</span></a></li>
                <li><a className="color" href="">T-Shirt <span>/</span></a></li>
                <li><a className="color" href="">Girls</a></li>
              </ul>
            </div>

            <div className="socials-share">
              <a href=""><img src="/frontend/images/blog/socials.png" alt="" /></a>
            </div>

    
            <div className="response-area">
              <h2>3 RESPONSES</h2>
              <ul className="media-list">
                <li className="media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="/frontend/images/blog/man-two.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet...</p>
                    <a className="btn btn-primary" href=""><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>

        
                <li className="media second-media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="/frontend/images/blog/man-three.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet...</p>
                    <a className="btn btn-primary" href=""><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>

                <li className="media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="/frontend/images/blog/man-four.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet...</p>
                    <a className="btn btn-primary" href=""><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>

              </ul>
            </div>


            <div className="replay-box">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Leave a replay</h2>
                  <div className="text-area">
                    <div className="blank-arrow">
                      <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <textarea name="message" rows={11} defaultValue={""} />
                    <a className="btn btn-primary" href="">post comment</a>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog_detail;

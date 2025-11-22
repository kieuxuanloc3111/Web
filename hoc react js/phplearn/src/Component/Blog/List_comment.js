import React from "react";

const ListComment = ({ newComments = [] }) => {
  return (
    <div className="response-area">
      <h2>{3 + newComments.length} RESPONSES</h2>

      <ul className="media-list">

        {/* ========== COMMENT MỚI (NẾU CÓ) ========== */}
        {newComments.map((cmt, index) => (
          <li className="media" key={index}>
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src={`http://localhost/laravel8/laravel8/public/upload/user/avatar/${cmt.image_user}`}
                alt=""
                style={{ width: 60 }}
              />
            </a>

            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li><i className="fa fa-user" /> {cmt.name_user}</li>
                <li><i className="fa fa-clock-o" /> Vừa xong</li>
              </ul>

              <p>{cmt.comment}</p>

              {/* Nút reply giống comment tĩnh */}
              <a className="btn btn-primary" href="">
                <i className="fa fa-reply" /> Replay
              </a>
            </div>
          </li>
        ))}


        {/* ========== 3 COMMENT TĨNH GỐC (GIỮ NGUYÊN) ========== */}
        
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
  );
};

export default ListComment;

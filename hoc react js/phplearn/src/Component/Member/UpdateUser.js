import React from "react";

const UpdateUser = () => {
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Update User</h2>

        <div className="signup-form">
       

          <form>
            {/* NAME */}
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
            />

            {/* EMAIL */}
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
            />

            {/* PASSWORD */}
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
            />

            {/* PHONE */}
            <input 
              type="text" 
              name="phone" 
              placeholder="Phone" 
            />

            {/* ADDRESS */}
            <input 
              type="text" 
              name="address" 
              placeholder="Address" 
            />

            {/* AVATAR */}
            <input
              type="file"
              name="avatar"
              style={{ border: "none", marginTop: 10 }}
            />

            <button
              type="submit"
              className="btn btn-default"
              style={{ marginTop: 15 }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

import React from 'react'

const Account = () => {
  return (
    <>
        <section>
        <div className="container">
            <div className="row">
            <div className="col-sm-3">
                <div className="left-sidebar">
                <h2>Account</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                    <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title"><a href="#">account</a></h4>
                    </div>
                    </div>
                    <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title"><a href="#">My product</a></h4>
                    </div>
                    </div>
                </div>{/*/category-products*/}
                </div>
            </div>
            <div className="col-sm-9">
                <div className="blog-post-area">
                <h2 className="title text-center">Update user</h2>
                <div className="signup-form">{/*sign up form*/}
                    <h2>New User Signup!</h2>
                    <form action="#">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                    <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

    </>
  )
}

export default Account
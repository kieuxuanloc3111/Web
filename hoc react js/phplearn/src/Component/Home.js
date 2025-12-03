import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost/laravel8/laravel8/public/api/product"
        );

        console.log("API RETURN:", res.data);
        setProducts(res.data.data);

      } catch (error) {
        console.log("API ERROR:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">

            <div className="col-sm-9 padding-right">

              <div className="features_items">
                <h2 className="title text-center">Features Items</h2>

                {products.map((item) => {
                  let imgArray = [];
                  try {
                    imgArray = JSON.parse(item.image);
                  } catch {
                    imgArray = [];
                  }

                  const firstImage = imgArray[0];
                  const imageUrl =
                    "http://localhost/laravel8/laravel8/public/upload/product/" +
                    item.id_user +
                    "/" +
                    firstImage;

                  return (
                    <div className="col-sm-4" key={item.id}>
                      <div className="product-image-wrapper">
                        <div className="single-products">

                          <div className="productinfo text-center">
                            <img
                              src={imageUrl}
                              alt=""
                              style={{
                                width: "100%",
                                height: 250,
                                objectFit: "cover"
                              }}
                            />
                            <h2>${item.price}</h2>
                            <p>{item.name}</p>

                            <button
                              className="btn btn-default add-to-cart"
                              onClick={() => addToCart(item.id)}
                            >
                              <i className="fa fa-shopping-cart"></i>
                              Add to cart
                            </button>
                          </div>

                          <div className="product-overlay">
                            <div className="overlay-content">
                              <h2>${item.price}</h2>
                              <p>{item.name}</p>

                              <button
                                className="btn btn-default add-to-cart"
                                onClick={() => addToCart(item.id)}
                              >
                                <i className="fa fa-shopping-cart"></i>
                                Add to cart
                              </button>
                            </div>
                          </div>

                        </div>

                        <div className="choose">
                          <ul className="nav nav-pills nav-justified">
                            <li>
                              <a href="#">
                                <i className="fa fa-plus-square"></i>
                                Add to wishlist
                              </a>
                            </li>

                            <li>
                              <Link to={`/product/${item.id}`}>
                                <i className="fa fa-plus-square"></i>
                                Detail
                              </Link>
                            </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ======================= CATEGORY TAB (KEEP) ======================= */}
              <div className="category-tab">
                <div className="col-sm-12">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a href="#tshirt" data-toggle="tab">T-Shirt</a>
                    </li>
                    <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                    <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                    <li><a href="#kids" data-toggle="tab">Kids</a></li>
                    <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                  </ul>
                </div>

                <div className="tab-content">
                  <div className="tab-pane fade active in" id="tshirt">
                    <div className="col-sm-3">
                      <img src="/frontend/images/home/gallery1.jpg" alt="" />
                    </div>
                    <div className="col-sm-3">
                      <img src="/frontend/images/home/gallery2.jpg" alt="" />
                    </div>
                    <div className="col-sm-3">
                      <img src="/frontend/images/home/gallery3.jpg" alt="" />
                    </div>
                    <div className="col-sm-3">
                      <img src="/frontend/images/home/gallery4.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================= RECOMMENDED (KEEP) ======================= */}
              <div className="recommended_items">
                <h2 className="title text-center">recommended items</h2>

                <div
                  id="recommended-item-carousel"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="item active">
                      <div className="col-sm-4">
                        <img src="/frontend/images/home/recommend1.jpg" alt="" />
                      </div>
                      <div className="col-sm-4">
                        <img src="/frontend/images/home/recommend2.jpg" alt="" />
                      </div>
                      <div className="col-sm-4">
                        <img src="/frontend/images/home/recommend3.jpg" alt="" />
                      </div>
                    </div>

                    <div className="item">
                      <div className="col-sm-4">
                        <img src="/frontend/images/home/recommend1.jpg" alt="" />
                      </div>
                      <div className="col-sm-4">
                        <img src="/frontend/images/home/recommend2.jpg" alt="" />
                      </div>
                      <div className="col-sm-4">
                        <img src="/frontend/images/home/recommend3.jpg" alt="" />
                      </div>
                    </div>
                  </div>

                  <a
                    className="left recommended-item-control"
                    href="#recommended-item-carousel"
                    data-slide="prev"
                  >
                    <i className="fa fa-angle-left"></i>
                  </a>
                  <a
                    className="right recommended-item-control"
                    href="#recommended-item-carousel"
                    data-slide="next"
                  >
                    <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

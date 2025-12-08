import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartRedux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost/laravel8/laravel8/public/api/product"
        );
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
                  let imgArray = JSON.parse(item.image);
                  const img = imgArray[0];

                  const imgUrl =
                    "http://localhost/laravel8/laravel8/public/upload/product/" +
                    item.id_user +
                    "/" +
                    img;

                  return (
                    <div className="col-sm-4" key={item.id}>
                      <div className="product-image-wrapper">

                        <div className="single-products">

                          <div className="productinfo text-center">
                            <img
                              src={imgUrl}
                              alt=""
                              style={{ width: "100%", height: 250, objectFit: "cover" }}
                            />
                            <h2>${item.price}</h2>
                            <p>{item.name}</p>

                            <button
                              className="btn btn-default add-to-cart"
                              onClick={() => dispatch(addToCart(item.id))}
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
                                onClick={() => dispatch(addToCart(item.id))}
                              >
                                <i className="fa fa-shopping-cart"></i>
                                Add to cart
                              </button>
                            </div>
                          </div>

                        </div>

                        <div className="choose">
                          <ul className="nav nav-pills nav-justified">
                            <li><a href="#"><i className="fa fa-plus-square"></i> Add to wishlist</a></li>
                            <li>
                              <Link to={`/product/${item.id}`}>
                                <i className="fa fa-plus-square"></i> Detail
                              </Link>
                            </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProduct = () => {
  const [products, setProducts] = useState([]);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost/laravel8/laravel8/public/api/product"
        );

        const myProducts = res.data.data.filter(
          (item) => Number(item.id_user) === Number(userId)
        );

        setProducts(myProducts);

      } catch (error) {
        console.log("Lỗi khi gọi API:", error);
      }
    };

    fetchProduct();
  }, [userId]);

  return (
    <div className="col-sm-9">
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="image">image</td>
              <td className="description">name</td>
              <td className="price">price</td>
              <td className="total">action</td>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => {
              let imgArray = [];
              imgArray = JSON.parse(item.image);
              const firstImage = imgArray[0];
              const imageUrl = `http://localhost/laravel8/laravel8/public/upload/product/${item.id_user}/${firstImage}`;

              return (
                <tr key={item.id}>
                  <td className="cart_product">
                    <a href="#">
                      <img
                        src={imageUrl}
                        alt=""
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                      />
                    </a>
                  </td>

                  <td className="cart_description">
                    <h4>
                      <a href="#">{item.name}</a>
                    </h4>
                  </td>

                  <td className="cart_price">
                    <p>${item.price}</p>
                  </td>

                  <td className="cart_total">
                    <a style={{ marginRight: 10, cursor: "pointer" }}>edit</a>
                    <a style={{ cursor: "pointer" }}>delete</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <p style={{ padding: 20, color: "gray" }}>
            Bạn chưa có sản phẩm nào.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProduct;

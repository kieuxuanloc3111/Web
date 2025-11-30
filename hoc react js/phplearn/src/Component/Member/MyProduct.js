import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProduct = () => {
  const [products, setProducts] = useState([]);

  // Lấy id user từ localStorage
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost/laravel8/laravel8/public/api/product"
        );

        // Lọc ra sản phẩm thuộc user đang login
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


  const handleDelete = async (idProduct) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `http://localhost/laravel8/laravel8/public/api/user/product/delete/${idProduct}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Delete API Response:", res.data);

      // ❌ KHÔNG dùng res.data.data nữa vì không phải mảng
      // const newList = res.data.data;
      // setProducts(newList);

      // ✅ Filter mảng hiện tại
      setProducts((prev) => prev.filter((item) => item.id !== idProduct));

      alert("Xóa thành công!");
    } catch (error) {
      console.log("Lỗi khi xóa:", error);
      alert("Xóa thất bại!");
    }
  };




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
              // Parse mảng ảnh
              let imgArray = [];
              try {
                imgArray = JSON.parse(item.image);
              } catch {
                imgArray = [];
              }

              // Ảnh đầu tiên
              const firstImage = imgArray.length > 0 ? imgArray[0] : null;

              // Link ảnh đầy đủ
              const imageUrl = firstImage
                ? `http://localhost/laravel8/laravel8/public/upload/product/${item.id_user}/${firstImage}`
                : "/frontend/images/cart/one.png";

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

                    <a
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Nếu không có sản phẩm */}
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

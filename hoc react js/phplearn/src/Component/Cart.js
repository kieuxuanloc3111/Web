import React, { useEffect } from "react";
import axios from "axios";

const Cart = () => {
  useEffect(() => {
    const sendTestData = async () => {
      try {
        const res = await axios.post(
          "http://localhost/laravel8/laravel8/public/api/product/cart",
          {
            product_id: 5,
            quantity: 2
          }
        );

        console.log("Kết quả API trả về:", res.data);
      } catch (err) {
        console.log("Lỗi API:", err.response ? err.response.data : err);
      }
    };

    sendTestData();
  }, []);

  return <div>Cart</div>;
};

export default Cart;

import { useEffect, useState } from "react";
import axios from "axios";
import B18random from "./B18random";

function A18random() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // Lấy 1 object bất kỳ — ví dụ user thứ 3
        const oneUser = res.data[2];
        setUser(oneUser);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Chi tiết User</h2>

      {/* Chỉ render B nếu user đã có */}
      {user && <B18random user={user} />}
    </div>
  );
}

export default A18random;

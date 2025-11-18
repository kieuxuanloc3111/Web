import { useEffect, useState } from "react";
import axios from "axios";
import B18 from "./B18";

function A18() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Danh sách User</h2>


      <B18 users={data} />
    </div>
  );
}

export default A18;

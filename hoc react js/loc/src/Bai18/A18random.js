import { useEffect, useState } from "react";
import axios from "axios";
import B18random from "./B18random";

function A18random() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const randomIndex = Math.floor(Math.random() * res.data.length);
        const oneUser = res.data[randomIndex];

        setUser(oneUser);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2></h2>
      {user && <B18random user={user} />}
    </div>
  );
}

export default A18random;

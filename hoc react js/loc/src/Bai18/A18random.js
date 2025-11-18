import { useEffect, useState } from "react";
import axios from "axios";
import B18random from "./B18random";

function A18random() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users?_limit=10")
      .then((res) => {

        const oneUser = res.data[5];

        setUser(oneUser);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2></h2>
      {<B18random user={user} />}
    </div>
  );
}

export default A18random;

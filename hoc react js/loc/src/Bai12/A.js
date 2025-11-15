import React from "react";
import B from "./B";

function A() {
  // const object = [
  //   {
  //     "id": 1,
  //     "name": "Leanne Graham",
  //     "username": "Bret",
  //     "email": "Sincere@april.biz",
  //     "address": {
  //       "street": "Kulas Light",
  //       "suite": "Apt. 556"
  //     },
  //     "phone": "1-770-736-8031 x56442",
  //     "website": "hildegard.org",
  //     "company": {
  //       "name": "Romaguera-Crona",
  //       "catchPhrase": "Multi-layered client-server neural-net"
  //     }
  //   },
  //   {
  //     "id": 2,
  //     "name": "Ervin Howell",
  //     "username": "Antonette",
  //     "email": "Shanna@melissa.tv",
  //     "address": {
  //       "street": "Victor Plains",
  //       "suite": "Suite 879"
  //     },
  //     "phone": "010-692-6593 x09125",
  //     "website": "anastasia.net",
  //     "company": {
  //       "name": "Deckow-Crist",
  //       "catchPhrase": "Proactive didactic contingency"
  //     }
  //   }
  // ];
  const object2 =
    {
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
  "street": "Victor Plains",
  "suite": "Suite 879"
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
  "name": "Deckow-Crist",
  "catchPhrase": "Proactive didactic contingency"
  }
  }
  return (
    <div>
      <h1>danh sách User</h1>
      <B data={object2} />
    </div>
  );
}

export default A;

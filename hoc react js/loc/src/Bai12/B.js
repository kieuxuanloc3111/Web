import React from 'react'

function B({ data }) {



  
  return (
    <div>
      <p>ID: {data.id}</p>
      <p>Name: {data.name}</p>
      <p>Username: {data.username}</p>
      <p>Email: {data.email}</p>

      <p>Address:</p>
      <p> + Street: {data.address.street}</p>
      <p> + Suite: {data.address.suite}</p>

      <p>Phone: {data.phone}</p>
      <p>Website: {data.website}</p>

      <p>Company:</p>
      <p> +Name: {data.company.name}</p>
      <p> + CatchPhrase: {data.company.catchPhrase}</p>
    </div>
  );
}

export default B;
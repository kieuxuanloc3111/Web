import React from 'react'

function B ({data}) {
  function renderUsers() {
    return data.map((user)=>(
      <li key={user.id}>
        <p>ID: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Address:</p>
        <ul>
          <li>Street: {user.address.street}</li>
          <li>Suite: {user.address.suite}</li>
        </ul>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
        <p>Company:</p>
        <ul>
          <li>Name: {user.company.name}</li>
          <li>CatchPhrase: {user.company.catchPhrase}</li>
        </ul>
      </li>
    ));

  }
  return <ul>{renderUsers()}</ul>;
}

export default B
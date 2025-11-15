import React, { useState } from "react";

function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    pass: ""
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    let errorsSubmit = {};
    let flag = true;

    if (inputs.email === "") {
      errorsSubmit.email = "Vui long nhap email";
      flag = false;
    }

    if (inputs.pass === "") {
      errorsSubmit.pass = "Vui long nhap pass";
      flag = false;
    }

    setErrors(errorsSubmit);   


    if (!flag) {
        setErrors(errorsSubmit);
    }
  }

  function renderError() {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <li key={index}>{errors[key]}</li>;
      });
    }
  }

  return (
    <div>
      {renderError()};

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleInput}
        />

        <input
          type="password"
          placeholder="Password"
          name="pass"               
          value={inputs.pass}
          onChange={handleInput}
        />
     
        <button type="submit" className="btn btn-default">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
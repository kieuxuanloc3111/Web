import React, { useState } from 'react';

function Test() {
  const [getInput, setInput] = useState("");
  const [errE, setErrE] = useState("");

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (getInput === "") {
      setErrE("nhập input");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={getInput} onChange={handleInput} />
        <p>{errE}</p>
        <button type="submit">Click</button>
      </form>
    </div>
  );
}

export default Test;

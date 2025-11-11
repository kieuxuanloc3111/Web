import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // khai báo state

  return (
    <div>
      <h2>Giá trị: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
      <button onClick={() => setCount(count - 1)}>Giảm</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
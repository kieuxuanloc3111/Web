import React, { useState } from 'react';
import Greeting from './Greeting';

const Vdu1 = () => {
  const [isTrue, setIsTrue] = useState(true);

  const toggleGreeting = () => {
    setIsTrue(!isTrue);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={toggleGreeting}>
        đổi trạng thái (hiện đang là {isTrue ? 'True' : 'False'})
      </button>

      <Greeting xx={isTrue} />
    </div>
  );
};

export default Vdu1;

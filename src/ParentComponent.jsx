
import React from 'react';

// ChildComponent
const ChildComponent = ({ text, onClick }) => {
  const handleButtonClick = () => {
    console.log('Button clicked!');
    // 다른 기능 수행
    onClick();
  };

  return (
    <button onClick={handleButtonClick}>
      {text}
    </button>
  );
};

// ParentComponent
const ParentComponent = () => {
  const handleClick = () => {
    console.log('Parent button clicked!');
    // 다른 기능 수행
  };

  return (
    <div>
      <ChildComponent text="Click Me" onClick={handleClick} />
    </div>
  );
};

export default ParentComponent;
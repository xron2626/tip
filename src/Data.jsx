import React, { useRef } from 'react';
import Data2 from './Data2';

function Data() {
  const textareaRef = useRef(null);
  const divRef = useRef(null);
  const divRef2 = useRef(null);

  return (
    <div>
      <textarea ref={textareaRef}></textarea>
      <div ref={divRef}>Some content</div>
      <div ref={divRef2}>Some232 content</div>
      <Data2 textareaRef={textareaRef} divRef={divRef} divRef2 = {divRef2}/>
    </div>
  );
}

export default Data;
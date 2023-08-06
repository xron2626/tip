import React, { useEffect } from 'react';

function Data2({ textareaRef, divRef,divRef2 }) {
  useEffect(() => {
    // Access the textarea and div elements here
    console.log('Textarea:', textareaRef.current);
    console.log('DivRef:', divRef.current);
    console.log('DivRef2:', divRef2.current);
  }, []);

  return (
    <div>
      {/* Render the functionality component */}
    </div>
  );
}

export default Data2;
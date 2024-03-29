import React from 'react';

function LoadingSpinner({show}) {

  return (
    <>
      {
        show &&
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
    </>
  );
}

export default LoadingSpinner;

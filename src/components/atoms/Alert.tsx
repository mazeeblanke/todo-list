import React from 'react';

const Alert : React.FC = ({ children }) => (
  <div className="a-alert">
    <p>{children}</p>
  </div>
);

export default Alert;

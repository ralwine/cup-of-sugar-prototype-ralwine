import React from 'react';

const Wrapper = ({ children, appBarHeight }) => (
  <div style={{ paddingTop: appBarHeight }}>
    {children}
  </div>
);

export default Wrapper
import React from 'react';

import './Avatar.css';

const Avatar = props => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        // The style prop is set-up to support being used in the future, 
        // but is not mandatory to use now. Since there is already default styling built-in
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;

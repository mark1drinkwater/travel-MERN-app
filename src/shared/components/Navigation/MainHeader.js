import React from 'react';
import './MainHeader.css';

const MainHeader = props => {
    // Special props: props.children
    // Will always refer to things you pass between your opening & closing tags of your component.
    return <header className='main-header'>{props.children}</header>
};

export default MainHeader;
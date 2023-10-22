import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = props => {
    const content = (
        <CSSTransition 
            in={props.show} 
            timeout={200} 
            classNames={'slide-in-left'} 
            mountOnEnter 
            unmountOnExit 
        >
            <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    );
    // Instead of rendering in our MainNavigation element
    // We're rendering inside the drawer-hoook div from the index.html
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
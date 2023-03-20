import './drawer.scss';
import React, { useState } from 'react';


/*This component should really render a lazily build component. 
 * childBuilder function is passed as a prop. Drawer supposed
 * to hold whichever you put in it. Visibility of the child component
 * is controlled by drawers state.
 */
export default function Drawer({title, childBuilder}){
    
    const [visible, setVisibility] = useState(false);
    let contentClass = visible ? 'drawer-content visible' : 'drawer-content';
    let toggleClass = visible ? 'drawer-toggle visible' : 'drawer-toggle';
    
    const toggleContent  = ()=> {
        setVisibility(!visible);
    }

return(
<div className='drawer-container'>
    <div className={toggleClass} onClick={toggleContent}>{title}</div>
    {visible && <div className={contentClass}>{childBuilder()}</div>}
</div>
);
}

/*
 *
 * */

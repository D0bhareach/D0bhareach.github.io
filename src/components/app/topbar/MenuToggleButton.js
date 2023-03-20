import React from 'react';
import { useDispatch } from 'react-redux';
import { showNavigation } from '../../global-store/navigation-store-slice';
import './toggle_button.scss';

export default function  MenuToggleButton () {

    const dispatch = useDispatch()

    return (
        <div>
        <span className='menu-toggle-button material-icons'
        onClick={() => dispatch(showNavigation())}>menu</span>
        </div>
    );
}


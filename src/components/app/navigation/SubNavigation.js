import {createMenu} from './Navigation';

const leftOffset = 0.7;

export default function SubNavigation(props) {
    const left = leftOffset * props.level;
    const style = {
        left: `${left}rem`
    }
    let links = createMenu(props.menu.links);

    return(
        <details style={style} className="navigation__sub-menu">
            <summary className="navigation-item">
        {props.menu.name}
            <span className="navigation-item-icon"></span>
            </summary>
            {links.length > 0 ? links :  <dir>Loading...</dir> }
        </details>
    );

}

// Submenu. 
// props.menu - link object from navigation data object see navigation.
// leftOffset - hardcoded offset for relatively positioned <details> see navigation.scss 
// In details summary must be wrapped in span, otherwise it will move out of div.!!!
// "navigation-item-icon" - marker spam for google icon to be placed after it.

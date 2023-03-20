import MenuToggleButton from './MenuToggleButton';
import Email from '../navigation/Email';
import {memo} from 'react';
import './topbar.scss';

const  TopBar = () => {

return (
    <header className="top-bar background-middle-grey">
        <div className="top-bar-left-section">
            <MenuToggleButton />
        </div>
        <div className="top-bar-right-section">
            <Email />            
        </div>
    </header>
);
}
export default memo(TopBar);

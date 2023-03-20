// Navigation can navigate between React Components and simple template pages.
// Template pages are pages that I made for demonstration on so on. Thus
// naviagation item can hold Link component from ReactRouter or simple anchor tag.
//
import { Link } from "react-router-dom";
import { hideNavigation } from '../../global-store/navigation-store-slice';
import { useDispatch } from 'react-redux';


export default function NavigationItem(props){
    const dispatch = useDispatch();
return (
    <div className="navigation-item">
        <Link to={props.link.path}  onClick={()=>dispatch(hideNavigation())} title={props.link.title}>{props.link.name}</Link>
    </div>

);
}

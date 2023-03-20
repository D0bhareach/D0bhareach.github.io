import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
import './navigation.scss';
import NavigationItem from './NavigationItem';
import SubNavigation from './SubNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { hideNavigation } from '../../global-store/navigation-store-slice';


export  function  NavigationComponentRaw() {


const showNavigation = useSelector((state) => state.navigation.showNavigation)
// console.log(`show: ${showNavigation}`);
const dispatch = useDispatch()


// need it to get current width of element.
const nav_div = useRef();
// timeout intervals
let closeInterval = useRef(null);
let closeTimeout = useRef(null);

let  [data, setData] = useState(null);

// current mouse possition.
let mx = useRef(0);

// empty array is for signalling that it only must perform once on mount.
// This Effect fetches data from server. Data returned used to construct
// menu.
useEffect(()=>{
    const  d = getNavData();
    if (data == null && data !== d){
        setData(d);
    }
    // eslint-disable-next-line
}, []);


// after render timeout is started this effect is 'listening' to changes in
// shouldPop state var.
useEffect(()=>{
    // console.log(` showNavigation changed.`);
    if(showNavigation){
        closeTimeout.current = setTimeout(()=>closeNavigation(), 1500);
        document.addEventListener('mousemove', mouseHandler);
    } else if (!showNavigation) {
        clearTimeout(closeTimeout.current);
        document.removeEventListener('mousemove', mouseHandler);

    }

    return ()=>{
        clearTimeout(closeTimeout.current);
        document.removeEventListener('mousemove', mouseHandler);
    }
    // eslint-disable-next-line
}, [showNavigation]);

const createCloseInterval = (nav_width) => {
    // need this counter to break from deadlock loop inside innerTimeout.
    let counter=0;
    let resInterval = setInterval(()=> {
        if (mx.current > nav_width && showNavigation) {
            // console.log(` check mouse is outside. mx: ${mx.current}`);
            closeTimeout.current = setTimeout(()=>{
                if (counter >= 5){
                    dispatch(hideNavigation());
                    clearInterval(resInterval);
                    clearTimeout(closeTimeout);
                    return;
                }
                counter += 1;
                // console.log(` got inside innerTimeout mx: ${mx.current}`);
                if (mx.current < nav_width && showNavigation){
                    // console.log(` check if current position is inside mx: ${mx.current}`);
                    clearInterval(closeInterval.current);
                    clearTimeout(closeTimeout);
                    return createCloseInterval(nav_width);    
                }
                // toggleNavigation
                dispatch(hideNavigation());
                clearInterval(closeInterval.current);
                clearTimeout(closeTimeout.current);
            }, 530);
        }
    }, 200);

    return resInterval;

}


// function which is going to be called after some timeout is passed.
// 'Listents' to mouse position updates inside document. When mouse leves
// boundary of navigation menu it triggers change for shouldPop state
// which controlls class name updates for Navigaton root dir.
const closeNavigation = ()=> {
    if (showNavigation){
        let  w = nav_div.current.offsetWidth;

        // don't close at timeout on small screens.
        let rect = document.documentElement.getBoundingClientRect();
        if (w >= rect['width']) {
            clearTimeout(closeTimeout.current);
            document.removeEventListener('mousemove', mouseHandler);
            return;
        }
        closeInterval.current = createCloseInterval(w);    
    }
}

// set mx Rreference to new value each mouse move
const mouseHandler = (e) => {
    mx.current = e.clientX;
}


const class_name = showNavigation ? 'navigation menu-show': 'navigation ';
const links = createMenu(data);
return(
    <div ref={nav_div} className={class_name}>
    <div className="navigation-list">

    <div className="small-screen-close-navigation" onClick={()=>{dispatch(hideNavigation())}}>
    <span className="material-icons">arrow_back</span>
    Close Menu
    </div>
    {links.length > 0 ? links :  <dir>Loading...</dir> }
    </div>
    </div>
);

}

// data - actual Array responce form server with all links data required for navigation.
// props - slot for other properties that will be required  for menu creation.
export function createMenu(data) {
    let elements = [];
    if (data == null) {
        return elements;
    }
    data.forEach((link, index) => {
        // only submenus objects having links array in them
        if(Object.hasOwn(link, "links")) {
            elements.push(<SubNavigation
                key={link["name"] + index}
                menu={link}
                level={link["level"]}
                />);
        } else {
            // prepare data for NavigationItem Component.
            let prp = {
                name: link.name, 
                path:link.path,
                title: link.title,
            };

            elements.push(<NavigationItem key={link.path + index} link={prp} />);
        }

    });
    return elements;
}

// dummy function will need to replace it with actual fetch from server.
// that is kinda global property it only changes when autorisation is happening.
// Perhaps objects property name [name] is badly choosen. But for now it's the
// text that is going to be visible in mavigation menu.
function getNavData(){
    return [
        {path:"/", name: "Home"},
        {path: "tutorials", name: "First Steps", title:"simple follow up's for tutorials" },
        {path: "about", name: "About"},
        /*
        {
            name: "First Sub Menu",
            links: [
                {path: "sub/first_sub_component", name: "First Sub Component"},
                {path: "sub/second_sub_component", name: "Second Sub Component"},
                {  name: "Sub Sub Menu",
                    level: 1,
                    links: [
                        {path: "sub/sub/first_sub_component", name: "First Sub1"},
                        {path: "sub/sub/second_sub_component", name: "Second Sub2"},

                    ]
                }

            ]
        },


        {path: "about", name: "About"},

        {
            name: "Second Sub Menu",
            level: 0,
            links: [{path: "sub_menu/first_sub_component", name: "First Sub Component"},
                {path: "sub_menu/second_sub_component", name: "Second Sub Component"}]
        }
        */
    ];
}

// properties of Navigation are not changing for all application span.
// to prevent it from rerendering on each render call use memo.
export const Navigation = React.memo(NavigationComponentRaw);

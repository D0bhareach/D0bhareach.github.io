import './text.scss';
import React, {useState, useEffect} from 'react';

// Component to print all major bla bla on the site.
// Argument path is path to internal resource.
// Data for this component is fetched from the server on every change of path prop.
// Data must be in the file in json format, where title -is title for the text(optional)
// paragraphs - array of strings for each paragraph in text.IMPORTANT!! Text in the
// file must not be wrapped with carriage return (don't press [enter] when entering
// paragraphs. Let editor wrap lines for you.
export default function Text({path}) {
    /*
    const url = `${process.env.PUBLIC_URL}/${path}`;
    const [resource, setResource] = useState(null);

    useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
        setResource(res); 
    })
    .catch(e => { 
    // shall send error report to server from here.
       // setResource({title: "Error loading resource."}));   
    })}, [path]);
    */
    // const component = require('../text/tic-tak-toe');

    // return  <>{component}</>
}

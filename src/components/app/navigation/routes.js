import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../../content/Home";


const Tutorials = React.lazy(()=>import('../../content/tutorials/Tutorials'));
const About = React.lazy(()=>import('../../content/About'));
const FirstSubComponent = React.lazy(()=>import('../../content/FirstSubComponent'));
const SecondSubComponent = React.lazy(()=>import('../../content/SecondSubComponent'));


export default function AppRoutes() {
    return(
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<App />} />
            <Route index  element={<Home />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="about" element={<About />} />
            <Route path="sub/first_sub_component" element={<FirstSubComponent /> || (<div>Bollocks!</div>)} />
            <Route path="sub/second_sub_component" element={<SecondSubComponent /> || (<div>Bollocks!</div>)} />
            <Route path="sub/sub/first_sub_component" element={<FirstSubComponent /> || (<div>Bollocks!</div>)} />
            <Route path="sub/sub/second_sub_component" element={<SecondSubComponent /> || (<div>Bollocks!</div>)} />
        </Routes>
    </Suspense>
    );
}

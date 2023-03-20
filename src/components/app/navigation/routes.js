import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../../content/Home";

// lazyly import Components when they required.
const Tutorials = React.lazy(()=>import('../../content/tutorials/Tutorials'));
const About = React.lazy(()=>import('../../content/About'));
const RustLearningPath = React.lazy(()=>import('../../content/rust_blog/RustLearningPath'));
const SecondSubComponent = React.lazy(()=>import('../../content/SecondSubComponent'));


// path must be the same as in Navigation.js
export default function AppRoutes() {
    return(
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<App />} />
            <Route index  element={<Home />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="about" element={<About />} />
            <Route path="rust_blog/rust_learning_path" element={<RustLearningPath /> || (<div>Ups!</div>)} />
            {/*<Route path="sub/second_sub_component" element={<SecondSubComponent /> || (<div>Ups!</div>)} />
            <Route path="sub/sub/first_sub_component" element={<FirstSubComponent /> || (<div>Ups!</div>)} />
            <Route path="sub/sub/second_sub_component" element={<SecondSubComponent /> || (<div>Ups!</div>)} />*/}
        </Routes>
    </Suspense>
    );
}

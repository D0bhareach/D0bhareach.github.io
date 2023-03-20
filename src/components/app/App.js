import TopBar from './topbar/TopBar';
import {Navigation} from './navigation/Navigation';
import { Outlet } from "react-router-dom";
import AppRoutes from './navigation/routes';
import React from 'react';

function App()  {

  return (
    <>
      <Navigation />
      <TopBar />
      <AppRoutes />
      <Outlet />
      </>
  );
}
export default App;
/*
 * I don't need wrapping  element here. All css pertainig to application block is in
 * css for #root main wrapper div.
 */

import React, {Suspense} from 'react';
import Drawer from '../../drawer/Drawer';
import TicTakToeInfo from './text/TicTakToeInfo';
import BoilerVerdictInfo from './text/BoilerVerdictInfo';

// lazily load bundles for children of drawers.
const TicTakToe = React.lazy(()=>import('./tic-tak-toe/TicTakToe'));
const TemperatureConverter = React.lazy(()=>import('./temperature_converter/TemperatureConverter'));
const Todo = React.lazy(()=>import('./todo/Todo'));


export default function Tutorials(){
    // Drawer child builder funcitons which are lazily building children.
    const tic_tak_toe = () => (
        <Suspense fallback={<div> Loading ... </div>}>
        <TicTakToe />
        </Suspense>
    );

    const temperature_converter = () => (
        <Suspense fallback={<div> Loading ... </div>}>
        <TemperatureConverter />
        </Suspense>
    );

   const todo = () => (
       <Suspense fallback={<div> Loading ... </div>}>
       <Todo />
       </Suspense>
   );


    return (
        <div className="main-content-holder">
        <TicTakToeInfo />
        <Drawer title="Tic-Tac-Toe" childBuilder={tic_tak_toe}/>
        <BoilerVerdictInfo />
        <Drawer title="Water boiling Verdict" childBuilder={temperature_converter}/>
        <Drawer title="Todo List" childBuilder={todo}/>
        </div>
    );

}
/*
 * Drawer title - text visible on toggle button
 * *Info Components are components with information about drawer. Major idea was to use
 * fetch even done component for representing text, but it's impossible to properly
 * pass html code through http response and it's not rendered properly by JSX. So decided
 * to do separate component for each text on this site. Css property for these text-info
 * components is in index.scss
 */

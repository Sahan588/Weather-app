import React from 'react';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import Home from './pages/Home';
import City from './pages/City';

const App:React.FC=()=> {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/'>
                <Route index element={<Home />} />
                <Route path='city' element={<City />} />
            </Route>
        )
    );

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
    );
}

export default App;

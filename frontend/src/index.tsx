import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Profile} from "./components/Profile";
import {Balance} from "./components/Balance";
import {Transaction} from "./components/Transaction";
import {Prediction} from "./components/Prediction";
import React from 'react';
import Login from "./components/Login";
import Registration from "./components/Registration";
import {Home} from "./components/Home";
import {Card} from "vienna-ui"
const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/home", element: <Home/>},
    {path: "/login", element: <Login/>},
    {path: "/registration", element: <Registration/>},
    {path: '/profile', element: <Profile/>},
    {path: '/balance', element: <Balance/>},
    {path: '/transaction', element: <Transaction/>},
    {path: '/prediction', element: <Prediction/>},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Card>
            <RouterProvider router={router}/>
        </Card>
    </React.StrictMode>
);


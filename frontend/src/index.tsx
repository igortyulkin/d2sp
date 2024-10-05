import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Profile} from "./components/Profile";
import {Balance} from "./components/Balance";
import {Transaction} from "./components/Transaction";
import React from 'react';
import Login from "./components/Login";
import Registration from "./components/Registration";
import {Home} from "./components/Home";
import {Card, H2} from "vienna-ui"
import {ApplicationUserStorageFactory} from "./common/user/ApplicationUserStorage";
import {List} from "./components/Prediction/List";
import {Create} from "./components/Prediction/Create";

const router = createBrowserRouter([
    {path: "/", element: <Login/>},
    {path: "/home", element: <Home/>},
    {path: "/login", element: <Login/>},
    {path: "/registration", element: <Registration/>},
    {path: '/profile', element: <Profile/>},
    {path: '/balance', element: <Balance/>},
    {path: '/transaction', element: <Transaction/>},
    {path: '/prediction', element: <List/>},
    {path: '/prediction/create', element: <Create/>},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Card>
            {!ApplicationUserStorageFactory.create().get() ?
                <H2 style={{textAlign: 'center'}} color={"seattle140"}>DS2P prediction service</H2> : ''}
            <RouterProvider router={router}/>
        </Card>
    </React.StrictMode>
);


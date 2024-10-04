import React from 'react';
import Login from "./components/Login";
import {ApplicationUserStorageFactory} from "./common/user/ApplicationUserStorage";
import {Main} from "./components/Main";
import Registration from "./components/Registration";

function App() {
    return (
        <div className="App">
            <h1>DS2P prediction service</h1>
            <div>{null !== ApplicationUserStorageFactory.create().get() ? <Main/> : <><Login/><Registration/></>}</div>
        </div>
    );
}

export default App;

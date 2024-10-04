import React from 'react';
import {Tabs} from 'vienna-ui'
import {Logout} from "./Logout";
import {Link} from "react-router-dom";

export const NavHeader = (props: {disabled?: boolean}) => {
    return (
        <div className="App">
            <h1>DS2P prediction service</h1>
            <div style={{height: '5rem'}}>
                <Tabs design="primary">
                    <Tabs.Tab disabled={props.disabled} value={"profile"}><Link to={'/profile'}>My profile</Link></Tabs.Tab>
                    <Tabs.Tab disabled={props.disabled} value={"balance"}><Link to={'/balance'}>Balance</Link></Tabs.Tab>
                    <Tabs.Tab disabled={props.disabled} value={"transactions"}><Link to={'/transaction'}>Transactions</Link></Tabs.Tab>
                    <Tabs.Tab disabled={props.disabled} value={"predicts"}><Link to={'/prediction'}>Predictions</Link></Tabs.Tab>
                    <Logout disabled={props.disabled}/>
                </Tabs>
            </div>
        </div>
    )
}
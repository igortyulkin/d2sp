import React from 'react';
import {Tabs} from 'vienna-ui'
import {Logout} from "./Logout";
import {Link} from "react-router-dom";
import {Badge} from "vienna-ui";

export const NavHeader = (props: { disabled?: boolean }) => {
    const resolveActive = (urlPart: string) => {
        return window.location.href.includes(urlPart) || document.URL.includes(urlPart);
    }
    return (
        <div className="App">
            <h1>DS2P prediction service</h1>
            <div style={{height: '5rem'}}>
                <Tabs design="primary">
                    <Tabs.Tab active={resolveActive('home')} value={"home"}><Link
                        to={'/home'}><Badge>Home</Badge></Link></Tabs.Tab>
                    <Tabs.Tab active={resolveActive('profile')} disabled={props.disabled} value={"profile"}><Link
                        to={'/profile'}><Badge>My profile</Badge></Link></Tabs.Tab>
                    <Tabs.Tab active={resolveActive('balance')} disabled={props.disabled} value={"balance"}><Link
                        to={'/balance'}><Badge>Balance</Badge></Link></Tabs.Tab>
                    <Tabs.Tab active={resolveActive('transaction')} disabled={props.disabled}
                              value={"transactions"}><Link
                        to={'/transaction'}><Badge>Transactions</Badge></Link></Tabs.Tab>
                    <Tabs.Tab active={resolveActive('prediction')} disabled={props.disabled} value={"predicts"}><Link
                        to={'/prediction'}><Badge>Predictions</Badge></Link></Tabs.Tab>
                    <Logout disabled={props.disabled}/>
                </Tabs>
            </div>
        </div>
    )
}
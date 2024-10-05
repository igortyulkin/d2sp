import React from 'react';
import {Logout} from "./Logout";
import {Link} from "react-router-dom";
import {H1, Badge, Tabs, Flex} from "vienna-ui";
import {Home, PersonLevel, MoneyBag, CashTransactions, Premium} from "vienna.icons";


export const NavHeader = (props: { disabled?: boolean }) => {
    const resolveActive = (urlPart: string) => {
        return window.location.href.includes(urlPart) || document.URL.includes(urlPart);
    }
    return (
        <div className="App">
            <Flex>
                <H1 color={"seattle140"}>DS2P prediction service</H1>
                <Logout disabled={props.disabled}/>
            </Flex>
            <div style={{height: '5rem'}}>
                <Tabs design="primary">
                    <Tabs.Tab active={resolveActive('home')} value={"home"}><Link
                        to={'/home'}><Badge><Home/>Home</Badge></Link></Tabs.Tab>
                    <Tabs.Tab active={resolveActive('profile')} disabled={props.disabled} value={"profile"}><Link
                        to={'/profile'}><Badge><PersonLevel/>My profile</Badge></Link></Tabs.Tab>
                    <Tabs.Tab active={resolveActive('balance')} disabled={props.disabled} value={"balance"}><Link
                        to={'/balance'}><Badge><MoneyBag/>Balance</Badge></Link></Tabs.Tab>
                    <Tabs.Tab active={resolveActive('transaction')} disabled={props.disabled}
                              value={"transactions"}><Link
                        to={'/transaction'}><Badge><CashTransactions/>Transactions</Badge></Link></Tabs.Tab>
                    <Tabs.Tab active={resolveActive('prediction')} disabled={props.disabled} value={"predicts"}><Link
                        to={'/prediction'}><Badge><Premium/>Predictions</Badge></Link></Tabs.Tab>
                </Tabs>
            </div>
        </div>
    )
}
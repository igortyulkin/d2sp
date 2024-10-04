import React from 'react';
import {Tabs, Card} from 'vienna-ui'
import {Transaction} from "./Transaction";
import {Balance} from "./Balance";
import {Logout} from "./Logout";
import {Profile} from "./Profile";
import {Prediction} from "./Prediction";

export const Main = () => {
    const [state, setState] = React.useState({page: "profile"})
    //@ts-ignore
    const handleChange = (e, page) => setState({page})
    return (
        <div style={{height: '5rem'}}>
            <Tabs design="primary" value={state.page} onChange={handleChange}>
                <Tabs.Tab value={"profile"}>My profile</Tabs.Tab>
                <Tabs.Tab value={"balance"}>Balance</Tabs.Tab>
                <Tabs.Tab value={"transactions"}>Transactions</Tabs.Tab>
                <Tabs.Tab value={"predicts"}>Predictions</Tabs.Tab>
                <Logout/>
            </Tabs>
            <Card>
                <div>
                {state.page === 'profile' ? <Profile/> : null}
                {state.page === 'balance' ? <Balance/> : null}
                {state.page === 'transactions' ? <Transaction/> : null}
                {state.page === 'predicts' ? <Prediction/> : null}
                </div>
            </Card>
        </div>
    )
}
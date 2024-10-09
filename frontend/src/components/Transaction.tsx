import React from 'react';
import {Table, EmptyState, Card, H2, Badge} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../config";
import {NavHeader} from "./NavHeader";
import {DateFormatter} from "../common/date/DateFormatter";
import {TTypeAliases} from "../common/transaction/TType";
import {MoneyBag} from "vienna.icons";

export const Transaction = () => {
    const [state, setState] = React.useState({transactions: [], loaded: false})
    const requestOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ApplicationUserStorageFactory.create().get()?.token}`
        },
    };
    if (!state.loaded) {
        setState({transactions: [], loaded: true})
        fetch(`${apiEntrypoint()}/transactional`, requestOptions)
            .then((response) => {
                return response.json().then((data) => setState({transactions: data['items'], loaded: true}))
            })
            .catch((error) => console.log(error));
    }
    return (
        <>
            <NavHeader/>
            <H2 color={"seattle140"}>My transactions</H2>
            <br/>
            <Card style={{minHeight: '5rem'}}>
                {!state.loaded ? <EmptyState loading={true}/> : ''}
                <Table data={state.transactions}>
                    <Table.Column id='id' title='ID'>
                        {(item) => item.id}
                    </Table.Column>
                    <Table.Column id='type' title='Type'>
                        {(item) => <Badge size={'s'}>{TTypeAliases[item.type] ?? item.type}</Badge>}
                    </Table.Column>
                    <Table.Column id='credit_count' title='Credit count'>
                        {(item) => <Badge size={'s'}><b>{item.credit_count}</b><MoneyBag/></Badge>}
                    </Table.Column>
                    <Table.Column id='transaction_at' title='Transaction time'>
                        {(item) => DateFormatter.toDateRow(item.transaction_at, 'T') + ' ' + DateFormatter.toTimeRow(item.transaction_at, 'T')}
                    </Table.Column>
                </Table>
            </Card>
        </>

    )
}
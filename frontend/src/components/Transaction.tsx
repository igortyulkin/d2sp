import React from 'react';
import {Table, EmptyState, Card} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../config";
import {NavHeader} from "./NavHeader";
import {DateFormatter} from "../common/date/DateFormatter";

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
            <h2>My transactions</h2>
            <Card style={{minHeight: '5rem'}}>
                {!state.loaded ? <EmptyState loading={true}/> : ''}
                <Table data={state.transactions}>
                    <Table.Column id='id' title='ID'>
                        {(item) => item.id}
                    </Table.Column>
                    <Table.Column id='type' title='Type'>
                        {(item) => item.type}
                    </Table.Column>
                    <Table.Column id='credit_count' title='Credit count'>
                        {(item) => item.credit_count}
                    </Table.Column>
                    <Table.Column id='transaction_at' title='Transaction At'>
                        {(item) => DateFormatter.toDateRow(item.transaction_at, 'T') + ' ' + DateFormatter.toTimeRow(item.transaction_at, 'T')}
                    </Table.Column>
                </Table>
            </Card>
        </>

    )
}
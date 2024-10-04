import React from 'react';
import {Table, EmptyState} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../config";
import {NavHeader} from "./NavHeader";

export const Transaction = () => {
    const [state, setState] = React.useState({transactions: []})
    const requestOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ApplicationUserStorageFactory.create().get()?.token}`
        },
    };
    if (0 === state?.transactions?.length || undefined === state.transactions) {
        fetch(`${apiEntrypoint()}/transactional`, requestOptions)
            .then((response) => {
                return response.json().then((data) => setState({transactions: data['items']}))
            })
            .catch((error) => console.log(error));
    }
    return (
        <>
            <NavHeader/>
            <h2>My transactions</h2>
            <div style={{height: '5rem'}}>
                {0 === state.transactions?.length ? <EmptyState loading={true}/> : ''}
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
                        {(item) => item.transaction_at}
                    </Table.Column>
                </Table>
            </div>
        </>

    )
}
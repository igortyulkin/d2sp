import React from 'react';
import {Table, Card, EmptyState, Badge, H2} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../config";
import {CreatePrediction} from "./CreatePrediction";
import {NavHeader} from "./NavHeader";

export const Prediction = () => {
    const [state, setState] = React.useState({tasks: [], loaded: false})
    const requestOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ApplicationUserStorageFactory.create().get()?.token}`
        },
    };
    if (!state.loaded) {
        fetch(`${apiEntrypoint()}/model/tasks`, requestOptions)
            .then((response) => {
                return response.json().then((data) => {
                    setState({tasks: data['items'], loaded: true})
                })
            })
            .catch((error) => {
                setState({tasks: [], loaded: true})
                console.log(error)
            });
    }
    return (
        <>
            <NavHeader/>
            <H2 color={"seattle140"}>My prediction tasks</H2>
            <br/>
            <CreatePrediction/>
            <br/>
            <br/>
            <Card style={{minHeight: '5rem'}}>
                {!state.loaded ? <EmptyState loading={true}/> : ''}
                <Table data={state.tasks}>
                    <Table.Column id='id' title='ID'>
                        {(item) => item.id}
                    </Table.Column>
                    <Table.Column id='status' title='Status'>
                        {(item) => <Badge color={"seattle05"}>{item.status}</Badge>}
                    </Table.Column>
                    <Table.Column id='quality' title='Quality'>
                        {(item) => item.quality}
                    </Table.Column>
                </Table>
            </Card>
        </>

    )
}
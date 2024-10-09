import React from 'react';
import {Table, Card, EmptyState, Badge, H2, Button} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../../config";
import {NavHeader} from "../NavHeader";
import {Link} from "react-router-dom";
import {AddRing, MoneyBag, Premium} from 'vienna.icons'

export const List = () => {
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
            <Link to={'/prediction/create'}>
                <Button design='primary'><AddRing/>Create prediction</Button>
            </Link>
            <br/>
            <br/>
            <Card style={{minHeight: '5rem'}}>
                {!state.loaded ? <EmptyState loading={true}/> : ''}
                <Table data={state.tasks}>
                    <Table.Column id='id' title='ID'>
                        {(item) => item.id}
                    </Table.Column>
                    <Table.Column id='status' title='Status'>
                        {(item) => <Badge size={"s"} color={"seattle05"}>{item.status}</Badge>}
                    </Table.Column>
                    <Table.Column id='quality' title='Quality'>
                        {(item) => <Badge size={"s"}>{item.quality + ' ' + 'RUB'}&nbsp;<Premium/></Badge>}
                    </Table.Column>
                </Table>
            </Card>
        </>

    )
}
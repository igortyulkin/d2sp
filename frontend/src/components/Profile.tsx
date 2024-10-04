import React from 'react';
import {Flex, P} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {DateFormatter} from "../common/date/DateFormatter";
import {apiEntrypoint} from "../config";
import {NavHeader} from "./NavHeader";

export const Profile = () => {
    const [state, setState] = React.useState({user: null})
    const requestOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ApplicationUserStorageFactory.create().get()?.token}`
        },
    };
    if (null === state.user) {
        fetch(`${apiEntrypoint()}/user/`, requestOptions)
            .then((response) => {
                return response.json()
                    .then((data) => setState({user: data}))
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error));
    }
    return (
        <>
            <NavHeader/>
            <h2>Profile</h2>
            <div>
                <Flex direction={'column'}>
                    <P><b>Email: </b>{state.user ? state.user['email'] : null}</P><br/>
                    <P><b>Role: </b>{state.user ? state.user['role'] : null}</P><br/>
                    <P><b>FirstName: </b>{state.user ? state.user['first_name'] : null}</P><br/>
                    <P><b>LastName: </b>{state.user ? state.user['last_name'] : null}</P><br/>
                    <P><b>MiddleName: </b>{state.user ? state.user['middle_name'] : null}</P><br/>
                    <P><b>Balance: </b>{state.user ? state.user['credit_count'] : null}</P><br/>
                    <P><b>Registration date: </b>{state.user ? DateFormatter.toDateRow(state.user['created_at'], 'T') : null}</P><br/>
                </Flex>
            </div>
        </>
    )
}
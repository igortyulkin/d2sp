import React from 'react';
import {Flex, Card, H2, Badge} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {DateFormatter} from "../common/date/DateFormatter";
import {apiEntrypoint} from "../config";
import {NavHeader} from "./NavHeader";
import {MoneyBag} from "vienna.icons";

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
            <H2 color={"seattle140"}>My Profile</H2>
            <br/>
            <Card>
                <Flex direction={'column'}>
                    <Flex>
                        <div style={{minWidth: '10rem'}}><b>Email: </b></div>
                        <div><Badge size={"l"} color={"paris10"}>{state.user ? state.user['email'] : null}</Badge></div>
                    </Flex><br/>
                    <Flex>
                        <div style={{minWidth: '10rem'}}><b>Role: </b></div>
                        <div><Badge size={"l"} color={"paris10"}>{state.user ? state.user['role'] : null}</Badge></div>
                    </Flex><br/>
                    <Flex>
                        <div style={{minWidth: '10rem'}}><b>FirstName: </b></div>
                        <div><Badge size={"l"} color={"paris10"}>{state.user ? state.user['first_name'] : null}</Badge></div>
                    </Flex><br/>
                    <Flex>
                        <div style={{minWidth: '10rem'}}><b>LastName: </b></div>
                        <div><Badge size={"l"} color={"paris10"}>{state.user ? state.user['last_name'] : null}</Badge></div>
                    </Flex><br/>
                    <Flex>
                        <div style={{minWidth: '10rem'}}><b>MiddleName: </b></div>
                        <div><Badge size={"l"} color={"paris10"}>{state.user ? state.user['middle_name'] : null}</Badge></div>
                    </Flex><br/>
                    <Flex>
                        <div style={{minWidth: '10rem'}}><b>Balance: </b></div>
                        <div><Badge size={"l"} color={"paris10"}>{state.user ? state.user['credit_count'] : null}<MoneyBag/></Badge></div>
                    </Flex><br/>
                    <Flex>
                        <div style={{minWidth: '10rem'}}><b>Registration date:</b></div>
                        <div><Badge size={"l"} color={"paris10"}>{state.user ? DateFormatter.toDateRow(state.user['created_at'], 'T') : null}</Badge></div>
                    </Flex><br/>
                </Flex>
            </Card>
        </>
    )
}
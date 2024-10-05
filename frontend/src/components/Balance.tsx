import React from 'react';
import {Button, Card, InputNumber, FormField, H2} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../config";
import {NavHeader} from "./NavHeader";

export const Balance = () => {
    const [state, setState] = React.useState({credit_count: 0})
    const handleUpBalance = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ApplicationUserStorageFactory.create().get()?.token}`
            },
            body: JSON.stringify({'credit_count': state.credit_count})
        };
        fetch(`${apiEntrypoint()}/transactional/up_balance`, requestOptions)
            .then((response) => {
                return response.json().then((data) => alert(data['message'])).catch(error => console.log(error))
            })
            .catch((error) => console.log(error));
    }
    return (
        <>
            <NavHeader/>
            <H2 color={"seattle140"}>Up balance</H2>
            <br/>
            <Card style={{height: '10rem'}}>
                <FormField>
                    <FormField.Content>
                        {/*@ts-ignore*/}
                        <InputNumber min={1} value={state.credit_count} onChange={(value) => setState({credit_count: value})}/>
                    </FormField.Content>
                </FormField>
                <br/>
                <Button name='test' design="accent" onClick={handleUpBalance}>Submit</Button>
            </Card>
        </>
    )
}
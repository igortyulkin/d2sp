import React from 'react';
import {Button, InputNumber, FormField} from 'vienna-ui'
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
            <h2>Up balance</h2>
            <div style={{height: '10rem'}}>
                <FormField>
                    <FormField.Content>
                        {/*@ts-ignore*/}
                        <InputNumber min={1} value={state.credit_count} onChange={(value) => setState({credit_count: value})}/>
                    </FormField.Content>
                </FormField>
                <br/>
                <Button name='test' design="accent" onClick={handleUpBalance}>Submit</Button>
            </div>
        </>
    )
}
import React from 'react';
import {Button} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";

export const Logout = (props: {disabled?:boolean}) => {
    const handleClick = () => {
        ApplicationUserStorageFactory.create().clear()
        window.location.replace('/');
    }
    return (
        <div style={{height: '5rem', minWidth: "70%"}}>
            <Button disabled={props.disabled == true} design="primary" onClick={handleClick} style={{float: "right"}}>
                Logout
            </Button>
        </div>
    )
}
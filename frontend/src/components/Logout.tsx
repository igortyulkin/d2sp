import React from 'react';
import {Button} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {Exit} from "vienna.icons";

export const Logout = (props: {disabled?:boolean}) => {
    const handleClick = () => {
        ApplicationUserStorageFactory.create().clear()
        window.location.replace('/');
    }
    return (
        <div style={{minWidth: "70%"}}>
            <Button disabled={props.disabled == true} design="primary" onClick={handleClick} style={{float: "right"}}>
                <Exit/>Logout
            </Button>
        </div>
    )
}
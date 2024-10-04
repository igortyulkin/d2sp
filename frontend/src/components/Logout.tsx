import React from 'react';
import {Button} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";

export const Logout = () => {
    const handleClick = () => {
        ApplicationUserStorageFactory.create().clear()
        window.location.replace(window.location.href);
    }
    return (
        <div style={{height: '5rem', minWidth: "70%"}}>
            <Button design="primary" onClick={handleClick} style={{float: "right"}}>
                Logout
            </Button>
        </div>
    )
}
import React from 'react';
import {Flex, P} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {DateFormatter} from "../common/date/DateFormatter";
import {apiEntrypoint} from "../config";
import {NavHeader} from "./NavHeader";
import Login from "./Login";

export const Home = () => {
    return (
        <>
            <NavHeader disabled={ApplicationUserStorageFactory.create().get() === null}/>
            <Login/>
        </>
    )
}
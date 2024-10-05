import React from 'react';
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {NavHeader} from "./NavHeader";
import {Description} from "./Description";

export const Home = () => {
    return (
        <>
            <NavHeader disabled={ApplicationUserStorageFactory.create().get() === null}/>
            <Description/>
        </>
    )
}
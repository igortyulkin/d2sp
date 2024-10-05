import React from 'react';
import {Flex, Button} from 'vienna-ui'
import {Link} from "react-router-dom";
import {Description} from "./Description";

export const Default = () => {
    return (
        <main>
            <Description/>
            <br/>
            <Flex justifyContent={"space-evenly"}>
                <Link to={'/login'}>
                    <Button size={"xxl"} design='accent'>Войти или зарегистрироваться</Button>
                </Link>
            </Flex>
        </main>
    )
}
import React from 'react';
import {Table, Card, EmptyState, Badge, H2, Button, Tooltip, Flex, H5, P} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../../config";
import {NavHeader} from "../NavHeader";
import {Link} from "react-router-dom";
import {AddRing, MoneyBag, EyeOpened, DocAttachment} from 'vienna.icons'
import {FEATURE_ALIASES} from "../../common/features/FeaturesAliases";

export const List = () => {
    const [state, setState] = React.useState({tasks: [], loaded: false})
    const requestOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ApplicationUserStorageFactory.create().get()?.token}`
        },
    };
    if (!state.loaded) {
        fetch(`${apiEntrypoint()}/model/tasks`, requestOptions)
            .then((response) => {
                return response.json().then((data) => {
                    setState({tasks: data['items'], loaded: true})
                })
            })
            .catch((error) => {
                setState({tasks: [], loaded: true})
                console.log(error)
            });
    }
    return (
        <>
            <NavHeader/>
            <H2 color={"seattle140"}>My prediction tasks</H2>
            <br/>
            <Link to={'/prediction/create'}>
                <Button design='primary'><AddRing/>Create prediction</Button>
            </Link>
            <br/>
            <br/>
            <Card style={{minHeight: '5rem'}}>
                {!state.loaded ? <EmptyState loading={true}/> : ''}
                {state.loaded ? <Table data={state.tasks}>
                    <Table.Column id='id' title='ID'>
                        {(item) => item.id}
                    </Table.Column>
                    <Table.Column id='status' title='Status'>
                        {(item) => <Badge size={"s"} color={"seattle05"}>{item.status}</Badge>}
                    </Table.Column>
                    <Table.Column id='quality' title='Quality'>
                        {(item) => <Badge size={"s"}>{item.quality + ' ' + 'RUB'}<MoneyBag/></Badge>}
                    </Table.Column>
                    <Table.Column id='payload' title='' width={"50px"}>
                        {(item) => {
                            let usedFeatures = []
                            for (let key in item.payload) {
                                let value = item.payload[key]
                                if (value > 0) {
                                    usedFeatures.push(key)
                                }
                            }
                            if (0 === usedFeatures.length) {
                                return ''
                            }
                            return <Tooltip action={'click'}
                                            placement={"left"}
                                            content={<Card style={{maxWidth: "500px", maxHeight: "500px"}}><Flex
                                                direction={"column"}>
                                                <H5>You specified the skills and parameters:</H5>
                                                <br/>
                                                {
                                                    // @ts-ignore
                                                    usedFeatures.map((feature: string | number, idx: number) => ((FEATURE_ALIASES[feature] ?? feature) + ', '))
                                                }
                                            </Flex></Card>}
                            >
                                <DocAttachment/>
                            </Tooltip>
                        }}
                    </Table.Column>
                    <Table.Column id='recommendations' title='Recommendations'>
                        {(item) => item.recommendations !== undefined && item.recommendations.length !== 0
                            ? <Tooltip action={'click'}
                                       content={<Card><Flex direction={"column"}>
                                           <H5>We recommend that you try to explore new skills and opportunities</H5>
                                           <br/>
                                           {
                                               item.recommendations.map((feature: string | number, idx: number) => {
                                                   return <>
                                                       <Badge size={"s"} color={"dubai30"}>
                                                           <P size={"l"}>
                                                               {/*@ts-ignore*/}
                                                               {idx + 1}.&nbsp;{FEATURE_ALIASES[feature] ?? feature}
                                                           </P>
                                                       </Badge>
                                                       <br/>
                                                   </>
                                               })
                                           }
                                       </Flex></Card>}
                                       placement='left'>
                                <div>
                                    <Badge size={"s"} color={"miami30"}><EyeOpened/>Show recommendations</Badge>
                                </div>
                            </Tooltip>
                            : ''}
                    </Table.Column>
                </Table> : ''}
            </Card>
        </>

    )
}
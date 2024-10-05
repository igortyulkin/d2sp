import React, {useState} from 'react';
import {Card, FormField, Button, H2, Switcher} from 'vienna-ui'
import {Back} from 'vienna.icons'
import {ApplicationUserStorageFactory} from "../../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../../config";
import {NavHeader} from "../NavHeader";
import {Link} from "react-router-dom";
import {Features} from "../../common/features/Features";
import {Form, Field} from 'react-final-form';
import arrayMutators from 'final-form-arrays';

export const Create = () => {
    const [payload, setPayload] = useState({});
    const handleGenerate = () => {
        let generated: any = {}
        Object.keys(Features).map((key) => {
            generated[key] = Number(Math.round(Math.random()))
        })
        setPayload(generated)
    }
    const handleSubmit = (values: any) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ApplicationUserStorageFactory.create().get()?.token}`
            },
            body: JSON.stringify({payload: values})
        };
        fetch(`${apiEntrypoint()}/model/task/create`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json().then((data) => {
                        alert(`Task: ${data['task_id']} create successful!`)
                    })
                }
                if (409 === response.status) {
                    return response.json().then((data) => {
                        alert(data['detail'])
                    })
                }
                alert("Error in create task")
            })
            .catch((error) => console.log(error));
    }
    return (
        <>
            <NavHeader/>
            <H2 color={"seattle140"}>Create prediction</H2>
            <br/>
            <Link to={'/prediction/'}>
                <Button design='primary' style={{margin: "5px"}}><Back/>Back to list</Button>
            </Link>
            <br/>
            <Button design='accent' onClick={handleGenerate} style={{margin: "5px"}}>Generate random features</Button>
            <br/>
            <Card>
                <Form
                    onSubmit={handleSubmit}
                    initialValues={payload}
                    mutators={{
                        ...arrayMutators,
                        updateField: ([field, value], state, {changeValue}) => {
                            changeValue(state, field, () => value);
                        },
                    }}
                    subscription={{submitting: true, errors: true, values: true}}
                    render={({handleSubmit, values, form}) => (
                        <form onSubmit={handleSubmit} autoComplete={'off'}>
                            <Button type='submit' design='accent'>Create</Button>
                            <div>
                                {
                                    Object.keys(Features).map((key, idx) => {
                                        return <FormField>
                                            <Field name={key} id={idx} type={'checkbox'}>
                                                {(props) => (
                                                    <Switcher
                                                        name={props.input.name}
                                                        style={{paddingTop: '20px'}}
                                                        checked={values[key] ?? false}
                                                        onChange={(e, data) => {
                                                            /*@ts-ignore*/
                                                            props.input.onChange(e, data !== undefined ? data.value : false);
                                                            form.mutators.updateField(key, e.target.checked);
                                                        }}/>
                                                )}
                                            </Field>&nbsp;
                                            {/*@ts-ignore*/}
                                            {Features[key] ?? ''}
                                        </FormField>
                                    })
                                }
                            </div>
                            <br/>
                        </form>
                    )}
                />
            </Card>
        </>
    )
}

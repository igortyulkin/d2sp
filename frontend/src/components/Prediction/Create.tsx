import React, {useState} from 'react';
import {Card, FormField, Button, H2, Switcher, Notifier, Select, H5, Groups} from 'vienna-ui'
import {Back, Premium} from 'vienna.icons'
import {ApplicationUserStorageFactory} from "../../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../../config";
import {NavHeader} from "../NavHeader";
import {Link} from "react-router-dom";
import {SoftFeatures} from "../../common/features/SoftFeatures";
import {HardFeatures} from "../../common/features/HardFeatures";
import {FEATURE_ALIASES} from "../../common/features/FeaturesAliases";
import {Form, Field} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {Experience, ExperienceAliases} from "../../common/features/Experience";

export const Create = () => {
    const [payload, setPayload] = useState({});
    const [experience, setExperience] = React.useState();
    const [isItCompany, setIsItCompany] = React.useState();
    const handleGenerate = () => {
        let generated: any = {}
        Object.keys(SoftFeatures).concat(Object.keys(HardFeatures)).map((key) => {
            generated[key] = Number(Math.round(Math.random()))
        })
        generated['is_it_company'] = Number(Math.round(Math.random()))
        generated['experience'] = Number(Math.floor(Math.random() * Object.keys(Experience).length))
        setPayload(generated)

        //@ts-ignore
        let experience_value = String(generated['experience']) ?? '4'
        //@ts-ignore
        const experience_key = Object.keys(Experience)[Object.values(Experience).indexOf(experience_value)] ?? undefined
        //@ts-ignore
        setExperience({'key': experience_key, 'value': experience_value})

        Notifier.plain({title: "", message: `Feature generated`})
    }
    const requiredField = (value: any) => {
        return value ? undefined : 'Поле не должно быть пустым';
    };
    const handleSubmit = (values: any) => {
        console.log(values)
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
                        Notifier.success({title: "", message: `Task: ${data['task_id']} create successful!`})
                    })
                }
                if (409 === response.status) {
                    return response.json().then((data) => {
                        Notifier.error({title: "", message: data['detail']})
                    })
                }
                Notifier.error({title: "", message: "Error in create task"})
            })
            .catch((error) => console.log(error));
    }
    // @ts-ignore
    return (
        <>
            <NavHeader/>
            <H2 color={"seattle140"}>Create prediction</H2>
            <br/>
            <Link to={'/prediction/'}>
                <Button design='primary' style={{margin: "5px"}}><Back/>Back to list</Button>
            </Link>
            <br/>
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
                            <Groups>
                                <Button design='primary' onClick={handleGenerate} style={{margin: "5px"}}>
                                    <Premium/>I`am Feeling Lucky
                                </Button>
                                <Button type='submit' design='accent'>Create</Button>
                            </Groups>
                            <Card>
                                <H5 color={'seattle140'}>About you</H5>
                                <FormField>
                                    <FormField.Label required={true}>Work experience</FormField.Label>
                                    <FormField.Content>
                                        <Field
                                            size={'l'}
                                            name={'experience'}
                                            validate={requiredField}
                                            maxLength={255}
                                        >
                                            {(props) => (
                                                <Select placeholder='Select your work experience'
                                                    //@ts-ignore
                                                        value={experience}
                                                        onSelect={(e, data: any) => {
                                                            form.mutators.updateField('experience', data.value.value);
                                                            setExperience(data.value)
                                                        }}
                                                        valueToString={(data) => ExperienceAliases[data?.value] ?? ''}
                                                >
                                                    {
                                                        Object.keys(Experience).map((key, idx) => {
                                                            return <Select.Option
                                                                valueToString={(key) => ExperienceAliases[key?.value] ?? ''}
                                                                //@ts-ignore
                                                                key={idx} value={{key: key, value: Experience[key]}}/>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </Field>
                                    </FormField.Content>
                                </FormField>
                                <FormField>
                                    <FormField.Label required={true}>Only IT Company</FormField.Label>
                                    <FormField.Content>
                                        <Field size={'l'} name={'is_it_company'} maxLength={255} type={'checkbox'}>
                                            {(props) => (
                                                <Switcher
                                                    name={props.input.name}
                                                    style={{paddingTop: '20px'}}
                                                    //@ts-ignore
                                                    checked={isItCompany || (payload['is_it_company'] ?? false)}
                                                    onChange={(e, data) => {
                                                        //@ts-ignore
                                                        props.input.onChange(e, data !== undefined ? data.value : false);
                                                        form.mutators.updateField('is_it_company', Boolean(e.target.checked));
                                                        // @ts-ignore
                                                        setIsItCompany(Boolean(e.target.checked))
                                                    }}/>
                                            )}
                                        </Field>
                                    </FormField.Content>
                                </FormField>
                            </Card>&nbsp;
                            <Card>
                                <H5 color={'seattle140'}>Soft skills</H5>
                                <div style={{display: "flex", flexFlow: "wrap"}}>
                                    {
                                        Object.keys(SoftFeatures).map((key, idx) => {
                                            return <FormField style={{minWidth: "15rem"}}>
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
                                                {FEATURE_ALIASES[key] ?? key}
                                            </FormField>
                                        })
                                    }
                                </div>
                            </Card>
                            <Card>
                                <H5 color={'seattle140'}>Hard skills</H5>
                                <div style={{display: "flex", flexFlow: "wrap"}}>
                                    {
                                        Object.keys(HardFeatures).map((key, idx) => {
                                            return <FormField style={{minWidth: "15rem"}}>
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
                                                {FEATURE_ALIASES[key] ?? key}
                                            </FormField>
                                        })
                                    }
                                </div>
                            </Card>
                            <br/>
                        </form>
                    )}
                />
            </Card>
        </>
    )
}

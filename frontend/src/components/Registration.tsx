import React, {Component} from 'react';
import {Button, EmptyState, FormField, Input, InputPassword, Card, H2} from 'vienna-ui';
import {apiEntrypoint} from "../config";

interface RegistrationState {
    loading: boolean;
    isDisableForm: boolean;
    email: string | null;
    password: string | null;
    first_name: string | null;
    last_name: string | null;
    middle_name: string | null;
}

export default class Registration extends Component<any, RegistrationState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            isDisableForm: false,
            email: null,
            password: null,
            first_name: null,
            last_name: null,
            middle_name: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onKeyDownEnterHandler = (e: { key: string }) => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        if (undefined === this.state.email?.length
            || undefined === this.state.password?.length
            || undefined === this.state.first_name?.length
            || undefined === this.state.last_name?.length
        ) {
            alert('Please, fill email, password, firstname and lastname');
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {'accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "middle_name": this.state.middle_name,
            })
        };
        this.setState({...this.state, loading: true, isDisableForm: true});
        fetch(`${apiEntrypoint()}/user/signup`, requestOptions)
            .then((response) => {
                return response.json().then((data) => {
                    alert("You have successfully registered")
                    window.location.replace('/');
                })
            })
            .catch((error) => {
                this.setState({...this.state, loading: false, isDisableForm: false});
            });
    };

    render() {
        return (
            <Card onKeyDown={this.onKeyDownEnterHandler}>
                <H2 color={"seattle140"}>Registration</H2>
                <br/>
                <FormField className={'form-field'}>
                    <FormField.Label required>Email</FormField.Label>
                    <FormField.Content>
                        <Input
                            name={'Email'}
                            onChange={(_e, d) => this.setState({...this.state, email: d.value})}
                            disabled={this.state.isDisableForm}
                        />
                    </FormField.Content>
                </FormField>
                <FormField>
                    <FormField.Label required>Password</FormField.Label>
                    <FormField.Content>
                        <InputPassword
                            name={'Password'}
                            onChange={(_e, d) => this.setState({...this.state, password: d.value})}
                            disabled={this.state.isDisableForm}
                        />
                    </FormField.Content>
                </FormField>
                <FormField>
                    <FormField.Label required>LastName</FormField.Label>
                    <FormField.Content>
                        <Input
                            name={'Lastname'}
                            onChange={(_e, d) => this.setState({...this.state, last_name: d.value})}
                            disabled={this.state.isDisableForm}
                        />
                    </FormField.Content>
                </FormField>
                <FormField>
                    <FormField.Label required>FirstName</FormField.Label>
                    <FormField.Content>
                        <Input
                            name={'Firstname'}
                            onChange={(_e, d) => this.setState({...this.state, first_name: d.value})}
                            disabled={this.state.isDisableForm}
                        />
                    </FormField.Content>
                </FormField>
                <FormField>
                    <FormField.Label>MiddleName</FormField.Label>
                    <FormField.Content>
                        <Input
                            name={'MiddleName'}
                            onChange={(_e, d) => this.setState({...this.state, middle_name: d.value})}
                            disabled={this.state.isDisableForm}
                        />
                    </FormField.Content>
                </FormField>
                <Button onClick={this.handleSubmit} design='accent' disabled={this.state.isDisableForm}>
                    Sign up {this.state.loading ? <EmptyState loading/> : ''}
                </Button>
            </Card>
        );
    }
}

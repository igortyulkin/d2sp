import {Component} from 'react';
import {ApplicationUserFactory} from '../common/user/ApplicationUser';
import {ApplicationUserStorageFactory} from '../common/user/ApplicationUserStorage';
import {Button, EmptyState, FormField, Input, InputPassword} from 'vienna-ui';
import {apiEntrypoint} from "../config";
import {Link} from "react-router-dom";

interface LoginState {
    loading: boolean;
    isDisableForm: boolean;
    username: string | null;
    password: string | null;
}

interface LoginProps {
    /*_*/
}

export default class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            loading: false,
            isDisableForm: false,
            username: null,
            password: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onKeyDownEnterHandler = (e: { key: string }) => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        if (0 === this.state.username?.length || 0 === this.state.password?.length) {
            alert('Please, fill email and password');
            return;
        }
        let details = {
            "username": this.state.username,
            "password": this.state.password,
        };
        let formBody = [];
        for (let property in details) {
            //@ts-ignore
            formBody.push(encodeURIComponent(property) + "=" + encodeURIComponent(details[property]));
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody.join("&")
        };
        this.setState({...this.state, loading: true, isDisableForm: true});
        fetch(`${apiEntrypoint()}/user/signin`, requestOptions)
            .then((response) => {
                return response.json().then((data) => {
                    if (data['detail']) {
                        alert(data['detail']);
                        this.setState({...this.state, loading: false, isDisableForm: false});
                        return;
                    }
                    ApplicationUserStorageFactory.create().store(ApplicationUserFactory.create(data['access_token']));
                    window.location.replace('/profile');
                })
            })
            .catch((error) => {
                this.setState({...this.state, loading: false, isDisableForm: false});
            });
    };

    render() {
        return (
            <div onKeyDown={this.onKeyDownEnterHandler}>
                <FormField className={'form-field'}>
                    <FormField.Label required>Email</FormField.Label>
                    <FormField.Content>
                        <Input
                            name={'username'}
                            onChange={(_e, d) => this.setState({...this.state, username: d.value})}
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
                <Button onClick={this.handleSubmit} design='accent' disabled={this.state.isDisableForm}>
                    Sign in {this.state.loading ? <EmptyState loading/> : ''}
                </Button>
                <br/>
                <br/>
                <Link to={'/registration'}>
                    <Button design='primary' disabled={this.state.isDisableForm}>Sign up</Button>
                </Link>
            </div>
        );
    }
}

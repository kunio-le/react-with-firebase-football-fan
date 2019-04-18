import React, { Component } from 'react';

import { firebase } from '../../firebase';

import FormField from '../../components/ui/FormFeild';

import { validation } from '../ui/misc';

export class Login extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'examples@email.com'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMsg: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Make it secure'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            }
        }
    };
    onChange = element => {
        const newFormData = { ...this.state.formData };
        newFormData[element.id].value = element.e.target.value;

        newFormData[element.id] = validation(newFormData[element.id]);
        this.setState({ formError: false });
        this.setState({ formData: newFormData });
    };

    resetForm = type => {
        const newFormData = { ...this.state.formData };
        for (let key in newFormData) {
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMsg = '';
        }
        this.setState({
            // formSuccess: type
            //     ? 'Thank you for your enroll'
            //     : 'Email had already enroll',
            formError: false,
            formData: newFormData
        });
        // --------------Hide success Msg after 2s------------- //
        // setTimeout(() => this.setState({ formSuccess: '' }), 3000);
        // --------------Hide success Msg after 2s------------- //
    };

    submitForm = e => {
        e.preventDefault();
        let formIsValid = true;
        let dataToSubmit = {};
        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }
        if (formIsValid) {
            this.loginHandler(dataToSubmit.email, dataToSubmit.password);
        } else {
            this.setState({ formError: true, formSuccess: '' });
        }
    };

    loginHandler = (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(this.props.history.push('/dashboard'))
            .catch(err => this.setState({ formError: true }));
    };

    render() {
        const { email, password } = this.state.formData;
        return (
            <div className="container">
                <div className="signin_wrapper">
                    <form onSubmit={e => this.submitForm(e)}>
                        <h2>Login</h2>
                        <FormField
                            formData={email}
                            id="email"
                            onChange={element => this.onChange(element)}
                        />

                        {/* Display error msg */}
                        {email.validationMsg && (
                            <div className="error_label">
                                {email.validationMsg}
                            </div>
                        )}

                        {/* Display error msg */}
                        <div style={{ marginTop: '10px' }} />
                        <FormField
                            formData={password}
                            id="password"
                            onChange={element => this.onChange(element)}
                        />
                        {/* Display error msg */}
                        {password.validationMsg && (
                            <div className="error_label">
                                {password.validationMsg}
                            </div>
                        )}

                        {/* Display error msg */}

                        {this.state.formError && (
                            <div className="error_label">
                                Somthing went wrong! Please try again!
                            </div>
                        )}
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;

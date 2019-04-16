import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';

import FormField from '../../components/ui/FormFeild';

import { validation } from '../ui/misc';

import { promotionsData } from '../../firebase';

export class Enroll extends Component {
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
            }
        }
    };

    sendEmailDataToDB = data => {
        promotionsData
            .orderByChild('email')
            .equalTo(data.email)
            .once('value')
            .then(snapShot => {
                if (snapShot.val() === null) {
                    promotionsData.push(data);
                    this.resetForm(true);
                } else {
                    this.resetForm(false);
                }
            });
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
            formSuccess: type
                ? 'Thank you for your enroll'
                : 'Email had already enroll',
            formError: false,
            formData: newFormData
        });
        // --------------Hide success Msg after 2s------------- //
        setTimeout(() => this.setState({ formSuccess: '' }), 3000);
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
            this.sendEmailDataToDB(dataToSubmit);
        } else {
            this.setState({ formError: true, formSuccess: '' });
        }
    };

    render() {
        const { email } = this.state.formData;
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={e => this.submitForm(e)}>
                        <div className="enroll_title">Enter your email</div>
                        <div className="enroll_input">
                            <FormField
                                formData={email}
                                id="email"
                                onChange={element => this.onChange(element)}
                            />
                        </div>

                        {/* Display error msg */}
                        {email.validationMsg && (
                            <div className="error_label">
                                {email.validationMsg}
                            </div>
                        )}

                        {this.state.formError && (
                            <div className="error_label">
                                Somthing went wrong! Please try again!
                            </div>
                        )}
                        {/* Display error msg */}
                        {/* Display success msg */}
                        {this.state.formSuccess && (
                            <div className="success_label">
                                {this.state.formSuccess}
                            </div>
                        )}
                        {/* Display success msg */}

                        <button type="submit">Enroll</button>
                    </form>
                    <div className="enroll_discl">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Aliquam quibusdam impedit deserunt asperiores
                        officia nam. Repellendus exercitationem fuga ex
                        perspiciatis nemo, quidem facere possimus.
                    </div>
                </div>
            </Fade>
        );
    }
}

export default Enroll;

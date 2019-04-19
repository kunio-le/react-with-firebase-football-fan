import React, { Component } from 'react';

import AdminLayout from '../../../hoc/AdminLayout';

import { validation, firebaseLooper } from '../../ui/misc';
import FormField from '../../ui/FormFeild';
import { matchesData, teamsData, firebaseDB } from '../../../firebase';

export class AddEditMatch extends Component {
    onChange = element => {
        const newFormData = { ...this.state.formData };
        newFormData[element.id].value = element.e.target.value;

        newFormData[element.id] = validation(newFormData[element.id]);

        let formFullFill = true;
        for (let key in newFormData) {
            newFormData[key].valid = newFormData[key].value ? true : false;
            formFullFill &= newFormData[key].valid;
        }
        this.setState({ formError: false, formFullFill: formFullFill });
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
    successUpdate = message => {
        this.setState({ formSuccess: message });
        setTimeout(() => this.setState({ formSuccess: '' }), 3000);
    };

    submitForm = e => {
        e.preventDefault();
        let formIsValid = true;
        let dataToSubmit = {};
        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        this.state.teams.forEach(team => {
            if (team.shortName === dataToSubmit.local) {
                dataToSubmit['localThmb'] = team.thmb;
            }
            if (team.shortName === dataToSubmit.away) {
                dataToSubmit['awayThmb'] = team.thmb;
            }
        });
        if (formIsValid) {
            if (this.state.formType === 'Edit Match') {
                firebaseDB
                    .ref(`matches/${this.state.matchId}`)
                    .update(dataToSubmit)
                    .then(() => this.successUpdate('Edit successfull'))
                    .catch(err => console.log(err));
            } else {
                //add match
            }
        } else {
            this.setState({ formError: true, formSuccess: '' });
        }
    };

    state = {
        matchId: '',
        formError: false,
        formType: '',
        formSuccess: '',
        formFullFill: false,
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    name: 'date',
                    type: 'date',
                    label: 'Event date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    name: 'local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    name: 'resultLocal',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    name: 'local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    name: 'resultAway',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    name: 'referee',
                    type: 'text',
                    label: 'Referee'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    name: 'stadium',
                    type: 'text',
                    label: 'Stadium'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    name: 'result',
                    type: 'select',
                    label: 'Team Result',
                    options: [
                        { key: 'w', value: 'W' },
                        { key: 'l', value: 'L' },
                        { key: 'd', value: 'D' },
                        { key: 'na', value: 'n/a' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    name: 'final',
                    type: 'select',
                    label: 'Game Played?',
                    options: [
                        { key: 'y', value: 'Yes' },
                        { key: 'n', value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            }
        }
    };

    getTeams = orgTeams => {
        const newTeams = [];
        orgTeams.map((team, i) =>
            newTeams.push({ key: team.id, value: team.shortName })
        );
        return newTeams;
    };

    updateForm = (matchData, teams, matchId) => {
        const newStateData = { ...this.state.formData };
        for (let key in newStateData) {
            newStateData[key].value = matchData[key];
            if (key === 'local' || key === 'away') {
                newStateData[key].config.options = teams;
            }
        }
        this.setState({
            formData: newStateData,
            formType: 'Edit Match',
            matchId: matchId
        });
    };

    componentDidMount() {
        let teams = [];
        teamsData.once('value').then(snapShot => {
            this.setState({ teams: firebaseLooper(snapShot) });
            teams = this.getTeams(firebaseLooper(snapShot));
        });
        const matchId = this.props.match.params.id;
        if (!matchId) {
            //AddMatch
        } else {
            matchesData.once('value').then(snapShot => {
                let isId = false;
                for (let key in snapShot.val()) {
                    if (matchId === key) {
                        isId = true;
                        break;
                    }
                }
                if (!isId) {
                    console.log('error 404');
                } else {
                    const matchData = snapShot.val()[matchId];

                    this.updateForm(matchData, teams, matchId);
                }
            });
        }
    }

    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    {this.state.formType && <h2>{this.state.formType}</h2>}
                    <form onSubmit={e => this.submitForm(e)}>
                        <FormField
                            formData={this.state.formData.date}
                            id="date"
                            onChange={element => this.onChange(element)}
                        />

                        {/******  Local  ******/}
                        <div className="select_team_layout">
                            <div className="label_inputs">Local</div>
                            <div className="wrapper">
                                <div className="left">
                                    <FormField
                                        formData={this.state.formData.local}
                                        id="local"
                                        onChange={element =>
                                            this.onChange(element)
                                        }
                                    />
                                </div>
                                <FormField
                                    formData={this.state.formData.resultLocal}
                                    id="resultLocal"
                                    onChange={element => this.onChange(element)}
                                />
                            </div>
                        </div>

                        {/***  Away ****/}
                        <div className="select_team_layout">
                            <div className="label_inputs">Away</div>
                            <div className="wrapper">
                                <div className="left">
                                    <FormField
                                        formData={this.state.formData.away}
                                        id="away"
                                        onChange={element =>
                                            this.onChange(element)
                                        }
                                    />
                                </div>
                                <FormField
                                    formData={this.state.formData.resultAway}
                                    id="resultAway"
                                    onChange={element => this.onChange(element)}
                                />
                            </div>
                        </div>

                        <div className="split_fields">
                            <FormField
                                formData={this.state.formData.referee}
                                id="referee"
                                onChange={element => this.onChange(element)}
                            />
                            <FormField
                                formData={this.state.formData.stadium}
                                id="stadium"
                                onChange={element => this.onChange(element)}
                            />
                        </div>
                        <div className="split_fields">
                            <FormField
                                formData={this.state.formData.result}
                                id="result"
                                onChange={element => this.onChange(element)}
                            />
                            <FormField
                                formData={this.state.formData.final}
                                id="final"
                                onChange={element => this.onChange(element)}
                            />
                        </div>
                        {this.state.formSuccess && (
                            <div className="success_label">
                                {this.state.formSuccess}
                            </div>
                        )}

                        {this.state.formFullFill && (
                            <div className="admin_submit">
                                <button type="submit">
                                    {this.state.formType}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditMatch;

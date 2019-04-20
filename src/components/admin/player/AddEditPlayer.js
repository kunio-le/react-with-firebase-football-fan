import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import AdminLayout from '../../../hoc/AdminLayout';

import { validation } from '../../ui/misc';
import FormField from '../../ui/FormFeild';
import { playerData, firebaseDB, firebase } from '../../../firebase';

import FileUploader from 'react-firebase-file-uploader';

export class AddEditPlayer extends Component {
    onChange = element => {
        const newFormData = { ...this.state.formData };
        newFormData[element.id].value = element.e.target.value;

        newFormData[element.id] = validation(newFormData[element.id]);

        let formFullFill = true;
        for (let key in newFormData) {
            if (key !== 'image') {
                newFormData[key].valid = newFormData[key].value ? true : false;
            }
            formFullFill = formFullFill && newFormData[key].valid;
        }
        this.setState({ formError: false, formFullFill });
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
            formError: false,
            formData: newFormData
        });
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
            if (key === 'image') {
                dataToSubmit[key] = this.state.formData[key].image;
            } else {
                dataToSubmit[key] = this.state.formData[key].value;
                formIsValid = this.state.formData[key].valid && formIsValid;
            }
        }

        if (formIsValid) {
            if (this.state.formType === 'Edit Player') {
                firebaseDB
                    .ref(`players/${this.state.playerId}`)
                    .update(dataToSubmit)
                    .then(() => this.successUpdate('Edit successfull'))
                    .catch(() => this.setState({ formError: true }));
            } else {
                playerData
                    .push(dataToSubmit)
                    .then(this.props.history.push('/dashboard/players'))
                    .catch(() => this.setState({ formError: true }));
            }
        } else {
            this.setState({ formError: true, formSuccess: '' });
        }
    };

    state = {
        playerId: '',
        error404: false,
        formError: false,
        formType: '',
        formSuccess: '',
        formFullFill: false,
        teams: [],
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name',
                    type: 'text',
                    label: 'Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname',
                    type: 'text',
                    label: 'Last Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    name: 'number',
                    type: 'text',
                    label: 'Number'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    name: 'position',
                    type: 'text',
                    label: 'Position',
                    options: [
                        { key: 'Keeper', value: 'Keeper' },
                        { key: 'Defence', value: 'Defence' },
                        { key: 'Midfield', value: 'Midfield' },
                        { key: 'Striker', value: 'Striker' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMsg: ''
            },
            image: {
                element: 'image',
                isUploading: false,
                image: '',
                playerImageUrl: '',
                progress: 0,
                valid: true
            }
        }
    };

    updateForm = (player, playerId, formType) => {
        const newStateData = { ...this.state.formData };
        for (let key in newStateData) {
            if (Object.keys(player).length > 0) {
                if (key === 'image') {
                    newStateData[key].image = player[key];
                    firebase
                        .storage()
                        .ref('players')
                        .child(newStateData[key].image)
                        .getDownloadURL()
                        .then(url => {
                            newStateData[key].playerImageUrl = url;
                            this.setState({ formSuccess: ' ' });
                        });
                } else {
                    newStateData[key].value = player[key];
                }
            }
        }
        this.setState({
            formData: newStateData,
            formType: formType
        });
        if (playerId) {
            this.setState({ playerId });
        }
    };

    handleUploadStart = () => {
        const newData = { ...this.state.formData };
        newData.image.isUploading = true;
        newData.image.progress = 0;
        this.setState({ formData: newData });
    };

    handleUploadError = error => {
        const newData = { ...this.state.formData };
        newData.image.isUploading = false;
        this.setState({ formData: newData });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        const newData = { ...this.state.formData };
        newData.image.image = filename;
        newData.image.progress = 100;
        newData.image.isUploading = false;

        firebase
            .storage()
            .ref('players')
            .child(filename)
            .getDownloadURL()
            .then(url => {
                newData.image.playerImageUrl = url;
                this.setState({ formData: newData });
            });
    };

    handleProgress = progress => {
        const newData = { ...this.state.formData };
        newData.image.progress = progress;
        this.setState({ formData: newData });
    };

    loadingProgress = () => (
        <div style={{ textAlign: 'center', paddingTop: '2vh' }}>
            <CircularProgress disableShrink size={90} />
        </div>
    );

    componentDidMount() {
        const playerId = this.props.match.params.id;
        if (!playerId) {
            this.updateForm({}, false, 'Add Player');
        } else {
            playerData.once('value').then(snapShot => {
                let isId = false;
                for (let key in snapShot.val()) {
                    if (playerId === key) {
                        isId = true;
                        break;
                    }
                }
                if (!isId) {
                    this.setState({ error404: true });
                } else {
                    const player = snapShot.val()[playerId];

                    this.updateForm(player, playerId, 'Edit Player');
                }
            });
        }
    }

    componentWillUnmount() {
        playerData.off();
    }

    render() {
        return this.state.error404 ? (
            <Redirect to="/error-404" />
        ) : (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    {this.state.formType && <h2>{this.state.formType}</h2>}
                    <form onSubmit={e => this.submitForm(e)}>
                        <div className="label_inputs">Add Image</div>
                        {this.state.formData.image.isUploading &&
                            this.loadingProgress()}
                        {this.state.formData.image.image && (
                            <div>
                                <img
                                    alt={this.state.formData.image.image}
                                    src={
                                        this.state.formData.image.playerImageUrl
                                    }
                                />
                            </div>
                        )}
                        <FileUploader
                            accept="image/*"
                            name="playerImage"
                            randomizeFilename
                            storageRef={firebase.storage().ref('players')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                        <FormField
                            formData={this.state.formData.name}
                            id="name"
                            onChange={element => this.onChange(element)}
                        />
                        <FormField
                            formData={this.state.formData.lastname}
                            id="lastname"
                            onChange={element => this.onChange(element)}
                        />
                        <FormField
                            formData={this.state.formData.number}
                            id="number"
                            onChange={element => this.onChange(element)}
                        />
                        <FormField
                            formData={this.state.formData.position}
                            id="position"
                            onChange={element => this.onChange(element)}
                        />
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

export default AddEditPlayer;

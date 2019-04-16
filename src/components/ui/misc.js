import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = props => {
    const template = (
        <div
            style={{
                background: props.background,
                color: props.color,
                fontSize: props.fontSize,
                fontFamily: 'Righteous',
                display: 'inline-block',
                padding: '5px 10px',
                ...props.more
            }}>
            {props.children}
        </div>
    );
    if (props.linkTo) {
        return <Link to={props.linkTo}>{template}</Link>;
    } else {
        return template;
    }
};

export const MatchInfoBlock = props => (
    <div className="match_block">
        <div className="match_date">{props.date}</div>
        <div className="match_wrapper">
            <div className="match_top">
                <div className="left">
                    <div>
                        <div
                            className="icon"
                            style={{
                                background: `url(/images/team_icons/${
                                    props.iconLocal
                                }.png)`
                            }}
                        />
                        <div className="team_name">{props.nameLocal}</div>
                    </div>
                </div>
                <div className="right">{props.goalLocal}</div>
            </div>
            <div className="match_bottom">
                <div className="left">
                    <div>
                        <div
                            className="icon"
                            style={{
                                background: `url(/images/team_icons/${
                                    props.iconAway
                                }.png)`
                            }}
                        />
                        <div className="team_name">{props.nameAway}</div>
                    </div>
                </div>
                <div className="right">{props.goalAway}</div>
            </div>
        </div>
    </div>
);

export const firebaseLooper = snapShot => {
    const data = [];
    snapShot.forEach(childSnapShot => {
        data.push({
            ...childSnapShot.val(),
            id: childSnapShot.key
        });
    });
    return data;
};

export const reverseArray = array => {
    let result = [];
    for (let i = array.length - 1; i >= 0; i--) {
        result.push(array[i]);
    }
    if (result.length) {
        return result;
    } else {
        return null;
    }
};

export const validation = formDataElement => {
    let { valid, validationMsg } = formDataElement;
    if (
        !(!formDataElement.validation.required || formDataElement.value.trim())
    ) {
        valid = false;
        validationMsg = 'Please enter your email';
    } else if (formDataElement.validation.email) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        valid = emailRegex.test(String(formDataElement.value).toLowerCase());
        validationMsg = !valid ? 'Please enter exactly email' : '';
    } else {
        valid = true;
        validationMsg = '';
    }
    formDataElement.valid = valid;
    formDataElement.validationMsg = validationMsg;
    return formDataElement;
};

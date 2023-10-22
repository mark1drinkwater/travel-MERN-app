import React, { useReducer, useEffect } from "react";

import { validate } from '../../util/Validators'
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                // This copies all key-value pairs of the old object into the new object
                ...state,
                // Then we can add or overwrite properties of the previous state
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
            case 'TOUCH':
                return {
                    ...state,
                    isTouched: true
                }
        default:
            // If we have some action which we don't explictily handle
            // Then we return the state unchanged
            return state;
    }
};

const Input = props => {
    // useReducer you can use instead of useState to do more complex code
    // A reducer is just a function which receives an action which we can dispatch
    // and receives the current state, and update the current state based on the action we received
    // and return the new state and give it back to us in the component and re-render everything
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '', 
        isTouched: false,
        isValid: props.initialValid || false
    });

    const {id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE', 
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    };

    // If input is specified use input else use textarea.
    const element = 
        props.element === 'input' ? ( 
        <input 
            id={props.id} 
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        /> 
    ) : (
        <textarea 
            id={props.id} 
            rows={props.rows || 3} 
            onChange={changeHandler} 
            onBlur={touchHandler}
            // This sets the content of the textarea
            value={inputState.value} 
        />
    );


    return (
        // Show error message if inputState is valid
        <div className={`form-control ${!inputState.isValid && inputState.isTouched
            && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
};

export default Input;
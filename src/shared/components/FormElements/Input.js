import React, { useReducer } from "react";
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                // This copies all key-value pairs of the old object into the new object
                ...state,
                // Then we can add or overwrite properties of the previous state
                value: action.val,
                isValid: true
            };
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
    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value});
    };


    // If input is specified use input else use textarea.
    const element = 
        props.element === 'input' ? ( 
        <input 
            id={props.id} 
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={changeHandler}
            value={inputState.value}
        /> 
    ) : (
        <textarea 
            id={props.id} 
            rows={props.rows || 3} 
            onChange={changeHandler} 
            // This sets the content of the textarea
            value={inputState.value} 
        />
    );


    return (
        // Show error message if inputState is valid
        <div className={`form-control ${!inputState.isValid 
            && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    )
};

export default Input;
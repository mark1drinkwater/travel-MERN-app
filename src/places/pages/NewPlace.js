import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/Validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const NewPlace = () => {
    useForm({   // Use reducer allows us to manage multiple states
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });


    // If this component function re-executes, the function here will be stored away by React
    // and reused so that no new function object is created whenever the component is re-rendered
    // So that useEffect does not re-render. To prevent an infinite loop.
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type:'INPUT_CHANGE', 
            value: value, 
            isValid: isValid, 
            inputId: id
        });
    }, [dispatch]);

    const placeSubmitHandler = event => {
        // Prevent form submit
        event.preventDefault();
        // Send this to the backend!
        console.log(formState.inputs);
    }

    return (
        <form className={'place-form'} onSubmit={placeSubmitHandler} >
            <Input 
                id='title'
                element='input' 
                type='text' 
                label='Title' 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid title." 
                onInput={inputHandler}
            />
            <Input 
                id='description'
                element='textarea' 
                type='Description' 
                label='Description' 
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                errorText="Please enter a valid description (at least 5 characters)." 
                onInput={inputHandler}
            />  
            <Input 
                id='address'
                element='input' 
                type='Address' 
                label='Address' 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid address ." 
                onInput={inputHandler}
            />               
            {/* When the form is not valid, the button should be disabled */}
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    )
}

export default NewPlace
import React, { useContext, useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/Validators';
import { useForm } from '../../shared/hooks/form-hook';
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    // React if Smart! Since we have multiple state changes in the same synchronous code block
    // in the same function, it will bash them together & perform one single state update & one single
    // re-render cycle to avoid unnecessary re-render cycles.
    const switchModeHandler = () => {
        if (!isLoginMode) {
            // We're going from signup to login
            // So want to drop name & retain username, password
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && 
                formState.inputs.password.isValid)
        } else {
            // If we switch to sign-up, we're defintely missing the name field
            // So the validity of the form will definitely be false.
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        // Function form of updating the state to use if
        // our new state update is based on old state.
        setIsLoginMode(prevMode => !prevMode);

    };

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
        auth.login();
    }

    return (<Card>
        <form className={'authentication'} onSubmit={authSubmitHandler} >
            {!isLoginMode &&
                <Input
                    id='name'
                    element='input'
                    type='text'
                    label='Your Name'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a name.'
                    onInput={inputHandler}
                />
            }
            <Input
                id='email'
                element='input'
                type='text'
                label='Email'
                validators={[VALIDATOR_EMAIL()]}
                errorText='Please enter a valid e-mail.'
                onInput={inputHandler}
            />
            <Input
                id='password'
                element='input'
                type='password'
                label='Password'
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText='Please enter a valid password of atleast 8 characters.'
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? 'LOGIN' : 'SIGN-UP'}
            </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO SIGNUP {isLoginMode ? 'SIGN-UP' : 'LOGIN'}</Button>
    </Card>
    )
}

export default Auth;














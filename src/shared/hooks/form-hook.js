import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    // The formIsValid && check is done so that if formIsValid is set to false once
                    // It can't be set back to true
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    // This dynamically updates one of our fields in the inputs
                    // E.g. it would just update title or description depending on the field ID we pass in.
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};

export const useForm = (initialInput, initialFormValidity) => {
    // Use reducer allows us to manage multiple states
    const [formState, dispatch] = useReducer(formReducer,  {
        inputs: initialInput,
        isValid: initialFormValidity
    });
};















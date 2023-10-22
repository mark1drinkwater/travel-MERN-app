import { useCallback, useReducer } from "react";

// When we update the state inside of our custom hook
// the coponent that uses our custom hook will update.
const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
              // If input is falsy (undefined) then skip the check
              if (!state.inputs[inputId]) {
                continue;
              }
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
        case 'SET_DATA':
            return {
                // Since we're totally overriding the existing state.
                // We can just return a new form state.
                inputs: action.inputs,
                isValid: action.formIsValid
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

    // If this component function re-executes, the function here will be stored away by React
    // and reused so that no new function object is created whenever the component is re-rendered
    // So that useEffect does not re-render. To prevent an infinite loop.
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, [dispatch]);

    // Can all this anytime, we want to update the form data.
    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        })
    }, []);

    // Return the formState and a pointer call to the inputHandler function
    return [formState, inputHandler, setFormData];
};















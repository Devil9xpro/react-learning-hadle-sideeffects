import { useContext, useEffect, useReducer, useState } from 'react'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import classes from './Login.module.css'
import AuthContext from '../../store/auth-context'

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.includes('@'),
        }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: state.value,
            isValid: state.value.includes('@'),
        }
    }
    return {
        value: '',
        isValid: false,
    }
}

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.trim().length > 6,
        }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: state.value,
            isValid: state.value.trim().length > 6,
        }
    }
    return {
        value: '',
        isValid: false,
    }
}

const Login = props => {
    // const [enteredEmail, setEnteredEmail] = useState('')
    // const [emailIsValid, setEmailIsValid] = useState(false)
    // const [enteredPassword, setEnteredPassword] = useState('')
    // const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: false,
    })

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: false,
    })

    const { isValid: emailIsValid } = emailState
    const { isValid: passwordIsValid } = passwordState

    const authCtx = useContext(AuthContext)

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setFormIsValid(
                emailIsValid && passwordIsValid
            );
        }, 500);

        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid])

    const submitHandler = event => {
        event.preventDefault()
        authCtx.onLogin(emailState.value, passwordState.value)
    }

    const emailChangeHandler = event => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

        // setFormIsValid(
        //     passwordState.isValid && event.target.value.trim().length > 6
        // )
    }

    const validateEmailHandler = event => {
        dispatchEmail({ type: 'INPUT_BLUR' })
    }

    const passwordChangeHandler = event => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

        // setFormIsValid(
        //     emailState.isValid && event.target.value.trim().length > 6
        // )
    }

    const validatePasswordHandler = event => {
        dispatchPassword({ type: 'INPUT_BLUR' })
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id='email'
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}>
                    <label htmlFor="email">Password</label>
                    <input
                        type="password"
                        id='password'
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default Login
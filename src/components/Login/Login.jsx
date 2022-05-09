import { useEffect, useState } from 'react'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import classes from './Login.module.css'

const Login = props => {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [enteredPassword, setEnteredPassword] = useState('')
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)

    useEffect(() => {
        setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6)
    }, [enteredEmail, enteredPassword])

    const submitHandler = event => {
        event.preventDefault()
        props.onLogin(enteredEmail, enteredPassword)
    }

    const emailChangeHandler = event => {
        setEnteredEmail(event.target.value)
    }

    const validateEmailHandler = event => {
        setEmailIsValid(enteredEmail.includes('@'))
    }

    const passwordChangeHandler = event => {
        setEnteredPassword(event.target.value)
    }

    const validatePasswordHandler = event => {
        setPasswordIsValid(enteredPassword.trim().length > 6)
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''}`}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id='email'
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''}`}>
                    <label htmlFor="email">Password</label>
                    <input
                        type="password"
                        id='password'
                        value={enteredPassword}
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
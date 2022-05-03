import React from 'react'
import Card from '../UI/Card/Card'
import classes from './Home.module.css'

const Home = props => {
    return (<React.Fragment>
        <Card className={classes.home}>
            <h1>Welcome Back!</h1>
        </Card>
    </React.Fragment>)
}

export default Home
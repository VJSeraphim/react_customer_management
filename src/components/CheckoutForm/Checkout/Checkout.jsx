import React, {useState} from 'react'
import {Paper, Stepper, Step, StepLabel, CircularProgress, Divider, Button, Typography} from "@material-ui/core"
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0)
    const classes = useStyles()

    const Form = () => activeStep === 0 
        ? <AddressForm /> 
        : <PaymentForm />

    const ConfirmationForm = () => (
        <div>
            Confirmation
        </div>
    )

    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align = "center">Checkout</Typography>
                    <Stepper activeStep = {0} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <ConfirmationForm /> : <Form />}
                </Paper>
            </main>

        </>
    )
}

export default Checkout

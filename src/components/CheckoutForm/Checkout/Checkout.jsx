import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, CircularProgress, Divider, Button, Typography} from "@material-ui/core"
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({cart}) => {
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const classes = useStyles()

    useEffect(() =>{
        const generateToken = async() => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'})
                console.log(token)
                setCheckoutToken(token)
            } catch(error) {
                
            }
        }

        generateToken()
    }, [cart]) 

    const nextStep = () => setActiveStep((prevActiveStep)=> prevActiveStep + 1)
    const prevStep = () => setActiveStep((prevActiveStep)=> prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const confirmation = () => {
        <div>
            Confirmation
        </div>
    }

    const Form = () => activeStep === 0 
        ? <AddressForm checkoutToken = {checkoutToken} next={next}/> 
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} prevStep={prevStep}/>


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
                    {activeStep === steps.length ? <ConfirmationForm /> : checkoutToken && <Form />}
                </Paper>
            </main>

        </>
    )
}

export default Checkout

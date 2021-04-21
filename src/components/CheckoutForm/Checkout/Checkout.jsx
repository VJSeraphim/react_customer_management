import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, CircularProgress, Divider, Button, Typography, CssBaseline} from "@material-ui/core"
import {Link} from 'react-router-dom'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
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
                console.log(error)
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

    let Confirmation = () => order.customer ?(
        <>
        <div>
            <Typography variant="h5">
                Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}
                <Divider classname={classes.divider}/>
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
        
    )

    if (error) {
        Confirmation = () => (
            <>
                <Typography variant="h5"> Error: {error}</Typography>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        )
    }

    const Form = () => activeStep === 0 
        ? <AddressForm checkoutToken = {checkoutToken} next={next}/> 
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} prevStep={prevStep} onCaptureCheckout={onCaptureCheckout}/>


    return (
        <>
        <CssBaseline />
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
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>

        </>
    )
}

export default Checkout

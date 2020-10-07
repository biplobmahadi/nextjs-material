import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReceiverAddress from './ReceiverAddress';
import Receiver from './forms/Receiver';
import Payment from './forms/Payment';
import ConfirmPayment from './forms/ConfirmPayment';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
}));

function getSteps() {
    return ['Receiver Address', 'Payment Method', 'Confirm Order'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <Receiver />;
        case 1:
            return <Payment />;
        case 2:
            return <ConfirmPayment />;
        default:
            return 'Unknown stepIndex';
    }
}

export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <Box
                    mt={3}
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    {activeStep === steps.length ? (
                        <div>
                            <Typography
                                variant='h5'
                                component='h5'
                                className={classes.instructions}
                            >
                                <strong>Your Order is Confirmed !!</strong>
                            </Typography>
                            <Box pb={3}>
                                <Link href='/my-order-details'>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        color='primary'
                                    >
                                        <Box px={2}>See Your Order Details</Box>
                                    </Button>
                                </Link>
                            </Box>
                        </div>
                    ) : (
                        <div>
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </Typography>

                            <Box py={3}>
                                <Button
                                    variant='contained'
                                    size='small'
                                    color='primary'
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    onClick={handleNext}
                                >
                                    {activeStep === steps.length - 1
                                        ? 'Confirm'
                                        : 'Next'}
                                </Button>
                            </Box>
                        </div>
                    )}
                </Box>
            </div>
        </div>
    );
}

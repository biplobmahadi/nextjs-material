import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReceiverAddress from './ReceiverAddress';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return [
        'On Observation',
        'Processing',
        'Is Placed',
        'In Road',
        'Completed',
    ];
}

export default function HorizontalLabelPositionBelowStepper({ order }) {
    const classes = useStyles();
    // const [activeStep, setActiveStep] = React.useState('');
    const steps = getSteps();
    let activeStep;
    if (!order.is_processing) {
        activeStep = 0;
    } else if (order.is_processing) {
        activeStep = 1;
    } else if (order.is_processing && order.is_placed) {
        activeStep = 2;
    } else if (order.is_processing && order.is_placed && order.is_on_road) {
        activeStep = 3;
    } else if (
        order.is_processing &&
        order.is_placed &&
        order.is_on_road &&
        order.is_completed
    ) {
        activeStep = 4;
    }

    return (
        <div className={classes.root}>
            <Hidden mdUp>
                <Stepper activeStep={activeStep} orientation='vertical'>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Hidden>
            <Hidden smDown>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Hidden>
        </div>
    );
}

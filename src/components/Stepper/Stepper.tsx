import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Stepper.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
);

function getSteps() {
  return ['Phase 1', 'Phase 2', 'Phase 3'];
}
const message = [{
    user: 'Ms. Urvasi',
    date: '12/03/2020',
    message: `Ms. Priyanka - Please call Ms. Urvasi or their Law Firm office @ 8988890909 and setup your 
    initial assesment consulting and its needed for preparing the paper work.`
},
{
    user: 'You',
    date: '13/03/2020',
    message: `Thank you for your time today, looking forward to hear from you on the formal court hearing
    date.`
},
{
    user: 'Ms. Urvasi',
    date: '12/03/2020',
    message: `Ms. Priyanka,
    got the confirmation for the initial appearing on with the following details.    
    2nd Nov, 2020, 10.30 AM. Chennai High Court.`
},
{
    user: 'You',
    date: '13/03/2020',
    message: `Awesome Thank you!.`
}];
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return message.map((messageItem, index) => {
        if (messageItem.user !== 'You') {
            return (
                <div className="message-container">
                    <div className="user-info">
                        <Typography>{messageItem.user}</Typography>
                        <Typography>{messageItem.date}</Typography>
                    </div>
                    <div className="message-info">
                        <Typography>{messageItem.message}</Typography>
                    </div>            
                </div>
            )
        } else {
            return (
                <div className="user-message-container">
                    <div className="message-info">
                        <Typography>{messageItem.message}</Typography>
                    </div>
                    <div className="user-info">
                        <Typography>{messageItem.user}</Typography>
                        <Typography>{messageItem.date}</Typography>
                    </div>           
                </div>
            )
        }
    });
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const [notesToLawyer, setNotesToLawyer] = React.useState('');

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

  const handleNotesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNotesToLawyer(event.target.value as string);
  };
  const { isLawyer } = props;

  const acceptProposal = () => {
    if (isLawyer) {
      props.history.push(`/lawyer-case-inquiry-accept/562`);
    } else {
      props.history.push(`/customer-case-inquiry-accept/562`);
    }
  }

  const labelText = isLawyer ? 'Notes to client*' : 'Notes to lawyer*';

  const btnText = isLawyer ? 'Respond to Ms. Priyanka Pandey' : 'Respond to Mr. RAMAKRISHNA IYER K.R.';

  return (
    <div className={classes.root}>
      <Stepper className="stepper-container" activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label} className="step-container">
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className="lawyer-notes-container">
                <TextField
                  className="lawyer-notes-field"
                  size="small"
                  multiline
                  rows={5}
                  onChange={handleNotesChange}
                  label={labelText}
                   variant="outlined"
                  value={notesToLawyer}
                />
              </div>
              <div className="lawyer-action-container">
                <Button variant="contained" onClick={() => {}}>
                  <span>{btnText}</span>
                </Button>
                { isLawyer &&
                  <Button variant="contained" className="accept-btn" onClick={acceptProposal}>
                    <span>I accept to appear on this case.</span>
                  </Button>
                }
                { !isLawyer &&
                  <Button variant="contained" className="accept-btn" onClick={acceptProposal}>
                    <span>Accept</span>
                  </Button>
                }
              </div>
              {/* <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
                </div> */ }
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      ) */}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reduxAction/rootReducer";
import * as PasswordEmailLinkActions from "../../reduxAction/passwordEmailLink/passwordEmailLinkActions";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";

import Mylogo from "../../assets/img/applogo.svg";
import footerLogo from "../../assets/img/footerApplogo.svg";
import './ForgotPassword.scss';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '95%',
    maxWidth: '600px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
});

interface Props extends RouteComponentProps<any> {
  classes: any;
  actions: typeof PasswordEmailLinkActions;
  snackbarsActions: typeof SnackbarsActions;
  status: boolean;
  response: any;
  success: any;
  error: any;
}


function ForgotPassword(props: Props) {
  const { classes } = props;

  const [userName, setUserName] = useState('');
  const [isValidUserName, setValidateUserName] = useState(false);
  
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    setValidateUserName(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (userName === '') {
      setValidateUserName(true);
    }
    if (userName !== '') {
      const data = {
        email: userName,
        type:userType,
      }
      props.actions.passwordEmailLinkAction(data);
    }
  }

  useEffect(() => {
    if (props.error) {
      props.snackbarsActions.showErrorSnackbarAction(props.error);
      props.actions.clearError({});
    }
    if(props.success){
      props.snackbarsActions.showSuccessSnackbarAction(props.success);
      props.actions.clearError({});
      props.history.push('/login-page');
    }
  });
  const [userType, setUserType] = React.useState('individual');
  
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value);
  };

  return (
    <Container component="main" className="forgot-password-container">
      <div className="forgot-form-container">
        <CssBaseline />
        <div className={classes.paper}>
          <Button>
              <img
                className="login-logo"
                src={Mylogo}
                alt='logo'
              />
          </Button>
          <div>
            <Typography className="title" align="center" variant="h6" gutterBottom >
              Reset Password
            </Typography>
            <Typography className="info-text" variant="overline" display="block" gutterBottom>
              If you have account with LAWE platform?, enter Email ID or UserId to get intruction via email.
            </Typography>
          </div>
          <div >
              <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue={userType} onChange={handleRadioChange}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        value="individual"
                        control={<Radio color="primary" />}
                        label="Individual"
                        labelPlacement="end"
                        className="radio-label"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        value="company"
                        control={<Radio color="primary" />}
                        label="Company"
                        labelPlacement="end"
                        className="radio-label"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </div>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={isValidUserName}
              onChange={handleUserNameChange}
              value={userName}
            />
            <Grid container>
              <Grid item xs>
                <Button className="forgot-link">
                  <Link to="/">
                    Cancel
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit-btn"
                  onClick={handleSubmit}
                >
                  Initiate Reset
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                { /* <Button className="forgot-link">
                  <Link to="/signup-page">
                    Forgot password?
                  </Link>
                  </Button> */ }
              </Grid>
              <Grid item>
                <Button className="forgot-link">
                  <Link to="/signup-page">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <div className="login-banner-container">
        <Typography variant="h3" gutterBottom>
          An Integrated Legal Management Ecosystem
        </Typography>
      </div>
      <div className="terms-container">
        <Typography variant="body1" gutterBottom>
          LAWE @ 2023. All rights reserved.
        </Typography>
        <Button>
          <img
            className="footer-logo"
            src={footerLogo}
            alt='logo'
          />
        </Button>
      </div>
    </Container>
  );
}



const mapStateToProps = (state: RootState) => ({
  status: state.forgotPassword.status,
  response: state.forgotPassword.response,
  success: state.forgotPassword.success,
  error: state.forgotPassword.error,
});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(PasswordEmailLinkActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ForgotPassword));

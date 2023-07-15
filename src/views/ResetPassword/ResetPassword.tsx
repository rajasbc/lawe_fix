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
import * as ResetPasswordActions from "../../reduxAction/resetPassword/resetPasswordActions";

import Mylogo from "../../assets/img/applogo.svg";
import footerLogo from "../../assets/img/footerApplogo.svg";
import './ResetPassword.scss';
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";

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
  actions: typeof ResetPasswordActions;
  resetPassword: boolean | false;
  response: any;
  success: string;
  error: string;
  snackbarsActions: typeof SnackbarsActions;
}


function ForgotPassword(props: Props) {
  const { classes } = props;

  const [newPassword, setNewPassword] = useState('');
  const [isValidNewPassword, setValidNewPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setValidNewPassword(false);
  }

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidConfirmPassword, setValidConfirmPassword] = useState(false);

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setValidConfirmPassword(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (newPassword === '') {
      setValidNewPassword(true);
    }
    if (confirmPassword === '') {
      setValidConfirmPassword(true);
    }
    if (newPassword !== confirmPassword) {
      setValidNewPassword(true);
      setValidConfirmPassword(true);
    }
    if (newPassword !== '' && confirmPassword !== '' && newPassword === confirmPassword) {
      const data = {
        password: newPassword,
        id: props.match.params.userId,
        type: props.match.params.type,
        
      }
      props.actions.resetPasswordAction(data);
    }
  }

  useEffect(() => {

    if(props.resetPassword) {
      props.history.push('/login-page');
    }
    if (props.error) {
      props.snackbarsActions.showErrorSnackbarAction(props.error);
      props.actions.clearError({});
    }
    if(props.success){
      props.snackbarsActions.showSuccessSnackbarAction(props.success);
      props.actions.clearError({});
    }
  });

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
              New Password
            </Typography>
          </div>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="New password"
              type="password"
              id="password"
              autoFocus
              autoComplete="current-password"
              error={isValidNewPassword}
              onChange={handlePasswordChange}
              value={newPassword}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              error={isValidConfirmPassword}
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
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
                  Update
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
  resetPassword: state.resetPassword.resetPassword,
  error: state.resetPassword.error,
  success: state.resetPassword.success,
  response: state.resetPassword.respone,
});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(ResetPasswordActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ForgotPassword));

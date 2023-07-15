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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as SaveCaseInquiryAction from "../../reduxAction/connectLawyer/connectLawyerActions";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reduxAction/rootReducer";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";

import Mylogo from "../../assets/img/applogo.svg";
import footerLogo from "../../assets/img/footerApplogo.svg";
import './Login.scss';

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
    width: '91%',
    [theme.breakpoints.up("md")]: {
      width: '50%',
    },
    maxWidth: '600px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progressbar: {
    color: '#FFC602'
  },
});

interface Props extends RouteComponentProps<any> {
  classes: any;
  actions: typeof LoginActions;
  token: string | null;
  userName: string | null;
  error: any;
  snackbarsActions: typeof SnackbarsActions;
  isLoading: boolean;
  isLoginFromConnect: boolean;
  userInfo: any;
  success: any;
  selectedLawyer: any;
  saveCaseInquiryAction: typeof SaveCaseInquiryAction;
}
interface State {
  password: string;
  showPassword: boolean;

}


function LoginPage(props: Props) {
  const { classes } = props;
  const isMultiConnect = props.match.params.id === 'all';
  // const findSelectedLawyer = (isMultiConnect) ? filter(props.findLawyer, (profile) => props.selectedLawyer.includes(profile.id)) : [];
  const [userName, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  const [isValidUserName, setValidateUserName] = useState(false);
  const [isValidPassword, setValidatePassword] = useState(false);
  const [userType, setUserType] = React.useState('individual');
  const [isShownError, setIsShownError] = React.useState(false);
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
});
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    setValidateUserName(false);
  }

  const handleChange =  (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
        ...values,
        showPassword: !values.showPassword,
    });
    setValidatePassword(false);
};
  const handleSubmit = async(event) => {
    event.preventDefault();

    if (userName === '') {
      setValidateUserName(true);
    }
    if (values.password === '') {
      setValidatePassword(true);
    }
    if (userName !== '' && values.password !== '') {
      const data = {
        email: userName,
        password: values.password,
        userType: userType,
      }
      await props.actions.loginUserAction(data);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    
    if (props.selectedLawyer.length !== 0 && ((props.token && props.userInfo?.companyjson?.status === 'clientfirm') || (props.token && (props.userInfo?.userjson?.status === 'individual')))) {

      props.saveCaseInquiryAction.resetCaseInquiryAction();
      props.history.push(`/connect-lawyer/all`);

    }
    else {
      if (props.token && props.userInfo?.companyjson?.status === 'lawfirm') {
        props.history.push('/dashboard');
      }
      else if (props.token && props.userInfo?.companyjson?.status === 'clientfirm') {
        props.history.push('/');
      }
      else if (props.token && (props.userInfo?.userjson?.status === 'lawyer' || props.userInfo?.userjson?.status === 'companylawyer')) {
        props.history.push('/dashboard');
      }
      else if (props.token && (props.userInfo?.userjson?.status === 'individual')) {
        props.history.push('/');
      }
      else if(props.token && props.userInfo?.userjson?.status === 'platformadmin') {     
        props.history.push('/platform-admin-dashboard') ;
      }
      else if (props.token && props.userInfo?.userjson?.status !== 'lawyer') {
        (props.isLoginFromConnect) ? props.history.push('/lawyer') : props.history.push('/');
      }
     
    }
    // if(props.token){
    //   let query = {
    //     id: props.userInfo.id,
    //     type: props.userInfo.status,
    //   };
    //  props.actions.getAllNotifications(query);
    // }
    if (props.error) {
      props.snackbarsActions.showErrorSnackbarAction(props.error);
      props.actions.clearError({});
    }
    if (props.success) {
      props.snackbarsActions.showSuccessSnackbarAction(props.success);
      props.actions.clearSuccess({});
    }
  });

  const { isLoading } = props;

  return (
    <React.Fragment>
      <Container component="main" className="login-container">
        <div className="login-form-container">
          <CssBaseline />
          <div className={classes.paper}>
            <Button>
              <img
                className="login-logo"
                src={Mylogo}
                alt='logo'
              />
            </Button>
            <div className="user-type-container">
              <FormControl className="radio-field-set" component="fieldset">
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                error={isValidPassword}
                onChange={handleChange('password')}
                value={values.password}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end" >
                          <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                          >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                      </InputAdornment>
                  ),
              }}
              />
              <Grid container>
                <Grid item xs>
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
                    Sign In
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Button className="forgot-link">
                    <Link to="/forgot-password">
                      Forgot password?
                    </Link>
                  </Button>
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
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress className={classes.progressbar} size={100} />
      </Backdrop>
    </React.Fragment>
  );
}


const mapStateToProps = (state: RootState) => ({
  token: state.loginForm.userName,
  error: state.loginForm.error,
  success: state.loginForm.success,
  isLoading: state.loginForm.loading,
  isLoginFromConnect: state.findLawyer.isLoginFromConnect,
  userInfo: state.loginForm.userInfo,
  selectedLawyer: state.findLawyer.selectedLawyer,

});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(LoginActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
    saveCaseInquiryAction: bindActionCreators(SaveCaseInquiryAction as any, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginPage));

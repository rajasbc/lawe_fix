import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reduxAction/rootReducer";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
import * as signupUserActions from "../../reduxAction/signup/signupActions";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import ResponsiveDialog from "../../components/ClouserDialog/ClouserDialog";

import { Form } from 'react-formio';
import lawyerForm from '../../assets/form/lawyer.json';
import individualForm from '../../assets/form/individual.json';
import clientFirmForm from '../../assets/form/clientfirm.json';
import lawFirmForm from '../../assets/form/lawfirm.json';
import companyLawyerForm from '../../assets/form/companylawyer.json';
import './Signup.scss';

// <link
// rel="stylesheet"
// href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css"
// />

import { TransitionProps } from "@material-ui/core/transitions/transition";
import {
  AppBar,
  Avatar,
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  createStyles,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Slide,
  SlideProps,
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";

const title = {
  individual: "an Individual",
  lawyer: "a Professional Lawyer",
  clientfirm: "a Client Firm",
  lawfirm: "a Law Firm",
}
interface Props extends RouteComponentProps<any> {
  classes: any;
  actions: typeof signupUserActions;
  snackbarsActions: typeof SnackbarsActions;
  loginActions: typeof LoginActions;
  signUp: any;
  error: any;
  isLoading: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...(props as SlideProps)} />;
});

export function MediaCard(props) {
  const name = `${props.data.fName} ${props.data.lName}`;
  const city = props.data.city.cityName;
  const email= props.data.email;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </ListItemAvatar>
      {/* <ListItemText primary={name} secondary={city}/> */}
      <ListItemText primary={name}
        secondary={
          <div>
            {email} {",  "} {city}
          </div>
        }
       />
      <div className="add-lawyer-container">
        <Button
          variant="contained"
          color="secondary"
          className="add-lawyer-btn"
          onClick={()=>props.handleClickOpen(props.index)}
        >
          Edit
        </Button>
      </div>
    </ListItem>
  );
}

export function LawFirmCard(props) {
  const { companyName, companyRepresentativeName, address, city, country, mobileNo } = props.lawFirmInfo.companyjson;
  return (
    <Card className="">
      <CardContent>
        <Typography variant="h5" component="h2">
          Name: {companyName}
        </Typography>
        <Typography className="" color="textSecondary">
          Representative Name: {companyRepresentativeName}
        </Typography>
        <Typography variant="body2" component="p">
          MobileNo: {mobileNo}
        </Typography>
        <Typography variant="body2" component="p">
          Address: {address}, {city.cityName}, {country}
        </Typography>
      </CardContent>
    </Card>
  );
}

const styles = (theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
    backgroundColor: '#292734'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progressbar: {
    color: '#FFC602'
  },
  disabledButton: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "gray"
    }

  }
});

export const SignUpPage = (props: Props) => {

  const { classes } = props;
  useEffect(() => {

    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    props.actions.resetSignUpFormAction();
    props.actions.resetAadhaarVerification();
    props.actions.resetOtp();

  }, []);

  const [role, setRole] = React.useState('initoption');
  const [openOtpSubmit, setOpenOtpSubmit] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [inputData, setInputData] = React.useState({});
  const [clientId, setClientId] = React.useState("");
  const [aadhaarVerified, setAadhaarVerified] = React.useState(false);
  const [firmLawyresData, setFirmLawyresData] = React.useState({});
  
  useEffect(() => {

    const otpData = props.signUp.aadhaarOtpGeneration;
    if (otpData?.status_code == 200) {      
      setClientId(otpData?.data?.client_id);
      setAadhaarVerified(true);
      setOpenOtpSubmit(true);
      // setIsLoading(false);
    }
    
    const otpSubmit = props.signUp.aadhaarOtpVerified?.status_code;
    if (otpSubmit == 200) {
      if (role == "individual"  || role == "lawyer" ) {        
        saveData(inputData);
      } else {
        setLawyerData(firmLawyresData);
      }
    }
  }, [props.signUp.aadhaarOtpGeneration, props.signUp.aadhaarOtpVerified])

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole((event.target as HTMLInputElement).value);
  };

  const getFromData = async(event) => {
    //event.data.dob = new Date(event.data.dob).toISOString()
    setIsLoading(true);
    setInputData(event.data);
    if (role == "individual"  || role == "lawyer" ) {
      const aadhaar = {
        "aadhaarId": event.data?.aadhar
      };
      props.actions.aadhaarVerification(aadhaar);
    } else if (role == "clientfirm" || role == "lawfirm ") {
      setInputData(event.data);
      setOpenOtpSubmit(false);
      await saveclientfirmData(event.data);
    }
    setIsLoading(false);
  }

  const saveData = (inputData) => {
    setIsLoading(true);
    if (inputData) {
      setIndividualData(inputData);
      // if (role == "clientfirm") {
      //     let data = {
      //       companyData: inputData
      //     };
      //     data.companyData.status = role;
      //     props.snackbarsActions.clearSnackbarAction();
      //     props.actions.signupComanyLawyerUserAction(data);
      
      // } else {
          let data = {
            data: inputData
          };
          data.data.status = role;
          props.snackbarsActions.clearSnackbarAction();
          props.actions.signupUserAction(data);
      // }
      setIndividualData(inputData);
      setOtp("");
      setClientId("");      
      otpSubmitClose();
    }
    setIsLoading(false);
  }

  const saveclientfirmData = (inputData)=> {

    if (inputData) {      
      if (role == "clientfirm") {
        let data = {
          companyData: inputData
        };
        data.companyData.status = role;
        props.snackbarsActions.clearSnackbarAction();
        props.actions.signupComanyLawyerUserAction(data);
      
      } 
      // else {
      //   let data = {
      //     data: inputData
      //   };
      //   data.data.status = role;
      //   props.snackbarsActions.clearSnackbarAction();
      //   props.actions.signupUserAction(data);
      // }
      setIndividualData(inputData);
    }
  }

  const handleOtpChange = (event: React.ChangeEvent <{value: unknown}>) => {
    const otp = (event.target.value as string);
    if (otp) {
        setOtp(otp);
    }
  }

  const otpSubmitClose = () => {
    setOpenOtpSubmit(false);
  }
   
  const otpSubmitSuccess = () => {
    setIsLoading(true);
    const inputData = {
      "clientId": clientId,
      "otp": otp,
    };
    props.actions.aadhaarOTPVerification(inputData);
    setIsLoading(false);
  }

  const getCompanyLawyerFromData = (event) => {

    setFirmLawyresData(event.data);
    const aadhaar = {
      "aadhaarId" : event?.data?.aadhar
    };
    props.actions.aadhaarVerification(aadhaar);
  }  

  const setLawyerData = (data) => {
    let test = true;
    setIsLoading(test)
    setOpen(false);
    setEdit(false);
    setCompanyLawyerList(companyLawyerList => [...companyLawyerList, data]);
    setOtp("");
    setClientId("");    
    props.actions.resetAadhaarVerification();
    props.actions.resetOtp();    
    setOpenOtpSubmit(false);
    setShowLawFirmList(true);
    setIsLoading(false);
  }

  const getCompanyLawyerFromDataEdit = (event) => {
    let test = true;
    setIsLoading(test)
    setOpen(false);
    setEdit(false);
    let updateList = companyLawyerList;
    updateList[companyLawerEditIndex] = event.data;
    setCompanyLawyerList([...updateList]);
    setShowLawFirmList(true);
    setIsLoading(false)
  }

  const handleClickOpenOne = (val) => {
    if(!edit && val != undefined){
    setEdit(true);
    setCompanyLawerEditIndex(val);
    }
  };

  const handleClickOpenNew = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setShowLawFirmList(true);
    setShowLawFirmForm(true);
    setOpen(false);
    setEdit(false);
  };

  const handleListClose = () => {
    setShowLawFirmForm(true);
    setShowLawFirmList(false);

  }
  const handleBack = () => {
    setRole('initoption');
  }
  const handleCloseDialog = () => {
    setIsRegisteredSuccess(false);
  };

  const handleSuccessStageClose = () => {
    setIsRegisteredSuccess(false);
    props.history.push('/login-page');
  };

  const handleCancelStageClose = () => {
    setIsRegisteredSuccess(false);
    props.history.push('/');
  }

  const submitLawFirm = () => {
    const noOfLawyerInYourFirm = companyData?.["noOfLawyerInYourFirm"];
    const lawyerCount = Number(noOfLawyerInYourFirm);
    if (companyLawyerList.length !== lawyerCount) {
      let count = lawyerCount - companyLawyerList.length;
      if(count === 1)
      props.snackbarsActions.showErrorSnackbarAction(`Please add ${count} lawyer`);
      else if (count > 0)
        props.snackbarsActions.showErrorSnackbarAction(`Please add ${count} lawyers`);
      else
        props.snackbarsActions.showErrorSnackbarAction(`No. of lawyers you specified is less than you added`);
    } else {
      const data = {
        companyData: companyData,
        companyLawyerList: companyLawyerList
      }
      props.snackbarsActions.clearSnackbarAction();
      props.actions.signupComanyLawyerUserAction(data);
    }
  }
  const onchangepwd = (event) => {
    if (event.data.showpwd == true) {
      event.data.view_pwd = event.data.password;
    }
    if (event.data.showConfirmpwd == true) {
      event.data.confirm_pwd = event.data.confirmPassword;
    }
  }
  const openAddLawyer = (event) => {
    if (companyLawyerList.length > 0 && showLawFirmForm) {
      setShowLawFirmList(true);
    } else {
      setOpen(true);
    }
    setShowLawFirmForm(false);
    event.data.status = role;
    setCompanyData(event.data)
    setIsLawFirmAdded(true);

  }

  useEffect(() => {
    if (props.signUp.status && role !== 'lawfirm') {
      props.actions.resetSignUpFormAction();
      setIsRegisteredSuccess(true);
    }
    if (props.signUp.status && role === 'lawfirm') {
      setIsLawFirmAdded(true);
    }
    if (props.signUp.firmRes && role === 'lawfirm') {
      props.actions.resetSignUpFormAction();
      setIsRegisteredSuccess(true);
    }
    if (props.signUp.firmRes && role === 'clientfirm') {
      props.actions.resetSignUpFormAction();
      setIsRegisteredSuccess(true);
    }
    if (props.signUp.error) {
      props.snackbarsActions.showErrorSnackbarAction(props.signUp.error);
      props.actions.clearError({});
    }
    if (props.signUp.success) {
      props.snackbarsActions.showSuccessSnackbarAction(props.signUp.success);
      props.actions.clearSuccess({});
    }
  }, [props.signUp]);

  const options = {
    noAlerts: true,
  }

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [isLawFirmAdded, setIsLawFirmAdded] = React.useState(false);
  const [isRegisteredSuccess, setIsRegisteredSuccess] = React.useState(false);
  const [companyData, setCompanyData] = React.useState({});
  const [showLawFirmForm, setShowLawFirmForm] = React.useState(true);
  const [showLawFirmList, setShowLawFirmList] = React.useState(false);
  const [companyLawyerList, setCompanyLawyerList] = React.useState([]);
  const [individualData, setIndividualData] = React.useState({});
  const [companyLawerEditIndex, setCompanyLawerEditIndex] = React.useState(0);
  const [ isLoading, setIsLoading ] = React.useState(props?.isLoading === true? true: false);


  return (
    <div>
      <Header links={<HeaderLinks />} fixed color="primary" />
      <div className="signup-container">

        <Typography variant="h5" gutterBottom align="center">
          Sign Up as {title[role]}
        </Typography>
        <Typography variant="h6" gutterBottom align="center">
          Unlock the potential of the platform.
        </Typography>
      </div>

      {role === 'initoption' &&
        <div className="main-radio-container">
          <FormControl className="radio-field-set" component="fieldset" margin="dense">
            <RadioGroup row aria-label="position" name="position" onChange={handleRadioChange}>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <FormControlLabel
                    value="individual"
                    control={<Radio color="primary" />}
                    label="Looking for Legal Service"
                    labelPlacement="end"
                    className="radio-label"
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="flex-start">
                <Grid item>
                  <FormControlLabel
                    value="lawyer"
                    control={<Radio color="primary" />}
                    label="Offering Legal Service"
                    labelPlacement="end"
                    className="radio-label"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </div>
      }
      {role === 'individual' &&
        <div className="form-container">
          <div className="radio-container">
            <FormControl className="radio-field-set" component="fieldset">
              <Grid container direction="row" justifyContent="flex-start">
                <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">

                  <ChevronLeftIcon /> Back
                </IconButton>
              </Grid>
              <RadioGroup row aria-label="position" name="position" defaultValue='individual' onChange={handleRadioChange}>
                <Grid container justifyContent="center" >
                  <Grid item>
                    <FormControlLabel
                      value="individual"
                      control={<Radio color="primary" />}
                      label="An Individual looking to engage a Lawyer"
                      labelPlacement="end"
                      className="radio-label"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="clientfirm"
                      control={<Radio color="primary" />}
                      label="A Firm/Organization looking for a Lawyer"
                      labelPlacement="end"
                      className="radio-label"
                    />
                  </Grid>
                </Grid>

              </RadioGroup>

            </FormControl>
          </div>
          <Form form={individualForm} submission={{ data: individualData }} onSubmit={getFromData} onChange={onchangepwd} options={options} />
        </div>

      }
      {role === 'lawyer' &&
        <div className="form-container">
          <div className="radio-container">
            <FormControl className="radio-field-set" component="fieldset">
              <Grid container direction="row" justifyContent="flex-start">
                <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">

                  <ChevronLeftIcon /> Back
                </IconButton>
              </Grid>
              <RadioGroup row aria-label="position" name="position" defaultValue='lawyer' onChange={handleRadioChange}>
                <Grid container xs={12} justifyContent="center">
                  <Grid item>
                    <FormControlLabel
                      value="lawyer"
                      control={<Radio color="primary" />}
                      label="Independent Lawyer offering Legal Service"
                      labelPlacement="end"
                      className="radio-label"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="lawfirm"
                      control={<Radio color="primary" />}
                      label="Law Firm offering legal Service"
                      labelPlacement="end"
                      className="radio-label"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </div>
          <>
          <Form form={lawyerForm} submission={{ data: individualData }} onSubmit={getFromData} onChange={onchangepwd} options={options} />
          </>
        </div>
      }

      {role === 'clientfirm' &&
        <div className="form-container">
          <div className="radio-container">
            <FormControl className="radio-field-set" component="fieldset">
              <Grid container direction="row" justifyContent="flex-start">
                <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">

                  <ChevronLeftIcon /> Back
                </IconButton>
              </Grid>
              <RadioGroup row aria-label="position" name="position" defaultValue='clientfirm' onChange={handleRadioChange}>
                <Grid container xs={12} justifyContent="center">
                  <Grid item>
                    <FormControlLabel
                      value="individual"
                      control={<Radio color="primary" />}
                      label="An Individual looking to engage a Lawyer"
                      labelPlacement="end"
                      className="radio-label"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="clientfirm"
                      control={<Radio color="primary" />}
                      label="A Firm/Organization looking for a Lawyer"
                      labelPlacement="end"
                      className="radio-label"
                    />
                  </Grid>
                </Grid>

              </RadioGroup>
            </FormControl>
          </div>
          <Form className="dynamicContainer" form={clientFirmForm} submission={{ data: individualData }} onSubmit={getFromData} onChange={onchangepwd} options={options} />
        </div>
      }

      {role === 'lawfirm' && showLawFirmForm &&
        <div className="form-container">
          <div className="radio-container">
            <FormControl className="radio-field-set" component="fieldset">
              <Grid container direction="row" justifyContent="flex-start">
                <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">

                  <ChevronLeftIcon /> Back
                </IconButton>
              </Grid>
              <RadioGroup row aria-label="position" name="position" defaultValue='lawfirm' onChange={handleRadioChange}>
                <Grid container xs={12} justifyContent="center">
                  <Grid item>
                    <FormControlLabel
                      value="lawyer"
                      control={<Radio color="primary" />}
                      label="Independent Lawyer offering Legal Service"
                      labelPlacement="end"
                      className="radio-label"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="lawfirm"
                      control={<Radio color="primary" />}
                      label="Law Firm offering legal Service"
                      labelPlacement="end"
                      className="radio-label"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </div>
          <Form form={lawFirmForm} submission={{ data: companyData }} onSubmit={openAddLawyer} onChange={onchangepwd} options={options} />
        </div>
      }

      {role === 'lawfirm' && isLawFirmAdded && showLawFirmList && companyLawyerList.length > 0 &&

        <Dialog className="full-screen-dialog" fullScreen open={showLawFirmList} onClose={handleListClose} TransitionComponent={Transition}>
          <div className="lawyer-list-container">
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleListClose} aria-label="back">
                  <ArrowBackIosIcon />
                  Back
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Lawyer List
                </Typography>
              </Toolbar>
            </AppBar>
            <div className="add-lawyer-container">
              <Button
                variant="contained"
                color="secondary"
                className="add-lawyer-btn"
                onClick={handleClickOpenNew}
                startIcon={<AddIcon />}
                disabled={Number(companyData?.["noOfLawyerInYourFirm"]) === companyLawyerList.length ? true : false}
              >
                Add Lawyer
              </Button>
            </div>
            <div>
            <Paper elevation={3}>
              <List>
                {companyLawyerList.map((data,index) => {
                  return (
                    <MediaCard data={data} handleClickOpen={handleClickOpenOne} index={index}/>
                  );
                })}
              </List>
            </Paper>
            </div>
            <div className="submit-lawyer-btn">
              <Button
                variant="contained"
                color="secondary"
                className="add-lawyer-btn"
                onClick={submitLawFirm}
              >
                Submit
              </Button>
            </div>
          </div>
        </Dialog>
      }

      <Dialog className="full-screen-dialog" fullScreen open={edit} onClose={handleFormClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleFormClose} aria-label="back">
              <ArrowBackIosIcon />{edit}
              Back
            </IconButton>
            <Typography variant="h6" className={classes.title} align="center">
              Edit Lawyer
            </Typography>

          </Toolbar>
        </AppBar>
          <Form form={companyLawyerForm} submission={{ data: companyLawyerList[companyLawerEditIndex] }} onSubmit={getCompanyLawyerFromDataEdit} onChange={onchangepwd} options={options} />
      </Dialog>
      <Dialog className="full-screen-dialog" fullScreen open={open} onClose={handleFormClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleFormClose} aria-label="back">
              <ArrowBackIosIcon />
              Back
            </IconButton>
            <Typography variant="h6" className={classes.title} align="center">
              New Lawyer
            </Typography>
          </Toolbar>
        </AppBar>
        <Form form={companyLawyerForm}  onSubmit={getCompanyLawyerFromData} onChange={onchangepwd} options={options} />
      </Dialog>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress className={classes.progressbar} size={100} />
      </Backdrop>
      <Footer />
      <ResponsiveDialog
        title="Registration Completed"
        content={`Thank you for registering with LAWE!\n You have successfully registered as “${title[role]}” Now you have to login back to view your account`}
        okText="Login"
        cancelText="Cancel"
        isOpen={isRegisteredSuccess}
        handleClose={handleCloseDialog}
        handleOk={handleSuccessStageClose}
        handleCancel={handleCancelStageClose}
      />

      <ResponsiveDialog
        title="Submit OTP"
        content={""}
        formContent={
          <div> <TextField
              variant="outlined"
              margin="dense"
              id="submitOtp"
              label="SubmitOtp"
              onChange = {handleOtpChange}
              fullWidth
          /></div>}
        okText="Confirm"
        cancelText="Cancel"
        isOpen={openOtpSubmit}
        handleClose={otpSubmitClose}
        handleOk={otpSubmitSuccess}
        handleCancel={otpSubmitClose}
      />

      {/* <ResponsiveDialog
        title="Submit OTP"
        content={""}
        formContent={
          <div> <TextField
              variant="outlined"
              margin="dense"
              id="verifyOtp"
              label="verifyOtp"
              onChange = {handleOtpChange}
              fullWidth
          /></div>}
        okText="Confirm"
        cancelText="Cancel"
        isOpen={lawFirmLawyerOtpOpen}
        handleClose={lawFirmLawyerOtpClose}
        handleOk={lawFirmLawyerOtpSuccess}
        handleCancel={lawFirmLawyerOtpClose}
      /> */}

    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  signUp: state.signUpForm,
  isLoading: state.signUpForm.loading,
});

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(signupUserActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUpPage));
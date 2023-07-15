import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import find from 'lodash/find';
import moment from 'moment';
// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reduxAction/rootReducer";
import face from "../../assets/img/faces/avatar.png";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as SaveCaseInquiryAction from "../../reduxAction/connectLawyer/connectLawyerActions";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import './LawyerProfile.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


interface Props extends RouteComponentProps<any> {
  userName: string | null;
  findLawyerActions: typeof FindLawyerActions;
  saveCaseInquiryAction: typeof SaveCaseInquiryAction;
  CaseManagementActions: typeof CaseManagementActions;
  loginActions: typeof LoginActions;
  findLawyer: any;
  caseList: any;
}

const styles: any = {
  card: {
    margin: "120px 15px 20px 15px",
    position: "relative",
    minHeight: "500px",
    border: "2px solid rgba(0, 0, 0, 0.12)",
  },
  subCard: {
    margin: "40px 15px 20px 30px",
    minHeight: "100px",
    position: "relative",
    border: "2px solid rgba(0, 0, 0, 0.12)",
    display: "flex",
    alignItems: "center",
  },
  large: {
    width: "200px",
    height: "200px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    zIndex: "10",
    marginTop: "-1.5rem"
  },
  name: {
    padding: "0.6rem 1.8rem",
    backgroundColor: "#D8D8D8",
    textAlign: "left",
    borderRadius: "10px",
    color: "#B65858",
    marginTop: "1rem",
    paddingLeft: "1.8rem"
  },
  experience: {
    color: "#666464",
    fontFamily: "Titillium",
    fontSize: "1rem",
    textAlign: "left",
    fontWeight: "bold",
    letterSpacing: "0",
    lineHeight: "24px",
    paddingLeft: "1.8rem"
  },
  subTitle: {
    textTransform: "unset",
    padding: "5px 30px",
    marginTop:"12px"
  },
  subCardTitle: {
    padding: "5px 10px",
    backgroundColor: "#F7F2F2",
    display: "inline",
    position: "absolute",
    top: "-20px",
    minWidth: "350px",
    left: "-10px",
    borderRadius: "10px",
    color: "#2C92D5",
    textAlign: "left",
    textTransform: "unset",
    fontWeight: "bold",
    fontSize: "1rem",
  }
};

const useStyles = makeStyles(styles);

export function LawyerProfile(props: Props) {
  const classes = useStyles();
  const profile = find(props.findLawyer, { id: Number(props.match.params.id) });
  const skils = profile.userjson.dataGrid.map(item => `${item.product.name}, ${item.subProduct.name}`);
  const startDate = moment(profile.userjson.practisingFrom, 'YYYY-MM-DD');
  const todayDate = moment(new Date(), 'YYYY-MM-DD');
  let noOfYear = todayDate.diff(startDate, 'years');
  let experience;
  if (noOfYear === 0)
    experience = "Less Than 1";
  else
    experience = noOfYear;
  const titleText = (profile.userjson.gender === 'Male') ? 'Mr' : 'Ms';
  const handleConnectLawyer = () => {
    if (!props.userName) {
      props.findLawyerActions.updateLoginFromConnectAction();
      props.findLawyerActions.updateSelectLawyerAction(profile.id);
      props.history.push(`/login-page`);
      return;
    }
    else {
      props.history.push(`/connect-lawyer/${profile.id}`);
      props.findLawyerActions.updateSelectLawyerAction(profile.id);
      props.saveCaseInquiryAction.resetCaseInquiryAction();
    }

  }
  const handleBack = () => {
    props.history.push('/lawyer');
  }
  return (
    <div>
      <Header links={<HeaderLinks {...props} />} fixed color="primary" />
      <Box className="profile-container-first" component="div" display="block">
        <Typography variant="h5" gutterBottom align="center">
          {titleText}. {profile.userjson.fName}
        </Typography>
        <Box display="flex" component="div">
          <Typography variant="h5" gutterBottom align="left" onClick={handleBack} style={{ cursor: "pointer", width: "6%" }}>
            <ArrowBackIcon></ArrowBackIcon>Back
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            Expert In - {skils.join()}
          </Typography>
        </Box>
      </Box>
      <Box className="profile-container-second" component="div" display="block">
        <Paper variant="outlined" className={classes.card}>
          <Box className="profile-head-container">
            <div>
              <Avatar alt="Remy Sharp" src={profile?.profileKey ? profile.profileKey : face} className={classes.large} />
            </div>
            <div className="profile-name-text">
              <Typography className={classes.name} variant="h5" gutterBottom align="center">
                Advocate. {profile.userjson.fName}
              </Typography>
              <Typography className={classes.experience} variant="h5" gutterBottom align="center">
                Experience: {experience} years 
                 
              </Typography>
              <Typography className={classes.experience} variant="h5" gutterBottom align="center">
                
                 Languages Known: {profile.languageKnow}
              </Typography>
            </div>
          </Box>
          <Typography className={classes.subTitle} variant="subtitle1" gutterBottom>
            {titleText}. {profile.userjson.fName} is a leading lawyer in {profile.userjson.city.cityName}, who specializes in {skils.join()} areas with {experience} years of  experience.
          </Typography>
          <Typography className={classes.subTitle} variant="subtitle1" gutterBottom>

          </Typography>
          <Paper variant="outlined" className={classes.subCard}>
            <Typography className={classes.subCardTitle} variant="h6" gutterBottom align="center">
              Specialization
            </Typography>
            <Typography className={classes.subTitle} variant="subtitle1" gutterBottom >
              {skils.join()}
            </Typography>
          </Paper>
          <Paper variant="outlined" className={classes.subCard}>
            <Typography className={classes.subCardTitle} variant="h6" gutterBottom align="center">
              Practising Court (can appear)
            </Typography>
            <Typography className={classes.subTitle} variant="subtitle1" gutterBottom>
              {profile.practisingCourt}
            </Typography>
          </Paper>
          <Paper className="button-container">
            <Button variant="contained" onClick={handleConnectLawyer} style={{ backgroundColor: "#FFC602", color: "black" }}>
              Connect Lawyer
            </Button>
          </Paper>
        </Paper>
      </Box>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  userName: state.loginForm.userName,
  findLawyer: state.findLawyer.lawyerList,
  userInfo: state.loginForm.userInfo,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
  caseList: state.dashboard.caseList,
});

function mapDispatchToProps(dispatch: any) {
  return {
    findLawyerActions: bindActionCreators(FindLawyerActions as any, dispatch),
    loginActions: bindActionCreators(LoginActions as any, dispatch),
    saveCaseInquiryAction: bindActionCreators(SaveCaseInquiryAction as any, dispatch),
    CaseManagementActions: bindActionCreators(CaseManagementActions as any, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LawyerProfile);
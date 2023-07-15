import React, { Component, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { HeaderLinks } from "../../components/Header/HeaderLinks";

import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import isEqual from "lodash/isEqual";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reduxAction/rootReducer";
import face from "../../assets/img/faces/profile.jpg";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import ResponsiveDialog from "../../components/ClouserDialog/ClouserDialog";
import "./CaseManagementPage.scss";
import { DocumentUpload } from "./DocumentUpload/DocumentUpload";
import { ConnectedMatter } from "./ConnectedMatters/ConnectedMatters";
import { FindJudgement } from "./FindJudgement/FindJudgement";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import * as FindJudgementActions from "../../reduxAction/findJudgement/findJudgementActions";
import * as DashboardActions from "../../reduxAction/dashboard/dashboardActions";
import { RelatedJudgement } from "./RelatedJudgement/RelatedJudgement";
import { TimelineHearing } from "./Timeline/TimelineHearing";
import { CaseNotes } from "./CaseNotes/CaseNotes";
import { Notify } from "./Notify/Notify";
import { Tasks } from "./Tasks/Tasks";
import { Appointments } from "./Appointments/Appointments";
import { Invoice } from "./Invoice/Invoice";
import { CaseStatus } from "./CaseStatus/CaseStatus";
import { Theme } from "react-select";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Avatar, Backdrop, Box, Button, CircularProgress, FormControl, Grid, InputLabel, Paper, Select, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface Props extends RouteComponentProps<any> {
  userName: string | null;
  CaseManagementActions: typeof CaseManagementActions;
  loginActions: typeof LoginActions;
  snackbarsActions: typeof SnackbarsActions;
  isLoading: boolean;
  userInfo: any;
  caseManagement: any;
  commonActions: typeof CommonActions;
  common: any;
  finsJudgementActions: typeof FindJudgementActions;
  DashboardActions: typeof DashboardActions;
  findJudgement: any;
  findJudgementLoaded: boolean;
  isJudgementLoading: boolean;
  casehearingslist: any[];
  caseNotes: any[];
  findLawyerActions: typeof FindLawyerActions;
  findLawyer: any;
  findLawyerLoaded: boolean;
  notifications: any;
  remainders: any;
  appointments: any;  
  fromAppointments: any;
  status: any;
  judgementTextLoaded: boolean;
  findJudgementData: any;
  caseList: any,
  findJudgementId: any;
  judgmentUrl: any;
  downloadJudgementUrl: any;
  caseFiles:any;
  roleType:any;
 
}

const styles = (theme: Theme) => createStyles({
    large: {
      width: "100px",
      height: "100px",
      border: "1px solid rgba(0, 0, 0, 0.12)",
      zIndex: 10,
    },
    backdrop: {
      // zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    progressbar: {
      color: "#FFC602",
    },
  });

const useStyles = makeStyles(styles);

export function CaseManagement(props) {
  const classes = useStyles();
  const dueDate = moment().add(10, "d").toDate();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(dueDate);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isAddedCaseNo, setIsAddedCaseNo] = useState(false);
  const [caseStatus,setCaseStatus] = useState();
  const [status,setStatus] = useState();
  const [updatedCaseDetails, setUpdatedCaseDetails] = useState([]);
  const [showFillingDate, setShowFillingDate] = useState("");  
  const [showRegData, setShowRegDate] = useState("");


  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const isClient = (props.userInfo["status"] == "individual" || props.userInfo["status"] == "clientfirm" || props.roleType == "Client" || props.roleType == "Client Firm") ? true : false;
    const {
      selectedCaseInfo
    } = props.caseManagement;

    let role = selectedCaseInfo?.role == "companylawyer"? "companyLawyer": selectedCaseInfo?.role;
    const inputData = {
      id: selectedCaseInfo?.lawyerId,
      type:  role,
      roleId: selectedCaseInfo?.rolId,
      userId: selectedCaseInfo?.lawyerId,
    };
    
    props.DashboardActions.getCaseListAction(inputData);

    if (isClient) {
      setIsClient(true);
      setName(selectedCaseInfo.lawyerName);
      setGender(selectedCaseInfo.lawyerGender);
    } else {
      selectedCaseInfo.clientId == 0 ? setName(selectedCaseInfo.companyName) : setName(selectedCaseInfo.clientName);
      selectedCaseInfo.clientId == 0 ? setGender("") : setGender(selectedCaseInfo.clientGender);
    }    
    setCaseStatus(selectedCaseInfo.status);
    setTitle(selectedCaseInfo.title);
    setStatus(selectedCaseInfo.status);

  }, [props.caseManagement.selectedCaseInfo, props.caseManagement.updateCaseDetails]);

  useEffect(() => {
    setUpdatedCaseDetails( props?.caseFiles?.filter(caseDetails => caseDetails?.id == selectedCaseInfo?.id));
  }, [props.caseFiles]);

  useEffect(() => {
    if (updatedCaseDetails) {    
      if (updatedCaseDetails[0]?.caseType && updatedCaseDetails[0]?.court && updatedCaseDetails[0]?.caseNo &&
        updatedCaseDetails[0]?.filingDate && updatedCaseDetails[0]?.filingNo && updatedCaseDetails[0]?.registrationDate && updatedCaseDetails[0]?.CNRNo) {
          setShowFillingDate(moment(new Date(updatedCaseDetails[0]?.filingDate)).format('YYYY-MM-DD'));
          setShowRegDate(moment(new Date(updatedCaseDetails[0]?.registrationDate)).format("YYYY-MM-DD"));
          setIsAddedCaseNo(true);
      } else {
        setIsAddedCaseNo(false);
      }
    }

  }, [updatedCaseDetails]);
  
  const [value, setValue] = React.useState("Case Status");
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);

  };
  const handleDateChange = (date: Date | null) => { setSelectedDate(date); };

  const [openEditForm, setOpenEditForm] = useState(false);
  const [caseType, setCaseType] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [filingDate, setFilingDate] = useState(new Date());
  const [filingNo, setFilingNo] = useState("");
  const [regDate, setRegDate] = useState(new Date());
  const [CNRNo, setCNRNo] = useState("");
  const [isValidCaseType, setIsValidCaseType] = useState(true);
  const [isValidCaseNo, setIsValidCaseNo] = useState(true);
  const [isValidCourt, setIsValidCourt] = useState(true);
  const [isValidFilingDate, setIsValidFilingDate] = useState(true);
  const [isValidRegDate, setIsValidRegDate] = useState(true);
  const [isValidFilingNo, setIsValidFilingNo] = useState(true);
  const [isValidCNRNo, setIsValidCNRNo] = useState(true);


  const handleSuccessStageClose = () => {
    if (!caseType) setIsValidCaseType(false);
    if (!caseNo) setIsValidCaseNo(false);
    if (!selectedCourt) setIsValidCourt(false);
    if (!filingDate) setIsValidFilingDate(false);
    if (!regDate) setIsValidRegDate(false);
    if (!filingNo) setIsValidFilingNo(false);
    if (!CNRNo) setIsValidCNRNo(false);
    if (caseType && caseNo && selectedCourt && filingNo && CNRNo && regDate && filingDate) {
      const { selectedCaseInfo } = props.caseManagement;
      const caseId = selectedCaseInfo.id;

      const data = {
        caseId,
        param: {
          caseType,
          court: selectedCourt,
          caseNo,
          filingDate,
          filingNo,
          registrationDate: regDate,
          CNRNo,
        },
      };

      props.CaseManagementActions.updateCaseDetails(data);
      setIsAddedCaseNo(true);
      setOpenEditForm(false);
      clearStorage();

      let role = selectedCaseInfo?.role == "companylawyer"? "companyLawyer": selectedCaseInfo?.role;
      const inputData = {
        id: selectedCaseInfo?.lawyerId,
        type:  role,
        roleId: selectedCaseInfo?.rolId,
        userId: selectedCaseInfo?.lawyerId,
      };
      props.DashboardActions.getCaseListAction(inputData);
    }

  };
  const handleCancelStageClose = () => {
    setOpenEditForm(false);
    clearStorage();
  };
  const handleCloseDialog = () => {
    setOpenEditForm(false);
    clearStorage();
  };
  const clearStorage = () => {
    setCaseType("");
    setCaseNo("");
    setSelectedCourt("");
    setFilingDate(new Date());
    setFilingNo("");
    setRegDate(new Date());
    setCNRNo("");
  };
  const handleEdit = () => {
    props.commonActions.getCaseType();
    props.commonActions.getCourts();
    setOpenEditForm(true);
  };
  const handleCaseTypeChange = (event) => {
    setCaseType(event.target.value);
    setIsValidCaseType(true);
  };
  const handleCaseNoChange = (event) => {
    setCaseNo(event.target.value);
    setIsValidCaseNo(true);
  };
  const handleCourtChange = (event) => {
    setSelectedCourt(event.target.value);
    setIsValidCourt(true);
  };
  const handleSaveDateChange = (date) => {
    setFilingDate(date);
    setIsValidFilingDate(true);
  };
  const handleFilingNoChange = (event) => {
    setFilingNo(event.target.value);
    setIsValidFilingNo(true);
  };
  const handleRegDateChange = (date) => {
    setRegDate(date);
    setIsValidRegDate(true);
  };
  const handleCNRNoChange = (event) => {
    setCNRNo(event.target.value);
    setIsValidCNRNo(true);
  };
  
  const handleRefresh = () => {
      let query = {
        id: props.userInfo.id,
        type: props.userInfo.status,
      };
      props.loginActions.getAllAppointments(query);
      props.loginActions.getAllFromAppointments(query);

  }

  const { isLoading, isJudgementLoading } = props;
  const loading = isLoading || isJudgementLoading;
  const {
    selectedCaseInfo,
    casehearingslist
  } = props.caseManagement;
  let mobile, email;

  if (props.status == "lawyer" || props.status == "lawfirm" || props.roleType === "Lawyer"
  ) {
    mobile = casehearingslist?.clientdetails?.mobileno ? casehearingslist?.clientdetails?.mobileno : casehearingslist?.clientdetails?.companymobileno;
    email = casehearingslist?.clientdetails?.email;

  }
  if (props.status == "individual" || props.status == "clientfirm"
    || props.status == "companylawyer"
    || props.roleType === "Client" || props.roleType === "Client Firm") {
    mobile = props.caseManagement?.casehearingslist?.lawyerdetails?.mobileno;
    email = props.caseManagement?.casehearingslist?.lawyerdetails?.email;
  }



  return (
    <div>
      <Header links={<HeaderLinks  {...props} />} fixed color="primary" />
      <Box className="casemanagement-container-first" component="div" display="block" overflow="scroll !important" >
        <Typography variant="h5" gutterBottom align="center">
          Case Management
        </Typography>
        <Box display="flex" component="div" className="cm-second">
          <Typography variant="h5" gutterBottom align="left" onClick={props.handleBack}>
            <ArrowBackIcon></ArrowBackIcon>Back
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            LAWE - An Integrated Legal Management Ecosystem
          </Typography>
        </Box>
      </Box>
      <Box
        className="casemanagement-container-second"
        component="div"
        display="block"
      >
        <Paper variant="outlined" className="casemanagement-card-container">
          <Paper className="user-info-container">
            <Paper className="name-title-container">
              <Avatar alt="Remy Sharp" src={face} className={classes.large} />
              <div className="content-container">
                <Typography
                  className="name"
                  variant="h5"
                  gutterBottom
                  align="left"
                >
                  {title}
                </Typography>

                <Typography
                  className="experience"
                  variant="subtitle1"
                  gutterBottom
                  align="left"
                >
                  <PersonIcon /> <span className="title">{name}. {gender}</span>
                </Typography>
                <Typography
                  className="experience"
                  variant="subtitle1"
                  gutterBottom
                  align="left"
                >
                  <PhoneIcon /><span className="title">{mobile}</span>
                </Typography>
                <Typography
                  className="experience"
                  variant="subtitle1"
                  gutterBottom
                  align="left"
                >
                  <EmailIcon /><span className="title">{email}</span>
                </Typography>
              </div>
              {
                isAddedCaseNo && (
                  <div className="content-container">
                    <Typography
                      className="experience"
                      variant="subtitle1"
                      gutterBottom
                      align="left"
                    >
                      <b>Case Type</b>: {updatedCaseDetails?.[0]?.caseType}
                    </Typography>
                    <Typography
                      className="experience"
                      variant="subtitle1"
                      gutterBottom
                      align="left"
                    >
                      <b>Court</b>: {updatedCaseDetails?.[0]?.court}
                    </Typography>
                    <Typography
                      className="experience"
                      variant="subtitle1"
                      gutterBottom
                      align="left"
                    >
                      <b>CaseNo</b>: {updatedCaseDetails?.[0]?.caseNo}
                    </Typography>
                    <Typography
                      className="experience"
                      variant="subtitle1"
                      gutterBottom
                      align="left"
                    >
                      <b>Filing No</b>: {updatedCaseDetails?.[0]?.filingNo}
                    </Typography>
                  </div>
                )}

              {isAddedCaseNo && (
                <div className="content-container">
                  <Typography
                    className="experience"
                    variant="subtitle1"
                    gutterBottom
                    align="left"
                  >
                    {/* <b>Filing Date</b>: {moment(new Date(updatedCaseDetails[0]?.filingDate)).format('YYYY-MM-DD')} */}
                    <b>Filing Date</b>: {showFillingDate}                    
                  </Typography>
                  <Typography
                    className="experience"
                    variant="subtitle1"
                    gutterBottom
                    align="left"
                  >
                    {/* <b>Registration Date</b>: {moment(new Date(updatedCaseDetails[0]?.registrationDate)).format("YYYY-MM-DD")} */}
                    <b>Registration Date</b>: {showRegData}
                  </Typography>
                  <Typography
                    className="experience"
                    variant="subtitle1"
                    gutterBottom
                    align="left"
                  >
                    <b>CNR No</b>: {updatedCaseDetails?.[0]?.CNRNo}
                  </Typography>
                </div>
              )}
              {status!="reassign_pending" && (!isClient && !isAddedCaseNo)&& (<div>
                <Button onClick={handleEdit} className="btn-profile">
                  Add Case No
                </Button>
              </div>
              )}
            </Paper>
          </Paper>

          <Paper className="tab-container" style={{overflowX :'scroll'}}>
            <Tabs value={value} onChange={handleTabChange}  variant="scrollable" scrollButtons="on" >
              <Tab label="Case Status" className="tab-child" value="Case Status" />
              <Tab label="Timeline" className="tab-child" value="Timeline" />
              <Tab label="Connected Matters" className="tab-child" value="Connected Matters" />
              <Tab label="Documents" className="tab-child" value="Documents" />
              {(!isClient && status!="reassign_pending") &&<Tab label="Notes" className="tab-child" value="Notes" />}
              {((!isClient && status!="reassign_pending") || isClient) && <Tab label="Notify" className="tab-child" value="Notify" />}
              <Tab label="Related Judgements" className="tab-child" value="Related Judgements" />
              {((!isClient && status!="reassign_pending") || isClient) && <Tab label="Tasks" className="tab-child" value="Tasks" />}
              {((!isClient && status!="reassign_pending") || isClient) && <Tab label="Appointments" className="tab-child" value="Appointments" />}
              {((!isClient && status!="reassign_pending") || isClient) && <Tab label="Invoice" className="tab-child" value="Invoice" />}
              {!isClient && (<Tab label="Find Judgements" className="tab-child" value="Find Judgements"/>)}
            </Tabs>
          </Paper>
          {value === "Case Status" && (
            <CaseStatus
              caseManagement={props.caseManagement}
              CaseManagementActions={props.CaseManagementActions}
              userInfo={props.userInfo}
              findLawyerActions={props.findLawyerActions}
              findLawyer={props.findLawyer}
              {...props}
            />
          )}
          {value === "Timeline" && (
            <TimelineHearing
              data={{
                casehearingslist: props.casehearingslist,
                caseManagement: props.caseManagement,
                CaseManagementActions: props.CaseManagementActions,
              }}
            />
          )}
          {value === "Notes" && (
            <CaseNotes
              data={{
                caseNotes: props.caseNotes,
                caseManagement: props.caseManagement,
                CaseManagementActions: props.CaseManagementActions,
                userInfo: props.userInfo
              }}
            />
          )}
          {value === "Notify" && (
            <Notify
              data={{
                notify: props.casehearingslist,
                caseManagement: props.caseManagement,
                CaseManagementActions: props.CaseManagementActions,
                userInfo: props.userInfo,
              }}
            />
          )}
          {value === "Tasks" && (
            <Tasks
              data={{
                tasks: props.casehearingslist,
                caseManagement: props.caseManagement,
                CaseManagementActions: props.CaseManagementActions,
                userInfo: props.userInfo
              }}
            />
          )}
          {value === "Appointments" && (
            <Appointments
              data={{
                appointments: props.casehearingslist,
                caseManagement: props.caseManagement,
                CaseManagementActions: props.CaseManagementActions,
                userInfo: props.userInfo,
                getAppointments: props.appointments,
                fromAppointments: props.fromAppointments,
                loginActions: props.loginActions,
                refresh: handleRefresh,
              }}
            />
          )}
          {value === "Connected Matters" && (
            <ConnectedMatter
              common={props.common}
              commonActions={props.commonActions}
              CaseManagementActions={props.CaseManagementActions}
              caseManagement={props.caseManagement}
              userInfo={props.userInfo}
              handleShowSuccess={props.handleShowSuccess}
            ></ConnectedMatter>
          )}
          {value === "Documents" && (
            <DocumentUpload
              CaseManagementActions={props.CaseManagementActions}
              caseManagement={props.caseManagement}
              userInfo={props.userInfo}
              userName={props.userName}
              snackbarsActions={props.snackbarsActions}
              setFileType={props.setFileType}
            ></DocumentUpload>
          )}
          {value === "Related Judgements" && (
            <RelatedJudgement
              CaseManagementActions={props.CaseManagementActions}
              caseManagement={props.caseManagement}
              userInfo={props.userInfo}
              finsJudgementActions={props.finsJudgementActions}
              judgmentUrl={props.judgmentUrl}              
              downloadJudgementUrl={props.downloadJudgementUrl}  
            />
          )}
          {value == "Find Judgements" && (
            <FindJudgement
              finsJudgementActions={props.finsJudgementActions}
              findJudgementLoaded={props.findJudgementLoaded}
              findJudgement={props.findJudgement}
              isJudgementLoading={props.isJudgementLoading}
              judgementTextLoaded={props.judgementTextLoaded}
              findJudgementData={props.findJudgementData}
              findJudgementId={props.findJudgementId}
              judgmentUrl={props.judgmentUrl}
              downloadJudgementUrl={props.downloadJudgementUrl}              
            />

          )}
          {value === "Invoice" && <Invoice
            CaseManagementActions={props.CaseManagementActions}
            caseManagement={props.caseManagement}
            userInfo={props.userInfo}>
          </Invoice>}
        </Paper>

        {/* {props.caseNotes.length === 0 &&
                    <Box className="no-result-fount" alignItems="center" display="flex">
                        <Box>
                            <FindReplaceSharpIcon />
                        </Box>
                        <Box>
                            <Typography gutterBottom variant="h5" component="h2">
                                No results found
                            </Typography>
                        </Box>
                    </Box>
                } */}
      </Box>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress className={classes.progressbar} size={100} />
      </Backdrop>
      <Footer />
      <ResponsiveDialog
        title="Update Case Details"
        content={""}
        okText="Save"
        cancelText="Cancel"
        isOpen={openEditForm}
        handleClose={handleCloseDialog}
        handleOk={handleSuccessStageClose}
        handleCancel={handleCancelStageClose}
        formContent={
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl variant="outlined">
                <InputLabel id="case-type-select-label" error={!isValidCaseType} >Case Type* </InputLabel>
                <Select
                  native
                  labelId="case-type-select-label"
                  id="case-type-select-outlined"
                  value={caseType}
                  onChange={handleCaseTypeChange}
                  label="Case Type*"
                  placeholder="Case Type*"
                  error={!isValidCaseType}
                >
                  <option aria-label="None" value="" />
                  {props.common?.caseTypes?.map((type) => {
                    return (
                      <option
                        value={`${type.code}-${type.abbreviation}`}
                      >{`${type.code}(${type.abbreviation})`}</option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                onChange={handleFilingNoChange}
                label="Filing No*"
                placeholder="Filing No*"
                variant="outlined"
                value={filingNo}
                className="textfield"
                error={!isValidFilingNo}
              />
            </Grid>
            <Grid item xs={6}>
              <Box className="input-field picker-container">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd-MM-yyyy"
                    margin="normal"
                    label="Filing Date*"
                    value={filingDate}
                    onChange={handleSaveDateChange}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="input-field picker-container">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd-MM-yyyy"
                    margin="normal"
                    label="Registration Date*"
                    value={regDate}
                    onChange={handleRegDateChange}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>                  <KeyboardDatePicker                    disableToolbar                    variant="inline"                    format="MM/dd/yyyy"                    margin="normal"                    id="date-picker-inline"                    label="Filing Date"                    value={date}                    onChange={handleSaveDateChange}                    KeyboardButtonProps={{                      'aria-label': 'change date',                    }}                    minDate={new Date()}                    autoOk={true}                  />                </MuiPickersUtilsProvider> */}
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                onChange={handleCaseNoChange}
                label="Case Number*"
                placeholder="Case Number*"
                variant="outlined"
                value={caseNo}
                className="textfield"
                error={!isValidCaseNo}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                onChange={handleCNRNoChange}
                label="CNR No*"
                placeholder="CNR No*"
                variant="outlined"
                value={CNRNo}
                className="textfield"
                error={!isValidCNRNo}
              />
            </Grid>
            <Grid item xs={6}>

              <FormControl variant="outlined">

                <InputLabel id="court-select-label" error={!isValidCourt}> Court* </InputLabel>
                <Select
                  native
                  labelId="court-select-label"
                  id="court-select-outlined"
                  onChange={handleCourtChange}
                  label="Courts*"
                  value={selectedCourt}
                  placeholder="Courts*"
                  error={!isValidCourt}
                >

                  <option aria-label="None" value="" />
                  {props.common?.courts?.map((court) => {
                    return (
                      <option value={court.courtName}>{court.courtName}</option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        }
      />
    </div>
  );
}

export class CaseManagementPage extends Component<Props> {

  state = {
    fileType: "",
  };

  componentDidMount() {
    const {
      CaseManagementActions,
      caseManagement: { selectedCaseInfo },
    } = this.props;
    const getCaseInfoData = {
      caseId: selectedCaseInfo.caseId,
      lawyerId: selectedCaseInfo.lawyerId,
      clientId: selectedCaseInfo.clientId
      // lawyerId: 654
    };
    const getCaseInfoDataHearing = {
      caseId: selectedCaseInfo.caseId,
      userId: this.props.userInfo.id,
      type: this.props.userInfo.status,
    };
    CaseManagementActions.getCaseNotes(getCaseInfoData);
    CaseManagementActions.getCaseStage(getCaseInfoData);
    CaseManagementActions.getHearingsByCaseId(getCaseInfoDataHearing)
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(
        prevProps.caseManagement.caesFile,
        this.props.caseManagement.caesFile
      )
    ) {
      const {
        caseManagement: { caesFile: { link } = { link: undefined } },
      } = this.props;
      if (link && this.state.fileType == "view") window.open(link, "_blank");
      else if (link && this.state.fileType == "download") { this.downloadURI(link) };
    }
    if (this.props.caseManagement.error) {
      this.props.snackbarsActions.showErrorSnackbarAction(this.props.caseManagement.error);
      this.props.CaseManagementActions.clearError({});
    }
    if (this.props.caseManagement.success) {
      this.props.snackbarsActions.showSuccessSnackbarAction(this.props.caseManagement.success);
      this.props.CaseManagementActions.clearSuccess({});
    }
    if (!isEqual(prevProps.judgementUrl, this.props.judgmentUrl)) {
      const { judgmentUrl } = this.props;
      if (judgmentUrl) {
        // this.props.history.push(`/judgment/pdf`);
        
      }
    }
    
  }
  downloadURI = (uri) => {
    let link = document.createElement('iframe');
    link.src = uri;
    document.body.appendChild(link);
    link.click();
  }
  handleShowSuccess = (msg) => {
    this.props.snackbarsActions.showSuccessSnackbarAction(msg);
    this.props.CaseManagementActions.clearSuccess({});
  }
  handleBack = (event) => {
    
    if (this.props.status === "platformadmin")
      this.props.history.push(`/platform-admin-dashboard`);
    else
      this.props.history.push(`/dashboard`);
  }
  setFileType = (name: string) => {
    this.setState({ fileType: name });
  }
  render() {
    const {
      userName,
      status,
      CaseManagementActions,
      isLoading,
      userInfo,
      caseManagement,
      casehearingslist,
      loginActions,
      snackbarsActions,
      caseNotes,
      common,
      commonActions, finsJudgementActions,DashboardActions,
      isJudgementLoading, findJudgement, notifications,
      remainders, appointments, fromAppointments, findJudgementLoaded, findLawyerActions,
      findLawyer, findJudgementData, judgementTextLoaded, caseList, findJudgementId, judgmentUrl,
      roleType, downloadJudgementUrl, caseFiles,

    } = this.props;
    return (
      <React.Fragment>
        <CaseManagement
          status={status}
          userName={userName}
          CaseManagementActions={CaseManagementActions}
          isLoading={isLoading}
          userInfo={userInfo}
          caseManagement={caseManagement}
          casehearingslist={casehearingslist}
          snackbarsActions={snackbarsActions}
          loginActions={loginActions}
          caseNotes={caseNotes}
          common={common}
          commonActions={commonActions}
          finsJudgementActions={finsJudgementActions} findJudgementLoaded={findJudgementLoaded}
          DashboardActions={DashboardActions}
          findJudgement={findJudgement} isJudgementLoading={isJudgementLoading}
          findLawyerActions={findLawyerActions} findLawyer={findLawyer}
          notifications={notifications} remainders={remainders} appointments={appointments}          
          fromAppointments= {fromAppointments}
          handleBack={this.handleBack}
          handleShowSuccess={this.handleShowSuccess}
          setFileType={this.setFileType}
          findJudgementData={findJudgementData}
          judgementTextLoaded={judgementTextLoaded}
          caseList={caseList}
          judgmentUrl={judgmentUrl}
          downloadJudgementUrl={downloadJudgementUrl}
          caseFiles={caseFiles}
          roleType={roleType}
        />
      </React.Fragment>
    );

  }
}

const mapStateToProps = (state: any) => ({
  userName: state.loginForm.userName,
  status: state.loginForm.status,
  userInfo: state.loginForm.userInfo,
  isLoading: state.caseManagement.loading,
  caseManagement: state.caseManagement,
  casehearingslist: state.caseManagement.casehearingslist,
  caseNotes: state.caseManagement.caseNotes,
  common: state.commonReducer,
  findJudgementLoaded: state.findJudgement.loaded,
  findJudgement: state.findJudgement.judgementList,
  findJudgementData: state.findJudgement.judgementDataList,
  isJudgementLoading: state.findJudgement.loading,
  findLawyer: state.findLawyer.lawyerList,
  findLawyerLoaded: state.findLawyer.loaded,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
  fromAppointments: state.loginForm.fromAppointments,
  judgementTextLoaded: state.findJudgement.textLoaded,
  caseList: state.dashboard.caseList,
  findJudgementId: state.findJudgement.judgementList,
  judgmentUrl: state.findJudgement.judgementUrl,
  downloadJudgementUrl: state.findJudgement.downloadJudgementUrl,
  caseFiles: state.caseManagement.caseFiles,
  roleType: state.dashboard.roleType,
});

function mapDispatchToProps(dispatch: any) {
  return {
    CaseManagementActions: bindActionCreators(CaseManagementActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
    loginActions: bindActionCreators(LoginActions as any, dispatch),
    commonActions: bindActionCreators(CommonActions as any, dispatch),
    finsJudgementActions: bindActionCreators(FindJudgementActions as any, dispatch),
    DashboardActions: bindActionCreators(DashboardActions as any, dispatch),
    findLawyerActions: bindActionCreators(FindLawyerActions as any, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseManagementPage);

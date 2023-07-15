import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { RouteComponentProps } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import RefreshIcon from '@material-ui/icons/Refresh';
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import './HeaderLinks.scss';
import { Avatar, Badge, Box, Card, CardContent, createStyles, ListItemAvatar, makeStyles, Paper, Tab, Tabs, Theme } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import face from "../../assets/img/faces/avatar.png";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import SettingsIcon from '@material-ui/icons/Settings';
import moment from "moment";
import Menu from '@mui/material//Menu';
import MenuItem from '@mui/material//MenuItem';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import { filter, forOwn, isEmpty } from "lodash";
import { STAGES } from "../../assets/constant/stage";
import { FormControl, Grid, InputLabel, Select, Slide, TextareaAutosize, TextField, } from "@material-ui/core";
import ResponsiveDialog from "../../components/ClouserDialog/ClouserDialog";

interface Props extends RouteComponentProps<any> {
  userName: string | null;
  notifications: any[];
  remainders: any[];
  appointments: any[];
  caseList: any;
  loginActions: typeof LoginActions;
  userInfo: any;
  CaseManagementActions: typeof CaseManagementActions;
  handleCaseNavigation: any;
  getAllNotifications: any[];
  notificationReadCount: number;
  status: any;
  caseManagement: any;
  judgmentAddNotes: any;
  stage: any;
  updateIsOpen: any;
  snackbarsActions: typeof SnackbarsActions;
}
const useStyles = makeStyles((theme) => ({

  appBar: {
    position: 'relative',
  },
  large: {
    width: "75px",
    height: "75px",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progressbar: {
    color: '#FFC602'
  },
  detailBtn: {
    opacity: "0.6",
    borderRadius: "8px",
    backgroundColor: "#FFC602",
    textTransform: "unset",
    width: "130px",
    minHeight: "40px",
    marginLeft: "1rem",
    "&:hover": {
      color: "#000",
      backgroundColor: "#FFC602",
    },
    "span": {
      color: "#000",
      letterSpacing: "0",
      lineHeight: "24px",
    },
  },
  formSelect: {
    width: "100%",
  },
  alert: {
    color: '#CA0B00'
  },
  buttonAttribute: {
    color: "#fff",
    backgroundColor: "#000",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#000",
      cursor: "text"
    }
  },
  dashboardButton: {
    padding: "10px",
    marginRight: "20px",
  },
  noInputDataError: {
    color: "red",
    padding: "0rem, 0.5rem, 0.5rem, 0.5rem",
    minHeight: "5px",
    justifyContent: "center",
    fontSize: "1rem",
    "& small": {
        color: "red",
    }
  },

}));

export enum AppointmentStatus {
  
  REQUESTED = "Requested",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
}

export const _HeaderLinks = (props: any) => {
  const userName = (props.userName) ? props.userName : '';
  const judgmentAddNotes = (props.judgmentAddNotes === "true") ? props.judgmentAddNotes : null;
  const isSignUpPage = props.location.pathname === '/signup-page';
  const [value, setValue] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [notiCount, setNotiCount] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openAddNote, setOpenAddNote] = React.useState(false);
  const settingsOpen = Boolean(anchorEl);
  const [isValidCombination, setIsValidCombination] = useState(true);
  const [element, setElement] = useState([]);
  const [phases, setPhases] = useState([]);
  let [count, setCount] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidNotes, setIsValidNotes] = useState(true);
  const [isValidCaseList, setIsValidCaseList] = useState(true);
  const [isValidPhase, setIsValidPhase] = useState(true);
  const [selectedCases, setSelectedCases] = useState([]);
  const [addClick, setAddClick] = useState(false);
  const classes = useStyles();
  const [valuetabchange, setTab] = React.useState(0);
  const [descriptionError, setDescriptionError] = useState("");

  const resetInputs = () => {
    setIsValidTitle(true);
    setDescriptionError("");
    setIsValidCaseList(true)
    setIsValidPhase(true);
    setElement([]);
  }
  const handleNoteClose = () => {    
    resetInputs();
    setOpenAddNote(false);
  };

  const handleNoteSave = async () => {
    let validForm = true;
    let inputParams = [];
    let caseId, phaseName;
    var title:any= document.getElementById("titlenotes");
    var note:any= document.getElementById("notesValue");
    let m = moment(new Date());
    let date = m.utc().format();
    if (title.value === '') {
      validForm = false;
      setIsValidTitle(false)
    }
    if (note?.value == "") {
      setDescriptionError("Fill some Notes");
      validForm = false
    }
    if (!addClick) {
      let e:any = document.getElementById(`caseId-0`)
      caseId = e ? e.options?.[e?.selectedIndex]?.value : 0;
      //phasename
      let e1 :any = document.getElementById(`phaseName-0`)
      phaseName = e1 ? e1.options?.[e1?.selectedIndex]?.value : '';
      if (caseId == 0) {
        validForm = false;
        setIsValidCaseList(false)
      }
      if (phaseName == '') {
        validForm = false;
        setIsValidPhase(false);
      }
      if (validForm) {
        const selectedCaseInfo = filter(props.caseList.cases, { caseId: Number(caseId) })
        let data = {
          title: title.value,
          phaseName: phaseName,
          notes: note.value,
          created: date,
          caseId: caseId,
          clientName: selectedCaseInfo[0]?.clientName,
          companyName: selectedCaseInfo[0]?.companyName,
          lawyerId: selectedCaseInfo[0]?.lawyerId,
          lawyerName: selectedCaseInfo[0]?.lawyerName,
          clientId: selectedCaseInfo[0]?.clientId,
          companyId: selectedCaseInfo[0]?.companyId
        };
        
        await props.CaseManagementActions.saveCaseNotes(data);
        setOpenAddNote(false);       
      }

    }
    else {
      const caseNote = [];
      if (validForm === true) {

        for (let i = 0; i <= count; i++) {

          let e :any = document.getElementById(`caseId-${i}`)
          caseId = e ? e.options?.[e?.selectedIndex]?.value : 0;
          //phasename
          let e1 :any = document.getElementById(`phaseName-${i}`)
          phaseName = e1 ? e1.options?.[e1?.selectedIndex]?.value : '';

          if (caseId == 0) {
            validForm = false;
            setIsValidCaseList(false)
          }

          if (phaseName == '') {
            validForm = false;
            setIsValidPhase(false)
          }

          if (validForm === true) {
            let info = {
              caseId: caseId,
              phaseName: phaseName
            };
            caseNote.push(info)
          }
        }

        caseNote.forEach(item => {
        // caseNote?.forEach(item => {
          const selectedCaseInfo = filter(props.caseList.cases, { caseId: Number(item["caseId"])});

          if (selectedCaseInfo.length > 0) {
            let data = {
              title: title.value,
              phaseName: item["phaseName"],
              notes: note.value,
              created: date,
              caseId: item["caseId"],
              clientName: selectedCaseInfo[0]?.clientName,
              companyName: selectedCaseInfo[0]?.companyName,
              lawyerId: selectedCaseInfo[0]?.lawyerId,
              lawyerName: selectedCaseInfo[0]?.lawyerName,
              clientId: selectedCaseInfo[0]?.clientId,
              companyId: selectedCaseInfo[0]?.companyId
            };
            inputParams.push(data);
          }
        });
        
        await props.CaseManagementActions.saveCaseNotes(inputParams);        
        setOpenAddNote(false);
        resetInputs();
      }
    }

  }

  useEffect(() => {
    if (props?.caseManagement?.error) {
      props.snackbarsActions.showErrorSnackbarAction(props.caseManagement.error);
      props.loginActions.clearError({});
    }
  }, [props?.caseManagement?.error]);
  useEffect(() => {
    if (props?.caseManagement?.success) {
      props.snackbarsActions.showSuccessSnackbarAction(props.caseManagement.success);
      props.loginActions.clearError({});
    }
  }, [props?.caseManagement?.success]);

  useEffect(() => {
    if (props?.stage?.length > 0) {
      const list = [];
      forOwn(props.stage[0], (value, key) => {
        if (key.includes("phasePayment_")) {
          if (Number(value) > 0) {
            const value = STAGES[Number(key.slice(-1)) - 1];
            list.push(value);
          }
        }
      });
      setPhases(list);
    }
  }, [props?.stage]);
  const handleCaseChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    
    if (event.target.value) {
      let data;
      props?.caseList?.cases.map(cases => {
        if (cases.caseId === Number(event.target.value)) {
          data = cases;
        }
      });
      setIsValidCaseList(true);
      setIsValid(true);
      setIsValidCombination(true);

      const getCaseInfoData = {
        caseId: event.target.value,
        lawyerId: props.userInfo.id,
        clientId: data.clientId
      };
      await props.CaseManagementActions.getCaseStage(getCaseInfoData);
    } else {
      setIsValidCaseList(false);
    } 
    
  }
  const handlePhaseChange = (event) => {
    if (event.target.value) {
      setIsValidPhase(true);
      setIsValid(true);
      setIsValidCombination(true);
    } else {
      setIsValidPhase(false);
    }
    
  }

  const handleAddCase = () => {
    setAddClick(true)
    let e :any = document.getElementById(`caseId-${count}`)
    let caseId = e ? e.options?.[e?.selectedIndex]?.value : 0;
    //phasename
    let e1 :any = document.getElementById(`phaseName-${count}`)
    let phaseName = e1 ? e1.options?.[e1?.selectedIndex]?.value : '';

    if (caseId != 0 || phaseName != '') {
      const newPair = { caseId, phaseName };
      setIsValid(true);
      const found = selectedCases.some(item => (item["caseId"] == newPair["caseId"] && item["phaseName"] == newPair["phaseName"]));

      if (!found) {
        setSelectedCases([...selectedCases, { caseId, phaseName }]);
        setIsValidCombination(true);

        let currentCount = count + 1;
        let arr = (
          <React.Fragment>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formSelect}>
                <InputLabel id={`case-select-label${currentCount}`} >Case * </InputLabel>
                <Select
                  native
                  labelId={`case-select-label${currentCount}`}
                  id={`caseId-${currentCount}`}
                  onChange={handleCaseChange}
                  label="Case*"
                  placeholder="Case*"
                  error={!isValidCaseList}
                >
                  <option aria-label="None" value="" />
                  {props.caseList?.cases?.map((type) => {
                    {
                      if (type.status === "accepted") {
                        return (
                          <option value={type.caseId}>{type.title}</option>
                        );
                      }
                    }
                  }
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formSelect}>
                <InputLabel id={`case-phase-select-label${currentCount}`}  >Phase * </InputLabel>
                <Select
                  native
                  labelId={`case-phase-select-label${currentCount}`}
                  id={`phaseName-${currentCount}`}
                  label="Phase*"
                  placeholder="Phase*"
                  error={!isValidPhase}
                  onChange={
                    handlePhaseChange
                  }
                >
                  <option aria-label="None" value="" />
                  {phases?.map((type) => {
                    return (
                      <option
                        value={type}
                      >{type}</option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        );
        setCount(currentCount);
        setElement([...element, arr]);

      } else {
        setIsValidCombination(false);
      }
    } else {
      setIsValid(false);
    }
  }
  const handleLogout = () => {
    props.loginActions.logoutUserAction();
    props.loginActions.updateSelectLawyerAction([]);
    props.history.push('/');
  }
  const handleAddNotes = () => {
    setOpenAddNote(true);
  }
  const handleSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleSettingsChangePassword = () => {
    props.history.push('/change-password');
  }
  const handleSettingsProfile = () => {
    props.history.push('/profile');
  }

  const handleDownloads= () => {
    window.open ("https://www.lawe.co.in/lawe-downloads.html", "_blank");
  }

  const handleOnlineDisputeResolution= () => {
    window.open ("https://cnica.org", "_blank");
  }

  const handleSettingsClose = () => {
    setAnchorEl(null);
  }
  const handleDashboard = () => {
    
    if (props?.userInfo?.status === "platformadmin")
      props.history.push('/platform-admin-dashboard');
else
      props.history.push('/dashboard');
   }

  useEffect(() => {
    if (userName !== '') {
      let query = {
        id: props.userInfo.id,
        type: props.userInfo.status,
      };
      props.loginActions.getAllNotifications(query);
      props.loginActions.getAllRemainders(query);
      props.loginActions.getAllAppointments(query);
      props.loginActions.getAllFromAppointments(query);
    }
  }, []);
  useEffect(() => {
    if (props.notifications) {
      setNotiCount(props.notifications.notificationReadCount)
    }

  }, [props.notifications]);


  const handleNotifications = () => {
    setValue(true)
    setOpen(true)
    if (userName !== '') {
      let query = {
        id: props.userInfo.id,
        type: props.userInfo.status,
      };
      props.loginActions.getAllNotifications(query);
      props.loginActions.getAllRemainders(query);
      // props.loginActions.getAllAppointments(query);      
      // props.loginActions.getAllFromAppointments(query);
    }

  }
  const handleRefresh = () => {
    if (userName !== '') {
      let query = {
        id: props.userInfo.id,
        type: props.userInfo.status,
      };
      props.loginActions.getAllNotifications(query);
      props.loginActions.getAllRemainders(query);
      // props.loginActions.getAllAppointments(query);      
      // props.loginActions.getAllFromAppointments(query);
    }

  }

  const handleAccept = async (event, id, toId, toName, type, caseId, appointmentDate) => {

    let m = moment(new Date());
    let date = m.utc().format();
    let data = {
      id: id,
      appointmentStatus: "Accepted"
    };

    let remainder = [];
    let data1 = {
      notification: `Appointment with ${props.userInfo.userName} is CONFIRMED `,
      created: date,
      caseId: caseId,
      fromId: props.userInfo.id,
      fromName: props.userInfo.userName,
      toId: toId,
      toName: toName,
      type: "",
      status: "message",
      notificationStatus: 0,
      readByUser: "No"
    };

    let remainderdata = {
      taskName: `Appointment with ${props.userInfo.userName} is scheduled TODAY`,
      created: date,
      deadlineDate: appointmentDate,
      caseId: caseId,
      userId: toId,
      userName: toName,
      remainderDate: appointmentDate,
      type: "",
    };

    let remainderdata1 = {
      taskName: `Appointment with ${toName} is scheduled TODAY`,
      created: date,
      deadlineDate: appointmentDate,
      caseId: caseId,
      userId: props.userInfo.id,
      userName: props.userInfo.userName,
      remainderDate: appointmentDate,
      type: props.userInfo.status,
    };
    remainder.push(remainderdata);
    remainder.push(remainderdata1);

    await props.CaseManagementActions.updateAppointment(data)
    props.appointments.filter( (updatedData) => {
      if (updatedData.id == data.id) {
        updatedData.appointmentStatus = AppointmentStatus.ACCEPTED;
      }       
    });

    await props.CaseManagementActions.sendNotification(data1);
    await props.CaseManagementActions.saveCaseRemainders(remainder);
  }

  const handleReject = async (event, id, toId, toName, type, caseId) => {

    let m = moment(new Date());
    let date = m.utc().format();

    let data = {
      id: id,
      appointmentStatus: "Rejected"
    };

    let data1 = {
      notification: `Appointment with ${props.userInfo.userName} is REJECTED `,
      created: date,
      caseId: caseId,
      fromId: props.userInfo.id,
      fromName: props.userInfo.userName,
      toId: toId,
      toName: toName,
      type: "",
      status: "message",
      notificationStatus: 0,
      readByUser: "No"
    };

    await props.CaseManagementActions.updateAppointment(data);
    props.appointments.filter( (updatedData) => {
      if (updatedData?.id == data?.id) {
        updatedData.appointmentStatus = AppointmentStatus.REJECTED;
      }       
    });
    await props.CaseManagementActions.sendNotification(data1);
  }


  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setTab(newValue);
  };

  const handleNotiMessage = (eve, item) => {

      let update = {
        id: item.id,
        readByUser: "Yes"
      };

      props.CaseManagementActions.updateNotificationStatus(update)
      let query = {
        id: props.userInfo.id,
        type: props.userInfo.status,
      };

      props.loginActions.getAllNotifications(query);
      let arr = [];
      let cases = props.caseList.cases;
      for (let i = 0; i < cases.length; i++) {
          if (cases[i].caseId === item.caseId) {
              arr.push(cases[i])
          }
      };

      if (item.notificationStatus === 1) {

          if (arr.length > 0) {
            props.CaseManagementActions.setCurrentState("requested");
            props.CaseManagementActions.setSelectedCase(arr[0]);
            props.history.push('/lawyer-case-inquiry-accept');

          }

      } else if (item.notificationStatus === 2) {
          if (arr.length > 0) {
            props.CaseManagementActions.setCurrentState("proposed");
            props.CaseManagementActions.setSelectedCase(arr[0]);
            props.history.push('/customer-case-note');

          }
      } else if (item.notificationStatus === 3) {
          if (arr.length > 0) {
            props.CaseManagementActions.setCurrentState("accepted");
            props.CaseManagementActions.setSelectedCase(arr[0]);
            props.history.push('/case-management');

          }
      } else if (item.notificationStatus === 4) {

          if (arr.length > 0) {

              if (props.userInfo.status === "lawyer" || props.userInfo.status === "companylawyer") {

                  if (props.caseManagement.selectedCaseInfo.status === "proposed" ||
                      props.caseManagement.selectedCaseInfo.status === "requested") {
                      props.CaseManagementActions.setCurrentState(props.caseManagement.selectedCaseInfo.status);
                      props.CaseManagementActions.setSelectedCase(arr[0]);
                      props.history.push('/lawyer-case-inquiry-accept');
                  } else {
                      props.CaseManagementActions.setCurrentState(props.caseManagement.selectedCaseInfo.status);
                      props.CaseManagementActions.setSelectedCase(arr[0]);
                      props.history.push('/case-management');
                  }
              } else if (props.userInfo.status === "individual" || props.userInfo.status === "clientfirm") {

                  if (props.caseManagement.selectedCaseInfo.status === "proposed" ||
                      props.caseManagement.selectedCaseInfo.status === "requested") {
                      props.CaseManagementActions.setCurrentState(props.caseManagement.selectedCaseInfo.status);
                      props.CaseManagementActions.setSelectedCase(arr[0]);
                      props.history.push('/customer-case-note');
                  } else {
                      props.CaseManagementActions.setCurrentState(props.caseManagement.selectedCaseInfo.status);
                      props.CaseManagementActions.setSelectedCase(arr[0]);
                      props.history.push('/case-management');
                  }

              }

          }
      }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChangeNotes = async (event: React.ChangeEvent<{value: unknown}>) => {
    const text = (event.target.value) as string;
    if (text) {
      setIsValidTitle(true);
    } else {
      setIsValidTitle(false);
    }
  }

  return (

    <div className="header-menu">
      {/* <Box  display={{ xs: 'none', xl: 'none',md: 'none', sm: 'none', }} > */}
      {isSignUpPage &&
        <Button className="btn-link">
          <Link to="/">
            <span>Home</span>
          </Link>
        </Button>
      }
          

      {!isSignUpPage && userName === '' &&
        <Button className="btn-link">
          <Link to="/signup-page">
            <span>Sign Up</span>
          </Link>
        </Button>
      }
      {userName === '' &&
          <Link to="/login-page">
          <Button variant="contained" className="login-btn">Login
          </Button>
          </Link>     
      }
      {userName === '' &&
          <span>
          <Button className="login-btn" onClick={handleDownloads}>Download Forms
          </Button>
          </span>        
      }

      {userName === '' &&
          <span>
          <Button className="login-btn" onClick={handleOnlineDisputeResolution}>Online Dispute Resolution
          </Button>
          </span>        
      }
  {/* </Box> */}
      {userName !== '' &&
        notiCount !== 0 &&
        <span>
          <IconButton color="primary" onClick={handleNotifications}>
            <Badge badgeContent={notiCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </span>
      }
      {userName !== '' &&
        notiCount === 0 &&
        <span>
          <IconButton color="primary" onClick={handleNotifications}>
            <NotificationsIcon />
          </IconButton>
        </span>
      }
      {judgmentAddNotes !== null && userName !== '' && (props.status === "lawyer" || props.status === "companylawyer") && (
        <span>
          <IconButton className="btn-link" onClick={handleAddNotes}>
            <AddIcon /> Add Notes
          </IconButton>
        </span>
      )}
      {userName !== '' &&
        <span>
          <Button className={classes.dashboardButton} onClick={handleDashboard}>
            Dashboard
          </Button>
        </span>
      }
      {userName !== '' &&
        <span>
          <label className="lbl">  Welcome   {userName} </label>
        </span>
      }
      {userName !== '' &&
        <IconButton id="basic-button"
          color="primary"
          onClick={handleSettings} >
          <SettingsIcon />
        </IconButton>
      }
      {userName !== '' &&
        <Button variant="contained" className="login-btn" onClick={handleLogout}>
          <span>Logout</span>
        </Button>
      }
      {settingsOpen &&
        <div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={settingsOpen}
            onClose={handleSettingsClose}
          >
            <MenuItem onClick={handleSettingsProfile}>
              <ListItemIcon>
                <AccountBoxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleSettingsChangePassword}>
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Change Password</ListItemText>
            </MenuItem>
            {/* <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Log Out</ListItemText>
            </MenuItem> */}
          </Menu>
        </div>
      }
      {value &&

        <Dialog fullScreen open={open} onClose={handleClose} >
          <AppBar className={classes.appBar} style={{ backgroundColor: "black", color: "#FFC602", fontSize: "35px", fontWeight: "bold", }}>

            <div className="container-sm-12">
              <div className="row">
                <div className="col d-flex justify-content-start" >
                  <Tabs value={valuetabchange} onChange={handleTabChange} style={{ height: "50px" }}>
                    <Tab label="Notifications" style={{ fontSize: "15px", fontWeight: "bold" }} className="tab-child" />
                    <Tab label="Remainders" style={{ fontSize: "15px", fontWeight: "bold" }} className="tab-child" />
                    <Tab label="Appointments" style={{ fontSize: "15px", fontWeight: "bold" }} className="tab-child" />
                  </Tabs>
                </div>
                <div className="col d-flex justify-content-end"  >
                  <IconButton color="inherit" onClick={handleRefresh} aria-label="close">
                    <RefreshIcon />
                  </IconButton>
                </div>
                <div className="col d-flex justify-content-end"  >
                  <IconButton color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </AppBar>
          {valuetabchange === 0 &&
            <div>
              {props.notifications &&
                <List>
                  {props?.notifications?.getAllNotifications?.map((item) => {
                    let date = new Date(item?.created)
                    let monthname = date.toLocaleString('default', { month: 'long' });
                    let year = date.getFullYear();
                    let datenum = date.getUTCDate();
                    return (
                      <div>
                        {
                          item?.readByUser === "Yes" &&

                          <div>
                            <div className="container-sm-12" style={{ width: "100%", backgroundColor: "#d5deed" }}>
                              <div className="row d-flex justify-content-start">
                                <div className="col-sm-1 d-flex justify-content-start">
                                  <ListItemAvatar className="ml-5 mt-3">
                                    <Avatar alt="Remy Sharp" src={face} className={classes.large} />
                                  </ListItemAvatar>
                                </div>
                                <div className="col-sm-11 d-flex justify-content-start">
                                  <ListItem onClick={(eve) => {
                                    handleNotiMessage(eve, item);
                                  }} button className="ml-5 d-flex justify-content-start" >
                                    <ListItemText primary={item?.fromName}
                                      secondary={
                                        <React.Fragment>
                                          <Typography>Message: {item?.notification}</Typography>
                                          <Typography>Sent On: {datenum}-{monthname}-{year}</Typography>

                                        </React.Fragment>}
                                    />
                                  </ListItem>

                                </div>

                              </div>
                            </div>
                            <div>
                              <Divider className="mb-2" />
                            </div>
                          </div>
                        }
                        {
                          item.readByUser === "No" &&

                          <div>
                            <div className="container-sm-12" style={{ width: "100%" }}>
                              <div className="row d-flex justify-content-start">
                                <div className="col-sm-1 d-flex justify-content-start">
                                  <ListItemAvatar className="ml-5 mt-3">
                                    <Avatar alt="Remy Sharp" src={face} className={classes.large} />
                                  </ListItemAvatar>
                                </div>
                                <div className="col-sm-11 d-flex justify-content-start">
                                  <ListItem onClick={(eve) => {
                                    handleNotiMessage(eve, item);
                                  }} button className="d-flex justify-content-space-around ml-5" >
                                    <ListItemText primary={item?.fromName}
                                      secondary={
                                        <React.Fragment>
                                          <Typography>Message: {item?.notification}</Typography>
                                          <Typography>Sent On: {datenum}-{monthname}-{year}</Typography>

                                        </React.Fragment>}
                                    />
                                  </ListItem>

                                </div>

                              </div>
                            </div>
                            <div>
                              <Divider className="mb-2" />
                            </div>

                          </div>
                        }
                      </div>
                    );
                  })
                  }
                </List>
              }
              {props.notifications && props?.notifications?.getAllNotifications?.length === 0 &&
                <Box className="no-result-fount" alignItems="center" display="flex">
                  <Box>
                    <FindInPageIcon />
                  </Box>
                  <Box>
                    <Typography gutterBottom variant="h5" component="h2">
                      No Notification found
                    </Typography>
                  </Box>
                </Box>
              }
            </div>
          }
          {valuetabchange === 1 &&
            <div>
              {props.remainders &&
                <List>
                  {props.remainders.map((item) => {
                    let date = new Date(item.deadlineDate)
                    let monthname = date.toLocaleString('default', { month: 'long' });
                    let year = date.getFullYear();
                    let datenum = date.getUTCDate();
                    return (
                      <div>
                        <div className="container-sm-12" style={{ width: "100%" }}>
                          <div className="row d-flex justify-content-start">
                            <div className="col-sm-1 d-flex justify-content-start">
                              <ListItemAvatar className="ml-5 mt-3">
                                <Avatar alt="Remy Sharp" src={face} className={classes.large} />
                              </ListItemAvatar>
                            </div>
                            <div className="col-sm-11 d-flex justify-content-start">
                              <ListItem button className="d-flex justify-content-space-around ml-5">
                                <ListItemText primary={item.taskName}
                                  secondary={
                                    <React.Fragment>
                                      <Typography>Date: {datenum}-{monthname}-{year}</Typography>
                                      {/* <Typography>Case ID: {item.caseId} </Typography> */}
                                    </React.Fragment>}
                                />
                              </ListItem>

                            </div>

                          </div>
                        </div>
                        <div>
                          <Divider className="mb-2" />
                        </div>

                      </div>
                    );
                  })
                  }
                </List>
              }
              {props.remainders && props?.remainders?.length === 0 &&
                <Box className="no-result-fount" alignItems="center" display="flex">
                  <Box>
                    <FindInPageIcon />
                  </Box>
                  <Box>
                    <Typography gutterBottom variant="h5" component="h2">
                      No Remainder found
                    </Typography>
                  </Box>
                </Box>
              }
            </div>
          }
          {valuetabchange === 2 &&
            <div>
              {props.appointments &&
                <List>
                  {props?.appointments?.map((item) => {

                    let date = new Date(item?.deadlineDate)
                    let monthname = date.toLocaleString('default', { month: 'long' });
                    let year = date.getFullYear();
                    let datenum = date.getUTCDate();
                    
                    return (
                      <div>
                        <div className="container-sm-12" style={{ width: "100%" }}>
                          <div className="row d-flex justify-content-start">
                            <div className="col-sm-1 d-flex justify-content-start">
                              <ListItemAvatar className="ml-5 mt-3">
                                <Avatar alt="Remy Sharp" src={face} className={classes.large} />
                              </ListItemAvatar>
                            </div>
                            <div className="col-sm-11 d-flex justify-content-start">
                              <ListItem button className="d-flex justify-content-space-around ml-5">
                                <ListItemText
                                  primary={
                                    <React.Fragment>
                                      <Typography>From :<b> {item.fromName}</b></Typography>
                                    </React.Fragment>}
                                  secondary={
                                    <React.Fragment>
                                      <Typography>Message: {item.message}</Typography>
                                      {/* <Typography>Case ID: {item.caseId} </Typography> */}
                                        <div className="container-sm-12">
                                            <div className="row" >
                                                <div className="col-sm-1 d-flex justify-content-start mt-3" >                                         
                                                      
                                                        <Button variant="contained" className={item?.appointmentStatus == AppointmentStatus.ACCEPTED ? classes.buttonAttribute: "addnotes"} 
                                                            style={{ backgroundColor: "#292734" }} 
                                                            onClick={(eve) => {
                                                            item?.appointmentStatus ==  AppointmentStatus.ACCEPTED ?
                                                              ""
                                                              :
                                                              handleAccept(eve, item["id"], item?.fromId, item?.fromName, item?.type, item?.caseId, item?.appointmentDate)
                                                            }}
                                                        >
                                                            {item?.appointmentStatus ==  AppointmentStatus.ACCEPTED ? 
                                                                <span>Accepted</span>                                                      
                                                                :
                                                                <span>Accept</span>  
                                                            }
                                                                                        
                                                        </Button>
                                                
                                                </div>
                                                <div className="col-sm-1 d-flex justify-content-start mt-3">

                                                        <Button variant="contained" className={item?.appointmentStatus == AppointmentStatus.REJECTED ? classes.buttonAttribute: "addnotes"} 
                                                              style={{ backgroundColor: "#292734",marginLeft: "24px" }} 
                                                              onClick={(eve) => {
                                                              item?.appointmentStatus == AppointmentStatus.REJECTED ?
                                                              ""
                                                              :
                                                              handleReject(eve, item["id"], item?.fromId, item?.fromName, item?.type, item?.caseId);
                                                              }}
                                                        >
                                                          {item?.appointmentStatus == AppointmentStatus.REJECTED ? 
                                                                <span>Rejected</span>                                                   
                                                                :
                                                                <span>Reject</span>
                                                          }
                                                    
                                                        </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>}
                                />
                              </ListItem>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Divider className="mb-2" />
                        </div>
                      </div>
                    );
                  })
                  }
                </List>
              }
              {props.appointments && props?.appointments.length === 0 &&
                <Box className="no-result-fount" alignItems="center" display="flex">
                  <Box>
                    <FindInPageIcon />
                  </Box>
                  <Box>
                    <Typography gutterBottom variant="h5" component="h2">
                      No Appointments
                    </Typography>
                  </Box>
                </Box>
              }
            </div>
          }
        </Dialog>

      }
      {openAddNote && <ResponsiveDialog
        title="Add Notes"
        content={""}
        formContent={
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField autoFocus margin="dense" id="titlenotes" label="Title" fullWidth onChange={onChangeNotes} error={!isValidTitle} />
            </Grid>
            <Grid item xs={12}>
              <InputLabel className="mt-4">Add Notes</InputLabel>
              <TextareaAutosize cols={65} rows={5} id="notesValue" onChange={(e) => {
                  if(e.target.value.length) {
                    setDescriptionError("")
                  } else {
                    setDescriptionError("Fill some Notes")
                  }
              }} />
              <div className = {classes.noInputDataError}>
                  <small>{descriptionError}</small>
              </div>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formSelect}>
                <InputLabel id="case-select-label" >Case * </InputLabel>
                <Select
                  native
                  labelId="case-type-select-label"
                  id={`caseId-${0}`}
                  onChange={handleCaseChange}
                  label="Case*"
                  placeholder="Case*"
                  error={!isValidCaseList}
                >
                  <option aria-label="None" value="" />
                  {props.caseList?.cases?.map((type) => {
                    {
                      if (type.status === "accepted") {
                        return (
                          <option value={type.caseId}>{type.title}</option>
                        );
                      }
                    }
                  }
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formSelect}>
                <InputLabel id="case-phase-select-label" >Phase * </InputLabel>
                <Select
                  native
                  labelId="case-type-select-label"
                  id={`phaseName-${0}`}
                  label="Phase*"
                  placeholder="Phase*"
                  onChange={
                    handlePhaseChange
                  }
                  error={!isValidPhase}
                >
                  <option aria-label="None" value="" />
                  {phases?.map((type) => {
                    return (
                      <option
                        value={type}
                      >{type}</option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            {element.map(function (input, index) {
              return input;
            })}
            <Grid item xs={4}>
              <Button variant="contained" className={classes.detailBtn} onClick={handleAddCase}>
                Add
              </Button>
            </Grid>
            <Grid item xs={6}>
              {!isValid && <p className={classes.alert}>Please select valid case or phase name</p>}
              {!isValidCombination && <p className={classes.alert}>This combination is already exist</p>}

            </Grid>
          </Grid>
        }
        okText="Save"
        cancelText="Cancel"
        isOpen={openAddNote}
        handleClose={handleNoteClose}
        handleOk={handleNoteSave}
        handleCancel={handleNoteClose}
      />}
    </div >
  );
};

export const HeaderLinks = withRouter(_HeaderLinks);

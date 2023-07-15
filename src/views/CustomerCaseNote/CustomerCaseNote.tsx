import React, { Component, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Theme, makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// redux
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import forOwn from 'lodash/forOwn';
import clone from 'lodash/clone';
import filter from 'lodash/filter';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reduxAction/rootReducer";
import face from "../../assets/img/faces/avatar.png";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import AssignmentIcon from '@material-ui/icons/Assignment';
import './CustomerCaseNote.scss';
import NotesText from "../../components/NotesText/NotesText";
import ResponsiveDialog from "../../components/ClouserDialog/ClouserDialog";
import { STAGES } from '../../assets/constant/stage';
import Applogo from "../../assets/img/applogo.svg";
import * as PaymentActions from "../../reduxAction/payment/paymentActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FormControl, Grid, InputLabel, Radio, RadioGroup, Select } from "@material-ui/core";
export const defaultPaymentAmount = 500;
export const defaultCurrency = 'INR';

export function StageCheckBoxField(props:any) {
  return (
    <Box className="stage-check-field">
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.stage.checked}
              disabled={true}
              color="primary"
            />
          }
          label={props.stage.name}
        />
      </Box>
      <Box>
        <TextField disabled={true} className="input-field" size="small" variant="outlined" value={props.stage.amount} />
      </Box>
    </Box>
  );
}

export function AcceptedStageField(props:any) {
  const handleStageCloseConfirm = () => {
    props.handleStageCloseConfirm(props.stage.name, props.stage.key);
  }
  return (
    <Box className="stage-check-field stage-proposed-field">
      <Box>
        <Typography variant="h6" gutterBottom>
          {props.stage.name}
        </Typography>
      </Box>
      <Box>
        <TextField disabled={true} className="input-field stage-input" size="small" variant="outlined" value={props.stage.amount} />
      </Box>
      {props.stage.status === 0 &&
        (<Box className="feature-stage">
          <Button variant="contained" onClick={() => { }}>
            <span>Future Phase</span>
          </Button>
        </Box>)
      }
      {props.stage.status === 1 &&
        (<Box className="in-progress-stage">
          <Button variant="contained" onClick={() => { }}>
            <span>In Progress</span>
          </Button>
        </Box>)
      }
      {props.stage.status === 2 &&
        (<React.Fragment>
          <Box className="in-progress-stage">
            <Button variant="contained" onClick={() => { }}>
              <span>Agree Stage Completion</span>
            </Button>
          </Box>
          <Box className="approve-closure">
            <Button variant="contained" onClick={handleStageCloseConfirm}>
              <span>Approve Closure</span>
            </Button>
          </Box>
        </React.Fragment>)
      }
      {props.stage.status === 3 &&
        (<Box className="completed-stage">
          <Button variant="contained" onClick={() => { }}>
            <span>Completed</span>
          </Button>
        </Box>)
      }
    </Box>
  );
}

interface Props extends RouteComponentProps<any> {
  userName: string | null;
  CaseManagementActions: typeof CaseManagementActions;
  loginActions: typeof LoginActions;
  paymentActions: typeof PaymentActions;
  isLoading: boolean;
  userInfo: any;
  caseManagement: any;
  orderDetail: any;
  lawCategory: any[];
  commonActions: typeof CommonActions;
  categoryLoading: boolean;
  subCategory: any[];
  notifications: any;
  remainders: any;
  appointments: any;
  basicInfo: any;
  status: any;
  snackbarsActions: typeof SnackbarsActions;
  caseList: any;
}

const styles = (theme: Theme) => ({
  large: {
    width: "100px",
    height: "100px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    zIndex: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progressbar: {
    color: '#FFC602'
  },
});
const useStyles = makeStyles(styles);

export function CaseManagement(props : any) {
  const classes = useStyles();
  const dueDate = moment()
    .add(10, 'd')
    .toDate();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(dueDate);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const [product, setProduct] = useState('');
  const [subProduct, setSubProduct] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [lawyerName, setLawyerName] = useState('');
  const [isValidNotes, setIsValidNotes] = useState(true);
  const [notesToClient, setNotesToClient] = useState('');
  const [caseStatus, setCaseStatus] = useState('');
  const [stages, setStages] = useState([]);
  const [stageName, setStageName] = useState('');
  const [stageKey, setStageKey] = useState(0);
  const [caseNotes, setCaseNotes] = useState<any[]>([]);
  const [preliminaryNotes, setPreliminaryNotes] = useState([]);
  const [stageCloseConfirm, setStageCloseConfirm] = useState(false);
  const [paymentAccept, setpaymentAccept] = useState(false);
  const [isExisting, setIsExisting] = useState("");
  const [caseReferenceId, setCaseReferenceId] = useState("");
  const [isValidCase, setIsValidCase] = useState(true);
  
  const [reassignConfirm,setReassignConfirm] = React.useState(false);  
  const [transferId, setTransferId] = React.useState("");
  const [reAssignCaseData, setReAssignCaseData] = React.useState<any>({});  
  const [reassignCaseDataList, setReassignCaseDataList] = React.useState([]);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const { selectedCaseInfo: { product: propsProduct, subproduct: propssubProduct, description: propsDescription, title, lawyerName: propsLawyerName } } = props.caseManagement;
    setLawyerName(propsLawyerName);
    setTitle(title);
    setProduct(propsProduct);
    setSubProduct(propssubProduct);
    setDescription(propsDescription);
  }, []);

  useEffect(() => {
    const reassignCaseDataList = props.caseList?.cases?.filter((cases:any) =>  cases?.status == "reassign_pending");
    setReassignCaseDataList(reassignCaseDataList);
  }, [props.caseList?.cases]);


  const getStageNotes = (stage:any, notes:any) => filter(notes, { stage });


  useEffect(() => {
    
    const notesList:any[] = [];
    props?.caseManagement?.notes?.map((note:any) => {
      notesList.push({
        type: (note.status === '0') ? 'individual' : 'lawyer',
        value: note.notes,
        dateTime: moment(new Date(note.created)).format("DD-MM-YYYY, h:mm a"),
        stage: note.phaseName
      });
    });
    setCaseNotes(notesList);
    if (!isEmpty(props.caseManagement.stage) && !paymentAccept) {
      const { stage: propsStage } = props.caseManagement;
      const [stage] = propsStage;
      const stageStatus = get(stage, 'status', 'requested');
      const stageList:any[] = [];
      if (stageStatus === 'proposed' || stageStatus === 'accepted' || stageStatus === 'archieved') {
        setPreliminaryNotes([{
          name: 'Preliminary',
          status: 3,
          notes: getStageNotes('Preliminary', notesList)
        }]);
        forOwn(stage, (value, key) => {
          if (key.includes('phasePayment_')) {
            if ((Number(value) > 0)) {
              stageList.push({
                name: STAGES[(Number(key.slice(-1)) - 1)],
                key: key.slice(-1),
                checked: true,
                amount: value,
                status: stage[`phaseStatus_${key.slice(-1)}`],
                notes: getStageNotes(STAGES[(Number(key.slice(-1)) - 1)], notesList)
              });
            }
          }
        });
        setStages(stageList);
      }
      setCaseStatus(stageStatus);

    } else {
      setCaseStatus('requested');
    }
    if (props.caseManagement.success) {
      props.snackbarsActions.showSuccessSnackbarAction(props.caseManagement.success);
      props.CaseManagementActions.clearError({});
    }
    if (props.caseManagement.error) {
      props.snackbarsActions.showErrorSnackbarAction(props.caseManagement.error);
      props.CaseManagementActions.clearError({});
    }
  }, [props.caseManagement]);

  useEffect(() => {
    if (props.orderDetail && !isEmpty(props.orderDetail)) {
      const { stage, selectedCaseInfo } = props.caseManagement;
      const options = {
        key: `rzp_test_BFAmiz30GBdhrC`,
        amount: props.orderDetail.amount,
        currency: props.orderDetail.currency,
        name: `One Time Referral Fees`,
        description: `Case #${selectedCaseInfo.caseId}`,
        image: `${Applogo}`,
        order_id: `${props.orderDetail.id}`,
        prefill: {
          name: `${props.userName}`,
          email: props.status == "clientfirm" ? props.userInfo.companyjson.officialEmailId : props.userInfo.userjson.email,
          contact: props.status == "clientfirm" ? props.userInfo.companyjson.mobileNo : props.userInfo.userjson.mobileNo,
        },

        theme: {
          color: '#292734'
        },
        handler: async() => {
          let m = moment(new Date());
          let date = m.utc().format();
          const tempStage = clone(stage[0]);
          const [initialStage] = stages;
          tempStage[`phaseStatus_${initialStage.key}`] = 1;
          tempStage[`phaseStatus_${initialStage.key}_date`] = date;
          tempStage.status = "accepted";
          tempStage.statusArray = `${tempStage.statusArray},accepted`;
          tempStage.client_accepted_date = date;
          await props.CaseManagementActions.acceptCase(tempStage);
          
          let notidata = {
            notification: `Accepted your Stage Proposal and Fees per stage for Case:  ${props.caseManagement.selectedCaseInfo.title}`,
            created: date,
            caseId: props.caseManagement.selectedCaseInfo.caseId,
            fromId: props.status == "clientfirm" ? props.caseManagement.selectedCaseInfo.companyId : props.caseManagement.selectedCaseInfo.clientId,
            fromName: props.status == "clientfirm" ? props.caseManagement.selectedCaseInfo.companyName : props.caseManagement.selectedCaseInfo.clientName,
            toId: props.caseManagement.selectedCaseInfo.lawyerId,
            toName: props.caseManagement.selectedCaseInfo.lawyerName,
            type: "lawyer",
            status: "pending",
            notificationStatus: 3,
            readByUser: "No"
          }
          props.CaseManagementActions.sendNotification(notidata);
          props.CaseManagementActions.setCurrentState("dashboard");
          props.loadDashboard();
        },

      }
      const paymentObject = new (window as any).Razorpay(options) as any;
      paymentObject.open();
      props.paymentActions.clearOrder();
    }

  }, [props.orderDetail]);

  const handleNotesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNotesToClient(event.target.value as string);
    setIsValidNotes(true);
  };

  const handleSaveNodes = () => {
    if (notesToClient === '') {
      setIsValidNotes(false);
    } else {
      let m = moment(new Date());
      let date = m.utc().format();
      const { selectedCaseInfo: { companyId, caseId, lawyerId, lawyerName } } = props.caseManagement;
      props.CaseManagementActions.saveCaseNotes({
        caseId,
        clientId: props.userInfo.id,
        companyId,
        lawyerId,
        clientName: props.status == "clientfirm" ? "" : props.userName,
        companyName: props.status == "clientfirm" ? props.userInfo.companyName : "",
        lawyerName: lawyerName,
        notes: notesToClient,
        status: 0,
        phaseName: 'Preliminary',
        created: date
      });
      let notidata = {
        notification: notesToClient,
        created: date,
        caseId: caseId,
        fromId: props.userInfo.id,
        fromName: props.userName,
        toId: lawyerId,
        toName: lawyerName,
        type: "lawyer",
        status: "notes",
        notificationStatus: 4,
        readByUser: "No"
      }
      props.CaseManagementActions.sendNotification(notidata);
      setIsValidNotes(true);
      setNotesToClient('');
    }
  }


  const displayRazorpay = async () => {
    const createOrderParams : any = {
      amount: defaultPaymentAmount,
      currency:  defaultCurrency,
    };
    createOrderParams.amount = `${Number(createOrderParams.amount) * 100}`;
    props.paymentActions.createOrder(createOrderParams);

  }

  const handleAcceptProposal = async () => {
    await displayRazorpay();
  }

  const handleStageCloseConfirm = (stageName, key) => {
    setStageName(stageName);
    setStageKey(key);
    setStageCloseConfirm(true);
  }

  const getNextStageKey = (stage, currentStageKey) => {
    const nextStages = [];
    forOwn(stage, (value, key) => {
      if (key.includes('phasePayment_')) {
        if ((Number(value) > 0) && Number(key.slice(-1)) > currentStageKey) {
          nextStages.push(Number(key.slice(-1)));
        }
      }
    });
    return nextStages;
  }

  const handleSuccessStageClose = () => {
    setStageCloseConfirm(false);
    const { stage: propsStage } = props.caseManagement;
    const [stage] = propsStage;
    const tempStage = clone(stage);
    tempStage[`phaseStatus_${stageKey}`] = 3;
    const nextStages = getNextStageKey(stage, stageKey);
    if (isEmpty(nextStages)) {
      tempStage.status = 'archieved';
      tempStage.statusArray = `${tempStage.statusArray},archieved`;
    } else {
      tempStage[`phaseStatus_${nextStages[0]}`] = 1;
    }
    props.CaseManagementActions.acceptCase(tempStage);
  }

  const handleCancelStageClose = () => {
    setStageCloseConfirm(false);
  }

  const handleCloseDialog = () => {
    setStageCloseConfirm(false);
  }

  const viewCaseFile = (fileInfo) => {
    const { selectedCaseInfo: { caseId } } = props.caseManagement;
    const { filePath } = fileInfo;
    props.CaseManagementActions.getCaseFile({
      caseId,
      fileName: filePath
    });
  }

  const handleUploadedFile = async({ target }: any) => {
    const { selectedCaseInfo: { caseId } } = props.caseManagement;
    const [files] = target.files;
    const formData = new FormData();
    formData.append('file', files);
    await props.CaseManagementActions.uploadCaseFileAction({ formData: formData, type: 'case', contenttype: files.type, folderId: 3, caseId });
  }

  const lawyerGender = props?.caseManagement?.selectedCaseInfo?.lawyerGender;
  const caseFiles = props?.caseManagement?.selectedCaseInfo?.caseFiles;

  const shouldAllowUpload = (
    (caseStatus === 'requested' && (caseFiles === null || caseFiles.length < 3 || caseFiles?.length == 0)) ||
    (caseStatus === 'accepted'));

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsExisting((event.target as HTMLInputElement).value);
  };

  const handleCaseChange = (event: React.ChangeEvent<{ value: unknown }>) => {

    if (event.target.value) {
      const id:any = event.target.value;
      const caseData:any = props.caseList?.cases.filter(caseValue => caseValue?.id == id);
      
      setReAssignCaseData(caseData[0]);
      setTransferId(id);
      setReassignConfirm(true);
    }
  };

  const handleReassignClose = () => {
    setReassignConfirm(false);
  }

  const handleReassignSave = () => {

    if (transferId) {

      const m = moment(new Date());
      const date = m.utc().format();

      const param = {
        id : transferId,
        oldCaseId: reAssignCaseData?.caseId,
        oldLawyerId: reAssignCaseData.lawyerId,
        newLawyerId: props.caseManagement.selectedCaseInfo?.lawyerId,
        newCaseId: props.caseManagement.selectedCaseInfo?.caseId,
        newCaselawyerId: props.caseManagement.selectedCaseInfo?.id,        
      };      
      props.CaseManagementActions.transferIndividualLawyer(param);

      let notidata = {
        notification: `Accepted your Stage Proposal and Fees per stage for Case:  ${props.caseManagement.selectedCaseInfo.title}`,
        created: date,
        caseId: props.caseManagement.selectedCaseInfo.caseId,
        fromId: props.status == "clientfirm" ? props.caseManagement.selectedCaseInfo.companyId : props.caseManagement.selectedCaseInfo.clientId,
        fromName: props.status == "clientfirm" ? props.caseManagement.selectedCaseInfo.companyName : props.caseManagement.selectedCaseInfo.clientName,
        toId: props.caseManagement.selectedCaseInfo.lawyerId,
        toName: props.caseManagement.selectedCaseInfo.lawyerName,
        type: "lawyer",
        status: "pending",
        notificationStatus: 3,
        readByUser: "No"
      };
      props.CaseManagementActions.sendNotification(notidata);
      
      props.CaseManagementActions.setCurrentState("dashboard");
      props.loadDashboard();
      setReassignConfirm(false);
    }
    
  }

  return (
    <div>
      <Header links={<HeaderLinks {...props} />} fixed color="primary" />
      <Box className="connect-container-first" component="div" display="block">
        <Typography variant="h5" gutterBottom align="center">
          Case Inquiry
        </Typography>
        <Box display="flex" component="div" className="cm-second">
          <Typography variant="h5" gutterBottom align="left" onClick={props.handleBack} style={{ cursor: "pointer", width: "6%" }}>
            <ArrowBackIcon></ArrowBackIcon>Back
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            LAWE - An Integrated Legal Management Ecosystem
          </Typography>
        </Box>
      </Box>
      <Box className="connent-container-second" component="div" display="block">
        <Paper variant="outlined" className="card-container">
          <Paper className="user-info-container">
            <Paper className="name-title-container">
              <Typography className="name" variant="h5" gutterBottom align="center">
                {lawyerGender}. {lawyerName}
              </Typography>
            </Paper>
            <Avatar alt="Remy Sharp" src={face} className={classes.large} />
          </Paper>
          <Paper className="case-info-container">
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Title
              </Typography>
              <Typography className="input-field" variant="subtitle1" gutterBottom align="center">
                {title}
              </Typography>
            </Box>
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Description
              </Typography>
              <div className="description-container">
                <Typography className="description-input-field" variant="subtitle1" gutterBottom align="center">
                  {description}
                </Typography>
              </div>
            </Box>
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Product
              </Typography>
              <div className="description-container">
                <Typography className="description-input-field" variant="subtitle1" gutterBottom align="center">
                  {product}
                </Typography>
              </div>
            </Box>
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Sub Product
              </Typography>
              <div className="description-container">
                <Typography className="description-input-field" variant="subtitle1" gutterBottom align="center">
                  {subProduct}
                </Typography>
              </div>
            </Box>
            <Box className="case-info-sub-container first-notes-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">

              </Typography>
              <Box className="input-field picker-container">
                <div className="lawyer-file-container">
                  <Typography variant="caption" display="block" gutterBottom>
                    Preview: <strong>Supporting Document</strong>
                  </Typography>
                  <div className="preview-container">
                    {
                      caseFiles?.length? (
                          caseFiles?.map((caseFile) => (
                            <Avatar className="img-view" variant="rounded" onClick={() => viewCaseFile(caseFile)}>
                              <AssignmentIcon />
                            </Avatar>
                          ))
                            // <Avatar className="img-view" variant="rounded" onClick={() => viewCaseFile(caseFiles)}>
                            //   <AssignmentIcon />
                            // </Avatar>
                      )
                      :
                      ""                      
                    }
                    {shouldAllowUpload &&
                      (<Box className="upload-container">
                        <Button
                          variant="contained"
                          component="label"
                          onChange={handleUploadedFile}
                          className="upload-btn"
                        >
                          <span>Upload</span>
                          <input
                            type="file"
                            hidden
                          />
                        </Button>
                      </Box>)
                    }
                  </div>
                </div>
                {(caseStatus !== 'accepted' && caseStatus !== 'archieved') &&
                  (<Box className="lawyer-acknowledge-container">
                    <Typography variant="h6" display="block" gutterBottom>
                      Acknowledgement Due by
                    </Typography>
                    <Box className="input-field picker-container">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disabled={true}
                          readOnly={true}
                          disableToolbar
                          variant="inline"
                          format="dd-MM-yyyy"
                          margin="normal"
                          label="Date"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Box>
                  </Box>)
                }
              </Box>
            </Box>
            {(caseStatus === 'requested' || caseStatus === 'proposed') &&
              <React.Fragment>
                {caseNotes?.map((notes) => (
                  <NotesText notes={notes} isLawyer={false} />
                ))}
                <Box className="case-info-sub-container">
                  <Typography className="label" variant="subtitle1" gutterBottom align="center">
                    Initial Comment
                    (Preliminary)
                  </Typography>
                  <Box className="input-field notes-container">
                    <TextField
                      error={!isValidNotes}
                      className="notes-field"
                      size="small"
                      multiline
                      rows={8}
                      value={notesToClient}
                      onChange={handleNotesChange}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                <Box className="case-info-sub-container send-message-container">
                  <Button variant="contained" onClick={handleSaveNodes}>
                    <span>Send Message</span>
                  </Button>
                </Box>
              </React.Fragment>
            }
            {(caseStatus === 'accepted' || caseStatus === 'archieved') &&
              (<React.Fragment>
                <Box className="case-info-sub-container">
                  <Typography className="label" variant="subtitle1" gutterBottom align="center">
                    Mutually agreed Stages
                  </Typography>
                  <Box className="input-field">
                    <Typography variant="body2" display="block" gutterBottom>
                      ( Case management work flow would use these phases for notes, comments, reminders for payment between Client / Lawyer)
                    </Typography>
                    <Box className="stage-container">
                      <Box className="stage-box-1">
                        <Box className="stage-check-field stage-proposed-field">
                          <Box>
                            <Typography variant="h6" gutterBottom>
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              Fees Per Stage ( INR )
                            </Typography>
                          </Box>
                          <Box>

                          </Box>
                        </Box>
                        {
                          stages?.map((stage) => (
                            <AcceptedStageField stage={stage} handleStageCloseConfirm={handleStageCloseConfirm} />
                          ))
                        }
                      </Box>
                    </Box>
                  </Box>
                </Box>
      
              </React.Fragment>)
            }
            {caseStatus === 'proposed' &&
              <React.Fragment>
                <Box className="case-info-sub-container">
                  <Typography className="label" variant="subtitle1" gutterBottom align="center">
                    Propose these Stages
                  </Typography>
                  <Box className="input-field">
                    <Typography variant="body2" gutterBottom>
                      (by Lawyer). As soon as you accept the proposal and pay the LAWE Platform a small lead generation fees, these stages would be setup
                    </Typography>
                    <Box className="proposed-stage-container">
                      <Box className="stage-box-1">
                        <Box className="stage-check-field">
                          <Box>

                          </Box>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              Fees Per Stage ( INR )
                            </Typography>
                          </Box>
                        </Box>
                        {stages?.map((stage) => (
                          <StageCheckBoxField stage={stage} />
                        ))}
                      </Box>
                      <Box className="stage-box-2">
                        <Typography variant="h6" gutterBottom>
                          Help Section.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          LAWE Platform has come up with these 8 generic stages for each potential case.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          You could select the necessary stages and add amount per stage as a reminder.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          After mutual consent, these selected phases would form the case management structure to track each stages and its notes.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <FormControl className="radio-field-set" component="fieldset" margin="dense">
                <RadioGroup row aria-label="position" name="position" onChange={handleRadioChange}>
                  <Grid container justify="flex-start">
                    <Grid item>
                      <FormControlLabel
                        value="existingCase"
                        control={<Radio color="primary" />}
                        label="Map Existing Case"
                        labelPlacement="end"
                        className="radio-label"
                        disabled = {reassignCaseDataList?.length == 0}
                      />
                      {
                        reassignCaseDataList?.length == 0 && (
                          <p><small>No Existing case to Transfer, Please continue this as new Case</small></p>
                        )
                        
                      }
                      
                    </Grid>
                  </Grid>

                  <Grid container justify="flex-start">
                    <Grid item>
                      <FormControlLabel
                        value="newCase"
                        control={<Radio color="primary" />}
                        label="Accept and continue as New Case"
                        labelPlacement="end"
                        className="radio-label"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
              {isExisting=="newCase" && (
                <Box className="case-info-sub-container send-message-container">
                <Button variant="contained" onClick={handleAcceptProposal}>
                  <span>Accept the Proposal - Pay Rs {defaultPaymentAmount} to proceed</span>
                </Button>
              </Box>
              )}{
                isExisting=="existingCase"&&(
                  <FormControl variant="outlined" >
                    <InputLabel error={!isValidCase} id="product-select-label" >Select Case *</InputLabel>
                    <Select
                      native
                      labelId="product-select-label"
                      id="product-select-outlined"
                      value={caseReferenceId}
                      onChange={handleCaseChange}
                      label="Product*"
                      error={!isValidCase}
                      placeholder="Product"
                      className="col-sm-12 col-md-12 col-xl-12 col-lg-12 "
                    >
                      <option aria-label="None" value="" />
                      {
                        // props.caseList?.cases?.filter(cases =>  cases?.status == "reassign_pending").map(reasssignedCases => {
                          reassignCaseDataList.map(reasssignedCases => {
                            return <option data-toggle="tooltip" title ={"PRODUCT - " + reasssignedCases?.product + " SUB PRODUCT - " + reasssignedCases?.subproduct} value={reasssignedCases?.id}>
                            TITLE : {reasssignedCases?.title} , 
                            LAWYER NAME : {reasssignedCases?.lawyerGender}.{reasssignedCases?.lawyerName}
                            </option>
                        })
                      }
                    </Select>
                  </FormControl>
                )
              }
                 {/* <Box className="case-info-sub-container send-message-container">
                <Button variant="contained" onClick={handleAcceptProposal}>
                  <span>Accept the Proposal - Pay Rs {process.env.REACT_APP_PAYMENT_AMOUNT ?? defaultPaymentAmount} to proceed</span>
                </Button>
              </Box> */}
                
              </React.Fragment>
            }
          </Paper>
        </Paper>
      </Box>
      <Backdrop className={classes.backdrop} open={props.isLoading}>
        <CircularProgress className={classes.progressbar} size={100} />
      </Backdrop>
      <ResponsiveDialog
        title="Please Confirm - Stage Phase Closure"
        content={`Your Lawyer has proposed closure of “${stageName}” and need your acknowledgement!`}
        okText="Yes, Acknowledge Phase complete"
        cancelText="No, Do not make any change"
        isOpen={stageCloseConfirm}
        handleClose={handleCloseDialog}
        handleOk={handleSuccessStageClose}
        handleCancel={handleCancelStageClose}
      />
      <ResponsiveDialog
        title="Reassign Confirm"
        content={""}
        formContent={<div>
          Are you sure want to tranfer this case?
        </div>}
        okText="Confirm"
        cancelText="Cancel"
        isOpen={reassignConfirm}
        handleClose={handleReassignClose}
        handleOk={handleReassignSave}
        handleCancel={handleReassignClose}
      />
     
      <Footer />
    </div>
  );
}

export class CustomerCaseAccept extends Component<Props> {
  componentDidMount() {
    const { CaseManagementActions, caseManagement: { selectedCaseInfo } } = this.props;
    const getCaseInfoData = {
      caseId: selectedCaseInfo?.caseId,
      lawyerId: selectedCaseInfo?.lawyerId,
      clientId: selectedCaseInfo?.clientId
    };
    CaseManagementActions.getCaseNotes(getCaseInfoData);
    CaseManagementActions.getCaseStage(getCaseInfoData);
    // const script = document.createElement("script");
    // script.src = "https://checkout.razorpay.com/v1/checkout.js";
    // script.async = true;
    // script.onload = () => this.scriptLoaded();
    // document.body.appendChild(script);
  }
  // scriptLoaded() {
  //   window?.A?.sort();
  // }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.caseManagement.caesFile, this.props.caseManagement.caesFile)) {
      const { caseManagement: { caesFile: { link } = { link: undefined } } } = this.props;
      if (link) window.open(link, "_blank");
    }
    if (!isEqual(prevProps.caseManagement.uploadFileResponse, this.props.caseManagement.uploadFileResponse)) {
      const { uploadFileResponse } = this.props.caseManagement;
      if (uploadFileResponse) {
        const { fileName, filePath } = uploadFileResponse;
        const { CaseManagementActions, caseManagement: { selectedCaseInfo } } = this.props;
        selectedCaseInfo.caseFiles = [...selectedCaseInfo?.caseFiles, ...[{ fileName, filePath }]]
        CaseManagementActions.setSelectedCase(selectedCaseInfo);
      }
    }
  }
  handleBack = () => {
    if(this.props.status==="platformadmin")
      this.props.history.push(`/platform-admin-dashboard`);
    else
    this.props.history.push(`/dashboard`);
  }
  loadDashboard = () => {
    this.props.history.push(`/dashboard`);
  }

  render() {
    const {
      userName,
      status,
      CaseManagementActions,
      isLoading,
      userInfo,
      caseManagement,
      loginActions,
      paymentActions,
      orderDetail,
      commonActions,
      lawCategory,
      subCategory,
      notifications, remainders, appointments,
      basicInfo,
      caseList
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
          loginActions={loginActions}
          paymentActions={paymentActions}
          orderDetail={orderDetail}
          commonActions={commonActions}
          lawCategory={lawCategory}
          subCategory={subCategory}
          notifications={notifications}
          remainders={remainders}
          appointments={appointments}
          handleBack={this.handleBack}
          basicInfo={basicInfo}
          loadDashboard={this.loadDashboard}
          snackbarsActions={SnackbarsActions}
          caseList={caseList}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userName: state.loginForm.userName,
  status: state.loginForm.status,
  userInfo: state.loginForm.userInfo,
  isLoading: state.caseManagement.loading || state.commonReducer.loading || state.order.loading,
  caseManagement: state.caseManagement,
  orderDetail: state.order.orderDetail,
  lawCategory: state.commonReducer.lawCategory,
  subCategory: state.commonReducer.subCategory,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
  basicInfo: state.commonReducer.basicInfo,
  caseList: state.dashboard.caseList,
});

function mapDispatchToProps(dispatch: any) {
  return {
    CaseManagementActions: bindActionCreators(CaseManagementActions as any, dispatch),
    loginActions: bindActionCreators(LoginActions as any, dispatch),
    paymentActions: bindActionCreators(PaymentActions as any, dispatch),
    commonActions: bindActionCreators(CommonActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerCaseAccept);
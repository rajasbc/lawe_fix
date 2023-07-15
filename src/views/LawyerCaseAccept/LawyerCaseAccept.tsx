import DateFnsUtils from "@date-io/date-fns";
import Avatar from "@material-ui/core/Avatar";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import React, { Component, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
// redux
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AssignmentIcon from "@material-ui/icons/Assignment";
import RefreshIcon from '@material-ui/icons/Refresh';
import clone from "lodash/clone";
import filter from "lodash/filter";
import forOwn from "lodash/forOwn";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
import { STAGES } from "../../assets/constant/stage";
import face from "../../assets/img/faces/avatar.png";
import ResponsiveDialog from "../../components/ClouserDialog/ClouserDialog";
import NotesText from "../../components/NotesText/NotesText";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import { RootState } from "../../reduxAction/rootReducer";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import "./LawyerCaseAccept.scss";

interface Props extends RouteComponentProps<any> {
  userName: string | null;
  CaseManagementActions: typeof CaseManagementActions;
  loginActions: typeof LoginActions;
  snackbarsActions: typeof SnackbarsActions;
  isLoading: boolean;
  userInfo: any;
  caseManagement: any;
  lawCategory: any[];
  commonActions: typeof CommonActions;
  subCategory: any[];
  notifications: any;
  remainders: any;
  appointments: any;
  basicInfo: any;
  caseList: any,
  status:string
}

const styles = (theme: Theme) =>
  createStyles({
    large: {
      width: "100px",
      height: "100px",
      border: "1px solid rgba(0, 0, 0, 0.12)",
      zIndex: 10,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    progressbar: {
      color: "#FFC602",
    },
    input: {
      "&:invalid": {
        border: "red solid 2px"
      }
    }
  });

const useStyles = makeStyles(styles);

export function AcceptedStageField(props: any) {
  return (
    <Box className="stage-check-field stage-proposed-field">
      <Box>
        <Typography variant="h6" gutterBottom>
          {props.stage.name}
        </Typography>
      </Box>
      <Box>
        <TextField
          disabled={true}
          className="input-field stage-input"
          size="small"
          variant="outlined"
          value={props.stage.amount}
        />
      </Box>
      {/* {props.stage.status === 0 && (
        <Box className="feature-stage">
          <Button variant="contained">
            <span>Future Phase</span>
          </Button>
        </Box>
      )}
      {props.stage.status === 1 && (
        <React.Fragment>
          <Box className="in-progress-stage">
            <Button variant="contained">
              <span>In Progress</span>
            </Button>
          </Box>
          <Box className="approve-closure">
            <Button variant="contained" onClick={handleStageCloseConfirm}>
              <span>Mark Complete</span>
            </Button>
          </Box>
        </React.Fragment>
      )}
      {props.stage.status === 2 && (
        <React.Fragment>
          <Box className="in-progress-stage">
            <Button variant="contained">
              <span>Agree Stage Completion</span>
            </Button>
          </Box>
          <Box className="approve-closure">
            <Button variant="contained" disabled={true}>
              <span>Mark Complete</span>
            </Button>
          </Box>
        </React.Fragment>
      )}
      {props.stage.status === 3 && (
        <Box className="completed-stage">
          <Button variant="contained">
            <span>Completed</span>
          </Button>
        </Box>
      )} */}
    </Box>
  );
}

export function CaseManagement(props:any) {
  const classes = useStyles();
  const dueDate = moment().add(10, "d").toDate();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(dueDate);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  /* const isMultiConnect = props.match.params.id === 'all';
  const findSelectedLawyer = (isMultiConnect) ? filter(props.findLawyer, (profile) => props.selectedLawyer.includes(profile.id)) : [];
  const profile = find(props.findLawyer, { id: Number(props.match.params.id)});
  let startDate = (!isMultiConnect) ? moment(profile.userjson.practisingFrom, 'YYYY-MM-DD') : '';
  const todayDate = moment(new Date(), 'YYYY-MM-DD');
  let noOfYear = (!isMultiConnect) ? todayDate.diff(startDate, 'years') : '';
  let titleText = (!isMultiConnect && profile.userjson.gender === 'Male') ? 'Mr' : 'Ms';
  if (isMultiConnect && findSelectedLawyer.length === 1) {
    startDate = moment(findSelectedLawyer[0].userjson.practisingFrom, 'YYYY-MM-DD');
    noOfYear = todayDate.diff(startDate, 'years');
    titleText = (findSelectedLawyer[0].userjson.gender === 'Male') ? 'Mr' : 'Ms';
  } */

  const [product, setProduct] = useState("");
  const [subProduct, setSubProduct] = useState("");
  const [notesToClient, setNotesToClient] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [court, setCourt] = useState("");
  const [supProductList, setSubProductList] = useState([]);
  const [productList, setProductList] = useState(props.lawCategory);
  const [isValidNotes, setIsValidNotes] = useState(true);
  const [stages, setStages] = useState([]);
  const [stageCloseConfirm, setStageCloseConfirm] = useState(false);
  const [state, setState] = useState({
    isStage1Checked: false,
    isStage2Checked: false,
    isStage3Checked: false,
    isStage4Checked: false,
    isStage5Checked: false,
    isStage6Checked: false,
    isStage7Checked: false,
    isStage8Checked: true,
  });
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [amount3, setAmount3] = useState("");
  const [amount4, setAmount4] = useState("");
  const [amount5, setAmount5] = useState("");
  const [amount6, setAmount6] = useState("");
  const [amount7, setAmount7] = useState("");
  const [amount8, setAmount8] = useState("");
  const [isValidAmount1, setIsValidAmount1] = useState(true);
  const [isValidAmount2, setIsValidAmount2] = useState(true);
  const [isValidAmount3, setIsValidAmount3] = useState(true);
  const [isValidAmount4, setIsValidAmount4] = useState(true);
  const [isValidAmount5, setIsValidAmount5] = useState(true);
  const [isValidAmount6, setIsValidAmount6] = useState(true);
  const [isValidAmount7, setIsValidAmount7] = useState(true);
  const [isValidAmount8, setIsValidAmount8] = useState(true);
  // requested, proposed, accepted, requestedClosure
  const [caseStatus, setCaseStatus] = useState("");

  const [caseNotes, setCaseNotes] = useState([]);
  const [preliminaryNotes, setPreliminaryNotes] = useState([]);
  const [stageName, setStageName] = useState("");
  const [stageKey, setStageKey] = useState(0);
  const [currentStageFees, setCurrentStageFeed] = useState(0);
  // props.commonActions.getLawCategoryById({});

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    props.commonActions.getLawCategory({});
  }, []);

  // useEffect(() => {
  //   setSubProductList(props.subCategory);
  // }, [props.subCategory]);

  // useEffect(() => {    
  //   setProductList(props.lawCategory);
  //   const parentId = productList.find(pro => pro.name === product);
  //     props.commonActions.getLawCategoryById({ id:parentId?.id});
  // }, [props.lawCategory]);

  // const handleProductChange = (
  //   event: React.ChangeEvent<{ value: unknown }>
  // ) => {
  //   setProduct(event.target.value as string);
  //   const parentId = productList.find(pro => pro.name === event.target.value);
  //   props.commonActions.getLawCategoryById({ id: parentId?.id });
  //   setSubProductList(props.subCategory);
  // };

  // const handleSubProductChange = (
  //   event: React.ChangeEvent<{ value: unknown }>
  // ) => {
  //   setSubProduct(event.target.value as string);
  // };

  const handleNotesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsValidNotes(true);
    setNotesToClient(event.target.value as string);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    setState({ ...state, [event.target.name]: event.target.checked });
    if (name.indexOf('1') > 0)
      setAmount1("");
    else if (name.indexOf('2') > 0)
      setAmount2("");
    else if (name.indexOf('3') > 0)
      setAmount3("");
    else if (name.indexOf('4') > 0)
      setAmount4("");
    else if (name.indexOf('5') > 0)
      setAmount5("");
    else if (name.indexOf('6') > 0)
      setAmount6("");
    else if (name.indexOf('7') > 0)
      setAmount7("");
    else if (name.indexOf('8') > 0)
      setAmount8("");
  };

  const handleAmount1Change = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (state.isStage1Checked) {
      setAmount1(event.target.value as string);
      setIsValidAmount1(true);
    }
  };

  const handleAmount2Change = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (state.isStage2Checked) {
      setIsValidAmount2(true);
      setAmount2(event.target.value as string);
    }
  };

  const handleAmount3Change = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (state.isStage3Checked) {
      setIsValidAmount3(true);
      setAmount3(event.target.value as string);
    }
  };

  const handleAmount4Change = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (state.isStage4Checked) {
      setIsValidAmount4(true);
      setAmount4(event.target.value as string);
    }
  };

  const handleAmount5Change = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (state.isStage5Checked) {
      setIsValidAmount5(true);
      setAmount5(event.target.value as string);
    }
  };

  const handleAmount6Change = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (state.isStage6Checked) {
      setIsValidAmount6(true);
      setAmount6(event.target.value as string);
    }
  };

  const handleAmount7Change = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (state.isStage7Checked) {
      setIsValidAmount7(true);
      setAmount7(event.target.value as string);
    }
  };

  const handleAmount8Change = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (state.isStage8Checked) {
      setIsValidAmount8(true);
      setAmount8(event.target.value as string);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const {
      selectedCaseInfo: { product, subproduct, description, title, clientName, court, clientId, lawyerId, companyId, companyName },
    } = props.caseManagement;
    clientId == 0 ? setClientName(companyName) : setClientName(clientName);
    setTitle(title);
    setProduct(product);
    setSubProduct(subproduct);
    setDescription(description);
    setCourt(court)
    let data = {
      clientId: clientId != 0 ? clientId : companyId,
      lawyerId: lawyerId,
      type: clientId != 0 ? "individual" : "clientfirm",
    }
    props.commonActions.getDetails(data);
  }, []);

  const getStageNotes = (stage, notes) => filter(notes, { stage });

  /* useEffect(() => {
    const notesList = [];
    props.caseManagement.notes.map(note => {
      notesList.push({
        type: (note.status === '0') ? 'client' : 'lawyer',
        value: note.notes,
        dateTime: moment(new Date(note.created)).format("DD-MM-YYYY, h:mm a"),
        stage: note.phaseName
      });
    });
    setCaseNotes(notesList);
    const { stage: propsStage } = props.caseManagement;
    const [stage] = propsStage;
    const stageStatus = get(stage, 'status', 'requested');
    const stageList = [];
    if (stageStatus === 'accepted') {
      setPreliminaryNotes([{
        name: 'Preliminary',
        status: 3,
        notes: getStageNotes('Preliminary')
      }])
      forOwn(stage, (value, key) => {
        if (key.includes('phasePayment_')) {
          if ((Number(value) > 0)) {
            stageList.push({
                name: STAGES[(Number(key.slice(-1))-1)],
                key: key.slice(-1),
                checked: true,
                amount: value,
                status: stage[`phaseStatus_${key.slice(-1)}`],
                notes: getStageNotes(STAGES[(Number(key.slice(-1))-1)])
            });
          }
        }
      });
      setStages(stageList);
    }
  }, [props.caseManagement.notes]); */

  useEffect(() => {
    const notesList = [];
    props?.caseManagement?.notes?.map((note) => {
      notesList.push({
        type: note.status === "0" ? "individual" : "lawyer",
        value: note.notes,
        dateTime: moment(new Date(note.created)).format("DD-MM-YYYY, h:mm a"),
        stage: note.phaseName,
      });
    });
    setCaseNotes(notesList);
    if (!isEmpty(props.caseManagement.stage)) {
      const { stage: propsStage } = props.caseManagement;
      const [stage] = propsStage;
      const stageStatus = get(stage, "status", "requested");
      if (stageStatus === "proposed" || stageStatus === "requested") {
        setState({
          isStage1Checked: Number(stage.phasePayment_1) > 0,
          isStage2Checked: Number(stage.phasePayment_2) > 0,
          isStage3Checked: Number(stage.phasePayment_3) > 0,
          isStage4Checked: Number(stage.phasePayment_4) > 0,
          isStage5Checked: Number(stage.phasePayment_5) > 0,
          isStage6Checked: Number(stage.phasePayment_6) > 0,
          isStage7Checked: Number(stage.phasePayment_7) > 0,
          isStage8Checked: true,
        });
        setAmount1(stage.phasePayment_1);
        setAmount2(stage.phasePayment_2);
        setAmount3(stage.phasePayment_3);
        setAmount4(stage.phasePayment_4);
        setAmount5(stage.phasePayment_5);
        setAmount6(stage.phasePayment_6);
        setAmount7(stage.phasePayment_7);
        setAmount8(stage.phasePayment_8);
      }
      const stageList = [];
      if (stageStatus === "accepted" || caseStatus === "archieved") {
        setPreliminaryNotes([
          {
            name: "Preliminary",
            status: 3,
            notes: getStageNotes("Preliminary", notesList),
          },
        ]);
        forOwn(stage, (value, key) => {
          if (key.includes("phasePayment_")) {
            if (Number(value) > 0) {
              stageList.push({
                name: STAGES[Number(key.slice(-1)) - 1],
                key: key.slice(-1),
                checked: true,
                amount: value,
                status: stage[`phaseStatus_${key.slice(-1)}`],
                notes: getStageNotes(
                  STAGES[Number(key.slice(-1)) - 1],
                  notesList
                ),
              });
            }
          }
        });
        setStages(stageList);
      }
      setCaseStatus(stageStatus);
    } else {
      setCaseStatus("requested");
    }
    if (props.caseManagement.error) {
      props.snackbarsActions.showErrorSnackbarAction(props.caseManagement.error);
      props.CaseManagementActions.clearError({});
    }
    if (props.caseManagement.success) {
      props.snackbarsActions.showSuccessSnackbarAction(props.caseManagement.success);
      props.CaseManagementActions.clearError({});
    }
  }, [props.caseManagement]);

  const handleStageCloseConfirm = (stageName, key, currentStageFees) => {
    setStageName(stageName);
    setStageKey(key);
    setStageCloseConfirm(true);
    setCurrentStageFeed(currentStageFees);
  };

  const handleSaveNodes = () => {
    let m = moment(new Date());
    let date = m.utc().format();
    if (notesToClient === "") {
      setIsValidNotes(false);
    } else {
      const {
        selectedCaseInfo: {
          clientId,
          caseId,
          lawyerName,
          clientName,
          lawyerId,
          companyId,
          companyName
        },
      } = props.caseManagement;
      //const { id: lawyerId } = props.userInfo;
      props.CaseManagementActions.saveCaseNotes({
        caseId,
        clientId,
        companyId,
        lawyerId,
        clientName: clientId == 0 ? "" : clientName,
        companyName: clientId == 0 ? companyName : "",
        lawyerName: lawyerName,
        notes: notesToClient,
        status: 1,
        phaseName: "Preliminary",
        created: date,
      });
      let notidata = {
        notification: notesToClient,
        created: date,
        caseId: caseId,
        fromId: lawyerId,
        fromName: lawyerName,
        toId: clientId == 0 ? companyId : clientId,
        toName: clientId == 0 ? companyName : clientName,
        type: clientId != 0 ? "individual" : "clientfirm",
        status: "notes",
        notificationStatus: 4,
        readByUser: "No"
      }
      props.CaseManagementActions.sendNotification(notidata);
      setIsValidNotes(true);
      setNotesToClient("");
    }
  };


  const handleAcceptCase = async () => {
    const {
      selectedCaseInfo,
      stage,
    } = props.caseManagement;
    let isValidStageData = true;
    let checkedCount = 0;
    if (state.isStage1Checked && (amount1 === "" || isNaN(Number(amount1)) || amount1.indexOf('.') > 0)) {
      isValidStageData = false;
      setIsValidAmount1(false);
    }
    if (state.isStage2Checked && (amount2 === "" || isNaN(Number(amount2)) || amount2.indexOf('.') > 0)) {
      isValidStageData = false;
      setIsValidAmount2(false);
    }
    if (state.isStage3Checked && (amount3 === "" || isNaN(Number(amount3)) || amount3.indexOf('.') > 0)) {
      isValidStageData = false;
      setIsValidAmount3(false);
    }
    if (state.isStage4Checked && (amount4 === "" || isNaN(Number(amount4)) || amount4.indexOf('.') > 0)) {
      isValidStageData = false;
      setIsValidAmount4(false);
    }
    if (state.isStage5Checked && (amount5 === "" || isNaN(Number(amount5)) || amount5.indexOf('.') > 0)) {
      isValidStageData = false;
      setIsValidAmount5(false);
    }
    if (state.isStage6Checked && (amount6 === "" || isNaN(Number(amount6)) || amount6.indexOf('.') > 0)) {
      isValidStageData = false;
      setIsValidAmount6(false);
    }
    if (state.isStage7Checked && (amount7 === "" || isNaN(Number(amount7)) || amount7.indexOf('.') > 0)) {
      isValidStageData = false;
      setIsValidAmount7(false);
    }
    if (state.isStage8Checked && (amount8 === "" || isNaN(Number(amount8)) || amount8.indexOf('.') > 0)) {
      isValidStageData = false;
      setIsValidAmount8(false);
    }
    forOwn(state, (value) => {
      if (value) checkedCount += 1;
    });
    if (checkedCount === 0) {
      props.snackbarsActions.showErrorSnackbarAction(
        "Please select at least 1 stage"
      );
    }
    if (isValidStageData && checkedCount > 0) {

      let m = moment(new Date());
      let date = m.utc().format();
      let acceptData = {
        id: stage[0]?.id,
        caseId: selectedCaseInfo.caseId,
        lawyerId: selectedCaseInfo.lawyerId,
        clientId: selectedCaseInfo.clientId,
        clientName: selectedCaseInfo.clientName,
        phaseName_1: "Pre filing stage",
        phaseName_2: "Filing and numbering stage",
        phaseName_3: "Summons stage",
        phaseName_4: "Written statement",
        phaseName_5: "Issues",
        phaseName_6: "Evidence",
        phaseName_7: "Arguments",
        phaseName_8: "Judgment",
        phaseStatus_1: 0,
        phaseStatus_2: 0,
        phaseStatus_3: 0,
        phaseStatus_4: 0,
        phaseStatus_5: 0,
        phaseStatus_6: 0,
        phaseStatus_7: 0,
        phaseStatus_8: 0,
        phasePayment_1: amount1,
        phasePayment_2: amount2,
        phasePayment_3: amount3,
        phasePayment_4: amount4,
        phasePayment_5: amount5,
        phasePayment_6: amount6,
        phasePayment_7: amount7,
        phasePayment_8: amount8,
        lawyerName: selectedCaseInfo.lawyerName,
        lawyer_proposed_date: date,
        statusArray: "requested,proposed",
        status: "proposed",
      }
      if (acceptBtnText === "I accept to appear on this case") {
        await props.CaseManagementActions.acceptCase(acceptData);
        let notidata = {
          notification: `Accepted to appear on your Case:  ${selectedCaseInfo.title}.Please review the proposal`,
          created: date,
          caseId: selectedCaseInfo.caseId,
          fromId: selectedCaseInfo.lawyerId,
          fromName: selectedCaseInfo.lawyerName,
          toId: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientId : selectedCaseInfo.companyId,
          toName: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientName : selectedCaseInfo.companyName,
          status: "pending",
          type: selectedCaseInfo.clientId != 0 ? "individual" : "clientfirm",
          notificationStatus: 2,
          readByUser: "No"

        }
        await props.CaseManagementActions.sendNotification(notidata);
      }
      else {
        await props.CaseManagementActions.acceptCase(acceptData);
        let notidata = {
          notification: `Updation of the Case Proposal : ${props.caseManagement.selectedCaseInfo.title}. Please review updated proposal`,
          created: date,
          caseId: selectedCaseInfo.caseId,
          fromId: selectedCaseInfo.lawyerId,
          fromName: selectedCaseInfo.lawyerName,
          toId: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientId : selectedCaseInfo.companyId,
          toName: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientName : selectedCaseInfo.companyName,
          status: "pending",
          type: props.caseManagement.selectedCaseInfo.clientId != 0 ? "individual" : "clientfirm",
          notificationStatus: 2,
          readByUser: "No"
        }
        await props.CaseManagementActions.sendNotification(notidata)
      }
    }

  };


  const handleSuccessStageClose = () => {
    setStageCloseConfirm(false);
    const { stage: propsStage } = props.caseManagement;
    const [stage] = propsStage;
    const tempStage = clone(stage);
    tempStage[`phaseStatus_${stageKey}`] = 2;
    /* const nextStages = getNextStageKey(stage, stageKey);
    if (!isEmpty(nextStages)) {
      tempStage[`phaseStatus_${nextStages[0]}`] = 1;
    // tempStage.status = 'requestedClosure';
    // tempStage.statusArray = `${tempStage.statusArray},requestedClosure`;
    }*/

    props.CaseManagementActions.acceptCase(tempStage);
  };

  const handleCancelStageClose = () => {
    setStageCloseConfirm(false);
  };

  const handleCloseDialog = () => {
    setStageCloseConfirm(false);
  };

  const viewCaseFile = (fileInfo) => {
    const {
      selectedCaseInfo: { caseId },
    } = props.caseManagement;
    const { filePath } = fileInfo;
    props.CaseManagementActions.getCaseFile({
      caseId,
      fileName: filePath,
    });
  };

  const getCaseFile = () => {
    const {
      selectedCaseInfo: { lawyerId },
    } = props.caseManagement;
    console.log("getCaseFile   ====>>> ")
    const data = {
      id: lawyerId,
      type: "lawyer"
      // roleId: 5,
    };
    props.CaseManagementActions.getCaseListAction(data);
  };


  const acceptBtnText =
    caseStatus === "requested"
      ? "I accept to appear on this case"
      : "Update the proposal";
  const {
    selectedCaseInfo: { clientGender }, caseFiles,
  } = props.caseManagement;

  const {
    selectedCaseInfo: { caseId },
  } = props.caseManagement;

  return (
    <div>
      <Header links={<HeaderLinks {...props} />} fixed color="primary" />
      <Box className="connect-container-first" component="div" display="block">
        <Typography variant="h5" gutterBottom align="center">
          Case Inquiry
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
        className="lawyer-connent-container-second"
        component="div"
        display="block"
      >
        <Paper variant="outlined" className="card-container">
          <Paper className="user-info-container">
            <Paper className="name-title-container">
              <Typography
                className="name"
                variant="h5"
                gutterBottom
                align="center"
              >
                {clientGender}. {clientName}
              </Typography>
              {/* {(caseStatus === "accepted" || caseStatus === "archieved") && (
                <React.Fragment>
                  <Typography
                    className="experience"
                    variant="subtitle1"
                    gutterBottom
                    align="center"
                  >
                    #1 Vadapalani, Chennai, Tamilnadu, India - 600 100
                  </Typography>
                  <Typography
                    className="experience"
                    variant="subtitle1"
                    gutterBottom
                    align="center"
                  >
                    Phone: 7395986791 | Email - Urvasi@NayakLegal.com
                  </Typography>
                </React.Fragment>
              )} */}
            </Paper>
            <Avatar alt="Remy Sharp" src={face} className={classes.large} />
          </Paper>
          <Paper className="case-info-container">
            <Box className="case-info-sub-container">
              <Typography
                className="label"
                variant="subtitle1"
                gutterBottom
                align="center"
              >
                Title
              </Typography>
              <Typography
                className="input-field"
                variant="subtitle1"
                gutterBottom
                align="center"
              >
                {title}
              </Typography>
            </Box>
            <Box className="case-info-sub-container">
              <Typography
                className="label"
                variant="subtitle1"
                gutterBottom
                align="center"
              >
                Description
              </Typography>
              <div className="description-container">
                <Typography
                  className="description-input-field"
                  variant="subtitle1"
                  gutterBottom
                  align="center"
                >
                  {description}
                </Typography>
              </div>
            </Box>
            <Box className="case-info-sub-container">
              <Typography
                className="label"
                variant="subtitle1"
                gutterBottom
                align="center"
              >
                Product
              </Typography>
              <TextField
                className="input-field"
                size="small"
                variant="outlined"
                value={product}
                inputProps={{ readOnly: true }} />
              {/* <Select
                className="input-field"
                value={product}
                onChange={handleProductChange}
                variant="outlined"
                inputProps={{ readOnly: true }}
              >
                {productList.map((eachProduct) => {
                  return (
                    <option value={eachProduct.value}>
                      {eachProduct.name}
                    </option>
                  );
                })}
              </Select> */}
            </Box>
            <Box className="case-info-sub-container">
              <Typography
                className="label"
                variant="subtitle1"
                gutterBottom
                align="center"
              >
                Sub Product
              </Typography>
              {/* <TextField className="input-field" size="small" variant="outlined" /> */}
              {/* <Select
                className="input-field"
                value={subProduct}
                onChange={handleSubProductChange}
                variant="outlined"
                inputProps={{ readOnly: true }}
              >
                {supProductList.map((eachSubProduct) => {
                  return (
                    <option value={eachSubProduct.value}>
                      {eachSubProduct.name}
                    </option>
                  );
                })}
              </Select> */}
              <TextField
                className="input-field"
                size="small"
                variant="outlined"
                value={subProduct}
                inputProps={{ readOnly: true }} />
            </Box>
            <Box className="case-info-sub-container">
              <Typography
                className="label"
                variant="subtitle1"
                gutterBottom
                align="center"
              >
                Court
              </Typography>
              {/* <TextField className="input-field" size="small" variant="outlined" /> */}
              {/* <Select
                className="input-field"
                value={subProduct}
                onChange={handleSubProductChange}
                variant="outlined"
                inputProps={{ readOnly: true }}
              >
                {supProductList.map((eachSubProduct) => {
                  return (
                    <option value={eachSubProduct.value}>
                      {eachSubProduct.name}
                    </option>
                  );
                })}
              </Select> */}
              <TextField
                className="input-field"
                size="small"
                variant="outlined"
                value={court}
                inputProps={{ readOnly: true }} />
            </Box>
            <Box className="case-info-sub-container first-notes-container">
              <Typography
                className="label"
                variant="subtitle1"
                gutterBottom
                align="center"
              ></Typography>
              <div className="input-field picker-container">
                <div className="lawyer-file-container">
                  {caseFiles?.length > 0 &&
                    <Typography variant="caption" display="block" gutterBottom>
                      Preview: <strong>Supporting Document</strong>
                    </Typography>
                  }

                  <Typography variant="caption" display="block" gutterBottom>
                    Refresh <RefreshIcon onClick={() => getCaseFile()}></RefreshIcon>
                  </Typography>

                  <div className="preview-container">
                    {(caseFiles?.filter(cases => (cases?.caseId == caseId)))?.map((selectedCase) => (

                      // console.log(selectedCase,caseId)
                      selectedCase?.caseFiles?.map((caseFile) => (
                        <Avatar
                          className="img-view"
                          variant="rounded"
                          onClick={() => viewCaseFile(caseFile)}
                        >
                          <AssignmentIcon />
                        </Avatar>
                      ))))}
                  </div>
                </div>
                <div className="lawyer-acknowledge-container">
                  <Typography variant="h6" display="block" gutterBottom>
                    Acknowledgement Due by
                  </Typography>
                  <div className="input-field picker-container">
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
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              </div>
            </Box>
            {(caseStatus === "requested" || caseStatus === "proposed") && (
              <React.Fragment>
                {caseNotes.map((notes) => (
                  <NotesText notes={notes} isLawyer={true} />
                ))}
                <Box className="case-info-sub-container">
                  <Typography
                    className="label"
                    variant="subtitle1"
                    gutterBottom
                    align="center"
                  >
                    Initial Comment (Preliminary)
                  </Typography>
                  <div className="notes-container">
                    <TextField
                      error={!isValidNotes}
                      className="notes-field"
                      size="small"
                      multiline
                      rows={8}
                      onChange={handleNotesChange}
                      variant="outlined"
                      value={notesToClient}
                    />
                  </div>
                </Box>
                <Box className="case-info-sub-container send-message-container">
                  <Button variant="contained" onClick={handleSaveNodes}>
                    <span>Send Message</span>
                  </Button>
                </Box>
              </React.Fragment>
            )}
            {(caseStatus === "requested" || caseStatus === "proposed") && (
              <React.Fragment>
                <Box className="case-info-sub-container">
                  <Typography
                    className="label"
                    variant="subtitle1"
                    gutterBottom
                    align="center"
                  >
                    Propose these Stages
                  </Typography>
                  <Box className="input-field">
                    <Typography variant="caption" display="block" gutterBottom>
                      (Select atleast one phase and set the corresponding
                      amount)
                    </Typography>
                    <Box className="stage-container">
                      <Box className="stage-box-1">
                        <Box className="stage-check-field">
                          <Box></Box>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              Fees Per Stage ( INR )
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="stage-check-field">
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={state.isStage1Checked}
                                  onChange={handleChange}
                                  name="isStage1Checked"
                                  color="primary"
                                />
                              }
                              label="Pre filing stage "
                            />
                          </Box>
                          <Box>
                            <TextField
                              error={!isValidAmount1}
                              value={amount1}
                              inputProps={{ className: classes.input, pattern: "[0-9]{1,15}", variant: "outlined" }}
                              onChange={handleAmount1Change}
                              className="input-field"
                              size="small"
                              variant="outlined"
                              placeholder="Enter Only Numbers"
                            />
                          </Box>
                        </Box>
                        <Box className="stage-check-field">
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={state.isStage2Checked}
                                  onChange={handleChange}
                                  name="isStage2Checked"
                                  color="primary"
                                />
                              }
                              label="Filing and numbering stage"
                            />
                          </Box>
                          <Box>
                            <TextField
                              error={!isValidAmount2}
                              value={amount2}
                              inputProps={{ className: classes.input, pattern: "[0-9]{1,15}", variant: "outlined" }}
                              onChange={handleAmount2Change}
                              className="input-field"
                              size="small"
                              variant="outlined"
                              placeholder="Enter Only Numbers"
                            />
                          </Box>
                        </Box>
                        <Box className="stage-check-field">
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={state.isStage3Checked}
                                  onChange={handleChange}
                                  name="isStage3Checked"
                                  color="primary"
                                />
                              }
                              label="Summons  stage "
                            />
                          </Box>
                          <Box>
                            <TextField
                              error={!isValidAmount3}
                              value={amount3}
                              inputProps={{ className: classes.input, pattern: "[0-9]{1,15}", variant: "outlined" }}
                              onChange={handleAmount3Change}
                              className="input-field"
                              size="small"
                              variant="outlined"
                              placeholder="Enter Only Numbers"
                            />
                          </Box>
                        </Box>
                        <Box className="stage-check-field">
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={state.isStage4Checked}
                                  onChange={handleChange}
                                  name="isStage4Checked"
                                  color="primary"
                                />
                              }
                              label="Written statement "
                            />
                          </Box>
                          <Box>
                            <TextField
                              error={!isValidAmount4}
                              value={amount4}
                              inputProps={{ className: classes.input, pattern: "[0-9]{1,15}", variant: "outlined" }}
                              onChange={handleAmount4Change}
                              className="input-field"
                              size="small"
                              variant="outlined"
                              placeholder="Enter Only Numbers"
                            />
                          </Box>
                        </Box>
                        <Box className="stage-check-field">
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={state.isStage5Checked}
                                  onChange={handleChange}
                                  name="isStage5Checked"
                                  color="primary"
                                />
                              }
                              label="Issues"
                            />
                          </Box>
                          <Box>
                            <TextField
                              error={!isValidAmount5}
                              value={amount5}
                              inputProps={{ className: classes.input, pattern: "[0-9]{1,15}", variant: "outlined" }}
                              onChange={handleAmount5Change}
                              className="input-field"
                              size="small"
                              variant="outlined"
                              placeholder="Enter Only Numbers"
                            />
                          </Box>
                        </Box>
                        <Box className="stage-check-field">
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={state.isStage6Checked}
                                  onChange={handleChange}
                                  name="isStage6Checked"
                                  color="primary"
                                />
                              }
                              label="Evidence"
                            />
                          </Box>
                          <Box>
                            <TextField
                              error={!isValidAmount6}
                              value={amount6}
                              inputProps={{ className: classes.input, pattern: "[0-9]{1,15}", variant: "outlined" }}
                              onChange={handleAmount6Change}
                              className="input-field"
                              size="small"
                              variant="outlined"
                              placeholder="Enter Only Numbers"
                            />
                          </Box>
                        </Box>
                        <Box className="stage-check-field">
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={state.isStage7Checked}
                                  onChange={handleChange}
                                  name="isStage7Checked"
                                  color="primary"
                                />
                              }
                              label="Arguments"
                            />
                          </Box>
                          <Box>
                            <TextField
                              error={!isValidAmount7}
                              value={amount7}
                              inputProps={{ className: classes.input, pattern: "[0-9]{1,15}", variant: "outlined" }}
                              onChange={handleAmount7Change}
                              className="input-field"
                              size="small"
                              variant="outlined"
                              placeholder="Enter Only Numbers"
                            />
                          </Box>
                        </Box>
                        <Box className="stage-check-field">
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={state.isStage8Checked}
                                  disabled={true}
                                  onChange={handleChange}
                                  name="isStage8Checked"
                                  color="primary"
                                />
                              }
                              label="Judgment"
                            />
                          </Box>
                          <Box>
                            <TextField
                              error={!isValidAmount8}
                              value={amount8}
                              inputProps={{ className: classes.input, pattern: "[0-9]{1,15}", variant: "outlined" }}
                              onChange={handleAmount8Change}
                              className="input-field"
                              size="small"
                              variant="outlined"
                              placeholder="Enter Only Numbers"
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box className="stage-box-2">
                        <Typography variant="h6" gutterBottom>
                          Help Section.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          What are these Stages?
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          LAWE Platform has come up with these 8 generic stages
                          for each potential case.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          You could select the necessary stages and add amount
                          per stage as a reminder.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          After mutual consent, these selected phases would form
                          the case management structure to track each stages and
                          its notes.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Comments / Notes - This section is for private Client
                          - Laywer - notes exchange in a secure way and for your
                          private reference.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="case-info-sub-container send-message-container">
                  <Button variant="contained" onClick={handleAcceptCase}>
                    <span>{acceptBtnText}</span>
                  </Button>
                </Box>
              </React.Fragment>
            )}
            {(caseStatus === "accepted" || caseStatus === "archieved") && (
              <React.Fragment>
                <Box className="case-info-sub-container">
                  <Typography
                    className="label"
                    variant="subtitle1"
                    gutterBottom
                    align="center"
                  >
                    Mutually agreed Stages
                  </Typography>
                  <Box className="input-field">
                    <Typography variant="body2" display="block" gutterBottom>
                      ( Case management work flow would use these phases for
                      notes, comments, reminders for payment between Client /
                      Lawyer)
                    </Typography>
                    <Box className="stage-container">
                      <Box className="stage-box-1">
                        <Box className="stage-check-field stage-proposed-field">
                          <Box>
                            <Typography variant="h6" gutterBottom></Typography>
                          </Box>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              Fees Per Stage ( INR )
                            </Typography>
                          </Box>
                          <Box></Box>
                        </Box>
                        {stages.map((stage) => (
                          <AcceptedStageField
                            stage={stage}
                            handleStageCloseConfirm={handleStageCloseConfirm}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* <Box className="stage-card-container">
                  {preliminaryNotes.map((stage) => (
                    <StageNotesCard
                      caseNotes={stage.notes}
                      title={stage.name}
                      status={stage.status}
                      isLawyer={true}
                      handleSendMessage={handleSendStageNotes}
                    />
                  ))}
                  {stages.map((stage) => (
                    <StageNotesCard
                      caseNotes={stage.notes}
                      title={stage.name}
                      status={stage.status}
                      isLawyer={true}
                      handleSendMessage={handleSendStageNotes}
                    />
                  ))}
                </Box> */}
              </React.Fragment>
            )}
          </Paper>
        </Paper>
      </Box>
      <Backdrop className={classes.backdrop} open={props.isLoading}>
        <CircularProgress className={classes.progressbar} size={100} />
      </Backdrop>
      <ResponsiveDialog
        title="Please Confirm - Stage Phase Closure"
        content={`Are you sure you want to mark “${stageName}” as complete and you acknowledge that the planned  INR ${currentStageFees} recepit is handled by you or your office?`}
        okText="Yes, This Phase is complete"
        cancelText="No, Do not make any change"
        isOpen={stageCloseConfirm}
        handleClose={handleCloseDialog}
        handleOk={handleSuccessStageClose}
        handleCancel={handleCancelStageClose}
      />
      <Footer />
    </div>
  );
}

export class LawyerCaseAccept extends Component<Props> {
  componentDidMount() {
    const {
      CaseManagementActions,
      caseManagement: { selectedCaseInfo }
    } = this.props;
    const getCaseInfoData = {
      caseId: selectedCaseInfo.caseId,
      lawyerId: selectedCaseInfo.lawyerId,
      clientId: selectedCaseInfo.clientId
      // lawyerId: 654
    };
    CaseManagementActions.getCaseNotes(getCaseInfoData);
    CaseManagementActions.getCaseStage(getCaseInfoData);
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
      if (link) window.open(link, "_blank");
    }
  }
  handleBack = (status:string) => {
    if (status === "platformadmin") {
      this.props.history.push(`/platform-admin-dashboard`);
    }
    else
      this.props.history.push(`/dashboard`);
  }

  render() {
    const {
      userName,
      CaseManagementActions,
      isLoading,
      userInfo,
      caseManagement,
      loginActions,
      snackbarsActions,
      lawCategory,
      commonActions,
      subCategory,
      notifications,
      remainders, appointments,
      basicInfo,
      caseList,
      status
    } = this.props;
    return (
      <React.Fragment>
        <CaseManagement
          userName={userName}
          CaseManagementActions={CaseManagementActions}
          isLoading={isLoading}
          userInfo={userInfo}
          caseManagement={caseManagement}
          snackbarsActions={snackbarsActions}
          loginActions={loginActions}
          lawCategory={lawCategory}
          commonActions={commonActions}
          subCategory={subCategory}
          notifications={notifications}
          remainders={remainders}
          appointments={appointments}
          handleBack={()=>{this.handleBack(status)}}
          basicInfo={basicInfo}
          caseList={caseList}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userName: state.loginForm.userName,
  userInfo: state.loginForm.userInfo,
  status: state.loginForm.status,
  isLoading: state.caseManagement.loading || state.commonReducer.loading,
  caseManagement: state.caseManagement,
  lawCategory: state.commonReducer.lawCategory,
  categoryLoading: state.commonReducer.loading,
  subCategory: state.commonReducer.subCategory,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
  basicInfo: state.commonReducer.basicInfo,
  caseList: state.dashboard.caseList,
});

function mapDispatchToProps(dispatch: any) {
  return {
    CaseManagementActions: bindActionCreators(
      CaseManagementActions as any,
      dispatch
    ),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
    loginActions: bindActionCreators(LoginActions as any, dispatch),
    commonActions: bindActionCreators(CommonActions as any, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LawyerCaseAccept);

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import { filter, forOwn, get, isEmpty, isEqual } from "lodash";
import { STAGES } from "../../../assets/constant/stage";
import ResponsiveDialog from "../../../components/ClouserDialog/ClouserDialog";
import clone from "lodash/clone";
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withRouter } from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "1rem",
    paddingBottom: "1.5rem",
  },
  caseInfoContainer: {
    // padding: "0 50px",
    margin: "auto",
    boxShadow: "none",
    // width: "70%",
  },
  // caseInfoSubContainer: {
  //   display: "flex",
  //   alignItems: "unset",
  //   padding: "5px 10px",
  //   width: "100%",
  // },
  previewContainer: {
    marginBottom: "2rem",
    display: "flex",
    alignItems: "unset",
    padding: "5px 10px",
    justifyContent: "center",
  },
  uploadContainer: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem"
  },
  uploadbtnContainer: {
    minWidth: "150px",
    height: "40px",
    fontSize: "0.975rem",
    textTransform: "none",
    color: "#292734",
    backgroundColor: "#FFC602",
    "&:hover": {
      color: "#292734",
      backgroundColor: "#FFC602"
    },
    "&span": {
      color: "#292734"
    },
  },
  label: {
    textTransform: "unset",
    textAlign: "justify",
    flex: 1,
    padding: "0 10px",
    color: "#666464",
    fontFamily: "Titillium",
    fontSize: "0.875rem",
    fontWeight: "bold",
    letterSpacing: 0,
    lineHeight: "29px",
  },
  inputField: {
    flex: 3,
    textTransform: "unset",
    textAlign: "left",
    backgroundColor: "#F3F2EF",
    padding: "10px",
  },
  inputStageField: {
    width: "80%",
    flex: 4,
    textTransform: "unset",
    textAlign: "left",
  },
  imgPreviewContainer: {
    display: "flex",
  },
  imgView: {
    height: "75px",
    width: "75px",
    marginRight: "5px",
    border: "1px solid #979797",
    backgroundColor: "#4caf50",
    cursor: "pointer",
  },
  stageContainer: {
    // display: "flex",
    margin: "1rem 0",
  },
  stageBox1: {
    flex: 2,
    marginRight: "1rem",
  },
  stageCheckField: {
    // display: "flex",
    // alignItems: "center",
    justifyContent: "unset",
    margin: "0.5rem 0",
  },
  stageInput: {
    // flex: 3,
    textTransform: "unset",
    textAlign: "left",
    width: "250px",
    // marginRight: "",
    // backgroundColor:"red"

  },
  featureStage: {
    height: "40px",
    fontSize: "0.875rem",
    textTransform: "none",
    color: "#292734",
    backgroundColor: "#EFE2B5",
    width: "290px",
    "&:hover": {
      color: "#292734",
      backgroundColor: "#EFE2B5",
    },
    "&span": {
      color: "#292734",
    },

  },
  inprogressStage: {
    height: "40px",
    fontSize: "0.875rem",
    textTransform: "none",
    color: "#292734",
    backgroundColor: "#CEF8C9",
    justify: "d-flex justify-content-start",
    width: "290px",
    "&:hover": {
      color: "#292734",
      backgroundColor: "#CEF8C9",
    },
    span: {
      color: "#292734",
    },
  },
  completedStage: {
    height: "40px",
    fontSize: "0.875rem",
    textTransform: "none",
    color: "#292734",
    backgroundColor: "#ffc9cb",
    width: "290px",
    "&:hover": {
      color: "#292734",
      backgroundColor: "#ffc9cb",
    },
    span: {
      color: "#292734",
    },
  },
  approveClosureBox: {
    marginLeft: "1rem",
  },
  approveClosure: {
    height: "40px",
    fontSize: "0.875rem",
    textTransform: "none",
    justify: "d-flex justify-content-start",
    color: "#292734",
    backgroundColor: "#FFC602",
    width: "200px",
    "&:hover": {
      color: "#292734",
      backgroundColor: "#FFC602",
    },
    "&:disabled": {
      color: "rgba(0, 0, 0, 0.26)",
      boxShadow: "none",
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      pointerEvents: "all",
      cursor: "not-allowed",
    },
    "& span": {
      color: "#292734",
    },
  },
  title: {
    width: "50px",
    fontSize: "1rem",
    textTransform: "unset",
    marginRight: "2rem",
  },
  // stageCheck: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "unset",
  //   // margin: "0.5rem 0",
  // },
}));

export function AcceptedStage(props) {
  console.log(props);
  const classes = useStyles();
  const handleStageCloseConfirm = () => {
    props.handleStageCloseConfirm(
      props.stage.name,
      props.stage.key,
      props.stage.amount
    );
  };
  const handleClientStageCloseConfirm = () => {
    props.handleClientStageCloseConfirm(
      props.stage.name,
      props.stage.key,
      props.stage.amount
    );
  }

  return (
    // <Box className={classes.stageCheck}>
    <Box className="stageCheck">

      <Box className={classes.stageInput} style={{ paddingBottom: "10px" }}>
        <Typography gutterBottom >
          {props.stage.name}
        </Typography>
      </Box>
      <div style={{ width: "150px", paddingBottom: "10px", paddingRight: "10px", marginRight:"70px" }} >
        <Box className={classes.stageInput}>
          <TextField
            disabled={true}
            size="small"
            variant="outlined"
            value={props.stage.amount}
          />
        </Box>
      </div>
      <div style={{ width: "500px", paddingBottom: "10px" }} className="d-flex justify-content-start">
        {props.stage.status === 0 && (
          <Box>
            <Button variant="contained" className={classes.featureStage}>
              <span>Future Phase</span>
            </Button>
          </Box>
        )}
        {props.stage.status === 1 && props.isClient && (
          <Box >
            <Button variant="contained" className={classes.inprogressStage}>
              <span>In Progress</span>
            </Button>
          </Box>
        )}
        {props.stage.status === 1 && !props.isClient && (
          <div className="row d-flex justify-content-start">
            <div className="col d-flex justify-content-start">

              <Button variant="contained" className={classes.inprogressStage}>
                <span className="d-flex justify-content-start">In Progress</span>
              </Button>

            </div>
            {props.caseStatus!="reassign_pending" && (<div className="col d-flex justify-content-start">
              <Button variant="contained" onClick={handleStageCloseConfirm} className={classes.approveClosure}>
                <span className="d-flex justify-content-start">Mark Complete</span>
              </Button>
            </div>)}
            {props.caseStatus=="reassign_pending" && (<div className="col d-flex justify-content-start">
              <Button variant="contained" disabled={true} className={classes.approveClosure}>
                <span className="d-flex justify-content-start">Mark Complete</span>
              </Button>
            </div>)}

          </div>
        )}

        {props.stage.status === 2 && !props.isClient && (
          <div className="row d-flex justify-content-start">
            <div className="col d-flex justify-content-start">

              <Button variant="contained" className={classes.inprogressStage}>
                <span className="d-flex justify-content-start">Agree Stage Completion</span>
              </Button>

            </div>
            <div className="col d-flex justify-content-start">
              <Button variant="contained" disabled={true} className={classes.approveClosure}>
                <span className="d-flex justify-content-start">Mark Complete</span>
              </Button>
            </div>
          </div>
        )}
        {props.stage.status === 2 && props.isClient && (
          <div className="row d-flex justify-content-start">
            <div className="col d-flex justify-content-start">
              <Button variant="contained" className={classes.inprogressStage}>
                <span className="d-flex justify-content-start">Agree Stage Completion</span>
              </Button>
            </div>
            {props.caseStatus!="reassign_pending" && (<div className="col d-flex justify-content-start">
              <Button variant="contained" onClick={handleClientStageCloseConfirm} className={classes.approveClosure}>
                <span className="d-flex justify-content-start">Approve Closure</span>
              </Button>
            </div>)}
            {props.caseStatus=="reassign_pending" && (<div className="col d-flex justify-content-start">
              <Button variant="contained" disabled={true} className={classes.approveClosure}>
                <span className="d-flex justify-content-start">Approve Closure</span>
              </Button>
            </div>)}
          </div>
        )}
        {props.stage.status === 3 && (
          <Box >
            <Button variant="contained" className={classes.completedStage}>
              <span>Completed</span>
            </Button>
          </Box>
        )}


      </div>
    </Box>
  );
}

export const _CaseStatus = (props: any) => {

  const [uploadFileResponse, setUploadFileResponse] = useState(false);
  useEffect(() => {
    const { selectedCaseInfo } = props.caseManagement;
    refreshList(selectedCaseInfo.caseId);
  }, []);

  const refreshList = (caseId: number) => {
    props.CaseManagementActions.getCaseDocuments({
      caseId: caseId,
      parentId: 9,
    });
  };


  useEffect(() => {
    const { selectedCaseInfo } = props.caseManagement;
    refreshList(selectedCaseInfo.caseId);
  }, []);
  const classes = useStyles();
  const [product, setProduct] = useState("");
  const [subProduct, setSubProduct] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const [stages, setStages] = useState([]);
  const [stageName, setStageName] = useState("");
  const [stageKey, setStageKey] = useState(0);
  const [currentStageFees, setCurrentStageFeed] = useState(0);
  const [stageCloseConfirm, setStageCloseConfirm] = useState(false);
  const [stageClientCloseConfirm, setClientStageCloseConfirm] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isJudgement, setIsJudgement] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [show, setShow] = useState(false);
  const [upload, setUpload] = useState(false);
  const [status,setStatus] = useState();
  useEffect(() => {
    const {
      selectedCaseInfo: { product, subproduct, description, title, clientName, companyName,status },
    } = props.caseManagement;
    const isClien = (props.userInfo["status"] == "individual" || props.userInfo["status"] == "clientfirm") ? true : false;
    setIsClient(isClien);
    const name = props.userInfo["status"] == "clientfirm" ? companyName : clientName;
    setClientName(name);
    setTitle(title);
    setProduct(product);
    setSubProduct(subproduct);
    setDescription(description);
    setStatus(status);
    console.log(props.caseManagement.selectedCaseInfo);
  }, []);

  useEffect(() => {
    const notesList = [];
    props.caseManagement?.notes?.map((note) => {
      notesList.push({
        type: note.status === "0" ? "individual" : "lawyer",
        value: note.notes,
        dateTime: moment(new Date(note.created)).format("DD-MM-YYYY, h:mm a"),
        stage: note.phaseName,
      });
    });
    // setCaseNotes(notesList);
    if (!isEmpty(props.caseManagement.stage)) {
      const { stage: propsStage } = props.caseManagement;
      const [stage] = propsStage;
      const stageStatus = get(stage, "status", "requested");
      const stageList = [];
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
      setCaseStatus(stageStatus);
    } else {
      setCaseStatus("requested");
    }
  }, [props.caseManagement]);

  const handleStageCloseConfirm = (stageName, key, currentStageFees) => {
    setStageName(stageName);
    setStageKey(key);
    setCurrentStageFeed(currentStageFees);
    setStageCloseConfirm(true);
  };
  const handleClientStageCloseConfirm = (stageName, key, currentStageFees) => {
    setStageName(stageName);
    setStageKey(key);
    setClientStageCloseConfirm(true);
  };

  const handleSuccessStageClose = async () => {
    let m = moment(new Date());
    let date = m.utc().format();
    setStageCloseConfirm(false);
    const { stage: propsStage } = props.caseManagement;
    const [stage] = propsStage;
    const tempStage = clone(stage);
    tempStage[`phaseStatus_${stageKey}`] = 2;
    const {
      selectedCaseInfo
    } = props.caseManagement;
    if (tempStage[`phaseName_${stageKey}`] === "Judgment") {
      setIsJudgement(true)
    }
    else {
      const param = {
        invoiceNo: Math.floor(Math.random() * 90000) + 10000,
        caseId: selectedCaseInfo.caseId,
        clientName: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientName : selectedCaseInfo.companyName,
        clientId: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientId : selectedCaseInfo.companyId,
        phaseName: tempStage[`phaseName_${stageKey}`],
        amount: tempStage[`phasePayment_${stageKey}`],
        type: selectedCaseInfo.clientId != 0 ? "individual" : "clientfirm",
      }
      await props.CaseManagementActions.createInvoice(param);
      await props.CaseManagementActions.acceptCase(tempStage);
      let notidata = {
        notification: `Marked ${tempStage[`phaseName_${stageKey}`]} as COMPLETE for Case: ${props.caseManagement.selectedCaseInfo.title}.\n Requesting your Approval to Close the Stage`,
        created: date,
        caseId: selectedCaseInfo.caseId,
        fromId: selectedCaseInfo.lawyerId,
        fromName: selectedCaseInfo.lawyerName,
        toId: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientId : selectedCaseInfo.companyId,
        toName: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientName : selectedCaseInfo.companyName,
        status: "pending",
        type: selectedCaseInfo.clientId != 0 ? "individual" : "clientfirm",
        notificationStatus:3,
        readByUser:"No"
      }
      await props.CaseManagementActions.sendNotification(notidata)
    }
  };

  const handleCancelStageClose = () => {
    setStageCloseConfirm(false);
  };

  const handleCloseDialog = () => {
    setStageCloseConfirm(false);
  };

  const getStageNotes = (stage, notes) => filter(notes, { stage });

  const viewCaseFile = (fileInfo) => {
    const {
      selectedCaseInfo: { caseId },
    } = props.caseManagement;
    const { filePath } = fileInfo;
    props.CaseManagementActions.getCaseFile({
      caseId,
      fileName: filePath
    });
  };

  const handleClientSuccessStageClose = async () => {
    let m = moment(new Date());
    let date = m.utc().format();
    setClientStageCloseConfirm(false);
    const { stage: propsStage } = props.caseManagement;
    const {
      selectedCaseInfo: { caseId },
    } = props.caseManagement;
    const [stage] = propsStage;
    const tempStage = clone(stage);
    tempStage[`phaseStatus_${stageKey}`] = 3;
    tempStage[`phaseStatus_${stageKey}_completeddate`] = date;
    const nextStages = getNextStageKey(stage, stageKey);
    if (isEmpty(nextStages)) {
      if (tempStage[`phaseName_${stageKey}`] === 'Judgment') {
        tempStage.status = 'archieved';
        tempStage.statusArray = `${tempStage.statusArray},archieved`;
        tempStage.stages_completed = date;
        if (props.caseManagement.stage[0].caseResult === "Against") {
          setIsFail(true);
        }
        let data = {
          caseId: caseId
        }
        await props.CaseManagementActions.hideNotification(data)
      }
    } else {
      tempStage[`phaseStatus_${nextStages[0]}`] = 1;
      tempStage[`phaseStatus_${nextStages[0]}_date`] = date;
    }
    await props.CaseManagementActions.acceptCase(tempStage);
    let notidata = {
      notification: `Marked ${tempStage[`phaseName_${stageKey}`]} as COMPLETE for Case: ${props.caseManagement.selectedCaseInfo.title}.`,
      created: date,
      caseId: props.caseManagement.selectedCaseInfo.caseId,
      fromId: props.userInfo["status"] == "clientfirm" ? props.caseManagement.selectedCaseInfo.companyId : props.caseManagement.selectedCaseInfo.clientId,
      fromName: props.userInfo["status"] == "clientfirm" ? props.caseManagement.selectedCaseInfo.companyName : props.caseManagement.selectedCaseInfo.clientName,
      toId: props.caseManagement.selectedCaseInfo.lawyerId,
      toName: props.caseManagement.selectedCaseInfo.lawyerName,
      status: "pending",
      type: "lawyer",
      notificationStatus:3,
      readByUser:"No"
    }
    await props.CaseManagementActions.sendNotification(notidata)
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

  const handleClientCancelStageClose = () => {
    setClientStageCloseConfirm(false);
  }

  const handleClientCloseDialog = () => {
    setClientStageCloseConfirm(false);
  }
  const handleSuccessDialogClose = () => {
    setIsSuccess(false);
  }

  const handleUploadedFile = async ({ target }: any) => {

    const { selectedCaseInfo: { caseId } } = props.caseManagement;
    const [files] = target.files;
    const formData = new FormData();
    formData.append('file', files);
    setUpload(true)
    await props.CaseManagementActions.uploadCaseFileAction({ formData: formData, type: 'case', contenttype: files.type, folderId: 9, caseId });
    await props.CaseManagementActions.getCaseDocuments({
      caseId: caseId,
      parentId: 9,
    });
    setShow(true);
  }
  const handleCancelDialog = () => {
    setIsJudgement(false);
  }
  const handleSuccessDialog = async () => {
    let m = moment(new Date());
    let date = m.utc().format();
    const { stage: propsStage } = props.caseManagement;
    const [stage] = propsStage;
    const tempStage = clone(stage);
    const { selectedCaseInfo } = props.caseManagement;
    setIsJudgement(false);
    if (selectedOption === "For") {
      setIsSuccess(true)
    }
    if (selectedOption !== "") {
      tempStage[`phaseStatus_8`] = 2;
      tempStage[`caseResult`] = selectedOption;
      const param = {
        invoiceNo: Math.floor(Math.random() * 90000) + 10000,
        caseId: selectedCaseInfo.caseId,
        clientName: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientName : selectedCaseInfo.companyName,
        clientId: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientId : selectedCaseInfo.companyId,
        phaseName: tempStage[`phaseName_${stageKey}`],
        amount: tempStage[`phasePayment_${stageKey}`],
        type: selectedCaseInfo.clientId != 0 ? "individual" : "clientfirm",

      }

      await props.CaseManagementActions.createInvoice(param);
      await props.CaseManagementActions.acceptCase(tempStage);
      let notidata = {
        toId: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientId : selectedCaseInfo.companyId,
        toName: selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientName : selectedCaseInfo.companyName,
        type: selectedCaseInfo.clientId != 0 ? "individual" : "clientfirm",
        notification: `Marked ${tempStage[`phaseName_${stageKey}`]} as COMPLETE for Case: ${selectedCaseInfo.title}.\n Requesting your Approval to Close the Stage and make the CASE COMPLETE`,
        created: date,
        caseId: selectedCaseInfo.caseId,
        fromId: selectedCaseInfo.lawyerId,
        fromName: selectedCaseInfo.lawyerName,
        status: "pending",
        notificationStatus:3,
        readByUser:"No"
      }
      await props.CaseManagementActions.sendNotification(notidata)

      if (!upload) {
        let date = new Date();
        let e = moment(new Date());
        let newdate = e.utc().format();
        let datearr = []
        let deadline;
        for (let i = 0; i <= 9; i = i + 1) {
          let oneday = date.setDate(date.getDate() + 1);
          let day = moment(oneday);
          let remainderdate = day.utc().format();
          datearr.push(remainderdate)
          deadline = remainderdate
        }
        let dataRemainder = [];
        datearr.map(async (item) => {
          let remainderdata = {
            taskName: `Please upload the Judgment for Case : ${props.caseManagement.selectedCaseInfo.title}`,
            created: newdate,
            caseId: props.caseManagement.selectedCaseInfo.caseId,
            userId: props.userInfo.id,
            userName: props.userInfo.userName,
            remainderDate: item,
            deadlineDate: deadline,
            type: props.userInfo.status,
          }
          dataRemainder.push(remainderdata)

        });
        await props.CaseManagementActions.saveCaseRemainders(dataRemainder);
      }
    }
  }



  const onValueChange = (event) => {
    setSelectedOption(event.target.value);
  }
  const handleFailCloseDialog = () => {
    setIsFail(false);
  }
  const handleCaseReopenDialog = async () => {
    setIsFail(false);
    let product = props.caseManagement?.casehearingslist?.caseinquirydetails?.product;
    let subproduct = props.caseManagement?.casehearingslist?.caseinquirydetails?.subproduct;
    let court = props.caseManagement?.casehearingslist?.caseinquirydetails?.court;
    let area = props.caseManagement?.casehearingslist?.caseinquirydetails?.area;
    let city = props.caseManagement?.casehearingslist?.caseinquirydetails?.city;
    var str = "District Court"
    var higherCourtName;
    if (court.search(str) === -1) {
      higherCourtName = "Supreme Court";
    } else {
      higherCourtName = "High Court";
    }
    let courtname = "";
    if (higherCourtName === "High Court") {
      courtname = "HIGH COURT"
      // let data = {
      //   courtType: "HIGHCOURT"
      // }
      // await props.CaseManagementActions.getHighCourt(data);
      // props.caseManagement.highCourt?.map((court) => {

      // });
    }
    else {
      courtname = "SUPREME COURT";
    }
    let data = {
      product: product,
      subproduct: subproduct,
      practisingcourt: courtname,
      location: area,
      city: city,
      limit: 10,
      skip: 0
    }
    await props.findLawyerActions.findLawyerAction(data);
    props.history.push(`/lawyer`);
  }


  return (
    <div className={classes.root}>
      <Paper className={classes.caseInfoContainer}>
        {/* <Box className={classes.caseInfoSubContainer}> */}
        <Box className="caseInfoSubContainer">

          <Typography
            className={classes.label}
            variant="subtitle1"
            gutterBottom
            align="center"
          >
            Title
          </Typography>
          <Typography
            className={classes.inputField}
            variant="subtitle1"
            gutterBottom
            align="center"
          >
            {title}
          </Typography>
        </Box>
        {/* <Box className={classes.caseInfoSubContainer}> */}
        <Box className="caseInfoSubContainer">
          <Typography
            className={classes.label}
            variant="subtitle1"
            gutterBottom
            align="center"
          >
            Description
          </Typography>
          <Typography
            className={classes.inputField}
            variant="subtitle1"
            gutterBottom
            align="center"
          >
            {description}
          </Typography>
        </Box>
        {/* <Box className={classes.caseInfoSubContainer}> */}
        <Box className="caseInfoSubContainer">
          <Typography
            className={classes.label}
            variant="subtitle1"
            gutterBottom
            align="center"
          >
            Product
          </Typography>
          <Typography
            className={classes.inputField}
            variant="subtitle1"
            gutterBottom
            align="center"
          >
            {product}
          </Typography>
        </Box>
        {/* <Box className={classes.caseInfoSubContainer}> */}
        <Box className="caseInfoSubContainer">
          <Typography
            className={classes.label}
            variant="subtitle1"
            gutterBottom
            align="center"
          >
            Sub Product
          </Typography>
          <Typography
            className={classes.inputField}
            variant="subtitle1"
            gutterBottom
            align="center"
          >
            {subProduct}
          </Typography>
        </Box>
        {(caseStatus === "accepted" || caseStatus === "archieved") && (
          <React.Fragment>
            {/* <Box className={classes.caseInfoSubContainer}> */}
            <Box className="caseInfoSubContainer">
              <Typography
                className={classes.label}
                variant="subtitle1"
                gutterBottom
                align="center"
              >
                Mutually agreed Stages
              </Typography>
              {/* <Box className={classes.inputStageField}> */}
              <Box className="inputStageField">
                <Typography variant="body2" display="block" gutterBottom>
                  ( Case management work flow would use these phases for notes,
                  comments, reminders for payment between Client / Lawyer)
                </Typography>
                <Box className={classes.stageContainer}>
                  <Box className={classes.stageBox1}>
                    <Box className={classes.stageCheckField}>
                      <Box>
                        <Typography variant="h6" gutterBottom className={classes.label}></Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={classes.label}
                        >
                          Fees Per Stage ( INR )
                        </Typography>
                      </Box>
                      <Box></Box>
                    </Box>

                    {stages.map((stage) => (
                      <AcceptedStage
                        stage={stage}
                        handleStageCloseConfirm={handleStageCloseConfirm}
                        isClient={isClient}
                        handleClientStageCloseConfirm={handleClientStageCloseConfirm}
                        caseStatus = {status}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </React.Fragment>
        )}
      </Paper>
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
      <ResponsiveDialog
        title="Please Confirm - Stage Phase Closure"
        content={`Your Lawyer has proposed closure of “${stageName}” and need your acknowledgement!`}
        okText="Yes, Acknowledge Phase complete"
        cancelText="No, Do not make any change"
        isOpen={stageClientCloseConfirm}
        handleClose={handleClientCloseDialog}
        handleOk={handleClientSuccessStageClose}
        handleCancel={handleClientCancelStageClose}
      />
      <ResponsiveDialog
        title="Case Complete"
        content={''}
        formContent={
          <div>
            <div className="container sm-12">
              <div className="row" >
                <div className="col-sm-lg d-flex align-items-center" >
                  <Typography>Please upload the Judgement Copy</Typography>
                </div>
                <div className="col">
                  <Box className={classes.uploadContainer}>
                    {/* <Button variant="contained" onClick={() => {}}>
                          <span>Upload</span>
                    </Button> */}
                    <Button
                      variant="contained"
                      component="label"
                      onChange={handleUploadedFile}
                      className={classes.uploadbtnContainer}
                    >
                      <span>Upload</span>
                      <input
                        type="file"
                        hidden
                      />
                    </Button>
                  </Box>
                </div>
                <div className="row">
                  <Typography>
                    ( If Judgment not yet arrived, upload it once judgment is available. )
                  </Typography>
                </div>
              </div>
            </div>

            <div className={classes.previewContainer}>
              {show &&
                props.caseManagement?.caseDocuments?.files?.map((caseFile) => (
                  caseFile.folderId === 9 &&
                  (<Avatar className={classes.imgView} variant="rounded" onClick={() => viewCaseFile(caseFile)}>
                    <AssignmentIcon />
                  </Avatar>)
                ))
              }
            </div>
            <Typography>Judgement: </Typography>
            <RadioGroup name="judgmentresult">
              <FormControlLabel value="For" control={<Radio onChange={onValueChange} checked={selectedOption === "For"} />} label="For" />
              <FormControlLabel value="Against" control={<Radio onChange={onValueChange} checked={selectedOption === "Against"} />} label="Against" />
            </RadioGroup>
          </div>
        }
        okText="Finish"
        cancelText="Cancel"
        isOpen={isJudgement}
        handleClose={handleCancelDialog}
        handleOk={handleSuccessDialog}
        handleCancel={handleCancelDialog}
      />
      <Dialog
        open={isSuccess}
        onClose={handleSuccessDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="inherit">
            Congratulations on your Victory !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ResponsiveDialog
        title="Appeal Case to Higher Level"
        content={`Would you like to appeal the case to higher level Court ?`}
        okText="Yes"
        cancelText="No"
        isOpen={isFail}
        handleClose={handleFailCloseDialog}
        handleOk={handleCaseReopenDialog}
        handleCancel={handleFailCloseDialog}
      />

    </div>
  );
};
export const CaseStatus = withRouter(_CaseStatus);
import React, { useState } from "react";
import { Button, FormControl, Grid, InputLabel, makeStyles, Select, TextareaAutosize, TextField } from "@material-ui/core";
import "./PDFViewer.scss";
import ResponsiveDialog from "../../components/ClouserDialog/ClouserDialog";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import { filter, forOwn } from "lodash";
import { STAGES } from "../../assets/constant/stage";
import moment from "moment";

interface Props {
  caseManagement: any;
  CaseManagementActions: typeof CaseManagementActions;
  updateState: any;
  userInfo: any;
}
const useStyles = makeStyles((theme) => ({

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
    backgroundColor: "#12B7C8",
    textTransform: "unset",
    width: "130px",
    minHeight: "40px",
    marginLeft: "1rem",
    "&:hover": {
      color: "#000",
      backgroundColor: "#12B7C8",
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
  }

}));

const AddNotes: React.FC<Props> = (props) => {
  const [addNoteOpen, setAddNoteOpen] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isValidCombination, setIsValidCombination] = useState(true);
  const [stageList, setStageList] = useState([]);
  const [element, setElement] = useState([]);
  let [count, setCount] = useState(0);
  const [selectedCases, setSelectedCases] = useState([]);

  const classes = useStyles();

  const handleNoteClose = () => {
    setAddNoteOpen(false);
    props.updateState(false);
  };
  const handleNoteSave = async () => {

    if (selectedCases.length == 0) {
      setIsValid(false);
    } else {
      setAddNoteOpen(false);
      props.updateState(false);

      var title: any = document.getElementById("titlenotes");
      var note: any = document.getElementById("notes");
      let m = moment(new Date());
      let date = m.utc().format();
      let inputParams = [];
      selectedCases.forEach(item => {
        const selectedCaseInfo = filter(props.caseManagement.cases, {
          caseLawyers_case_id: Number(item["caseId"]),
        })
        console.log(selectedCaseInfo);
        if (selectedCaseInfo.length > 0) {
          let data = {
            title: title.value,
            phaseName: item["phaseName"],
            notes: note.value,
            created: date,
            caseId: item["caseId"],
            clientName: selectedCaseInfo[0]?.["caseLawyers_client_name"],
            companyName: selectedCaseInfo[0]?.["caseLawyers_company_name"],
            lawyerId: selectedCaseInfo[0]?.["caseLawyers_lawyer_id"],
            lawyerName: selectedCaseInfo[0]?.["caseLawyers_lawyer_name"],
            clientId: selectedCaseInfo[0]?.["caseLawyers_client_id"],
            companyId: selectedCaseInfo[0]?.["caseLawyers_company_id"]
          }
          inputParams.push(data);
        }

      });
      console.log(inputParams);
      // await props.data.CaseManagementActions.saveCaseNotes(data)
    }


  };


  const handleCaseChange = (event) => {
    setIsValid(true);
    setIsValidCombination(true);
    const { cases } = props.caseManagement;
    if (event.target.value) {
      const caseDetail = filter(cases, {
        caseLawyers_case_id: Number(event.target.value),
      })
      console.log(caseDetail);
      const list = [];
      forOwn(caseDetail[0], (value, key) => {
        if (key.includes("casePhases_phase_payment_")) {
          if (Number(value) > 0) {
            const value = STAGES[Number(key.slice(-1)) - 1];
            list.push(value);
          }
        }
      });
      setStageList(list);
    }
  }
  const handlePhaseChange = (event) => {
    setIsValid(true);
    setIsValidCombination(true);
  }

  const handleAddCase = () => {
    console.log(count);
    //caseId
    let e: any = document.getElementById(`caseId-${count}`)
    let caseId = e ? e.options?.[e?.selectedIndex]?.value : 0;
    //phasename
    let e1: any = document.getElementById(`phaseName-${count}`)
    let phaseName = e1 ? e1.options?.[e1?.selectedIndex]?.value : '';

    console.log(caseId, phaseName);
    const newPair = { caseId, phaseName };

    if (caseId != 0 || phaseName != '') {
      setIsValid(true);
      console.log(selectedCases);
      const found = selectedCases.some(item => (item["caseId"] == newPair["caseId"] && item["phaseName"] == newPair["phaseName"]));
      console.log(found);

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
                >
                  <option aria-label="None" value="" />
                  {props.caseManagement?.cases?.map((type) => {
                    return (
                      <option
                        value={type["caseLawyers_case_id"]}
                      >{type["caseLawyers_title"]}</option>
                    );
                  })}
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
                  onChange={
                    handlePhaseChange
                  }
                >
                  <option aria-label="None" value="" />
                  {stageList?.map((type) => {
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

  return (
    <ResponsiveDialog
      title="Add Notes"
      content={""}
      formContent={
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField autoFocus margin="dense" id="titlenotes" label="Title" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputLabel className="mt-4">Add Notes</InputLabel>
            <TextareaAutosize cols={65} rows={5} id="notes" />
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
              >
                <option aria-label="None" value="" />
                {props.caseManagement?.cases?.map((type) => {
                  return (
                    <option
                      value={type["caseLawyers_case_id"]}
                    >{type["caseLawyers_title"]}</option>
                  );
                })}
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
              >
                <option aria-label="None" value="" />
                {stageList?.map((type) => {
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
      isOpen={addNoteOpen}
      handleClose={handleNoteClose}
      handleOk={handleNoteSave}
      handleCancel={handleNoteClose}
    />
  );
};

export default AddNotes;
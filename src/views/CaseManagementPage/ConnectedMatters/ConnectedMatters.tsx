import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ResponsiveDialog from "../../../components/ClouserDialog/ClouserDialog";
import AddIcon from "@material-ui/icons/Add";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import { isEqual } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "1rem",
    width: "100%",
  },
  card: {
    margin: ".5rem 1rem",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 50%)",
    minHeight: "50px",
    padding: "5px",
    backgroundColor: "white",
    borderRadius: "4px",
  },
  item: {
    display: "flex",
  },
  title: {
    padding: "1rem",
  },
  addBtn: {
    height: "32px",
    fontSize: "0.975rem",
    textTransform: "none",
    color: "#FFC602",
    backgroundColor: "#292734",
    marginTop: "1rem",
    "&:hover": {
      color: "#FFC602",
      backgroundColor: "#292734",
    },
    "&:disabled": {
      color: "rgba(0, 0, 0, 0.26)",
      boxShadow: "none",
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      pointerEvents: "all",
      cursor: "not-allowed",
    },
  },
  textfield: {
    width: "100%",
  },
  noContent: {
    margin: "2rem",
    padding: "1rem",
    minHeight: "80px",
    justifyContent: "center",
    "& h2": {
      fontSize: "1rem",
    },
    svg: {
      fontSize: "2rem",
    },
  },
  cardTitle: {
    fontSize: "1rem",
    textTransform: "unset",
    fontWeight: 300,
    paddingTop:20
  },
}));
interface Props {
  common: any;
  commonActions: any;
  caseManagement: any;
  CaseManagementActions: any;
  userInfo: any;
  handleShowSuccess: any;
}

export const ConnectedMatter = (props: Props) => {
  const classes = useStyles();
  const isShowBtn = props.userInfo["status"] == "individual" || props.userInfo["status"] == "clientfirm" ? false : true;
  
  useEffect(() => {
    const { selectedCaseInfo } = props.caseManagement;
    props.CaseManagementActions.getConnectedMatters({
      caseId: selectedCaseInfo.caseId,
    });
    console.log(selectedCaseInfo?.status);
    setStatus(selectedCaseInfo?.status);
  }, []);

  useEffect(() => {
    if (
      props.caseManagement?.connectedMattersResponse &&
      !isEqual(
        connectedMattersResponse,
        props.caseManagement.connectedMattersResponse
      )
    ) {
      if(title=="Add Sub Matters"){
        props.handleShowSuccess("Sub Matter Added Successfully");
      }
      else if(title=="Add Linked Case"){
        props.handleShowSuccess("Linked Case Added Successfully");
      }
      const { selectedCaseInfo } = props.caseManagement;
      props.CaseManagementActions.getConnectedMatters({
        caseId: selectedCaseInfo.caseId,
      });
      setConnectedMattersResponse(
        props.caseManagement.connectedMattersResponse
      );
    }
  }, [props.caseManagement]);

  const [isAddConnectedMatters, setIsAddConnectedMatters] = useState(false);
  const [isValidCaseType, setIsValidCaseType] = useState(true);
  const [caseType, setCaseType] = useState(0);
  const [caseNo, setCaseNo] = useState("");
  const [isValidCaseNo, setIsValidCaseNo] = useState(true);
  const [isValidCourt, setIsValidCourt] = useState(true);
  const [selectedCourt, setSelectedCourt] = useState(0);
  const [isValidYear, setIsValidYear] = useState(true);
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [connectedMattersResponse, setConnectedMattersResponse] =
    useState(null);
  const [status,setStatus] = useState();

  const handleSuccessStageClose = () => {
    let formValid = true;
    if (!caseType) {
      setIsValidCaseType(false);
      formValid = false;
    }
    if (!caseNo) {
      setIsValidCaseNo(false);
      formValid = false;
    }
    if (!selectedCourt) {
      setIsValidCourt(false);
      formValid = false;
    }
    if (!year) {
      setIsValidYear(false);
      formValid = false;
    }
    if (formValid) {
      const { selectedCaseInfo } = props.caseManagement;
      const caseId = selectedCaseInfo.caseId;
      const data = {
        type: title == "Add Sub Matters" ? "submatter" : "linkedcase",
        params: {
          caseId,
          caseTypeId: caseType,
          courtId: selectedCourt,
          caseNo,
          year,
          created: new Date().toISOString(),
        },
      };
      props.CaseManagementActions.saveConnectedMatters(data);
      setIsAddConnectedMatters(false);
      clearStorage();
    }
  };

  const handleCancelStageClose = () => {
    setIsAddConnectedMatters(false);
    clearStorage();
  };

  const handleCloseDialog = () => {
    setIsAddConnectedMatters(false);
    clearStorage();
  };

  const clearStorage = () => {
    setCaseType(0);
    setIsValidCaseType(true);
    setCaseNo("");
    setIsValidCaseNo(true);
    setSelectedCourt(0);
    setIsValidCourt(true);
    setYear("");
    setIsValidCourt(true);
  };

  const handleMatterAdd = () => {
    setTitle("Add Sub Matters");
    props.commonActions.getCaseType();
    props.commonActions.getCourts();
    setIsAddConnectedMatters(true);
  };
  const handleCaseAdd = () => {
    setTitle("Add Linked Case");
    props.commonActions.getCaseType();
    props.commonActions.getCourts();
    setIsAddConnectedMatters(true);
  };
  const handleCaseTypeChange = (event) => {
    setCaseType(Number(event.target.value));
    setIsValidCaseType(true);
  };
  const handleCaseNoChange = (event) => {
    setCaseNo(event.target.value);
    setIsValidCaseNo(true);
  };
  const handleCourtChange = (event) => {
    setSelectedCourt(Number(event.target.value));
    setIsValidCourt(true);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
    setIsValidYear(true);
  };

  return (
    <div>
      <Box className={classes.root}>
        <Grid container alignItems="center" justify="flex-start">
          <Grid item xs={12} className={classes.item}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
            >
              Sub Matter
            </Typography>
            {isShowBtn && status!="reassign_pending" && (
              <Button
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleMatterAdd}
                className={classes.addBtn}
                disabled={!isShowBtn }
              >
                <AddIcon />
                Add
              </Button>
            )}
          </Grid>
          {props.caseManagement &&
            props.caseManagement?.connectedMatters?.subMatter?.length > 0 &&
            props.caseManagement.connectedMatters.subMatter.map((matter) => {
              return (
                // <Grid item xs={3}>
                <Grid className="linked_case">
                  <div className={classes.card}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.cardTitle}
                    >
                      {`${matter["caseType"]["code"]}(${matter["caseType"]["abbreviation"]})/${matter["caseNo"]}/${matter["year"]}`}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.cardTitle}
                    >
                      {matter["court"]["courtName"]}
                    </Typography>
                  </div>
                </Grid>
              );
            })}
          {props.caseManagement?.connectedMatters?.subMatter?.length == 0 && (
            <Grid item xs={12}>
              <Box display="flex" className={classes.noContent}>
                <Box>
                  <FindReplaceSharpIcon />
                </Box>
                <Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    No Sub Matters Found
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box className={classes.root}>
        <Grid container alignItems="center" justify="flex-start">
          <Grid item xs={12} className={classes.item}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
            >
              Linked Case
            </Typography>
            {isShowBtn && status!="reassign_pending" && (
              <Button
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleCaseAdd}
                className={classes.addBtn}
              >
                <AddIcon />
                Add
              </Button>
            )}
          </Grid>
          {props.caseManagement &&
            props.caseManagement?.connectedMatters?.linkedCase?.length > 0 &&
            props.caseManagement.connectedMatters.linkedCase.map((link) => {
              return (
                // <Grid item xs={3}>
              <Grid className="linked_case">
                  <div className={classes.card}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.cardTitle}
                    >
                      {`${link["caseType"]["code"]}(${link["caseType"]["abbreviation"]})/${link["caseNo"]}/${link["year"]}`}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h4"
                      className={classes.cardTitle}
                    >
                      {link["court"]["courtName"]}
                    </Typography>
                  </div>
                </Grid>
              );
            })}
          {props.caseManagement?.connectedMatters?.linkedCase?.length == 0 && (
            <Grid item xs={12}>
              <Box display="flex" className={classes.noContent}>
                <Box>
                  <FindReplaceSharpIcon />
                </Box>
                <Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    No Linked Cases Found
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      <ResponsiveDialog
        title={title}
        content={""}
        okText="Save"
        cancelText="Cancel"
        isOpen={isAddConnectedMatters}
        handleClose={handleCloseDialog}
        handleOk={handleSuccessStageClose}
        handleCancel={handleCancelStageClose}
        formContent={
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl variant="outlined">
                <InputLabel
                  error={!isValidCaseType}
                  id="case-type-select-label"
                >
                  Case Type*
                </InputLabel>
                <Select
                  native
                  labelId="case-type-select-label"
                  id="case-type-select-outlined"
                  value={caseType}
                  onChange={handleCaseTypeChange}
                  label="Case Type*"
                  error={!isValidCaseType}
                  placeholder="Case Type*"
                >
                  <option aria-label="None" value="" />
                  {props.common?.caseTypes?.map((type) => {
                    return (
                      <option
                        value={type.id}
                      >{`${type.code}(${type.abbreviation})`}</option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined">
                <InputLabel error={!isValidCourt} id="court-select-label">
                  Court*
                </InputLabel>
                <Select
                  native
                  labelId="court-select-label"
                  id="court-select-outlined"
                  onChange={handleCourtChange}
                  label="Courts*"
                  error={!isValidCourt}
                  value={selectedCourt}
                  placeholder="Courts*"
                >
                  <option aria-label="None" value="" />
                  {props.common?.courts?.map((court) => {
                    return <option value={court.id}>{court.courtName}</option>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={!isValidCaseNo}
                size="small"
                onChange={handleCaseNoChange}
                label="Case Number*"
                placeholder="Case Number*"
                variant="outlined"
                value={caseNo}
                className={classes.textfield}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={!isValidYear}
                size="small"
                onChange={handleYearChange}
                label="year*"
                placeholder="Year*"
                variant="outlined"
                value={year}
                className={classes.textfield}
              />
            </Grid>
          </Grid>
        }
      />
    </div>
  );
};

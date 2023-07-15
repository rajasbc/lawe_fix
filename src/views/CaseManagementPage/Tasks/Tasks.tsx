import { Box, Button, Card, CardContent, Checkbox, Dialog, FormControlLabel, Grid, IconButton, Paper, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import React from "react";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import ResponsiveDialog from "../../../components/ClouserDialog/ClouserDialog";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import { STAGES } from "../../../assets/constant/stage";
import moment from "moment";
import { DateTimePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { forOwn, isEmpty } from "lodash";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({  
 
    noContent: {
      margin: "2rem",
      padding: "1rem",
      minHeight: "80px",
      justifyContent: "center",
      "& h2": {
        fontSize: "1rem",
      },
      "svg": {
        fontSize: "2rem",
      }
    },
  }));

export function Tasks(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [save, setSave] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const [dateChange, handleDateChange] = React.useState(new Date());
    const [checked, setChecked] = React.useState(false)
    const [itemId, setItemId] = React.useState();
    const [taskNameValid, setTaskNameValid] = React.useState(false);
    const [phaseNameValid, setPhaseNameValid] = React.useState(false);

    let namespace = props.data.tasks;
    const getCaseInfoDataHearing = {
        caseId: props.data.caseManagement.selectedCaseInfo.caseId,
        userId: props.data.userInfo.id,
        type: props.data.userInfo.status,
    };
    const stageList = [];
    if (!isEmpty(props.data.caseManagement.stage)) {
        const { stage: propsStage } = props.data.caseManagement;
        const [stage] = propsStage;

        forOwn(stage, (value, key) => {
            if (key.includes("phasePayment_")) {
                if (Number(value) > 0) {
                    stageList.push(STAGES[Number(key.slice(-1)) - 1]);
                }
            }
        });
    }
    const handleDeleteButton = (event, id) => {
        setDeleteOpen(true);
        setIndex(id)
    };
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };
    const handleDelete = async () => {
        setDeleteOpen(false);
        let data = {
            id: index
        }
        await props.data.CaseManagementActions.deleteCaseTasks(data)
        await props.data.CaseManagementActions.getHearingsByCaseId(getCaseInfoDataHearing)
    }

    const handleSaveStatus = async (event, id) => {
        if (checked) {
            let data = {
                id: id,
                taskStatus: "Completed"
            }
            setChecked(false)
            await props.data.CaseManagementActions.updateTaskStatus(data)
            await props.data.CaseManagementActions.getHearingsByCaseId(getCaseInfoDataHearing)
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTaskNameValid(false);
        setPhaseNameValid(false);
        setOpen(false);
    };

    const handleSave = async () => {

        const datevalue = dateChange;        
        var taskname :any = document.getElementById("taskname");
        var a :any = document.getElementById("remainder")
        var remainder = a.options[a.selectedIndex].value;
        var e :any = document.getElementById("phaseName")
        var phaseName = e.options[e.selectedIndex].value;
        var description :any = document.getElementById("description");
        
        if (!taskname.value.length) {
            setTaskNameValid(true)
        }

        if (!phaseName?.length) {
            setPhaseNameValid(true)
        }
        
        if (taskname.value.length && phaseName?.length) {
            setOpen(false);
            let m = moment(new Date());
            let date = m.utc().format();
            let day = moment(datevalue);
            let deadlinedate = day.utc().format();
            let data = {
                taskName: taskname.value,
                phaseName: phaseName,
                description: description.value,
                created: date,
                deadlineDate: deadlinedate,
                caseId: props.data.caseManagement.selectedCaseInfo.caseId,
                userId: props.data.userInfo.id,
                userName: props.data.userInfo.userName,
                type: props.data.userInfo.status,
                remainder: remainder,
                taskStatus: "In progress"
            }
            await props.data.CaseManagementActions.saveCaseTasks(data);
            saveRemainder();
        }
        
    };
    const saveRemainder = async () => {
        const datevalue = dateChange;
        var taskname :any = document.getElementById("taskname");
        var a :any = document.getElementById("remainder")
        var remainder = a.options[a.selectedIndex].value;
        let todayDate = new Date();
        let m = moment(new Date());
        let date = m.utc().format();
        let day = moment(datevalue);
        let deadlinedate = day.utc().format();
        let de = datevalue
        let datearr = []
        let deaddate = moment(de);
        let remainddate = deaddate.utc().format();
        datearr.push(remainddate)
        if (remainder === "Monthly") {
            var Difference_In_Time = de.getTime() - todayDate.getTime();
            var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
            for (let i = 1; i <= Difference_In_Days - 30; i = i + 30) {
                let oneday = de.setDate(de.getDate() - 30);
                let day = moment(oneday);
                let remainderdate = day.utc().format();
                datearr.push(remainderdate)
            }
        } else if (remainder === "Weekly") {
            var Difference_In_Time = de.getTime() - todayDate.getTime();
            var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
            for (let i = 1; i <= Difference_In_Days - 7; i = i + 7) {
                let oneday = de.setDate(de.getDate() - 7);
                let day = moment(oneday);
                let remainderdate = day.utc().format();
                datearr.push(remainderdate)
            }
        } else if (remainder === "Quarterly") {
            var Difference_In_Time = de.getTime() - todayDate.getTime();
            var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
            for (let i = 1; i <= Difference_In_Days - 92; i = i + 92) {
                let oneday = de.setDate(de.getDate() - 92);
                let day = moment(oneday);
                let remainderdate = day.utc().format();
                datearr.push(remainderdate)
            }

        } else if (remainder === "Daily") {
            var Difference_In_Time = de.getTime() - todayDate.getTime();
            var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
            for (let i = 1; i <= Difference_In_Days; i++) {
                let oneday = de.setDate(de.getDate() - 1);
                let day = moment(oneday);
                let remainderdate = day.utc().format();
                datearr.push(remainderdate)
            }
        }
        let dataRemainder = [];
        datearr.map(async (item) => {
            let remainderdata = {
                taskName: `Task Name : ${taskname.value}`,
                created: date,
                deadlineDate: deadlinedate,
                caseId: props.data.caseManagement.selectedCaseInfo.caseId,
                userId: props.data.userInfo.id,
                userName: props.data.userInfo.userName,
                remainderDate: item,
                type: props.data.userInfo.status,
            }
            dataRemainder.push(remainderdata)

        });
        await props.data.CaseManagementActions.saveCaseRemainders(dataRemainder);
        await props.data.CaseManagementActions.getHearingsByCaseId(getCaseInfoDataHearing)
    }
    const handleCheck = async (eve, id) => {
        setChecked(true)
        setItemId(id)
    }

    const handleChangeName = async (event: React.ChangeEvent<{value: unknown}>) =>{
        const text = (event.target.value as string);
        if (!text) {
            setTaskNameValid(true);
        } else {
            setTaskNameValid(false);
        }
    }

    const handlePhaseChange = async (event: React.ChangeEvent<{value: unknown}>) => {
        const text = (event.target.value as string);
        if (!text) {
            setPhaseNameValid(true);
        } else {
            setPhaseNameValid(false);
        }
    }
    
    return (
        <div>
            <div className="container-sm-12" style={{}}>
                <div className="row mx-1 my-5 col-sm-12 col-lg-12 col-md-12">
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "25px" }}>TO - DO</Typography>
                    </div>
                    <div className="col d-flex justify-content-end"  >
                        <Button variant="contained" className="addnotes" style={{ backgroundColor: "#292734" }} onClick={handleClickOpen}>
                            Add Tasks
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <ResponsiveDialog
                    title="Add Tasks"
                    content={""}
                    formContent={<div>
                        <div><InputLabel className="mt-3">Task Name</InputLabel>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="taskname"
                                fullWidth
                                variant="outlined"
                                placeholder="Enter Task Name"
                                onChange = {handleChangeName}
                                error = {taskNameValid}
                            /></div>
                        <div>
                            <InputLabel className="mt-4">Phase Name</InputLabel>
                            <FormControl>
                                <Select
                                    native
                                    className="select-input-1"
                                    inputProps={{
                                        name: 'Phase Name',
                                        id: 'phaseName',
                                    }}
                                    variant="outlined"
                                    onChange = {handlePhaseChange}
                                    error = {phaseNameValid}
                                >
                                    <option aria-label="None" value="" />
                                    {
                                        stageList?.map(eachProduct => {
                                            return <option value={eachProduct}>{eachProduct}</option>
                                        })
                                    }
                                </Select>
                            </FormControl></div>
                        <div> <InputLabel className="mt-4">Description</InputLabel>
                            <TextareaAutosize cols={65} rows={5} id="description" className="textareastyle"/></div>
                        <div>
                            <InputLabel className="mt-4">Deadline</InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    clearable
                                    value={dateChange}
                                    placeholder="dd/MM/YYYY"
                                    onChange={date => handleDateChange(date)}
                                    minDate={new Date()}
                                    format="dd/MM/yyyy"
                                    variant="inline"
                                    inputVariant="outlined"
                                    fullWidth
                                    autoOk={true}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div>
                            <InputLabel className="mt-4">Remainder Frequency</InputLabel>
                            <FormControl>
                                <Select
                                    native
                                    className="select-input-1"
                                    inputProps={{
                                        name: 'Remainder',
                                        id: 'remainder',
                                    }}
                                    variant="outlined"
                                >
                                    <option aria-label="None" value="None">None</option>
                                    <option value={"Daily"}>Daily</option>
                                    <option value={"Weekly"}>Weekly</option>
                                    <option value={"Monthly"}>Monthly</option>
                                    <option value={"Quarterly"}>Quarterly</option>
                                </Select>
                            </FormControl></div>
                    </div>
                    }
                    okText="Save"
                    cancelText="Cancel"
                    isOpen={open}
                    handleClose={handleClose}
                    handleOk={handleSave}
                    handleCancel={handleClose}
                />
            </div>
            <div className="container-sm-12 mx-3" style={{ width: "100%" }}>
                <div className="row" style={{ width: "100%" }}>

                    {namespace?.casetasks?.map((item) => {
                        let date = new Date(item.deadlineDate)
                        let taskdate = date.getUTCDate()
                        let taskMonth = date.getUTCMonth() + 1
                        let taskYear = date.getUTCFullYear()
                        return (
                            <div className="col-lg-10 col-sm-4 col-md-8">
                                <div>
                                    <Card className="my-5 mx-3" raised={true} style={{ padding: "15px", width: "auto" }}>
                                        <CardContent>
                                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}> Task Name : {item.taskName}</Typography>
                                            <Typography>Phase Name : {item.phaseName}</Typography>
                                            <Typography>Description :</Typography>                                           
                                            <textarea className="textareastyle" cols={40} rows={5} disabled={true}>{item.description}</textarea>
                                            <Typography>Deadline : {taskdate}/{taskMonth}/{taskYear}</Typography>
                                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "15px" }}> STATUS : {item.taskStatus}</Typography>
                                            <div className="d-flex justify-content-end">
                                                {item.taskStatus === "In progress" &&
                                                    <FormControlLabel
                                                        value="end"
                                                        control={
                                                            <Checkbox color="primary"
                                                                onChange={(eve) => {
                                                                    handleCheck(eve, item["id"]);
                                                                }} />}
                                                        label="Mark as Complete"
                                                        labelPlacement="end"
                                                    />}
                                                {
                                                    checked && item["id"] == itemId &&
                                                    <IconButton aria-label="save" onClick={(eve) => {
                                                        handleSaveStatus(eve, item["id"]);
                                                    }}>
                                                        <SaveIcon />
                                                    </IconButton>
                                                }
                                                <IconButton aria-label="delete notes" onClick={(eve) => {
                                                    handleDeleteButton(eve, item["id"]);
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>

                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div>
                                    <ResponsiveDialog
                                        title="Delete Task"
                                        content={`Would you like to delete this task permanently ?`}
                                        okText="Yes"
                                        cancelText="No"
                                        isOpen={deleteopen}
                                        handleClose={handleDeleteClose}
                                        handleOk={handleDelete}
                                        handleCancel={handleDeleteClose}
                                    />

                                </div>
                            </div>
                        );
                    })}
                    {namespace?.casetasks && namespace?.casetasks.length === 0 &&
                        (
                            <Grid item xs={12}>
                              <Box display="flex" className={classes.noContent}>
                                <Box>
                                  <FindReplaceSharpIcon />
                                </Box>
                                <Box>
                                  <Typography gutterBottom variant="h5" component="h2">
                                    No Tasks Found
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          )
                    }
                </div>
            </div>

        </div>

    );
}
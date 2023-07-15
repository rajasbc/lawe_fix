import { Box, Button, Card, CardContent, Grid, IconButton, TextareaAutosize, TextField, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ResponsiveDialog from "../../../components/ClouserDialog/ClouserDialog";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { STAGES } from "../../../assets/constant/stage";
import "./CaseNotes.scss"
import moment from "moment";
import { forOwn, get, isEmpty } from "lodash";
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
export function CaseNotes(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [view, setView] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const [str, setStr] = React.useState("")
    const [itemId, setItemId] = React.useState()
    const stageList = [];
    const [title, setTitle] = React.useState("")
    const [phaseName, setphaseName] = React.useState("")
    const [description, setDescription] = React.useState("");

    const [titleError, setTitleError] = React.useState(false);
    const [phaseError, setPhaseError] = React.useState("");
    const [noNotesError, setNotesError] = React.useState("");

    const handleDeleteButton = (event, id) => {
        setDeleteOpen(true);
        setIndex(id)
    };
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

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };
    const handleDelete = async () => {
        setDeleteOpen(false);
        let data = {
            id: index
        }
        await props.data.CaseManagementActions.deleteCaseNotes(data)
        await props.data.CaseManagementActions.getCaseNotes({
            caseId: props.data.caseManagement.selectedCaseInfo.caseId,
            lawyerId: props.data.caseManagement.selectedCaseInfo.lawyerId,
            clientId: props.data.caseManagement.selectedCaseInfo.clientId
        });
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTitleError(false);
        setPhaseError("");
        setNotesError("")
        setOpen(false);
    };
    const handleSave = async () => {

        var title :any = document.getElementById("titlenotes");
        var e :any = document.getElementById("phaseName")
        var phaseName = e.options[e.selectedIndex].value;
        var note :any = document.getElementById("notes");
        
        if (!title.value.length) {
            setTitleError(true);
        }
        if (!phaseName && !phaseName.length) {
            setPhaseError("Please select Phase");
        }
        if (!note.value.length) {
            setNotesError("Please fill some notes");
        }
        
        if (title.value.length && phaseName && phaseName.length && note.value.length) {
            setOpen(false);
            
            let m = moment(new Date());
            let date = m.utc().format();
            let data = {
                title: title.value,
                phaseName: phaseName,
                notes: note.value,
                created: date,
                caseId: props.data.caseManagement.selectedCaseInfo.caseId,
                clientName: props.data.userInfo.status == "clientfirm" ? "" : props.data.caseManagement.selectedCaseInfo.clientName,
                companyName: props.data.userInfo.status == "clientfirm" ? props.data.caseManagement.selectedCaseInfo.companyName : "",
                lawyerId: props.data.caseManagement.selectedCaseInfo.lawyerId,
                lawyerName: props.data.caseManagement.selectedCaseInfo.lawyerName,
                clientId: props.data.caseManagement.selectedCaseInfo.clientId,
                companyId: props.data.caseManagement.selectedCaseInfo.companyId
            };
            await props.data.CaseManagementActions.saveCaseNotes(data);
        }
    };
    const handleEdit = (event, id) => {
        setItemId(id)
        for (let i = 0; i < props.data.caseManagement.notes.length; i++) {
            if (props.data.caseManagement.notes[i].id === id) {
                setTitle(props.data.caseManagement.notes[i].title)
                setphaseName(props.data.caseManagement.notes[i].phaseName)
                setDescription(props.data.caseManagement.notes[i].notes)
            }
        }
        setOpen(false);
        setEdit(true)

    };
    const handleView = (event, id) => {
        setItemId(id)
        for (let i = 0; i < props.data.caseManagement.notes.length; i++) {
            if (props.data.caseManagement.notes[i].id === id) {
                setTitle(props.data.caseManagement.notes[i].title)
                setphaseName(props.data.caseManagement.notes[i].phaseName)
                setDescription(props.data.caseManagement.notes[i].notes)
            }
        }
        setOpen(false);
        setView(true)

    };

    const handleTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const text = (event.target.value as string);
        if(text) {
            setTitleError(false);
        } else {
            setTitleError(true);
        }
        setTitle(text);

    }

    const handleDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const text = (event.target.value as string);
        if (text) {
            setNotesError("");
        }
        setDescription(text);
    }

    const handleSaveClose = () => {
        setNotesError("");
        setTitleError(false);
        setPhaseError("");
        setEdit(false);
    };
    const handleViewClose = () => {
        setView(false)
    };
    const handleSaveButton = async () => {
        
        if (!description?.length) {
            setNotesError("Fill some Notes")
        }

        if (!title?.length) {
            setTitleError(true)
        }

        if (!phaseName?.length) {
            setPhaseError("Please select Phase")
        }

        if (title?.length && phaseName?.length && description?.length){
            let m = moment(new Date());
            let date = m.utc().format();
            let data = {
                notes: description,
                created: date,
                id: itemId,
                phaseName: phaseName,
                title: title
            };
            await props.data.CaseManagementActions.updateCaseNotes(data);
            await props.data.CaseManagementActions.getCaseNotes({
                caseId: props.data.caseManagement.selectedCaseInfo.caseId,
                lawyerId: props.data.caseManagement.selectedCaseInfo.lawyerId,
                clientId: props.data.caseManagement.selectedCaseInfo.clientId
            });
            setEdit(false);
        }        
        
    };

    const handleNotesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const text = (event.target.value as string);
        if (text) {
            setPhaseError("");
        }        
        setphaseName(text);
    }

    return (
        <div>
            <div className="container-sm-12" style={{}}>
                <div className="row mx-5 my-5">
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "25px" }}>Notes</Typography>
                    </div>
                    <div className="col d-flex justify-content-end"  >
                        <Button variant="contained" className="addnotes" style={{ backgroundColor: "#292734" }} onClick={handleClickOpen}>
                            Add Notes
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <ResponsiveDialog
                    title="Add Notes"
                    content={""}
                    formContent={<div>
                        <div> <TextField
                            autoFocus
                            margin="dense"
                            id="titlenotes"
                            label="Title"
                            fullWidth
                            error={titleError}
                            onChange = {(e) => {
                                if(!e.target.value?.length){
                                    setTitleError(true)
                                } else {
                                    setTitleError(false)
                                }
                            }}
                        /></div>
                        <div><FormControl>
                            <InputLabel>Phase Name</InputLabel>
                            <Select
                                native
                                className="select-input-1"
                                // onChange={handleNotesChange}
                                inputProps={{
                                    name: 'Phase Name',
                                    id: 'phaseName',
                                }}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setPhaseError("")
                                    }
                                }}
                            >
                                <option aria-label="None" value="" />
                                {
                                    stageList?.map(eachProduct => {
                                        return <option value={eachProduct}>{eachProduct}</option>
                                    })
                                }
                            </Select>
                            <div className = {classes.noInputDataError}>
                                <small>{phaseError}</small>
                            </div>
                        </FormControl></div>
                        <div> <InputLabel className="mt-4">Add Notes</InputLabel>
                            <TextareaAutosize cols={65} rows={5} id="notes" onChange={(e) => {
                                if(e.target.value.length) {
                                    setNotesError("")
                                }
                            }} />
                            <div className = {classes.noInputDataError}>
                                <small>{noNotesError}</small>
                            </div> 
                        </div>
                    </div>}
                    okText="Save"
                    cancelText="Cancel"
                    isOpen={open}
                    handleClose={handleClose}
                    handleOk={handleSave}
                    handleCancel={handleClose}
                />
            </div>

            <div>
                <ResponsiveDialog
                    title="Edit Notes"
                    content={""}
                    formContent={<div>
                        <div> <TextField
                            autoFocus
                            margin="dense"
                            id="titlenotes"
                            label="Title"
                            value={title}
                            error={titleError}
                            onChange={handleTitleChange}
                            fullWidth
                        /></div>
                        <div><FormControl>
                            <InputLabel>Phase Name</InputLabel>
                            <Select
                                native
                                className="select-input-1"
                                onChange={handleNotesChange}
                                value={phaseName}
                                inputProps={{
                                    name: 'Phase Name',
                                    id: 'phaseName',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {
                                    stageList?.map(eachProduct => {
                                        return <option value={eachProduct}>{eachProduct}</option>
                                    })
                                }
                            </Select>
                            <div className = {classes.noInputDataError}>
                                <small>{phaseError}</small>
                            </div>
                        </FormControl></div>
                        <div> <InputLabel className="mt-4">Edit Notes</InputLabel>
                            <TextareaAutosize cols={65} rows={5} id="notes" value={description} onChange={handleDescriptionChange} />
                            <div className = {classes.noInputDataError}>
                                <small>{noNotesError}</small>
                            </div> 
                        </div>
                    </div>}
                    okText="Save"
                    cancelText="Cancel"
                    isOpen={edit}
                    handleClose={handleSaveClose}
                    handleOk={handleSaveButton}
                    handleCancel={handleSaveClose}
                />
            </div>
            <div>
                <ResponsiveDialog
                    title="View Notes"
                    content={""}
                    formContent={<div>
                        <div> <TextField
                            variant="outlined"
                            margin="dense"
                            id="titlenotes"
                            label="Title"
                            value={title}
                            fullWidth
                        /></div>
                        <div>
                            <TextField
                                label="Phase Name"
                                value={phaseName}
                                id='phaseName'
                                variant="outlined"
                                margin="dense"
                                fullWidth
                            />
                        </div>
                        <div> <InputLabel className="mt-4">Notes</InputLabel>
                            <Typography id="notes" >{description}</Typography></div>
                    </div>}
                    cancelText="Close"
                    isOpen={view}
                    handleClose={handleViewClose}
                    handleCancel={handleViewClose}
                />
            </div>
            <div className="container-sm-12 mx-3" style={{ width: "100%" }}>
                <div className="row" style={{ width: "100%" }}>
                    {props.data.caseManagement?.notes?.length == 0 && (
                        <Grid item xs={12}>
                            <Box display="flex" className={classes.noContent}>
                                <Box>
                                    <FindReplaceSharpIcon />
                                </Box>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        No Notes Found
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )}
                    {props.data.caseManagement?.notes?.map((item) => {
                        let date = new Date(item.created)
                        let notesdate = date.getUTCDate()
                        let notesMonth = date.getUTCMonth() + 1
                        let notesYear = date.getUTCFullYear()
                        let id = item["id"]
                        return (
                            <div className="col-6">
                                <div>
                                    <Card className="my-5 mx-5" raised={true} style={{ padding: "15px", width: "auto" }}>
                                        <CardContent>
                                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{item.title}</Typography>
                                            <Typography>Created On : {notesdate}/{notesMonth}/{notesYear}</Typography>
                                            <Typography>Phase Name : {item.phaseName}</Typography>
                                            {/* <b><Typography>Notes </Typography></b>
                                            <div >
                                                <textarea cols="40" rows="5" disabled="true">{item.notes}</textarea>
                                            </div> */}
                                            {/* {editText && item["id"] !== itemId && <div >
                                                <textarea cols="40" rows="5" disabled="true">{item.notes}</textarea>
                                            </div>}
                                            {editText && item["id"] == itemId && <div >
                                                <textarea cols="40" rows="5" id="text1" onChange={handleSaveChange}>{item.notes}</textarea>
                                            </div>} */}
                                            <div className="d-flex justify-content-end">
                                                {/* {save && item["id"] == itemId &&
                                                    <IconButton aria-label="save notes" onClick={(eve) => {
                                                        handleSaveButton(eve, item["id"]);
                                                    }}>
                                                        <SaveIcon />
                                                    </IconButton>} */}
                                                <Tooltip title="View">
                                                    <IconButton aria-label="view notes" onClick={(eve) => {
                                                        handleView(eve, item["id"]);
                                                    }}>
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton aria-label="edit notes" onClick={(eve) => {
                                                        handleEdit(eve, item["id"]);
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton aria-label="delete notes" onClick={(eve) => {
                                                        handleDeleteButton(eve, item["id"]);
                                                    }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>


                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div>
                                    <ResponsiveDialog
                                        title="Delete Notes"
                                        content={`Would you like to delete this note permanently ?`}
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
                </div>
            </div>
        </div>

    );
}
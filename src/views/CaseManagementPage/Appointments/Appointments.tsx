import { Box, Button, Card, CardContent, Dialog, Grid, IconButton, Paper, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import ResponsiveDialog from "../../../components/ClouserDialog/ClouserDialog";
import { components, default as ReactSelect } from "react-select";
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { AppointmentStatus } from "../../../assets/constant/appointmentStatus";

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

    timeError: {
        color: "red",
        padding: "0rem, 0.5rem, 0.5rem, 0.5rem",
        minHeight: "5px",
        justifyContent: "center",
        fontSize: "1rem",
        "& small": {
            color: "red",
        }
    },
    para: {
        justifyContent: "center",
        fontSize: "12px",
        color: "#58595a",
        padding:"0px, 10px",
    },

    redLine: {
        color: "#e41e26",
    },

    greenLine: {
        color: "#5cb85c",
    },

    blueLine: {
        color: "#5bc0de",
    },

}));

export function Appointments (props) {

    const classes = useStyles();
    let namespace = props.data.appointments;
    const [open, setOpen] = React.useState(false);
    const [selectedDate, handleDateChange] = React.useState(new Date());    
    // const [selectedTime, handleTimeChange] = React.useState(new Date());
    const [selectedTime, setSelectedTime] = React.useState(new Date());
    const [timeError, setTimeError] = useState("");
    const [buttonSubmission, setButtonSubmission] = useState(true);
    const [selectUserError, setSelectNameError] = useState("");

    const handleTimeChange = (date) => {

        const time = new Date();
        if (date > time) {
            setButtonSubmission(true);
            setTimeError("");
            setSelectedTime(date);
        } else {
            setButtonSubmission(false);
            setSelectedTime(date);
            setTimeError("Please Select Future Time");
        }
        
    };

    const [notiTo, setNotiTo] = React.useState([]);
    let toContactInfo = [];
    let sendAppointmentData = [];
    const {selectedCaseInfo} = props.data.caseManagement;
    let clientInfo = {
        "value":selectedCaseInfo.clientId!=0? selectedCaseInfo.clientName:selectedCaseInfo.companyName,
        "label": selectedCaseInfo.clientId!=0? selectedCaseInfo.clientName:selectedCaseInfo.companyName,
        "id":selectedCaseInfo.clientId!=0? selectedCaseInfo.clientId:selectedCaseInfo.companyId,
        "type": selectedCaseInfo.clientId!=0?"individual":"clientfirm",
    }
    let lawyerInfo = {
        "value": selectedCaseInfo.lawyerName,
        "label": selectedCaseInfo.lawyerName,
        "id": selectedCaseInfo.lawyerId,
        "type": "lawyer",
    }
    if (props.data.userInfo.status === "lawyer" || props.data.userInfo.status === "lawfirm" || props.data.userInfo.status === "companylawyer") {
        toContactInfo.push(clientInfo)
    }
    if (props.data.userInfo.status === "individual" || props.data.userInfo.status === "lawfirm" || props.data.userInfo.status === "clientfirm") {
        toContactInfo.push(lawyerInfo)
    }
    namespace?.casecontactdetails?.map((item) => {

        let data = {
            "value": item.contactName,
            "label": item.contactName,
            "id": item.contactId,
            "type": item.type,
        };
        toContactInfo.push(data)

    });

    const handleMultiChange = (notiTo: any) => {
        setNotiTo(notiTo);
    }

    const Option = (props) => {
        if (props.isSelected) {
            setSelectNameError("")
        }
        return (
            <div>
                <components.Option {...props}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
        
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSelectNameError("");
        setOpen(false);
    };

    function convertDate (str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    function convertTime (str) {
        var date = new Date(str),
            hours = ("0" + date.getHours()).slice(-2);
        return [hours, ("0" + date.getMinutes()).slice(-2)].join(":");
    }

    const handleAppointment = async () => {

        if (!notiTo?.length) {
            setSelectNameError("Please Select user")
        }
        
        if (buttonSubmission === true && notiTo?.length) {
            
            setOpen(false);
            // let day = selectedDate.getDate();
            // let month = selectedDate.getMonth();
            // let year = selectedDate.getFullYear();
            let day = selectedTime.getDate();
            let month = selectedTime.getMonth();
            let year = selectedTime.getFullYear();
            let hours = selectedTime.getHours();
            let minutes = selectedTime.getMinutes();
            let seconds = selectedTime.getSeconds();

            var dates = new Date(year, month, day, hours, minutes, seconds);
            let a = moment(new Date(dates));
            let appointmentDate = a.utc().format();
            const dateapp = convertDate(selectedTime);
            const timeapp = convertTime(selectedTime);
            var message = `Let us meet on ${dateapp} at ${timeapp}`;

            let m = moment(new Date());
            let date = m.utc().format();

            notiTo?.map((item) => {
                let data = {
                    message: message,
                    created: date,
                    caseId: props.data.caseManagement.selectedCaseInfo.caseId,
                    fromId: props.data.userInfo.status == "clientfirm" ? props.data.userInfo.id : props.data.userInfo.id,
                    fromName: props.data.userInfo.status == "clientfirm" ? props.data.userInfo.companyName : props.data.userInfo.userName,                
                    toId: item.id,
                    toName: item.value,
                    type: item.type,
                    appointmentDate: appointmentDate,
                    appointmentStatus: "Requested",
                }
                sendAppointmentData.push(data)
            });
            await props.data.CaseManagementActions.sendAppointment(sendAppointmentData);
            await props.data.refresh();

        }        
    };

    return (
        <div>
            <div className="container-sm-12" style={{}}>
                <div className="row mx-5 my-5">
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "25px" }}>Appointments</Typography>
                    </div>
                    <div className="col justify-content-end"  >
                        <Button variant="contained" className="addnotes" style={{ backgroundColor: "#292734" }} onClick={handleClickOpen}>
                            Fix Appointments
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <ResponsiveDialog
                    title="Make An Appointment"
                    content={""}
                    formContent={<div>
                        <div><InputLabel className="mt-3">Appointment With</InputLabel>
                            <ReactSelect
                                options={toContactInfo}
                                id="multiselectnoti"
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option
                                }}
                                onChange={handleMultiChange}
                            //    value={optionSelected}

                            />
                            <div className = {classes.timeError}>
                                <small>{selectUserError}</small>
                            </div> 
                        </div>
                        <div>
                            <InputLabel className="mt-4">Select Date</InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    clearable
                                    value={selectedTime}
                                    placeholder="dd/MM/YYYY"
                                    onChange={date => handleTimeChange(date)}
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
                            <InputLabel className="mt-4">Select Time</InputLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <KeyboardTimePicker
                                    placeholder="00:00 AM"
                                    mask="__:__ _M"
                                    value={selectedTime}
                                    inputVariant="outlined"
                                    fullWidth
                                    onChange={date => handleTimeChange(date)}
                                />

                            </MuiPickersUtilsProvider>

                            <div className = {classes.timeError}>
                                <small>{timeError}</small>
                            </div>                            
                        </div>


                    </div>
                    }
                    okText="Get Appointment"
                    cancelText="Cancel"
                    isOpen={open}
                    handleClose={handleClose}
                    handleOk={handleAppointment}
                    handleCancel={handleClose}
                />
            </div>
            {props.data.userInfo.status === "lawyer" &&
                <div>
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Client Info</Typography>
                    </div>
                    <Card className="my-5 mx-3" raised={true} style={{ padding: "10px", width: "auto" }}>
                        <CardContent>
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.appointments?.clientdetails?.userName}</Typography>
                            <Typography>{props.data.appointments?.clientdetails?.mobileno}</Typography>
                            <Typography>{props.data.appointments?.clientdetails?.email}</Typography>

                        </CardContent>
                    </Card>
                </div>
            }
             {props.data.userInfo.status === "companylawyer" &&
                <div>
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Client Info</Typography>
                    </div>
                    <Card className="my-5 mx-3" raised={true} style={{ padding: "10px", width: "auto" }}>
                        <CardContent>
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.appointments?.clientdetails?.userName}</Typography>
                            <Typography>{props.data.appointments?.clientdetails?.mobileno}</Typography>
                            <Typography>{props.data.appointments?.clientdetails?.email}</Typography>

                        </CardContent>
                    </Card>
                </div>
            }
             {props.data.userInfo.status === "lawfirm" &&
                <div>
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Client Info</Typography>
                    </div>
                    <Card className="my-5 mx-3" raised={true} style={{ padding: "10px", width: "auto" }}>
                        <CardContent>
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.appointments?.clientdetails?.userName}</Typography>
                            <Typography>{props.data.appointments?.clientdetails?.mobileno}</Typography>
                            <Typography>{props.data.appointments?.clientdetails?.email}</Typography>

                        </CardContent>
                    </Card>
                </div>
            }
            {props.data.userInfo.status === "individual" &&
                <div>
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Lawyer Info</Typography>
                    </div>
                    <Card className="my-5 mx-3" raised={true} style={{ padding: "10px", width: "auto" }}>
                        <CardContent>
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.appointments?.lawyerdetails?.userName}</Typography>
                            <Typography> {props.data.appointments?.lawyerdetails?.mobileno}</Typography>
                            <Typography style={{wordWrap: "break-word"}}>{props.data.appointments?.lawyerdetails?.email}</Typography>

                        </CardContent>
                    </Card>
                </div>
            }
              {props.data.userInfo.status === "lawfirm" &&
                <div>
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Lawyer Info</Typography>
                    </div>
                    <Card className="my-5 mx-3" raised={true} style={{ padding: "10px", width: "auto" }}>
                        <CardContent>
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.appointments?.lawyerdetails?.userName}</Typography>
                            <Typography> {props.data.appointments?.lawyerdetails?.mobileno}</Typography>
                            <Typography>{props.data.appointments?.lawyerdetails?.email}</Typography>

                        </CardContent>
                    </Card>
                </div>
            }
            {props.data.userInfo.status === "clientfirm" &&
                <div>
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Lawyer Info</Typography>
                    </div>
                    <Card className="my-5 mx-3" raised={true} style={{ padding: "10px", width: "auto" }}>
                        <CardContent>
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.appointments?.lawyerdetails?.userName}</Typography>
                            <Typography> {props.data.appointments?.lawyerdetails?.mobileno}</Typography>
                            <Typography>{props.data.appointments?.lawyerdetails?.email}</Typography>

                        </CardContent>
                    </Card>
                </div>
            }

            <div className="col d-flex justify-content-start">
                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Appointments for you</Typography>
            </div>

            {!props?.data?.getAppointments?.filter(caseItem =>
                caseItem?.caseId === props.data.caseManagement.selectedCaseInfo.caseId)?.length && (
                    <Grid item xs={12}>
                        <Box display="flex" className={classes.noContent}>
                            <Box>
                                <FindReplaceSharpIcon />
                            </Box>
                            <Box>
                                <Typography gutterBottom variant="h5" component="h2">
                                    No Appointments for you
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
            )}

            {/* { props?.data?.getAppointments?.filter(caseItem =>
                caseItem?.caseId === props.data.caseManagement.selectedCaseInfo.caseId &&
                caseItem?.appointmentStatus == AppointmentStatus.ACCEPTED).map((item) => { */}
            { props?.data?.getAppointments?.filter(caseItem =>
                caseItem?.caseId === props.data.caseManagement.selectedCaseInfo.caseId).map((item) => {

                const date = new Date(item?.appointmentDate);
                const tDate = moment(date).format("DD/MM/YYYY HH:mm");
                return (
                    // <div className="col-6">
                    <div>
                        <div>
                            <Card className="my-5 mx-4" raised={true} style={{ padding: "15px", width: "auto" }}>
                                <CardContent>
                                    <Typography>From: <strong>{item?.fromName}</strong></Typography>
                                    <Typography className = {classes.para}>Message: {item?.message}</Typography>
                                    <Typography className = {classes.para}>
                                        Status: <strong className =
                                        {item?.appointmentStatus == AppointmentStatus.REQUESTED ? classes.blueLine
                                            : item?.appointmentStatus == AppointmentStatus.ACCEPTED? classes.greenLine
                                            : classes.redLine
                                        }>
                                        {item?.appointmentStatus}</strong>
                                    </Typography>
                                    <Typography className = {classes.para}>Appointment Date: {tDate}</Typography>
                                </CardContent>
                                
                                    
                                    {/* <CardContent>
                                        <Typography>From: <strong>{item?.fromName}</strong></Typography>
                                        <Typography className = {classes.para}>Message: {item?.message}</Typography>
                                        <Typography className = {classes.para}>Status: <strong className = {classes.greenLine}>                                            {item?.appointmentStatus}</strong>
                                        </Typography>
                                        <Typography className = {classes.para}>Appointment Date: {tDate}</Typography>
                                    </CardContent> */}
                                
                            </Card>
                        </div>
                    </div>
                );
            })}

            <div className="col d-flex justify-content-start">
                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Requested Appointments</Typography>
            </div>

            {!props?.data?.fromAppointments?.filter(caseItem =>
                caseItem?.caseId === props.data.caseManagement.selectedCaseInfo.caseId)?.length && (
                <Grid item xs={12}>
                    <Box display="flex" className={classes.noContent}>
                        <Box>
                            <FindReplaceSharpIcon />
                        </Box>
                        <Box>
                            <Typography gutterBottom variant="h5" component="h2">
                                No Requested Appointments
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            )}

            {/* { props?.data?.getAppointments?.filter(caseItem =>
                caseItem?.caseId === props.data.caseManagement.selectedCaseInfo.caseId &&
                caseItem?.appointmentStatus == AppointmentStatus.ACCEPTED).map((item) => { */}
            { props?.data?.fromAppointments?.filter(caseItem =>
                caseItem?.caseId === props.data.caseManagement.selectedCaseInfo.caseId).map((item) => {

                const date = new Date(item?.appointmentDate);
                const tDate = moment(date).format("DD/MM/YYYY HH:mm");
                return (
                    // <div className="col-6">
                    <div>
                        <div>
                            <Card className="my-5 mx-4" raised={true} style={{ padding: "15px", width: "auto" }}>
                                <CardContent>
                                    <Typography>To: <strong>{item?.toName}</strong></Typography>
                                    <Typography className = {classes.para}>ToEmail: {item?.toEmail}</Typography>
                                    <Typography className = {classes.para}>Message: {item?.message}</Typography>
                                    <Typography className = {classes.para}>
                                        Status: <strong className =
                                        {item?.appointmentStatus == AppointmentStatus.REQUESTED ? classes.blueLine
                                            : item?.appointmentStatus == AppointmentStatus.ACCEPTED? classes.greenLine
                                            : classes.redLine
                                        }>
                                        {item?.appointmentStatus}</strong>
                                    </Typography>
                                    <Typography className = {classes.para}>Appointment Date: {tDate}</Typography>
                                </CardContent>
                                
                                    
                                    {/* <CardContent>
                                        <Typography>From: <strong>{item?.fromName}</strong></Typography>
                                        <Typography className = {classes.para}>Message: {item?.message}</Typography>
                                        <Typography className = {classes.para}>Status: <strong className = {classes.greenLine}>                                            {item?.appointmentStatus}</strong>
                                        </Typography>
                                        <Typography className = {classes.para}>Appointment Date: {tDate}</Typography>
                                    </CardContent> */}
                                
                            </Card>
                        </div>
                    </div>
                );
            })}

            <div className="col d-flex justify-content-start">
                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Others</Typography>
            </div>
            <div className="container-sm-12 mx-3" style={{ width: "100%" }}>
                <div className="row" style={{ width: "100%" }}>

                    {namespace?.casecontactdetails?.map((item) => {
                        return (
                            <div className="col-4">
                                <div>
                                    <Card className="my-5 mx-3" raised={true} style={{ padding: "15px", width: "auto" }}>
                                        <CardContent>
                                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{item.contactName}</Typography>
                                            <Typography>{item.contactMobileNo}</Typography>
                                            <Typography>{item.contactEmail}</Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        );
                    })}
                    {namespace?.casecontactdetails && namespace?.casecontactdetails?.length === 0 &&
                        (
                            <Grid item xs={12}>
                                <Box display="flex" className={classes.noContent}>
                                    <Box>
                                        <FindReplaceSharpIcon />
                                    </Box>
                                    <Box>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            No Contacts Found
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
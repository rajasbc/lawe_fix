import { Box, Button, Card, CardContent, Dialog, Grid, IconButton, InputAdornment, Paper, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import ResponsiveDialog from "../../../components/ClouserDialog/ClouserDialog";
import moment from "moment";
import { components, default as ReactSelect } from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import { isEqual } from "lodash";
import RefreshIcon from '@material-ui/icons/Refresh';

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
    refreshIcon: {
        paddingLeft: "10px",
        color: '#FFC602',        
        cursor: "pointer",
    },
    refreshIconButton: {
    fontSize: "1.5rem",
    marginBottom:"2px",
    }

}));
export function Notify (props) {

    const [saveResponse, setsaveResponse] = React.useState(null);
    const [userName, setName] = useState("");
    const [userEmail, setEmail] = useState("");

    useEffect(() => {
        if (
            props.data.caseManagement?.saveContactResponse &&
            !isEqual(saveResponse, props.data.caseManagement?.saveContactResponse)
        ) {
            setsaveResponse(props.data.caseManagement?.saveContactResponse?.response);

            if (props.data.caseManagement?.saveContactResponse?.response === "User Not Exists") {
                setOpenInvite(true)
            }
            else {
                const getCaseInfoDataHearing = {
                    caseId: props.data.caseManagement.selectedCaseInfo.caseId,
                    userId: props.data.userInfo.id,
                    type: props.data.userInfo.status,
                };
                props.data.CaseManagementActions.getHearingsByCaseId(getCaseInfoDataHearing)
            }
            props.data.CaseManagementActions.clearResponse();

        }
        
    }, [props.data.caseManagement]);

    useEffect(() => {

        let notifyInput = {
            caseId: props.data?.caseManagement.selectedCaseInfo?.caseId
        };
        props.data.CaseManagementActions.getNotiByCaseId(notifyInput);

    // }, [props.data?.caseManagement.notiBycaseId]);
    }, [props.data?.caseManagement.notifysend]);
    

    const classes = useStyles();
    let namespace = props.data.notify;
    const [open, setOpen] = React.useState(false);
    const [opennoti, setOpenNoti] = React.useState(false);
    const [openInvite, setOpenInvite] = React.useState(false)
    const [isError, setIsError] = React.useState(false);
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const [notiTo, setNotiTo] = React.useState([]);
    const [selectUserError, setSelectNameError] = useState("");
    
    const [isNameError, setIsNameError] = React.useState(false);    
    const [isMobError, setIsMobError] = React.useState(false);    
    const [isMailError, setIsMailError] = React.useState(false);

    let mobileNumber, emailId, contactName;
    let toContactInfo = [];
    let sendnotidata = [];
    const getCaseInfoDataHearing = {
        caseId: props.data.caseManagement.selectedCaseInfo.caseId,
        userId: props.data.userInfo.id,
        type: props.data.userInfo.status,
    };
    const selectedCaseInfo = props.data.caseManagement.selectedCaseInfo;
    let clientInfo = {
        "value": selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientName : selectedCaseInfo.companyName,
        "label": selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientName : selectedCaseInfo.companyName,
        "id": selectedCaseInfo.clientId != 0 ? selectedCaseInfo.clientId : selectedCaseInfo.companyId,
        "type": selectedCaseInfo.clientId != 0 ? "individual" : "clientfirm",
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
        }

        toContactInfo.push(data)

    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIsNameError(false);
        setIsMobError(false);
        setIsMailError(false);
        setOpen(false);
    };
    const handleInviteClose = () => {
        setOpenInvite(false);
    };

    const handleAdd = async () => {
        
        var name :any = document.getElementById("contactname");
        var mobile :any = document.getElementById("contactmobile");
        var email :any = document.getElementById("contactemail");
        
        if (!name.value.length) {
            setIsNameError(true);
        }
        
        if (!mobile.value.length || mobile.value.length > 10 || mobile.value.length < 10) {
            setIsMobError(true);
        }

        if (!email.value.length) {
            setIsMailError(true);
        }

        if (name.value.length && email.value.length && mobile.value.length && mobile.value.length !>= 10 && mobile.value.length !<= 10) {
        // if (!isNameError && !isMobError && !isMailError ) {
            setOpen(false);
            mobileNumber = mobile.value;
            emailId = email.value;
            contactName = name.value;

            setName(contactName);
            setEmail(emailId);

            let m = moment(new Date());
            let date = m.utc().format();
            let data = {
                contactName: name.value,
                contactMobileNo: mobile.value,
                contactEmail: email.value,
                created: date,
                caseId: props.data.caseManagement.selectedCaseInfo.caseId,
            };
            await props.data.CaseManagementActions.saveCaseContacts(data);

            // let notifyInput = {
            //     caseId: props.data?.caseManagement.selectedCaseInfo?.caseId
            // };
            // await props.data.CaseManagementActions.getNotiByCaseId(notifyInput);
        }        

    };

    const handleInvite = async () => {

        setOpenInvite(false);
        const mailData = {
            from: props.data?.caseManagement?.selectedCaseInfo?.lawyerEmail,
            to: userEmail,
            // senderName: props.data?.caseManagement?.selectedCaseInfo?.lawyerEmail,
            name: userName
        };
        // await props.data.CaseManagementActions.sendMail(mailData);
        await props.data.CaseManagementActions.sendInviteMail(mailData);
    };

    const handleRefresh = async () => {

        let notifyInput = {
            caseId: props.data?.caseManagement.selectedCaseInfo?.caseId
        };
        await props.data.CaseManagementActions.getNotiByCaseId(notifyInput);
    };

    const handleOpenNotification = () => {
        setOpenNoti(true);
    };
    const handleCloseNoti = () => {
        setSelectNameError("")
        setOpenNoti(false);
    };
    const handleSend = async () => {
        
        if (notiTo?.length) {
            setOpenNoti(false);
            var message :any = document.getElementById("message");
            let m = moment(new Date());
            let date = m.utc().format();
            notiTo?.map((item) => {

                let data = {
                    notification: message.value,
                    created: date,
                    caseId: props.data.caseManagement.selectedCaseInfo.caseId,
                    fromId: props.data.userInfo.status == "clientfirm" ? props.data.userInfo.id : props.data.userInfo.id,
                    fromName: props.data.userInfo.status == "clientfirm" ? props.data.userInfo.companyName : props.data.userInfo.userName,
                    toId: item.id,
                    toName: item.value,
                    type: item.type,
                    status: "message",
                    notificationStatus:0,
                    readByUser:"No"
                }
                sendnotidata.push(data)
            });
            await props.data.CaseManagementActions.sendNotification(sendnotidata);
           
        } else {
            setSelectNameError("Please Select User");
        }
    };
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

        await props.data.CaseManagementActions.deleteCaseContacts(data)
        await props.data.CaseManagementActions.getHearingsByCaseId(getCaseInfoDataHearing)
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
    const handleMultiChange = (notiTo: any) => {
        setNotiTo(notiTo);
    }
    return (
        <div>
            <div className="container-sm-12" style={{}}>
                <div className="row mx-4 my-5">
                    <div className="col d-flex justify-content-start">
                        <Typography style={{ fontWeight: "bold", fontSize: "25px" }}>Notify</Typography>
                        <Typography style={{ fontWeight: "light", paddingTop: "8px"}}>
                            
                            <span className={classes.refreshIcon} onClick = {handleRefresh}>                                 
                                <RefreshIcon className={classes.refreshIconButton}></RefreshIcon>
                                ( Refresh )
                            </span>
                            
                        </Typography>
                    </div>
                    <div className="justify-content-end send-notification" >
                    {/* <div className="send-notification" > */}
                        <Button variant="contained" className="addcontacts mx-2" style={{ backgroundColor: "#292734", color: "#FFC602" }} onClick={handleClickOpen}>
                            Add Contacts
                        </Button>
                        <Button variant="contained" className="addcontacts mx-2" style={{ backgroundColor: "#292734", color: "#FFC602" }} onClick={handleOpenNotification}>
                            Send Notifications
                        </Button>

                    </div>
                </div>
            </div>

            <div>
                <ResponsiveDialog
                    title="Add Contacts"
                    content={<div>
                        <div><InputLabel className="mt-3">Name</InputLabel>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="contactname"
                                fullWidth
                                variant="outlined"
                                placeholder="Enter Name"
                                error={isNameError}
                                onChange={(e) => {
                                    if (e.target.value.length) {
                                        setIsNameError(false);
                                    } else {
                                        setIsNameError(true);
                                    }
                                }}
                            /></div>
                        <div><InputLabel className="mt-3">Mobile Number</InputLabel>
                            <TextField
                                margin="dense"
                                id="contactmobile"
                                variant="outlined"
                                error={isMobError}
                                placeholder="999 999 9999"
                                fullWidth
                                onChange={(e) => {
                                    if (e.target.value.length > 10 || e.target.value.length < 10 || !e.target.value.length) {
                                        setIsMobError(true);
                                    } else if (e.target.value.length) {
                                        setIsMobError(false);
                                    }
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                        +91
                                    </InputAdornment>,
                                }}
                            /></div>
                        <div><InputLabel className="mt-3">Email ID</InputLabel>
                            <TextField
                                margin="dense"
                                id="contactemail"
                                variant="outlined"
                                fullWidth
                                placeholder="Email ID (eg:xyz@gmail.com)"
                                error={isMailError}
                                onChange={(e) => {
                                    if (e.target.value.length) {
                                        setIsMailError(false);
                                    } else {
                                        setIsMailError(true);
                                    }
                                }}
                            /></div>
                    </div>}
                    okText="Add"
                    cancelText="Cancel"
                    isOpen={open}
                    handleClose={handleClose}
                    handleOk={handleAdd}
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
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.notify?.clientdetails?.userName}</Typography>
                            <Typography>{props.data.notify?.clientdetails?.mobileno}</Typography>
                            <Typography>{props.data.notify?.clientdetails?.email}</Typography>

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
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.notify?.clientdetails?.userName}</Typography>
                            <Typography>{props.data.notify?.clientdetails?.mobileno}</Typography>
                            <Typography>{props.data.notify?.clientdetails?.email}</Typography>

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
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.notify?.clientdetails?.userName}</Typography>
                            <Typography>{props.data.notify?.clientdetails?.mobileno}</Typography>
                            <Typography>{props.data.notify?.clientdetails?.email}</Typography>

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
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.notify?.lawyerdetails?.userName}</Typography>
                            <Typography> {props.data.notify?.lawyerdetails?.mobileno}</Typography>
                            <Typography style={{wordWrap : 'break-word'}}>{props.data.notify?.lawyerdetails?.email}</Typography>

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
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.notify?.lawyerdetails?.userName}</Typography>
                            <Typography> {props.data.notify?.lawyerdetails?.mobileno}</Typography>
                            <Typography style={{wordWrap : 'break-word'}}>{props.data.notify?.lawyerdetails?.email}</Typography>

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
                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{props.data.notify?.lawyerdetails?.userName}</Typography>
                            <Typography> {props.data.notify?.lawyerdetails?.mobileno}</Typography>
                            <Typography style={{wordWrap : 'break-word'}}>{props.data.notify?.lawyerdetails?.email}</Typography>

                        </CardContent>
                    </Card>
                </div>
            }
            <div>
                <ResponsiveDialog
                    title="Send Notifications"
                    content={<div>
                        <div><InputLabel className="mt-3">To</InputLabel>
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
                            <div className = {classes.noInputDataError}>
                                <small>{selectUserError}</small>
                            </div> 
                        </div>
                        <div><InputLabel className="mt-3">Message</InputLabel>
                            <TextareaAutosize cols={65} rows={5} id="message"  className="textareastyle"/></div>

                    </div>}
                    okText="Send"
                    cancelText="Cancel"
                    isOpen={opennoti}
                    handleClose={handleCloseNoti}
                    handleOk={handleSend}
                    handleCancel={handleCloseNoti}
                />
            </div>

            <div className="col d-flex justify-content-start">
                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Notifications send</Typography>
            </div>
            
            <div className="container-sm-12 mx-3" style={{ width: "100%" }}>
                <div className="row" style={{ width: "100%" }}>
                    {props.data.caseManagement.notiBycaseId?.map((item) => {
                        return (
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <div>
                                    <Card className="my-3 mx-3" raised={true} style={{ padding: "15px" }}>
                                        <CardContent>
                                        <Typography>To : <strong>{item?.toName}</strong></Typography>
                                        <Typography className = {classes.para}>Message : {item?.notification}</Typography>
                                        <Typography className = {classes.para} style={{wordWrap:"break-word" }}>To Email : {item?.toEmail}</Typography>                                        
                                        <Typography className = {classes.para}>
                                            Read by user : <strong className =
                                            {item?.readByUser == "No" ? classes.blueLine
                                                : classes.greenLine
                                            }>
                                            {item?.readByUser == "No"? " Not Yet": " Read"}</strong>
                                        </Typography>                                

                                            {/* <div className="d-flex justify-content-end">

                                                <IconButton aria-label="delete notes" onClick={(eve) => {
                                                    handleDeleteButton(eve, item["id"]);
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>

                                            </div> */}
                                        </CardContent>
                                    </Card>
                                </div>
                                {/* <div>
                                    <ResponsiveDialog
                                        title="Delete Notification"
                                        content={`Would you like to delete this Notification permanently ?`}
                                        okText="Yes"
                                        cancelText="No"
                                        isOpen={deleteopen}
                                        handleClose={handleDeleteClose}
                                        handleOk={handleDelete}
                                        handleCancel={handleDeleteClose}
                                    />

                                </div> */}
                            </div>
                        );
                    })}
                    {props.data.caseManagement.notiBycaseId && props.data.caseManagement.notiBycaseId?.length === 0 &&
                        (
                            <Grid item xs={12}>
                                <Box display="flex" className={classes.noContent}>
                                    <Box>
                                        <FindReplaceSharpIcon />
                                    </Box>
                                    <Box>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            No Notifications Found
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    }
                </div>
            </div>
            

            <div className="col d-flex justify-content-start">
                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>Others</Typography>
            </div>
            <div className="container-sm-12 mx-3" style={{ width: "100%" }}>
                <div className="row" style={{ width: "100%" }}>

                    {namespace?.casecontactdetails?.map((item) => {
                        return (
                            <div>
                            <div >
                                {/* <div> */}
                                    <Card className="my-5 mx-3" raised={true} style={{ padding: "15px", width: "auto" }}>
                                        <CardContent>
                                            <Typography style={{ fontWeight: "bold", justifyContent: "center", fontSize: "20px" }}>{item.contactName}</Typography>
                                            <Typography>{item.contactMobileNo}</Typography>
                                            <Typography>{item.contactEmail}</Typography>

                                            <div className="d-flex justify-content-end">

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
                                        title="Delete Contact"
                                        content={`Would you like to delete this contact permanently ?`}
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
            {
                openInvite &&
                <ResponsiveDialog
                    title="User Not Exists"
                    content={""}
                    formContent={<div><p>This contact is not On Boarded to LAWE.</p> <p>Would you like to send an invite ?</p></div>}
                    okText="Invite"
                    cancelText="Cancel"
                    isOpen={openInvite}
                    handleClose={handleInviteClose}
                    handleOk={handleInvite}
                    handleCancel={handleInviteClose}
                />
            }
        </div>
    );
}
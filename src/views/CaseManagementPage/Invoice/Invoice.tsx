import { Box, Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import SendIcon from '@material-ui/icons/Send';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  card: {
    margin: ".5rem 3rem",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 50%)",
    minHeight: "50px",
    padding: "5px",
    display: "table-row",
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

  title: {
    fontSize: "1rem",
    fontWeight: 300,
    marginLeft: "1rem",
  },
  subText: {
    fontSize: "1rem",
    fontWeight: 300,
    marginLeft: "1rem",
    width: "100%",
  },
  link: {
    marginLeft: "1rem",
    fontSize: "1.2rem",
    color: "#2196f3",
    fontWeight: 500,
  },
  addBtn: {
    height: "32px",
    fontSize: "0.975rem",
    textTransform: "none",
    color: "#FFC602",
    backgroundColor: "#292734",
    marginLeft: "1rem",
    "&:hover": {
      color: "#FFC602",
      backgroundColor: "#000",
    },
    "& span": {
      color: "#FFC602",
    },
  },
  contentContainer: {
    display: "table-cell",
  },
  grid: {
    display: "table",
    margin: "1rem",
  },
  mainGrid:{
    margin:"1rem",
  }
}));

export const Invoice = (props) => {
  const classes = useStyles();
  const [isClient, setIsClient]=useState(false);

  useEffect(() => {
    const { selectedCaseInfo } = props.caseManagement;
    const isClient  = (props.userInfo["status"]=="individual" || props.userInfo["status"]=="clientfirm")?true:false;
    setIsClient(isClient);
    refreshList(selectedCaseInfo?.caseId);
  }, []);

  const refreshList = (caseId: number) => {
    props.CaseManagementActions.getInvoiceByCaseId({
      caseId: caseId,
    });
  };

  const handleSendClient = (eve: any, id: any) => {
    const { selectedCaseInfo: { lawyerId, lawyerName, caseId, clientName, clientId,companyId,companyName } } = props.caseManagement;
    props.CaseManagementActions.updateInvoice({
      id: id,
      param: { status: 2 }
    });
    let m = moment(new Date());
    let date = m.utc().format();
    let data = {
      notification: `Lawyer ${lawyerName} send you the invoice. Please view the invoice.`,
      created: date,
      caseId: caseId,
      fromId: lawyerId,
      fromName: lawyerName,
      toId: clientId!=0?clientId:companyId,
      toName: clientId!=0?clientName:companyName,
      status: "pending",
      type: clientId!=0?"individual":"clientfirm",
      notificationStatus:3,
      readByUser:"No"
    }
    props.CaseManagementActions.sendNotification(data)
  }

  return (
    <Box className={classes.root}>
      <Grid container alignItems="center" justify="flex-start" className={classes.mainGrid}>
        {props.caseManagement &&
          props.caseManagement?.invoices?.length > 0 &&
          props.caseManagement.invoices.map((item) => {
            return (
              <React.Fragment>
                <Grid item xs={7} className={classes.grid}>
                  <div className={classes.card}>
                    {/* <div className={classes.contentContainer}>
                 
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Invoice Number: <b>{item.invoiceNo}</b>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Phase Name: <b>{item.phaseName}</b>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Ordered Date: <b>{moment(item.created).format('MMMM d, YYYY')}</b>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Invoice Total: <b>{item.amount}</b>
                      </Typography>
                    </div> */}
                    <div className={classes.contentContainer}>
                    <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Invoice Number: <b>{item.invoiceNo}</b>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Phase Name: <b>{item.phaseName}</b>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Ordered Date: <b>{moment(item.created).format('MMMM d, YYYY')}</b>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Invoice Total: <b>{item.amount}</b>
                      </Typography>
                    {/* <div className="contentinvoice"> */}
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        <b>Billing Address</b>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Name: <b>{item.clientName}</b>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h1" className={classes.subText}>
                        Address: <b>{item.clientAddress}</b>
                      </Typography>
                    </div>
                  </div>
                </Grid>
               {!isClient && ( 
                <Grid item xs={2}>
                  <div className={classes.contentContainer}>
                  {/* <div className="contentinvoice"> */}
                    <Button
                      aria-controls={open ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onClick={(eve) => {
                        handleSendClient(
                          eve,
                          item.id
                        );
                      }}
                      className={classes.addBtn}
                    >
                      <SendIcon />
                      Send
                    </Button>
                  </div>
                </Grid>
                )}
              </React.Fragment>
            );
          })}
        {props.caseManagement?.invoices?.length == 0 && (
          <Grid item xs={12}>
            <Box display="flex" className={classes.noContent}>
              <Box>
                <FindReplaceSharpIcon />
              </Box>
              <Box>
                <Typography gutterBottom variant="h5" component="h2">
                  No Invoices Found
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

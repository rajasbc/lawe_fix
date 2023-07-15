
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography
} from "@material-ui/core";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import classNames from "classnames";
import 'date-fns';
import moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import face from "../../assets/img/faces/avatar.png";
import ResponsiveDialog from "../../components/ClouserDialog/ClouserDialog";
import './CheckBoxList.scss';
import './Dashboard.scss';

const styles:any = {
  large: {
    width: "100px",
    height: "100px",
  },
  root: {
    padding: '0'
  },
  listItem: {
    position: 'relative',
    padding: '0'
  },
  listItemIcon: {
    position: 'absolute',
    top: '15px',
    left: '35px',
  },
};

const useStyles = makeStyles(styles);

export function CheckboxList(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>

      {props.data.map((item) => {
        return (
          <ListItem className={classes.listItem} key={item.id} role={undefined}>
            <MediaCard data={item} userInfo={props.userInfo} status={props.userInfo.status} handleCaseNavigation={props.handleCaseNavigation} DashboardActions={props.DashboardActions} caseLawyers={props.caseLawyers} />
          </ListItem>
        );
      })}
    </List>
  );
}

export function MediaCard(props) {
  const classes = useStyles();

  const infoClass = classNames({
    'warning-text': !props.data.isClosed,
    'error-text': props.data.isClosed
  });
  const submittedOn = moment(new Date(props.data.dueDate)).format('DD/MM/YYYY');
  const [isFavorite, setFavorite] = React.useState("");
  const [reassignConfirm,setReassignConfirm] = React.useState(false);
  const [status,setStatus] = React.useState(props.data.status);

  const handleViewDetails = () => {
    props.handleCaseNavigation(props.data);
  }

  const handleReaasignLawyer = async () => {
    const param = {
      status:"reassign_pending",
      id:props.data.id,
    };
    await props.DashboardActions.updateCaseStatus(param);
    await setStatus("reassign_pending");

  }

  const handleFavorites = async (eve, id) => {
    setFavorite("false")
    let data = {
      favorites: "No",
      caseId: id
    }
    props.DashboardActions.addToFavorite(data);

  }
  const handleNotFavorites = async (eve, id) => {
    setFavorite("true")
    let data = {
      favorites: "Yes",
      caseId: id
    }
    props.DashboardActions.addToFavorite(data);
  }

  
  const handleReassignClose = () => {
    setReassignConfirm(false);
  }

  const handleReassignSave = () => {
    const param = {
      id:props.data.id,
    }
    props.DashboardActions.reassignIndividualLawyer(param);
    setReassignConfirm(false);
  }
  const handleAcceptReassign = ()=>{
    setReassignConfirm(true);
  }

  const getDifferentDays = ()=>{
    var d1 = moment(props.data.transferRequestedDate).utc().format("DD/MM/YYYY");
    var d2 = moment(new Date()).utc().format("DD/MM/YYYY");
    var diff = moment(d2).diff(d1, 'days')
    return diff;
  }

  const handleCancelTransfer = () => {
    const param = {
      status:"accepted",
      id:props.data.id,
    }
    props.DashboardActions.updateCaseStatus(param);
    setStatus("accepted");
  }
  
  return <Card className="card-container">
    <CardActionArea>
      <CardContent>
        <Grid container>
          <Grid container xs={2} alignItems="center" justify="center">
            <Avatar alt="Remy Sharp" src={face} className={classes.large} />
          </Grid>
          <Grid container xs={10} alignItems="center">
            {props.data.status === "requested" &&
              <div className="warning-text-container">
                <Typography variant="button" display="block" gutterBottom className={infoClass}>
                  Action Required !
                </Typography>
              </div>
            }
            {props.data.status === "proposed" &&
              <div className="warning-text-container">
                <Typography variant="button" display="block" gutterBottom className={infoClass}>

                </Typography>
              </div>
            }
            {props.data.status === "accepted" && props.status === "lawyer" &&
              <div className="warning-text-container">
                {
                  props.data.favorites !== "Yes" && isFavorite === "" && (
                    <div>

                      <IconButton className={infoClass} onClick={(eve) => {
                        handleNotFavorites(eve, props.data.caseId);
                      }}>
                        <StarBorderIcon />
                      </IconButton>

                    </div>
                  )
                }
                {props.data.favorites === "Yes" && isFavorite === "" &&
                  (
                    <div>

                      <IconButton className={infoClass} onClick={(eve) => {
                        handleFavorites(eve, props.data.caseId);
                      }} >
                        <StarIcon />
                      </IconButton>


                    </div>
                  )
                }
                {isFavorite === "true" && (
                  <IconButton className={infoClass} onClick={(eve) => {
                    handleFavorites(eve, props.data.caseId);
                  }} >
                    <StarIcon />
                  </IconButton>
                )
                }
                {isFavorite === "false" && (
                  <IconButton className={infoClass} onClick={(eve) => {
                    handleNotFavorites(eve, props.data.caseId);
                  }}>
                    <StarBorderIcon />
                  </IconButton>
                )
                }

              </div>
            }

            {props.data.status === "accepted" && props.status !== "lawyer" &&
              <div className="warning-text-container">
                <Typography variant="button" display="block" gutterBottom className={infoClass}>

                </Typography>
              </div>
            }
            {props.data.status === "archieved" &&
              <div className="warning-text-container">
                <Typography variant="button" display="block" gutterBottom className={infoClass}>

                </Typography>
              </div>
            }
            <Typography gutterBottom variant="h5" component="h5" className="title-text">
              {props.data.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h5" className="location-text">
              {submittedOn}
            </Typography>
            <div className="ack-container">
              <Typography component="p" >
                Skill Match: {props.data.product}, {props.data.subproduct}
                </Typography>
                {props.data.status === "requested" && props.status === "individual" &&
                <Typography component="p" className="acknowledge-text">
                  Requested Lawyer - {props.data.lawyerName}
                </Typography>
              }
              {props.data.status === "requested" && props.status === "companylawyer" && props.userInfo.userName != props.data.lawyerName &&
                <Typography component="p" className="acknowledge-text">
                  Requested Lawyer - {props.data.lawyerName}
                  <div></div>
                  Requested Client - {props.data.clientName}
                </Typography>
              }
              {props.data.status === "requested" && props.status === "companylawyer" && props.userInfo.userName === props.data.lawyerName &&
                <Typography component="p" className="acknowledge-text">
                  Assigned Me
                  <div></div>
                  Requested Client - {props.data.clientName}
                </Typography>
              }

              {props.data.status === "requested" && props.status === "lawyer" &&
                <Typography component="p" className="acknowledge-text">
                  Requested Client - {props.data.clientName}
                </Typography>
              }
              
              {props.data.status === "proposed" && props.status === "individual" &&
                <Typography component="p" className="acknowledge-text">
                  Inquiry Submitted by - {props.data.lawyerName}
                </Typography>
              }
              {props.data.status === "proposed" && props.status === "clientfirm" &&
                <Typography component="p" className="acknowledge-text">
                  Inquiry Submitted to - {props.data.lawyerName}
                </Typography>
              }
              {props.data.status === "proposed" && props.status === "lawyer" &&
                <Typography component="p" className="acknowledge-text">
                  Inquiry Submitted to - {props.data.clientName}
                </Typography>
              }
              {props.data.status === "proposed" && props.status === "companylawyer" && props.userInfo.userName != props.data.lawyerName &&
                <Typography component="p" className="acknowledge-text">
                  Requested Lawyer - {props.data.lawyerName}
                  <div></div>
                  Inquiry Submitted to - {props.data.clientName}
                </Typography>
              }
              {props.data.status === "proposed" && props.status === "companylawyer" && props.userInfo.userName === props.data.lawyerName &&
                <Typography component="p" className="acknowledge-text">
                  Assigned Me
                  <div></div>
                  Inquiry Submitted to - {props.data.clientName}
                </Typography>
              }
              {props.data.status === "accepted" && props.status === "individual" &&
                <Typography component="p" className="acknowledge-text">
                  Lawyer Name - {props.data.lawyerName}
                </Typography>
              }
              {props.data.status === "accepted" && props.status === "clientfirm" &&
                <div>
                  <Typography component="p" className="acknowledge-text">
                    Lawyer Name - {props.data.lawyerName}
                  </Typography>
                </div>
              }
              {props.data.status === "accepted" && props.status === "companylawyer" &&  props.userInfo.userName != props.data.lawyerName &&
                <div>
                  <Typography component="p" className="acknowledge-text">
                    Lawyer Name - {props.data.lawyerName}
                    <div></div>
                    Client Name - {props.data.clientName}
                  </Typography>
                </div>
              }
              {props.data.status === "accepted" && props.status === "companylawyer" &&  props.userInfo.userName === props.data.lawyerName &&
                <div>
                  <Typography component="p" className="acknowledge-text">
                  Assigned Me
                    <div></div>
                  Client Name - {props.data.clientName}
                  </Typography>
                </div>
              }
              {props.data.status === "accepted" && props.status === "lawyer" &&
              

              <div>
             
            
                <Typography component="p" className="acknowledge-text">
                  Client Name - {props.data.clientName}
                </Typography>
                <Typography component="p" className="acknowledge-text">
                  Lawyer Name - {props.data.lawyerName}
              </Typography>
                </div>
              }
              {props.data.status === "archieved" && props.status === "individual" &&
                <Typography component="p" className="acknowledge-text">
                  Lawyer Name - {props.data.lawyerName}
                </Typography>
              }
              {props.data.status === "archieved" && props.status === "clientfirm" &&
                <div>
                  <Typography component="p" className="acknowledge-text">
                    Lawyer Name - {props.data.lawyerName}
                  </Typography>
                </div>
              }
              {props.data.status === "archieved" && props.status === "lawyer" &&
                <Typography component="p" className="acknowledge-text">
                  Client Name - {props.data.clientName}
                </Typography>
              }
            </div>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </CardActionArea>
    <CardActions className="action-container">
      <Grid container alignItems="center" justify="space-between">
        <Grid container xs={6}>
          <Typography variant="body2" gutterBottom>
            {props.data.description}
          </Typography>
        </Grid>
        {status == "accepted" && (props.status === "individual" || props.status === "clientfirm") &&
          <Grid container direction="column" xs={2}>
            <Button variant="contained" className="detail-btn" onClick={handleReaasignLawyer}>
              Transfer Lawyer 
            </Button>
          </Grid>
        }
        {/* getDifferentDays()<=2 */}
        {status == "reassign_pending"&& (props.status === "individual" || props.status === "clientfirm") &&
          <Grid container direction="column" xs={2}>
            <Button variant="contained" className="detail-btn" onClick={handleCancelTransfer}>
              Cancel Transfer
            </Button>
          </Grid>
        }
        <Grid container direction="column" justify="flex-end" xs={3} >
          <Button variant="contained" className="detail-btn mt-2" onClick={handleViewDetails}>
            View Details
          </Button>
          {props.data.isClosed &&
            <div>
              <Button className="link-action-btn" color="primary">View Judgement</Button>
            </div>
          }
        </Grid>
      </Grid>
    </CardActions>
    <ResponsiveDialog
      title="Reassign Confirm"
      content={""}
      formContent={<div>
        Are you sure want to accept this case?
      </div>}
      okText="Confirm"
      cancelText="Cancel"
      isOpen={reassignConfirm}
      handleClose={handleReassignClose}
      handleOk={handleReassignSave}
      handleCancel={handleReassignClose}
    />
  </Card>;
}
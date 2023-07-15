import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  Select,
  Typography,
  makeStyles
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { forOwn } from "lodash";
import React, { useState } from "react";
import face from "../../../assets/img/faces/avatar.png";
import ResponsiveDialog from "../../../components/ClouserDialog/ClouserDialog";
import "./CaseList.scss";

interface CaseListParams {
  caseList: any[];
  lawyers: any[];
  handleCaseNavigation: any;
  viewCaseFile: any;
  reAssignLawyer: any;
}
const styles: any = {
  large: {
    width: "100px",
    height: "100px",
  },
  root: {
    padding: "0",
  },
  listItem: {
    position: "relative",
    padding: "0",
  },
  listItemIcon: {
    position: "absolute",
    top: "15px",
    left: "35px",
  },
};

const useStyles = makeStyles(styles);

enum Case_Folders_constant {

  WITNESS = 1,
  LAW_NOTES = 2,
  CASE_FILES = 3,
  VICTIM = 4,
  PRIVATE_FOLDER = 5,
  AUDIO = 6,
  VIDEO = 7,
  DOCUMENTS = 8,
  JUDGEMENT = 9,

}

export const CaseList = (props: CaseListParams) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.caseList.map((item) => {
        return (
          <ListItem className={classes.listItem} key={item.id} role={undefined}>
            <MediaCard
              item={item}
              lawyers={props.lawyers}
              handleCaseNavigation={props.handleCaseNavigation}
              viewCaseFile={props.viewCaseFile}
              reAssignLawyer={props.reAssignLawyer}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

interface CardProps {
  item: any;
  handleCaseNavigation: any;
  lawyers: any[];
  viewCaseFile: any;
  reAssignLawyer: any;
}

export const MediaCard = (props: CardProps) => {

  const {
    caseLawyers_title,
    caseLawyers_description,
    caseLawyers_case_files,
    user_user_name,
    user_location,
    user_product,
    user_sub_product,
    caseLawyers_case_id,
    caseLawyers_status,
    caseLawyers_lawyer_id,
  } = props.item;

  const classes = useStyles();
  const [lawyer, setLawyer] = useState({ id: "", userName: "" });
  const [stageCloseConfirm, setStageCloseConfirm] = useState(false);

  const handleViewDetails = () => {
    props.handleCaseNavigation(props.item);
  };

  const viewCaseFile = (caseFile) => {
    const data = {
      caseId: caseFile.caseId,
      filePath: caseFile.filePath,
    };
    props.viewCaseFile(data);
  };

  const getDiffInDays = (date: string) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate: any = new Date();
    const secondDate: any = new Date(date);
    const diff = Number(firstDate - secondDate);
    return Math.round(diff / oneDay);
  };

  const caseStatus = () => {
    const { caseLawyers_status, caseLawyers_due_date } = props.item;
    if (caseLawyers_status === "requested") {
      const diffDays = getDiffInDays(caseLawyers_due_date);
      if (diffDays > 0) {
        return (
          <div className="status-grid">
            <Typography component="p" className="status-req">
              <span>{diffDays}</span>Days
            </Typography>
            <Typography component="p" className="status-req-text">
              left to Acknowledge
            </Typography>
          </div>
        );
      } else {
        return (
          <div className="status-grid">
            <Typography component="p" className="status-waiting">
              <span>Waiting</span> for lawyer
            </Typography>
          </div>
        );
      }
    } else if (caseLawyers_status === "proposed") {
      return (
        <div className="status-grid">
          <Typography component="p" className="status-pro">
            Acknowledged
          </Typography>

          <Typography component="p" className="status-waiting">
            <span>Waiting</span> for Customer
          </Typography>
        </div>
      );
    } else if (caseLawyers_status === "accepted") {
      let totalPhases = 0;
      let completedStages = 0;
      forOwn(props.item, (value, key) => {
        if (key.includes("phase_payment_")) {
          if (Number(value) > 0) {
            totalPhases++;
            if (props.item[`casePhases_phase_status_${key.slice(-1)}`] === 3) {
              completedStages++;
            }
          }
        }
      });
      return (
        <div className="status-grid">
          <Typography component="p" className="status-accept">
            Phase {completedStages}/{totalPhases}
          </Typography>
        </div>
      );
    }
  };

  const handleLawyerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedLawyer = props.lawyers.find(
      (lawyer) => lawyer.id == event.target.value
    );
    setLawyer({ id: selectedLawyer.id, userName: selectedLawyer.userName });
  };

  const caseFiles = () => {

    const caseFiles = caseLawyers_case_files ? JSON.parse(caseLawyers_case_files) : [];
    return (
      <div className="preview-container">
        {
          caseFiles &&
          caseFiles?.filter((filterCondition) => {

            if (filterCondition?.folderId != Case_Folders_constant.PRIVATE_FOLDER &&
              filterCondition?.folderId != Case_Folders_constant.VICTIM) {
              return filterCondition;
            }

          }).map((caseFile) => (

            <Avatar
              className="img-view"
              variant="rounded"
              onClick={() => viewCaseFile(caseFile)}
            >
              <AssignmentIcon />
            </Avatar>
          ))
        }
      </div>
    );
  };

  const handleReAssign = (event) => {
    setStageCloseConfirm(true);
  };

  const handleSuccessStageClose = () => {
    setStageCloseConfirm(false);
    const { caseLawyers_case_id, caseLawyers_lawyer_id } = props.item;
    const { id } = lawyer;

    props.reAssignLawyer({
      caseId: caseLawyers_case_id,
      oldLawyerId: caseLawyers_lawyer_id,
      newLawyerId: id,
    });
  };

  const handleCancelStageClose = () => {
    setStageCloseConfirm(false);
  };

  const handleCloseDialog = () => {
    setStageCloseConfirm(false);
  };

  return (
    <Card className="case-card-container">
      <CardActionArea>
        <CardContent>
          <Grid container>
            <Grid container xs={2} alignItems="center" justify="center">
              <Avatar alt="Remy Sharp" src={face} className={classes.large} />
            </Grid>
            <Grid container xs={4} alignItems="center">
              <Typography
                gutterBottom
                variant="h6"
                component="h5"
                className="title-text"
              >
                {caseLawyers_title}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                className="location-text"
              >
                {user_location}
              </Typography>
              <Typography component="p">
                Skill Match: {user_product}, {user_sub_product}
              </Typography>
            </Grid>
            <Grid container xs={3} alignItems="flex-end">
              {/* {caseLawyers_case_id && caseLawyers_status === "accepted" && (
                <Typography component="p">
                  Customer engaged via LAWE: {caseLawyers_case_id}
                </Typography>
              )} */}
              <Typography component="p">
                Customer engaged via LAWE: {caseLawyers_case_id}
              </Typography>
            </Grid>
            <Grid container xs={3}>
              {caseStatus()}
              <Grid container xs={12} alignItems="flex-end">
                <Typography component="p">
                  Currently Assigned to: {user_user_name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </CardActionArea>
      <CardActions className="action-container">
        <Grid container>
          <Grid container xs={9} alignItems="center">
            <Typography variant="h6" gutterBottom>
              Case Inquiry Detailed Description goes here
            </Typography>
            <Typography component="p" gutterBottom>
              {caseLawyers_description}
            </Typography>
            {caseFiles()}
            <div className="detail-container ">
              <Button
                variant="contained"
                className="detail-btn"
                onClick={handleViewDetails}
              >
                View Details
              </Button>
            </div>
          </Grid>
          <Grid container xs={3}>
            <div className="form-select-input">
              <FormControl variant="outlined" className="form-text-field">
                <InputLabel id="lawyer-select-label" className="select-lable">
                  Lawyers
                </InputLabel>
                <Select
                  native
                  className="select-input-field"
                  labelId="lawyer-select-label"
                  id="lawyer-select-outlined"
                  value={lawyer.id}
                  label="lawyer*"
                  onChange={handleLawyerChange}
                >
                  <option aria-label="None" value="" />
                  {props.lawyers.length > 0 &&
                    props.lawyers?.map((lawyer) => {
                      if (lawyer.id != caseLawyers_lawyer_id) {
                        return (
                          <option key={lawyer.userName} value={lawyer.id}>
                            {lawyer.userName}
                          </option>
                        );
                      }
                    })}
                </Select>
              </FormControl>
            </div>
            <Button
              variant="contained"
              className="reassign-btn"
              onClick={handleReAssign}
            >
              Re-Assign
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <ResponsiveDialog
        title="Case Re-Assign"
        content={`Do you want to re-assign “${caseLawyers_title}” to “${lawyer.userName}” lawyer?`}
        okText="Yes, Re-Assign this case"
        cancelText="No, Do not make any change"
        isOpen={stageCloseConfirm}
        handleClose={handleCloseDialog}
        handleOk={handleSuccessStageClose}
        handleCancel={handleCancelStageClose}
      />
    </Card>
  );
};

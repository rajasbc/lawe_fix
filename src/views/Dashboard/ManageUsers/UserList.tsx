
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  Theme,
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@material-ui/core";

import face from "../../../assets/img/faces/avatar.png";
import ResponsiveDialog from "../../../components/ClouserDialog/ClouserDialog";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Form } from 'react-formio';
import companyLawyerForm from '../../../assets/form/companylawyer.json';
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Roles } from "../Dashboard";
import { isEmpty } from "lodash";


interface UserListParams {
  lawyers: any[];
  roles: any;
  updateRole: any,
  addCompanyLawyer: any,
  snackbarsActions: any;
  updateRoleRes: any;
  refreshLawyers: any;
}
const styles: any = {
  cardContainer: {
    width: "100%",
    margin: "10px 20px",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.5)",
  },
  locationText: {
    fontSize: "1rem",
    width: "100%",
  },
  titleText: {
    fontSize: "1.1rem",
    width: "100%",
  },
  actionContainer: {
    padding: "10px 15px",
    "& h6": {
      textTransform: "unset",
      fontSize: "1.1rem",
      width: "100%",
    },
    "& p": {
      width: "100%",
    },

  },
  formSelectInput: {
    width: "100%",
  },
  formTextField: {
    flex: 1,
    marginRight: "10px",
    width: "100%",
  },
  selectLable: {
    lineHeight: "0.2 !important",
    "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -3px) scale(0.75) !important",
    }
  },
  detailBtn: {
    opacity: "0.6",
    borderRadius: "8px",
    backgroundColor: "#FFC602",
    textTransform: "unset",
    width: "130px",
    minHeight: "40px",
    marginLeft: "1rem",
    "&:hover": {
      color: "#000",
      backgroundColor: "#FFC602",
    },
    "span": {
      color: "#000",
      letterSpacing: "0",
      lineHeight: "24px",
    },
  },
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
  addContainer: {
    textAlign: 'right',
    margin: "1rem 1rem",
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#292734'
  },
  title: {
    // marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: "center",
  },
  fullScreenDialog: {
    width: "100% !important",
  },
  lawyerSelectControl: {
    marginLeft: "1rem",
  }
};

const useStyles = makeStyles(styles);

export const UserList = (props: UserListParams) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const setRole = false;

  const viewPwd = (event) => {
    event.data.view_pwd = event.data.password
  }

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleFormClose = () => {
    setOpen(false);
  };
  const getCompanyLawyerFromData = (event) => {
    props.addCompanyLawyer(event.data);
    setOpen(false);
  }
  const options = {
    noAlerts: true,
  }
  return (
    <React.Fragment>
      <div className={classes.addContainer}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.detailBtn}
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
        >
          Lawyer
        </Button>
      </div>
      <List className={classes.root}>

        {props.lawyers.map((item) => {
          return (
            // <ListItem className={classes.listItem} key={item.id} role={undefined}>
            <MediaCard
              lawyers={props.lawyers}
              item={item}
              roles={props.roles}
              updateRole={props.updateRole}
              snackbarsActions={props.snackbarsActions}
              updateRoleRes={props.updateRoleRes}
              refreshLawyers={props.refreshLawyers}
            />
            // </ListItem>
          );
        })}
      </List>
      {open &&
        <Dialog fullScreen className={classes.fullScreenDialog} onBackdropClick={handleFormClose} open={open} onClose={handleFormClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleFormClose} aria-label="back">
                <ArrowBackIosIcon />
                Back
              </IconButton>
            </Toolbar>
          </AppBar>
          <Form form={companyLawyerForm} onSubmit={getCompanyLawyerFromData} options={options} />
        </Dialog>}
    </React.Fragment>
  );
};
interface CardProps {
  item: any;
  roles: any,
  updateRole: any,
  lawyers: any[],
  snackbarsActions: any,
  updateRoleRes: any,
  refreshLawyers: any,
}

const MediaCard = (props: CardProps) => {

  const {
    userName,
    product,
    subProduct,
    location,
    experience,
  } = props.item;

  const classes = useStyles();
  const [stageCloseConfirm, setStageCloseConfirm] = useState(false);
  const [showSelectLawyer, setShowSelectLawyer] = useState(true);
  const [lawyerId, setLawyerId] = useState(0);
  const [selectedRole, setSelectedRole] = useState({});
  const [isValidLawyer, setIsValidLawyer] = useState(true);
  const [isValidRole, setIsValidRole] = useState(true);
  const [lawyerList, setLawyerList] = useState([]);
  const [allLawyers, setAllLawyers] = useState([]);

  useEffect(() => {
    setSelectedRole(props.item?.role);
    const topParent = Object.values(props?.item?.parentIds)[Object.values(props?.item?.parentIds).length - 1];
    const value = topParent ? Number(topParent) : 0;
    setLawyerId(value);

  }, [])

  useEffect(() => {
    setAllLawyers(props.lawyers);
    setLawyerList(props.lawyers);
  }, [props.lawyers])

  useEffect(() => {
    props.refreshLawyers();
    setAllLawyers(props.lawyers);
    setLawyerList(props.lawyers);
  }, [props.updateRoleRes])

  const handleRoleChange = (event) => {

    setShowSelectLawyer(showSelectLawyer);
    const role = props.roles.find(
      (role) => role.id == event.target.value
    );
    if (allLawyers.length > 0 && role?.["roleName"] != Roles.SeniorMostLawyer) {

      const newLawyerList = allLawyers?.filter(law => {
        const parentArr: string[] = role?.["parentIds"]?.split(',');
        // const  topParent= parentArr?.length > 0 ? parentArr[parentArr?.length - 1]:0;
        if (parentArr.includes(law.roleId + "")) {
          return law;
        }
      });

      if (newLawyerList.length == 0 && role?.["roleName"] != Roles.SeniorMostLawyer) {
        props.snackbarsActions.showErrorSnackbarAction("Please select valid role");
      } else {
        setShowSelectLawyer(false);
        setLawyerList(newLawyerList);
        setSelectedRole(role)
        setIsValidRole(true);
      }

    } else {
      setShowSelectLawyer(true);
      setSelectedRole(role)
      setIsValidRole(true);
    }
  }

  const handleUpdateRole = (event) => {
    let formValid = true;
    if (!selectedRole) {
      setIsValidRole(false);
      formValid = false;
    }
    if (!lawyerId && selectedRole?.["roleName"] != Roles.SeniorMostLawyer) {
      setIsValidLawyer(false);
      formValid = false;
    }
    if (formValid) {
      setStageCloseConfirm(true);
    }
    else {
      props.snackbarsActions.showErrorSnackbarAction("Form is invalid");
    }
  };

  const handleSuccessStageClose = () => {
    setStageCloseConfirm(false);
    let formValid = true;
    if (!selectedRole) {
      setIsValidRole(false);
      formValid = false;
    }
    if (!lawyerId && selectedRole?.["roleName"] != Roles.SeniorMostLawyer) {
      setIsValidLawyer(false);
      formValid = false;
    }
    if (formValid) {
      if (selectedRole?.["roleName"] != Roles.SeniorMostLawyer) {
        const lawyer = props.lawyers.filter(law => law.id == lawyerId);
        const parents = lawyer["parentsId"] ? [...lawyer["parentsId"], lawyerId] : [lawyerId];
        props.updateRole({ userId: props.item.id, param: { roleId: selectedRole?.["id"], parentIds: parents } });
      } else {
        props.updateRole({ userId: props.item.id, param: { roleId: selectedRole?.["id"] } });
      }

    } else {
      props.snackbarsActions.showErrorSnackbarAction("Form is invalid");
    }

  }


  const handleCancelStageClose = () => {
    setStageCloseConfirm(false);
  };

  const handleCloseDialog = () => {
    setStageCloseConfirm(false);
  };

  const handleLawyerChange = (event) => {
    setLawyerId(event.target.value);
    setIsValidLawyer(true);
  }

  return (
    <Card className={classes.cardContainer}>
      <CardActionArea>
        <CardContent>
          <Grid container>
            <Grid container xs={2} alignItems="center" justify="center">
              <Avatar alt="Remy Sharp" src={face} className={classes.large} />
            </Grid>
            <Grid container xs={9} alignItems="center">
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.titleText}
                >
                  {userName}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h5"
                  className={classes.locationText}
                >
                  {location}
                </Typography>
                <Typography component="p">
                  Skill Match: {product}, {subProduct}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </CardActionArea>
      <CardActions className={classes.actionContainer}>
        <Grid container alignItems="center" justify="flex-end">
          {/* <Grid item>
            <Typography variant="h6">
              LAWE Engagements:   0
            </Typography>
            <Typography variant="h6">
              Years of Experience : {experience}
            </Typography>
          </Grid> */}
          <Grid item>
            <FormControl variant="outlined" className={classes.lawyerSelectControl} >
              {/* <InputLabel id="role-select-label" error={!isValidRole}>
              {selectedRole?"":"--Select Role2234--"}
              </InputLabel> */}
              <InputLabel id="role-select-label">
                ----Select Role----
              </InputLabel>
              <Select
                native
                labelId="role-select-label"
                id="role-select-outlined"
                value={selectedRole?.["id"]}
                label="select-role*"
                // onBlur={handleRoleChange}
                onChange={handleRoleChange}
                onClick={handleRoleChange}
                error={!isValidRole}
                disabled={props.item?.role?.["roleName"] == Roles.SeniorMostLawyer}
              >
                <option aria-label="None" value="" />
                {props.roles?.length > 0 &&
                  props.roles?.map((role) => {
                    return (
                      <option key={role.roleName} value={role.id}>
                        {role.roleType}
                      </option>
                    );

                  })}
              </Select>
            </FormControl>
            {(!isEmpty(selectedRole) && selectedRole?.["roleName"] != Roles.SeniorMostLawyer) && lawyerList.length > 0 &&
              <FormControl variant="outlined" className={classes.lawyerSelectControl}>
                {/* <InputLabel id="lawyer-select-label" error={!isValidLawyer}>
                {lawyerId?"":"Assigned To"}
                </InputLabel> */}
                <InputLabel id="lawyer-select-label">
                  Assigned To
                </InputLabel>
                <Select
                  native
                  labelId="lawyer-select-label"
                  id="lawyer-select-outlined"
                  value={lawyerId}
                  label="select-lawyer*"
                  error={!isValidLawyer}
                  onChange={handleLawyerChange}
                  disabled={showSelectLawyer}
                >
                  <option aria-label="None" value="--Select Lawyer--" >--Select Lawyer--</option>
                  {lawyerList.length > 0 &&
                    lawyerList?.filter(law => {
                      if (law.id != props.item.id) {
                        return law;
                      }
                    }).map((lawyer) => {
                      return (
                        <option key={lawyer.userName} value={lawyer.id}>
                          {lawyer.userName}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>}
            <Button variant="contained" className={classes.detailBtn} onClick={handleUpdateRole}>
              Update Role
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <ResponsiveDialog
        title="Role Assign"
        content={`Do you want to assign/re-assign role ${selectedRole?.["roleType"]}  to the user ${props.item?.userName}`}
        okText="Yes, Update role"
        cancelText="No, Do not make any change"
        isOpen={stageCloseConfirm}
        handleClose={handleCloseDialog}
        handleOk={handleSuccessStageClose}
        handleCancel={handleCancelStageClose}
      />
    </Card>
  );
}
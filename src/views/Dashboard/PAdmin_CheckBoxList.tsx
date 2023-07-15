
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
    List,
    ListItem,
    Typography,
    makeStyles
} from "@material-ui/core";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import classNames from "classnames";
import 'date-fns';
import moment from 'moment';
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

export default function PA_CheckboxList(props) {
    const classes = useStyles();
    return (
        <List className={classes.root}>

            {props.data.map((item) => {
                return (
                    <ListItem className={classes.listItem} key={item.id} role={undefined}>
                        <MediaCard data={item} status={props.userInfo.status} handleCaseNavigation={props.handleCaseNavigation} DashboardActions={props.DashboardActions} />
                    </ListItem>
                );
            })}
        </List>
    );
}

export function MediaCard(props) {
    const classes = useStyles();
    let modeOptions = []
    const [active, setActive] = React.useState(false);
    const [mode, setMode] = React.useState("")
    const [isValidMode, setIsValidMode] = React.useState(true);
    const infoClass = classNames({
        'warning-text': !props.data.isClosed,
        'error-text': props.data.isClosed
    });
    const submittedOn = moment(new Date(props.data.dueDate)).format('DD/MM/YYYY');
    modeOptions.push("Lawyer - " + props.data.lawyerName)
    if (props.data.clientName === "")
        modeOptions.push("Client Firm - " + props.data.companyName)
    else
        modeOptions.push("Client - " + props.data.clientName)
    // const [isFav, setFav] = React.useState(true);
    const handleViewDetails = async () => {
        setActive(true)
    }
    const handleModeChange = (event) => {
        setMode(event.target.value);
    };
    const handleSuccessStageClose = () => {

        var role = mode;
        console.log(role)
        if (!role) setIsValidMode(false);
        else
            props.handleCaseNavigation(props.data, role);
        setActive(false)
    }
    const handleCancel = () => {
        setActive(false)
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
                        <Typography gutterBottom variant="h6" component="h5" className="location-tex  t">
                            {submittedOn}
                        </Typography>
                        <div className="ack-container">
                            <Typography component="p">
                                Skill Match: {props.data.product}, {props.data.subproduct}
                            </Typography>
                            {props.data.status === "proposed" && props.status === "platformadmin" &&
                                <div>
                                    <Typography component="p" className="acknowledge-text">
                                        Inquiry Submitted by - {props.data.clientName}
                                    </Typography>
                                    <Typography component="p" className="acknowledge-text">
                                        Inquiry Submitted to - {props.data.lawyerName}
                                    </Typography>
                                </div>

                            }
                            {props.data.status === "accepted" && props.status === "platformadmin" &&
                                <div>
                                    <Typography component="p" className="acknowledge-text">
                                        Lawyer Name - {props.data.lawyerName}
                                    </Typography>
                                    <Typography component="p" className="acknowledge-text">
                                        Client Name - {props.data.clientName}
                                    </Typography>
                                </div>
                            }
                            {props.data.status === "archieved" && props.status === "platformadmin" &&
                                <div>
                                    <Typography component="p" className="acknowledge-text">
                                        Lawyer Name - {props.data.lawyerName}
                                    </Typography>
                                    <Typography component="p" className="acknowledge-text">
                                        Client Name - {props.data.clientName}
                                    </Typography>
                                </div>
                            }
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
        </CardActionArea>
        <CardActions className="action-container">
            <Grid container alignItems="center" justify="space-between">
                <Grid container xs={9}>
                    <Typography variant="body2" gutterBottom>
                        {props.data.description}
                    </Typography>
                </Grid>
                <Grid container direction="column" justify="flex-end" xs={3}>
                    <Button variant="contained" className="detail-btn" onClick={handleViewDetails}>
                        View Details
                    </Button>
                    {props.data.isClosed &&
                        <div>
                            <Button className="link-action-btn" color="primary">View Judgement</Button>
                        </div>
                    }
                    {
                        <ResponsiveDialog
                            title="Select Mode"
                            content={""}
                            okText="Okay"
                            cancelText="Cancel"
                            isOpen={active}
                            handleClose={handleCancel}
                            handleOk={handleSuccessStageClose}
                            handleCancel={handleCancel}
                            formContent={

                                <FormControl>
                                    <Typography> Select the Mode of View </Typography>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        value={mode}
                                        onChange={handleModeChange}
                                    >
                                        {
                                            modeOptions?.map(eachProduct => {
                                                return <FormControlLabel value={eachProduct} control={<Radio />} label={eachProduct} />
                                            })
                                        }

                                    </RadioGroup>
                                </FormControl>

                            }
                        />
                    }
                </Grid>
            </Grid>
        </CardActions>
    </Card >;
}
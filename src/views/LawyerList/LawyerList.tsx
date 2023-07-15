import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  Avatar,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Grid,
  Divider,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  Box,
  Checkbox,
  CheckboxProps,
  withStyles,
  FormControl,
  InputLabel,
  NativeSelect,
  Select,
} from "@material-ui/core";
import moment from "moment";
import isEqual from "lodash/isEqual";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reduxAction/rootReducer";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as SaveCaseInquiryAction from "../../reduxAction/connectLawyer/connectLawyerActions";
import face from "../../assets/img/faces/avatar.png";
import * as CommonActions from "../../reduxAction/common/commonActions";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import "./LawyerList.scss";
import { FixedContainer } from "./ModifySearch";

const styles: any = {
  card: {},
  large: {
    width: "150px",
    height: "150px",
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
  small: {
    fontSize: "14px",
    padding: "10px",
  },
};

const useStyles = makeStyles(styles);

const UserCheckbox = withStyles({
  root: {
    color: "#000",
    "&$checked": {
      color: "#FFC602",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="primary" {...props} />);

export function MediaCard(props) {
  const classes = useStyles();
  const skils = props.data.userjson.dataGrid.map(
    (item) => `${item.product.name}, ${item.subProduct.name}`
  );
  const handleProfileNavigation = (event) => {
    props.handleProfileNavigation(props.data.id);
  };

  return (
    <Card className="card-container">
      <CardActionArea>
        <CardContent>
          <Grid container>
            <Grid container xs={3} alignItems="center" justify="center">
              <Avatar alt="Remy Sharp" src={props.data.profileKey ? props.data.profileKey : face} className={classes.large} />
            </Grid>
            <Grid container xs={9} alignItems="center">
              <Grid item>
                <Typography gutterBottom variant="h5" component="h2">
                  {
                    props.data?.userjson?.gender == "Male" ?
                      ("Mr")
                      :
                      ("Ms")
                  }
                  . {props.data.userName} {props.data.lname}

                  {
                    props.data?.status == "companylawyer" && props.data?.companyName ?
                      (
                        <small className={classes.small}> (Company Name - {props.data?.companyName})</small>
                      )
                      : (
                        ""
                      )
                  }
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className="location-text"
                >
                  {props.data.userjson.city.cityName}
                </Typography>
                <Typography component="p">
                  Focus Skills: {skils.join()}
                </Typography>
                <Typography component="p">
                  Languages Known: {props.data.userjson.languagesKnow.join(",")}
                </Typography>
                <Typography component="p">
                  Practising Courts: {props.data.practisingCourt}
                </Typography>

              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </CardActionArea>
      <CardActions className="action-container">
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="h6" >
              LAWE Engagements: {props.data.engagements}
            </Typography>
            <Typography variant="h6">
              Years of Experience : {props.data.experience}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className="detail-btn"
              onClick={handleProfileNavigation}
            >
              View Profile
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleSelelctLawyer(newChecked);
  };

  return (
    <List className={classes.root}>
      {props.data.map((item) => {
        const labelId = `checkbox-list-label-${item.id}`;

        return (
          <ListItem className={classes.listItem} key={item.id} role={undefined}>
            <ListItemIcon className={classes.listItemIcon}>
              <UserCheckbox
                onClick={handleToggle(item.id)}
                edge="start"
                checked={checked.indexOf(item.id) !== -1}
                tabIndex={-1}
                disableRipple
                color="primary"
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <MediaCard
              data={item}
              handleProfileNavigation={props.handleProfileNavigation}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

interface Props extends RouteComponentProps<any> {
  userName: string | null;
  findLawyerActions: typeof FindLawyerActions;
  snackbarsActions: typeof SnackbarsActions;
  loginActions: typeof LoginActions;
  saveCaseInquiryAction: typeof SaveCaseInquiryAction;
  findLawyer: any;
  findLawyerLoaded: boolean;
  isLoading: boolean;
  searchData: any;
  lawCategory: any[];
  commonActions: typeof CommonActions;
  categoryLoading: boolean;
  subCategory: any[];
  CaseManagementActions: typeof CaseManagementActions;
  caseList: any;
  notifications: any;
  remainders: any;
  appointments: any;
}

export class LawyerList extends Component<Props> {
  constructor(props) {
    super(props);
  }
  state = {
    itemsToDisplay: [],
    itemsToUse: [],
    currentCount: 10,
    selectedProfile: [],
    listloaded: false,
    sortRange: "",
    sortLanguage: "",
  };

  componentDidMount() {
    this.props.commonActions.getLawCategory({});
    this.props.findLawyerActions.updateFindLawyerLoadedAction();
    this.reRenderList(this.props.findLawyer);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.findLawyer, this.props.findLawyer)) {
      this.setState({ listloaded: false });
      this.reRenderList(this.props.findLawyer);
    }

  }

  handleSelelctLawyer = (selected) => {
    this.setState({ selectedProfile: selected });
  };

  reRenderList = (data) => {
    var itemsToDisplay = [];
    for (var i = 0; i < data.length; i++) {
      const startDate = moment(data[i].userjson.practisingFrom, "YYYY-MM-DD");
      const todayDate = moment(new Date(), "YYYY-MM-DD");
      let noOfYear = todayDate.diff(startDate, "years");
      if (noOfYear === 0) data[i].experience = "Less Than 1 year";
      else data[i].experience = noOfYear;

      itemsToDisplay.push(data[i]);
    }
    this.setState({ itemsToDisplay });
    this.setState({ itemsToUse: [...itemsToDisplay] });
    let filterData = [...itemsToDisplay];
    if (this.state.sortRange) {
      filterData = this.itemsExperienceSorting(this.state.sortRange, [...filterData]);
      this.setState({ itemsToDisplay: [...filterData] });
    }
    if (this.state.sortLanguage) {
      filterData = this.itemsLanguageSorting(this.state.sortLanguage, [...filterData]);
      this.setState({ itemsToDisplay: [...filterData] });
    }
  }

  handleProfileNavigation = (id) => {
    this.props.history.push(`/lawyer-profile/${id}`);
  };

  handleConnectLawyer = () => {
    const { selectedProfile } = this.state;
    let isValid = true;
    if (selectedProfile.length === 0) {
      this.props.snackbarsActions.showErrorSnackbarAction(
        "Select at least one lawyer"
      );
      isValid = false;
    }
    if (selectedProfile.length > 10) {
      this.props.snackbarsActions.showErrorSnackbarAction(
        "You can select maximum 10 lawyers only"
      );
      isValid = false;
    }

    if (isValid) {
      if (!this.props.userName) {
        this.props.findLawyerActions.updateLoginFromConnectAction();
        this.props.findLawyerActions.updateSelectLawyerAction({selectedProfile});
        this.props.history.push(`/login-page`);
        return;
      }
      this.props.findLawyerActions.updateSelectLawyerAction({selectedProfile});
      this.props.saveCaseInquiryAction.resetCaseInquiryAction();
      this.props.history.push(`/connect-lawyer/all`);
    }
  };

  handleScroll = (event) => {
    const { findLawyerActions, searchData } = this.props;
    const { currentCount } = this.state;
    const element = event.target;
    if (
      Math.floor(element.scrollHeight - element.scrollTop) ===
      element.clientHeight &&
      !this.state.listloaded
    ) {
      searchData.skip = currentCount;
      findLawyerActions.findMoreLawyerAction(searchData);
      this.setState({ listloaded: true });
      this.setState({
        currentCount: currentCount + 10,
      });
    }
  };
  itemsLanguageSorting = (lang: string, itemsToDisplay: any[]) => {
    let arr = [...itemsToDisplay];
    if (arr) {
      const itemsToDisplay = arr.filter(sample);
      return itemsToDisplay;

    }
    function sample(element) {
      return element.languageKnow.split(",").includes(lang);
    }
  };
  itemsExperienceSorting = (value: string, itemsToDisplay: any[]) => {
    let var1, var2;
    if (value === "asc") {
      itemsToDisplay.sort(function (a, b) {
        var1 = a["experience"];
        var2 = b["experience"];

        if (var1 === "Less Than 1 year") {
          var1 = 0;
        }
        if (var2 === "Less Than 1 year") {
          var2 = 0;
        }
        return Number(var1) - Number(var2);
      });
    } else {

      itemsToDisplay.sort(function (a, b) {
        var1 = a["experience"];
        var2 = b["experience"];

        if (var1 === "Less Than 1 year") {
          var1 = 0;
        }
        if (var2 === "Less Than 1 year") {
          var2 = 0;
        }
        return Number(var2) - Number(var1);
      });
    }
    return itemsToDisplay;
  }

  sortBy = (eve) => {
    const value = eve.target.value as string;
    this.setState({ sortRange: value });
    let itemsToDisplay = [...this.state.itemsToUse];
    const result = this.itemsExperienceSorting(value, itemsToDisplay);
    if (this.state.sortLanguage) {
      const final = this.itemsLanguageSorting(this.state.sortLanguage, result);
      this.setState({ itemsToDisplay: [...final] });
    } else {
      this.setState({ itemsToDisplay: [...result] });
    }

  };

  filterByLanguagesKnown = (eve) => {
    const value = eve.target.value as string;
    this.setState({ sortLanguage: value });
    let itemsToDisplay = [...this.state.itemsToUse];
    let result = this.itemsLanguageSorting(value, itemsToDisplay);
    if (this.state.sortRange) {
      let final = this.itemsExperienceSorting(this.state.sortRange, [...result]);
      this.setState({ itemsToDisplay: [...final] });
    } else {
      this.setState({ itemsToDisplay: result });
    }
  };
  handleClearSorting = () => {
    this.setState({ sortRange: "" });
    this.setState({ sortLanguage: "" });
    let itemsToDisplay = [...this.state.itemsToUse];
    this.setState({ itemsToDisplay });
  };
  handleBack = (event) => {
    this.props.history.push('/');
  }

  render() {
    const { itemsToDisplay } = this.state;
    const { isLoading } = this.props;
    return (
      <div>
        <Header links={<HeaderLinks {...this.props} />} fixed color="primary" />
        <div className="lawyer-container" >
          <Grid container justify="center">
            <Grid item xs={12}>
              <Box className="connect-container-first" component="div" display="block">
                <Typography variant="h5" gutterBottom align="center">
                  Connect Lawyer
                </Typography>
                <Box display="flex" component="div">
                  <Typography variant="h5" gutterBottom align="left" onClick={this.handleBack} style={{ cursor: "pointer", width: "6%" }}>
                    <ArrowBackIcon></ArrowBackIcon>Back
                  </Typography>
                  <Typography variant="h6" gutterBottom align="center">
                    LAWE - An Integrated Legal Management Ecosystem
                  </Typography>
                </Box>
              </Box>

            </Grid>
            <div className="sortby">
            {itemsToDisplay && itemsToDisplay.length > 0 && (
              
              <Grid item xs={9} alignItems="center">
                <Typography component="p" style={{ marginLeft: "2rem", marginTop: "1rem", width: "50%", float: "left" }}>
                  You can select upto 10 Lawyers to connect
                </Typography>
                <div className="pagination-card">
                  <Button
                    variant="contained"
                    className="connect-btn"
                    onClick={this.handleConnectLawyer}
                  >
                    Connect Lawyer
                  </Button>
                </div>

                <div
                  onScroll={this.handleScroll}
                  className="lawer_list"
                  // style={{ height: "800px", overflow: "auto", width:"fit-content" }}
                >
                  <CheckboxList
                    data={itemsToDisplay}
                    handleSelelctLawyer={this.handleSelelctLawyer}
                    handleProfileNavigation={this.handleProfileNavigation}
                  />
                  {isLoading && (
                    <div className="button-loader">
                      <CircularProgress disableShrink />
                    </div>
                  )}
                </div>

                <div className="pagination-card hidden-element"></div>

              </Grid>
            )}
            {itemsToDisplay.length === 0 && (
              <Grid item xs={9} alignItems="center">
                <Box className="no-result-fount" alignItems="center" display="flex">
                  <Box>
                    <FindInPageIcon />
                  </Box>
                  <Box>
                    <Typography gutterBottom variant="h5" component="h2">
                      No results found
                    </Typography>
                  </Box>
                </Box>

              </Grid>
            )}
            <Grid item xs={3} alignItems="flex-end">
              <table  cellPadding="15" className="fix-width" style={{ background: "white", borderRadius: "25px", margin: "3rem 1rem", width: "90%" }}>
                <tr>
                  <td>
                    <Typography component="p">
                      Sort By
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td >
                    <FormControl variant="outlined" className="text-field">
                      <InputLabel id="sortby-select-label" className="select-lable">Experience</InputLabel>
                      <Select
                        native
                        className="select-input"
                        labelId="sortBy-label"
                        id="sortBy-outlined"
                        value={this.state.sortRange}
                        onChange={this.sortBy}
                        label="sortBy"
                      >
                        <option value=""></option>
                        <option value="asc">Low to High</option>
                        <option value="des">High to Low</option>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormControl variant="outlined" className="text-field">
                      <InputLabel id="sortby-select-label" className="select-lable">Languages Known</InputLabel>
                      <Select
                        native
                        className="select-input"
                        labelId="language-label"
                        id="language-outlined"
                        value={this.state.sortLanguage}
                        onChange={this.filterByLanguagesKnown}
                        label="sortBy"
                      >
                        <option value=""></option>
                        <option value="Assamese">Assamese</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Bodo">Bodo</option>
                        <option value="Dogri">Dogri</option>
                        <option value="English">English</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Kashmiri">Kashmiri</option>
                        <option value="Konkani">Konkani</option>
                        <option value="Maithili">Maithili</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Meitei">Meitei</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Nepali">Nepali</option>
                        <option value="Odia">Odia</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Sanskrit">Sanskrit</option>
                        <option value="Santali">Santali</option>
                        <option value="Sindhi">Sindhi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Urdu">Urdu</option>
                        <option value="Kokborok">Kokborok</option>
                        <option value="Mizo">Mizo</option>
                        <option value="Khasi">Khasi</option>
                        <option value="Bhojpuri">Bhojpuri</option>
                        <option value="Angika">Angika</option>
                        <option value="Magadhi">Magadhi</option>
                        <option value="Kodava">Kodava</option>
                        <option value="Bhili">Bhili</option>
                        <option value="Gondi">Gondi</option>
                        <option value="Kutchi">Kutchi</option>
                        <option value="Tulu">Tulu</option>
                        <option value="Sankethi">Sankethi</option>
                        <option value="Marwari">Marwari</option>
                        <option value="Mewari">Mewari</option>
                        <option value="Shekhavati">Shekhavati</option>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pagination-card">
                      <Button
                        variant="contained"
                        className="connect-btn"
                        onClick={this.handleClearSorting}
                      >
                        Clear
                      </Button>
                    </div>
                  </td>
                </tr>
              </table>
              <FixedContainer
                data={{
                  itemsToDisplay: itemsToDisplay,
                  lawCategory: this.props.lawCategory,
                  commonActions: this.props.commonActions,
                  findLawyerActions: this.props.findLawyerActions,
                  subCategory: this.props.subCategory,
                }}
              />
            </Grid>
              </div>
            {/* <Grid item xs={3}>
              <FixedContainer
                data={{
                  itemsToDisplay: itemsToDisplay,
                  lawCategory: this.props.lawCategory,
                  commonActions: this.props.commonActions,
                  findLawyerActions: this.props.findLawyerActions,
                  subCategory: this.props.subCategory,
                }}
              />
            </Grid> */}
          </Grid>

        </div>


        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userName: state.loginForm.userName,
  findLawyer: state.findLawyer.lawyerList,
  findLawyerLoaded: state.findLawyer.loaded,
  isLoading: state.findLawyer.loading,
  searchData: state.findLawyer.searchData,
  userInfo: state.loginForm.userInfo,
  lawCategory: state.commonReducer.lawCategory,
  categoryLoading: state.commonReducer.loading,
  subCategory: state.commonReducer.subCategory,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
  caseList: state.dashboard.caseList,
});

function mapDispatchToProps(dispatch: any) {
  return {
    findLawyerActions: bindActionCreators(FindLawyerActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
    loginActions: bindActionCreators(LoginActions as any, dispatch),
    saveCaseInquiryAction: bindActionCreators(
      SaveCaseInquiryAction as any,
      dispatch
    ),
    commonActions: bindActionCreators(CommonActions as any, dispatch),
    CaseManagementActions: bindActionCreators(
      CaseManagementActions as any,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LawyerList);

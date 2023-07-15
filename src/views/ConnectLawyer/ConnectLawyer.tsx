import DateFnsUtils from '@date-io/date-fns';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import filter from 'lodash/filter';
import find from 'lodash/find';
import map from 'lodash/map';
import { DropzoneArea } from 'material-ui-dropzone';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
// redux
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import Select from '@material-ui/core/Select';
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
import face from "../../assets/img/faces/avatar.png";
import { SaveCaseInquiryData } from "../../model/model";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import * as SaveCaseInquiryAction from "../../reduxAction/connectLawyer/connectLawyerActions";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import { RootState } from "../../reduxAction/rootReducer";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import './ConnectLawyer.scss';

const useStylesUser = makeStyles({
  root: {
    minWidth: 275,
    margin: '0.5rem'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export function UserCard(props) {
  const classes = useStylesUser();
  const skils = props.profile.userjson.dataGrid.map(item => `${item.product.name}, ${item.subProduct.name}`);
  const startDate = moment(props.profile.userjson.practisingFrom, 'YYYY-MM-DD');
  const todayDate = moment(new Date(), 'YYYY-MM-DD');
  const noOfYear = todayDate.diff(startDate, 'years');
  let experience;
  if (noOfYear === 0)
    experience = "Less Than 1";
  else
    experience = noOfYear;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.profile.userName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.profile.location}
        </Typography>
        <Typography variant="body2" component="p">
          Skill: {skils.join()}
        </Typography>
        <Typography variant="body2" component="p">
          Experience: {experience} years
        </Typography>
        <Typography variant="body2" component="p">
          Languages Know: {props.profile.languageKnow}
        </Typography>
      </CardContent>
    </Card>
  );
}


const useStylesCard = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      margin: '0.5rem'
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }),
);

export function LawyerGridList(props) {
  const classes = useStylesCard();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {props.data.map((profile) => (
          <UserCard profile={profile} />
        ))}
      </GridList>
    </div>
  );
}


interface Props extends RouteComponentProps<any> {
  classes: any;
  userName: string | null;
  findLawyerActions: typeof FindLawyerActions;
  saveCaseInquiryAction: typeof SaveCaseInquiryAction;
  CaseManagementActions: typeof CaseManagementActions;
  loginActions: typeof LoginActions;
  snackbarsActions: typeof SnackbarsActions;
  findLawyer: any;
  selectedLawyer: any;
  searchData: any;
  isLoading: boolean;
  userInfo: any;
  saveCaseInquiry: any;
  caseFiles: any;
  lawCategory: any[];
  commonActions: typeof CommonActions;
  categoryLoading: boolean;
  subCategory: any[];
  status: string;
  success: any;
  error: any;
  caseList: any;
  notifications: any;
  remainders: any;
  appointments: any;
}

const styles = (theme: Theme) => createStyles({
  large: {
    width: "100px",
    height: "100px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    zIndex: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progressbar: {
    color: '#FFC602'
  },
});

// const useStyles = makeStyles(styles);

export function ConnectLawyer(props: Props) {
  const { classes } = props;
  const dueDate = moment()
    .add(10, 'd')
    .toDate();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(dueDate);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  let experience;
  const isMultiConnect = props.selectedLawyer.length > 0;
  const findSelectedLawyer = (isMultiConnect) ? filter(props.findLawyer, (profile) => props.selectedLawyer.includes(profile.id)) : [];
  const profile = find(props?.findLawyer, { id: Number(props?.selectedLawyer?.selectedProfile?.[0] ? props?.selectedLawyer?.selectedProfile?.[0] : props?.selectedLawyer) });
  let startDate = (!isMultiConnect) ? moment(profile?.userjson?.practisingFrom, 'YYYY-MM-DD') : '';
  const todayDate = moment(new Date(), 'YYYY-MM-DD');
  let noOfYear = (!isMultiConnect) ? todayDate.diff(startDate, 'years') : '';
  if (noOfYear === 0)
    experience = "Less Than 1";
  else
    experience = noOfYear;
  let titleText = (!isMultiConnect && profile.userjson.gender === 'Male') ? 'Mr' : 'Ms';
  if (isMultiConnect && findSelectedLawyer.length === 1) {
    startDate = moment(findSelectedLawyer[0].userjson.practisingFrom, 'YYYY-MM-DD');
    noOfYear = todayDate.diff(startDate, 'years');

    if (noOfYear === 0)
      experience = "Less Than 1";
    else
      experience = noOfYear;
    titleText = (findSelectedLawyer[0].userjson.gender === 'Male') ? 'Mr' : 'Ms';
  }


  const [product, setProduct] = useState('');
  const [subProduct, setSubProduct] = useState('');
  const [court, setCourt] = useState('');
  const [area1, setArea] = useState('');
  const [city1, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [uploadedFile, setuploadedFile] = useState([]);
  const [subProductList, setSubProductList] = useState([]);
  const [productList, setProductList] = useState(props.lawCategory);
  const [isValidProduct, setIsValidProduct] = useState(true);
  const [isValidSubProduct, setIsValidSubProduct] = useState(true);
  const [isValidCourt, setIsValidCourt] = useState(true);
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);

  const [isCourt, setIsCourt] = useState(false);
  useEffect(() => {
    props.commonActions.getLawCategoryById({});

  }, []);

  useEffect(() => {
    if (!isEmpty(props.success)) {
      props.snackbarsActions.showSuccessSnackbarAction(props.success);
      props.saveCaseInquiryAction.clearSuccess({});
    }

  }, [props.success]);

  useEffect(() => {
    if (!isEmpty(props.error)) {
      props.snackbarsActions.showErrorSnackbarAction(props.error);
      props.saveCaseInquiryAction.clearError({});
    }
  }, [props.error]);

  useEffect(() => {
    setSubProductList(props.subCategory);
  }, [props.subCategory]);

  useEffect(() => {
    setProductList(props.lawCategory);
  }, [props.lawCategory]);

  const handleProductChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProduct(event.target.value as string);
    setIsValidProduct(true);
    const parentId = productList.find(pro => pro.name === event.target.value);
    props.commonActions.getLawCategoryById({ id: parentId?.id });
    setSubProductList(props.subCategory);
  };

  const handleSubProductChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsValidSubProduct(true);
    setSubProduct(event.target.value as string);
  };

  const handleTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsValidTitle(true);
    setTitle(event.target.value as string);
  };
  const handleCourtChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsValidCourt(true);
    setCourt(event.target.value as string);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsValidDescription(true);
    setDescription(event.target.value as string);
  };
  let courtList = [];
  let arr = [];
  let courtdata = [];
  let data;


  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const { product: propsProduct, subproduct: propssubProduct, description: propsDescription, practisingcourt: propsCourt, location: propsLoc, city: propsCity } = props.searchData;
    setProduct(propsProduct);
    props.commonActions.getLawCategory({});
    setSubProductList(props.subCategory);
    setSubProduct(propssubProduct);
    setDescription(propsDescription);
    if (propsCourt === 'HIGH COURT') {
      courtList = props.findLawyer;
      courtList.map((item) => {
        if (item.id === props.selectedLawyer[0]) {
          data = item.practisingCourt
        }
      });
      arr = data.split(',');
      courtdata = []
      arr.map((item) => {
        if (item.search("HIGH COURT") !== -1) {
          courtdata.push(item);
        }
      });
      setIsCourt(true)
    }
    else {
      setCourt(propsCourt)
    }
    setArea(propsLoc)
    setCity(propsCity)
  }, []);


  useEffect(() => {
    setProductList(props.lawCategory);
    const parentId = productList.find(pro => pro.name === product);
    props.commonActions.getLawCategoryById({ id: parentId?.id });
  }, [props.lawCategory]);

  useEffect(() => {
    setSubProductList(props.subCategory);
  }, [props.subCategory]);

  // const getFileInfo = () => {
  //   const files = [];

  //   //   formData.append('file', uploadedFile[i]);
  //   map(uploadedFile, (file) => {
  //     console.log(file)
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     console.log(formData)
  //     files.push({
  //       fileName: file.name,
  //       fileContent: file.data,
  //       fileContentType:file.type,
  //       formData:formData
  //     })
  //   });
  //   return files;
  // }

  const getLawyerInfo = () => {
    const lawyer = [];
    if (isMultiConnect) {
      map(findSelectedLawyer, (lawyerItem) => {
        lawyer.push({
          laywerId: lawyerItem.id,
          lawyerName: lawyerItem.userName,
          lawyerEmail: lawyerItem.email,
          clientGender: props.status != 'clientfirm' ? (props.userInfo.userjson.gender === 'Male') ? 'Mr' : 'Ms' : '',
          lawyerGender: (lawyerItem.userjson.gender === 'Male') ? 'Mr' : 'Ms',
          court: props.searchData["practisingcourt"],
        })
      });
    }
    else {
      lawyer.push({
        laywerId: profile.id,
        lawyerName: profile.userName,
        lawyerEmail: profile.email,
        clientGender: props.status != 'clientfirm' ? (props.userInfo.userjson.gender === 'Male') ? 'Mr' : 'Ms' : '',
        lawyerGender: (profile.userjson.gender === 'Male') ? 'Mr' : 'Ms',
        court: props.searchData["practisingcourt"],
      });
    }

    return lawyer;
  }

  useEffect(() => {

    if (props.saveCaseInquiry) {

      if (uploadedFile?.length) {
        fileUploader(props.saveCaseInquiry?.caseId);
      } else {
        props.history.push(`/dashboard`);
      }
      // props.caseManagement.selectedCaseInfo.caseFiles
      // props.history.push(`/dashboard`);
    }
  }, [props.saveCaseInquiry]);

  useEffect(() => {
    if (props.caseFiles) {
      // props.caseManagement.selectedCaseInfo.caseFiles
      props.history.push(`/dashboard`);
    }
  }, [props.caseFiles]);

  const saveCaseInquiry = async (type) => {
    let validForm = true;
    if (title === '') {
      setIsValidTitle(false);
      validForm = false;
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }
    if (description === '') {
      setIsValidDescription(false);
      validForm = false;
    }
    if (court === '') {
      setIsValidCourt(false);
      validForm = false;
    }
    if (validForm) {
      // for (let i = 0; i < uploadedFile.length; i++) {
      //   const formData = new FormData();
      //   formData.append('file', uploadedFile[i]);
      //   await props.saveCaseInquiryAction.uploadFileAction({ formData: formData, type: 'case', contenttype: uploadedFile[i].type, caseId: 0 });

      // }
      const data: SaveCaseInquiryData = {
        tempCaseID: 0,
        caseinquiry: {
          caseTitle: title,
          description,
          product,
          court: court,
          area: area1,
          city: city1,
          subproduct: subProduct,
          dueDate: selectedDate,
          clientId: props.status != "clientfirm" ? props.userInfo.id : 0,
          clientName: props.status != "clientfirm" ? props.userInfo.userName : '',
          companyId: props.status == "clientfirm" ? props.userInfo.id : (props.status == "companylawyer" ? props.userInfo.id : 0),
          companyName: props.status == "clientfirm" ? props.userInfo.companyName : (props.status == "companylawyer" ? props.userInfo.companyName : ''),
        },
        caselawyers: getLawyerInfo(),
      }
      await props.saveCaseInquiryAction.saveCaseInquiryAction(data);
    }

  }

  const fileUploader = async (caseIdInput) => {

    for (let i = 0; i < uploadedFile.length; i++) {
      const formData = new FormData();
      formData.append('file', uploadedFile[i]);
      await props.saveCaseInquiryAction.uploadFileAction({ formData: formData, type: 'case', contenttype: uploadedFile[i].type, caseId: caseIdInput });

    }
  }

  let size = 0;
  const handleUploadedFile = (files) => {
    for (let i = 0; i < files.length; i++) {
      let s = files[i].size;
      size = size + s
    }
    if (size < 104857600)
      setuploadedFile(files);
    else
      props.snackbarsActions.showErrorSnackbarAction("File size too Big.Upload files less than 100MB");
  }

  const initiateMultipleCaseInquiry = () => {
    saveCaseInquiry('multiple');
  }
  const initiateSingleCaseInquiry = async () => {
    await saveCaseInquiry('single');
  }
  const loading = (props.isLoading || props.categoryLoading);

  return (
    <div>
      <Header links={<HeaderLinks  {...props} />} fixed color="primary" />
      <Box className="connect-container-first" component="div" display="block">
        <Typography variant="h5" gutterBottom align="center">
          Case Inquiry
        </Typography>
        <Typography variant="h6" gutterBottom align="center">
          LAWE - An Integrated Legal Management Ecosystem
        </Typography>
      </Box>
      <Box className="connent-container-second" component="div" display="block">
        <Paper variant="outlined" className="card-container">
          {!isMultiConnect &&
            <Paper className="user-info-container">
              <Paper className="name-title-container">
                <Typography className="name" variant="h5" gutterBottom align="center">
                  {titleText}. {profile.userjson.fName}
                </Typography>
                <Typography className="experience" variant="subtitle1" gutterBottom align="center">
                  Experience: {experience} years Languages: {profile.languageKnow}
                </Typography>
              </Paper>
              <Avatar alt="Remy Sharp" src={face} className={classes.large} />
            </Paper>
          }
          {isMultiConnect && findSelectedLawyer.length === 1 &&
            <Paper className="user-info-container">
              <Paper className="name-title-container">
                <Typography className="name" variant="h5" gutterBottom align="center">
                  {titleText}. {findSelectedLawyer[0].userjson.fName}
                </Typography>
                <Typography className="experience" variant="subtitle1" gutterBottom align="center">
                  Experience: {experience} years Languages: {findSelectedLawyer[0].languageKnow}
                </Typography>
              </Paper>
              <Avatar alt="Remy Sharp" src={face} className={classes.large} />
            </Paper>
          }
          {isMultiConnect && findSelectedLawyer.length > 1 &&
            <Paper>
              <LawyerGridList data={findSelectedLawyer} />
            </Paper>
          }
          <Paper className="case-info-container">
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Title
              </Typography>
              <TextField className="input-field"
                error={!isValidTitle}

                size="small" variant="outlined" onChange={handleTitleChange} value={title} />
            </Box>
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Description
              </Typography>
              <TextField
                className="input-field"
                size="small"
                multiline
                rows={5}
                variant="outlined"
                onChange={handleDescriptionChange}
                value={description}
                error={!isValidDescription}

              />
            </Box>
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Product
              </Typography>
              { /* <TextField className="input-field" size="small" variant="outlined" /> */}
              {/* <Select
                className="input-field"
                value={product}
                onChange={handleProductChange}
                variant="outlined"
                error={!isValidProduct}
                inputProps={{ readOnly: true }}
              >
                {
                  productList.map(eachProduct => {
                    return <option value={eachProduct.name}>{eachProduct.name}</option>
                  })
                }
              </Select> */}
              <TextField
                className="input-field"
                size="small"
                variant="outlined"
                value={product}
                inputProps={{ readOnly: true }} />
            </Box>
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Sub Product
              </Typography>
              { /* <TextField className="input-field" size="small" variant="outlined" /> */}
              {/* <Select
                className="input-field"
                value={subProduct}
                onChange={handleSubProductChange}
                variant="outlined"
                error={!isValidSubProduct}
                inputProps={{ readOnly: true }}
              >
                {
                  subProductList.map(eachSubProduct => {
                    return <option value={eachSubProduct.name}>{eachSubProduct.name}</option>
                  })
                }
              </Select> */}
              <TextField
                className="input-field"
                size="small"
                variant="outlined"
                value={subProduct}
                inputProps={{ readOnly: true }} />
            </Box>
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Court
              </Typography>
              {!isCourt &&
                <TextField
                  className="input-field"
                  size="small"
                  variant="outlined"
                  value={court}
                  inputProps={{ readOnly: true }} />}

              {isCourt &&
                <Select
                  className="input-field"
                  value={court}
                  onChange={handleCourtChange}
                  variant="outlined"
                  error={!isValidCourt}
                >

                  {
                    courtdata.map(eachCourt => {
                      return <option value={eachCourt}>{eachCourt}</option>
                    })
                  }
                </Select>
              }
            </Box>
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                Due Date Acknowledgement
              </Typography>
              <div className="input-field picker-container">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disabled={true}
                    readOnly={true}
                    disableToolbar
                    variant="inline"
                    format="dd-MM-yyyy"
                    margin="normal"
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Typography variant="body2" gutterBottom align="center">
                  You are willing to wait till this date for the Lawyer to  acknowledge.The system will automatically   withdraw your inquiry past this date.
                </Typography>
              </div>
            </Box>
            <Box className="case-info-sub-container">
              <Typography className="label" variant="subtitle1" gutterBottom align="center">
                File or Document Upload(max 3 files)
              </Typography>
              <div className="input-field file-upload-container">
                <DropzoneArea
                  onChange={handleUploadedFile}
                  alertSnackbarProps={{ anchorOrigin: { vertical: 'top', horizontal: 'right' } }}
                />
              </div>
            </Box>
          </Paper>
          <Paper className="button-container">
            {!isMultiConnect &&
              <Button variant="contained" onClick={initiateSingleCaseInquiry}>
                <span>Initiate your case inquiry with {titleText}. {profile.userjson.fName}</span>
              </Button>
            }
            {isMultiConnect &&
              <Button variant="contained" onClick={initiateMultipleCaseInquiry}>
                <span>Initiate your case inquiry</span>
              </Button>
            }
          </Paper>
          <Paper className="acknowldge-contanier">
            <Typography variant="subtitle1" className="ack-titile" gutterBottom>
              LAWE platform provides you an option to
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              #1 - send your Case breif description and your notes to the identified lawyer
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              #2 - You could set a acknowledgement due date for reponse.
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              #3 - We will get their acknowledgement & response and details back to you
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              #4 - You will be the one to decide to formally accept the proposal and onboard to hire this Lawyer.
            </Typography>
          </Paper>
        </Paper>
      </Box>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress className={classes.progressbar} size={100} />
      </Backdrop>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  userName: state.loginForm.userName,
  status: state.loginForm.status,
  findLawyer: state.findLawyer.lawyerList,
  selectedLawyer: state.findLawyer.selectedLawyer,
  searchData: state.findLawyer.searchData,
  userInfo: state.loginForm.userInfo,
  isLoading: state.saveCaseInquiry.loading,
  saveCaseInquiry: state.saveCaseInquiry.saveCaseInquiry,
  caseFiles: state.saveCaseInquiry.uploadFileResponse,
  lawCategory: state.commonReducer.lawCategory,
  categoryLoading: state.commonReducer.loading,
  subCategory: state.commonReducer.subCategory,
  success: state.saveCaseInquiry.success,
  error: state.saveCaseInquiry.error,
  caseList: state.dashboard.caseList,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
});

function mapDispatchToProps(dispatch: any) {
  return {
    findLawyerActions: bindActionCreators(FindLawyerActions as any, dispatch),
    saveCaseInquiryAction: bindActionCreators(SaveCaseInquiryAction as any, dispatch),
    loginActions: bindActionCreators(LoginActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
    commonActions: bindActionCreators(CommonActions as any, dispatch),
    CaseManagementActions: bindActionCreators(CaseManagementActions as any, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ConnectLawyer));
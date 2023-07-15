import React, { Component, useState, useEffect, Fragment } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import face from "../../assets/img/faces/profile.jpg";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import * as FindJudgementActions from "../../reduxAction/findJudgement/findJudgementActions";
import { RootState } from "../../reduxAction/rootReducer";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import ReactSelect, { components, Theme } from "react-select";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Avatar, Backdrop, Box, Button, CircularProgress, FormControl, Grid, InputLabel, Paper, Select, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import * as DashboardActions from "../../reduxAction/dashboard/dashboardActions";
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './Profile.scss';
import { v4 as uuidv4 } from 'uuid';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
const styles = (theme: Theme) =>
    createStyles({
        large: {
            width: "100px",
            height: "100px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            zIndex: 10,
        },
        backdrop: {
            // zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        progressbar: {
            color: "#FFC602",
        },
    });

const useStyles = makeStyles(styles);

interface Props extends RouteComponentProps<any> {
    userName: string | null;
    CaseManagementActions: typeof CaseManagementActions;
    loginActions: typeof LoginActions;
    DashboardActions: typeof DashboardActions;
    snackbarsActions: typeof SnackbarsActions;
    isLoading: boolean;
    userInfo: any;
    caseManagement: any;
    common: any;
    finsJudgementActions: typeof FindJudgementActions;
    findJudgement: any;
    findJudgementLoaded: boolean;
    isJudgementLoading: boolean;
    casehearingslist: any[];
    caseNotes: any[];
    findLawyerActions: typeof FindLawyerActions;
    findLawyer: any;
    findLawyerLoaded: boolean;
    notifications: any;
    remainders: any;
    appointments: any;
    status: any;
    caseList: any,
    success: any;
    error: any;
    states: any;
    courts: any;
    city: any;
    lawCategory: any[];
    commonActions: typeof CommonActions;
    categoryLoading: boolean;
    subCategory: any[];
    datagrid: any[];
    userRole: any | null;
}

export function Profile(props: Props) {
    let user = props.userInfo.userjson;
    let company = props.userInfo.companyjson;
    let languageArray = [{
        "value": "Assamese",
        "label": "Assamese"
    },
    {
        "value": "Bengali",
        "label": "Bengali"
    },
    {
        "value": "Bodo",
        "label": "Bodo"
    },
    {
        "value": "Dogri",
        "label": "Dogri"
    },
    {
        "value": "English",
        "label": "English"
    },
    {
        "value": "Gujarati",
        "label": "Gujarati"
    },
    {
        "value": "Hindi",
        "label": "Hindi"
    },
    {
        "value": "Kannada",
        "label": "Kannada"
    },
    {
        "value": "Kashmiri",
        "label": "Kashmiri"
    },
    {
        "value": "Konkani",
        "label": "Konkani"
    },
    {
        "value": "Maithili",
        "label": "Maithili"
    },
    {
        "value": "Malayalam",
        "label": "Malayalam"
    },
    {
        "value": "Meitei",
        "label": "Meitei"
    },
    {
        "value": "Marathi",
        "label": "Marathi"
    },
    {
        "value": "Nepali",
        "label": "Nepali"
    },
    {
        "value": "Odia",
        "label": "Odia"
    },
    {
        "value": "Punjabi",
        "label": "Punjabi"
    },
    {
        "value": "Sanskrit",
        "label": "Sanskrit"
    },
    {
        "value": "Santali",
        "label": "Santali"
    },
    {
        "value": "Sindhi",
        "label": "Sindhi"
    },
    {
        "value": "Tamil",
        "label": "Tamil"
    },
    {
        "value": "Telugu",
        "label": "Telugu"
    },
    {
        "value": "Urdu",
        "label": "Urdu"
    },
    {
        "value": "Kokborok",
        "label": "Kokborok"
    },
    {
        "value": "Mizo",
        "label": "Mizo"
    },
    {
        "value": "Khasi",
        "label": "Khasi"
    },
    {
        "value": "Angika",
        "label": "Angika"
    },
    {
        "value": "Bhojpuri",
        "label": "Bhojpuri"
    },
    {
        "value": "Magadhi",
        "label": "Magadhi"
    },
    {
        "value": "Kodava",
        "label": "Kodava"
    },
    {
        "value": "Bhili",
        "label": "Bhili"
    },
    {
        "value": "Gondi",
        "label": "Gondi"
    },
    {
        "value": "Kutchi",
        "label": "Kutchi"
    },
    {
        "value": "Tulu",
        "label": "Tulu"
    },
    {
        "value": "Sankethi",
        "label": "Sankethi"
    },
    {
        "value": "Marwari",
        "label": "Marwari"
    },
    {
        "value": "Mewari",
        "label": "Mewari"
    },
    {
        "value": "Shekhavati",
        "label": "Shekhavati"
    }]
    let skills = []
    let lang = []
    let pCourt = []
    let suggestions = []
    let sCategory = []
    {
        props.courts?.map((e) => {
            suggestions.push({ id: e.id, courtName: e.courtName, value: e.courtName, label: e.courtName, courtType: e.courtType })
        });
    }
    const classes = useStyles();
    const [edit, setEdit] = React.useState(false);
    const [stateId, setStateId] = React.useState(0)
    const [cityId, setCityId] = React.useState(0)
    const [pid, setId] = React.useState('')
    const [state, setStates] = React.useState([]);
    const [city, setCity] = React.useState([]);
    const [subProductList, setSubProductList] = useState([]);
    const [productList, setProductList] = useState(props.lawCategory);
    const [inputFields, setInputFields] = useState([]);
    const [dataGrid, setDataGrid] = useState([]);
    const [dataGrid1, setDataGrid1] = useState([]);
    const [languages, setLanguages] = React.useState((props.status === "lawyer" || props.status === "companylawyer") ? lang : []);
    const [court, setCourt] = React.useState((props.status === "lawyer" || props.status === "companylawyer") ? pCourt : []);

    const [isValidFName, setIsValidFName] = useState(true);
    const [isValidLName, setIsValidLName] = useState(true);
    const [isValidDob, setIsValidDob] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidMobile, setIsValidMobile] = useState(true);
    const [isValidAddress, setIsValidAddress] = useState(true);
    const [isValidGender, setIsValidGender] = useState(true);
    const [isValidArea, setIsValidArea] = useState(true);
    const [isValidPincode, setIsValidPincode] = useState(true);
    const [isValidLanguagesKnow, setIsValidLanguagesKnow] = useState(true);
    const [isValidPractiseFrom, setIsValidPractiseFrom] = useState(true);
    const [isValidCourt, setIsValidCourt] = useState(true);
    const [practiseFrom, setPractiseFrom] = React.useState<Date | null>(
        new Date((props.status === "lawyer" || props.status === "companylawyer") ? user.practisingFrom : ""),
    );
    const [dob, setDob] = React.useState<Date | null>(
        new Date((props.status === "lawyer" || props.status === "companylawyer" || props.status === "individual") ? user.dob : ""),
    );
    useEffect(() => {
        setSubProductList(props.subCategory);
        sCategory.push({ id: '', subproductList: props.subCategory })
    }, [props.subCategory]);

    useEffect(() => {
        setProductList(props.lawCategory);
    }, [props.lawCategory]);

    useEffect(() => {
        if (props.error) {
            props.snackbarsActions.showErrorSnackbarAction(props.error);
            props.loginActions.clearError({});
        }
    }, [props.error]);

    useEffect(() => {
        if (props.success) {
            props.snackbarsActions.showSuccessSnackbarAction(props.success);
            props.loginActions.clearError({});
        }
    }, [props.success]);

    useEffect(() => {
        props.commonActions.getLawCategory({});
        props.loginActions.getStates()
        if (props.status === "individual" || props.status === "lawyer" || props.status === "companylawyer") {
            props.loginActions.getCourt()
            props.loginActions.getCity({ id: user?.state?.id })
        }
        else
            props.loginActions.getCity({ id: company?.state?.id })
    }, []);

    useEffect(() => {
        setStates(props.states);
    }, [props.states]);

    useEffect(() => {
        setCity(props.city);
    }, [props.city]);

    const handleProductChange = (id, event: React.ChangeEvent<{ value: unknown }>) => {
        const parentId = productList.find(pro => pro.name === event.target.value);
        props.commonActions.getLawCategoryById({ id: parentId?.id });
        const newInputFields = inputFields.map(i => {
            if (id.id === i.id) {
                i['product'] = event.target.value
                i['productParentId'] = 0
                i["subProductParentId"] = parentId.id
                i['productId'] = parentId.id
            }
            return i;
        })
        setInputFields(newInputFields);
    };

    const handleSubProductChange = (id, event: React.ChangeEvent<{ value: unknown }>) => {
        const subProductId = subProductList.find(pro => pro.name === event.target.value);
        const newInputFields = inputFields.map(i => {
            if (id.id === i.id) {
                i["subProduct"] = event.target.value
                i["subProductId"] = subProductId.id
            }
            return i;
        })
        setInputFields(newInputFields);
    };
    const handleExperienceChange = (id, event: React.ChangeEvent<{ value: unknown }>) => {
        const newInputFields = inputFields.map(i => {
            if (id.id === i.id) {
                i["experience"] = event.target.value
            }
            return i;
        })
        setDataGrid1([])
        dataGrid1.push(dataGrid.length > 0 ? dataGrid : skills)
        dataGrid1.push(newInputFields)
        props.DashboardActions.dataGrid(dataGrid1)
    };
    const handleExperience = (event: React.ChangeEvent<{ value: unknown }>, id) => {
        if (skills.length > 0) {
            for (let i = 0; i < skills.length; i++) {
                if (skills[i].id === id) {
                    skills[i].experience = event.target.value
                }
            }
        }
        setDataGrid(skills)
        props.DashboardActions.dataGrid(skills)
    };
    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
        setDataGrid1([])
        dataGrid1.push(dataGrid.length > 0 ? dataGrid : skills)
        dataGrid1.push(values)
        props.DashboardActions.dataGrid(dataGrid1)
    }

    if (props.status === "lawyer" || props.status === "companylawyer") {
        if (user.languagesKnow.length > 0) {
            for (let i = 0; i < user.languagesKnow.length; i++) {
                lang.push({ value: user.languagesKnow[i], label: user.languagesKnow[i] })
            }
        }
        if (user.practisingCourt.length > 0) {
            for (let i = 0; i < user.practisingCourt.length; i++) {
                pCourt.push({ id: user.practisingCourt[i].id, courtName: user.practisingCourt[i].courtName, courtType: user.practisingCourt[i].courtType, value: user.practisingCourt[i].courtName, label: user.practisingCourt[i].courtName })
            }
        }
        if (user.dataGrid.length > 0) {
            if (dataGrid.length === 0) {
                for (let i = 0; i < user.dataGrid.length; i++) {
                    skills.push({
                        id: i,
                        product: user.dataGrid[i].product.name,
                        productId: user.dataGrid[i].product.id,
                        productParentId: user.dataGrid[i].product.parentId,
                        subProduct: user.dataGrid[i].subProduct.name,
                        subProductId: user.dataGrid[i].subProduct.id,
                        subProductParentId: user.dataGrid[i].subProduct.parentId,
                        experience: user.dataGrid[i].experience,
                    })
                }
            }
            else {
                for (let i = 0; i < dataGrid.length; i++) {
                    skills.push(dataGrid[i])
                }

            }
        }
    }
    const handlePractisingFromChange = (newValue: Date | null) => {
        setPractiseFrom(newValue);
    };

    const handleChange = (newValue: Date | null) => {
        setDob(newValue);
    };
    const handleProfileEdit = () => {
        setEdit(true)
    }
    const handleAddSkill = () => {
        setInputFields([...inputFields, { id: uuidv4(), productId: '', productParentId: '', subProductId: '', subProductParentId: '', product: '', subProduct: '', experience: '' }])
    }

    const handleMultiChange = (data: any) => {
        lang.length = 0
        lang.push(data)
        setLanguages(lang[0])

    }
    const handleMultiCourtChange = (data: any) => {
        pCourt.length = 0
        pCourt.push(data)
        setCourt(pCourt[0])

    }
    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
    }
    const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let parentId = state.find(pro => pro.stateName === event.target.value);
        setStateId(parentId?.id)
        props.loginActions.getCity({ id: parentId?.id });
    };
    const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let parentId = city.find(pro => pro.cityName === event.target.value);
        setCityId(parentId?.id)
    };
    const handleProfileUpdate = () => {

        let isFormValid = true;
        let fName :any = document.getElementById("fName")
        let lName :any = document.getElementById('lName')
        let address :any = document.getElementById('address')
        let city :any = document.getElementById('city')
        let state :any = document.getElementById('state')
        let location :any = document.getElementById('area')
        let pincode :any = document.getElementById('pincode')
        let gender :any = document.getElementById('gender')
        let mobile :any = document.getElementById('mobile')
        let email :any = document.getElementById('email')
        let officialEmailId :any = document.getElementById('officialEmailId')
        let companyName :any = document.getElementById('companyName')
        let companyRepresentativeName :any = document.getElementById('companyRepresentativeName')
        let companyRepresentativeDesignation :any = document.getElementById('companyRepresentativeDesignation')
        var e :any = document.getElementById('typeOfFirm')
        if (e)
            var typeOfFirm = e.value;
        let companyRegistrationNumber :any = document.getElementById('companyRegistrationNumber')
        let noOfLawyerInYourFirm :any = document.getElementById('noOfLawyerInYourFirm')

        if (props.status === "individual") {
            if (fName.value === '') {
                setIsValidFName(false)
                isFormValid = false
            }
            if (lName.value === '') {
                setIsValidLName(false)
                isFormValid = false
            }
            if (address.value === '') {
                setIsValidAddress(false)
                isFormValid = false
            }
            if (location.value === '') {
                setIsValidArea(false)
                isFormValid = false
            }
            if (gender.value === '') {
                setIsValidGender(false)
                isFormValid = false
            }
            if (pincode.value === '') {
                setIsValidPincode(false)
                isFormValid = false
            }
            if (mobile.value === '') {
                setIsValidMobile(false)
                isFormValid = false
            }
            if (email.value === '') {
                setIsValidEmail(false)
                isFormValid = false
            }
            if (isFormValid) {
                let data = {
                    id: props.userInfo.id,
                    type: props.status,
                    fName: fName.value,
                    lName: lName.value,
                    dob: dob,
                    address: address.value,
                    location: location.value,
                    gender: gender.value,
                    pincode: pincode.value,
                    mobile: mobile.value,
                    email: email.value,
                    city: city.value ? city.value : user.city,
                    state: state.value ? state.value : user.state,
                    cityId: cityId === 0 ? user.city.id : cityId,
                    stateId: stateId === 0 ? user.state.id : stateId,

                }
                props.loginActions.updateProfile(data)
                setEdit(false)
            }


        }
        else if (props.status === "clientfirm") {
            let data = {
                id: props.userInfo.id,
                type: props.status,
                companyName: companyName.value,
                companyRepresentativeName: companyRepresentativeName.value,
                companyRepresentativeDesignation: companyRepresentativeDesignation.value,
                typeOfFirm: typeOfFirm ? typeOfFirm : company.typeOfFirm,
                companyRegNo: companyRegistrationNumber.value,
                mobile: mobile.value,
                address: address.value,
                location: location.value,
                pincode: pincode.value,
                officialEmailId: officialEmailId.value,
                city: city.value ? city.value : company.city,
                state: state.value ? state.value : company.state,
                cityId: cityId === 0 ? company.city.id : cityId,
                stateId: stateId === 0 ? company.state.id : stateId,

            }
            props.loginActions.updateProfile(data)
            setEdit(false)
        }
        else if (props.status === "lawfirm") {
            let data = {
                id: props.userInfo.id,
                type: props.status,
                companyName: companyName.value,
                companyRepresentativeName: companyRepresentativeName.value,
                companyRepresentativeDesignation: companyRepresentativeDesignation.value,
                typeOfFirm: typeOfFirm ? typeOfFirm : company.typeOfFirm,
                companyRegistrationNumber: companyRegistrationNumber.value,
                address: address.value,
                location: location.value,
                pincode: pincode.value,
                city: city.value ? city.value : company.city,
                state: state.value ? state.value : company.state,
                cityId: cityId === 0 ? company.city.id : cityId,
                stateId: stateId === 0 ? company.state.id : stateId,
                noOfLawyerInYourFirm: noOfLawyerInYourFirm.value,
                officialEmailId: officialEmailId.value,
                mobile: mobile.value,
            }
            props.loginActions.updateProfile(data)
            setEdit(false)
        }
        else if (props.status === "lawyer" || props.status === "companylawyer") {
            let category = []
            let subProduct = []
            let product = []
            let languagesName = []
            let courtName = []
            let grid = []
            if (inputFields.length === 0) {
                for (let i = 0; i < skills.length; i++) {
                    category.push(skills[i])
                }
            }
            else {
                if (props.datagrid?.length > 0) {
                    for (let i = 0; i < props.datagrid?.length; i++) {
                        for (let j = 0; j < props.datagrid[i].length; j++) {
                            category.push(props.datagrid[i][j])
                        }
                    }
                }
            }
            for (let i = 0; i < category.length; i++) {
                product.push(category[i].product)
                subProduct.push(category[i].subProduct)
            }
            for (let i = 0; i < court.length; i++) {
                courtName.push(court[i].courtName)
            }
            for (let i = 0; i < languages.length; i++) {
                languagesName.push(languages[i].label)
            }
            for (let i = 0; i < category.length; i++) {
                grid.push({
                    experience: category[i].experience,
                    product: {
                        id: category[i].productId,
                        name: category[i].product,
                        parentId: category[i].productParentId
                    },
                    subProduct: {
                        id: category[i].subProductId,
                        name: category[i].subProduct,
                        parentId: category[i].subProductParentId,
                    }
                })
            }
            if (fName.value === '') {
                setIsValidFName(false)
                isFormValid = false
            }
            if (lName.value === '') {
                setIsValidLName(false)
                isFormValid = false
            }
            if (address.value === '') {
                setIsValidAddress(false)
                isFormValid = false
            }
            if (location.value === '') {
                setIsValidArea(false)
                isFormValid = false
            }
            if (gender.value === '') {
                setIsValidGender(false)
                isFormValid = false
            }
            if (pincode.value === '') {
                setIsValidPincode(false)
                isFormValid = false
            }
            if (mobile.value === '') {
                setIsValidMobile(false)
                isFormValid = false
            }
            if (email.value === '') {
                setIsValidEmail(false)
                isFormValid = false
            }
            if (languagesName.length ===0) {
                setIsValidLanguagesKnow(false)
                isFormValid = false
            }
            if (practiseFrom.valueOf() === 0) {
                setIsValidPractiseFrom(false)
                isFormValid = false
            }
            if (court.length === 0) {
                setIsValidCourt(false)
                isFormValid = false
            }
            if (isFormValid) {
                let data = {
                    id: props.userInfo.id,
                    type: props.status,
                    fName: fName.value,
                    lName: lName.value,
                    dob: dob,
                    address: address.value,
                    location: location.value,
                    gender: gender.value,
                    pincode: pincode.value,
                    city: city.value,
                    state: state.value,
                    cityId: cityId === 0 ? user.city.id : cityId,
                    stateId: stateId === 0 ? user.state.id : stateId,
                    practisingFrom: practiseFrom,
                    practisingCourt: court,
                    languagesKnow: languagesName,
                    mobile: mobile.value,
                    email: email.value,
                    dataGrid: grid,
                    product: product.toString(),
                    subProduct: subProduct.toString(),
                    practisingCourtName: courtName.toString(),
                    languageKnowName: languagesName.toString(),
                }
                props.loginActions.updateProfile(data)
                setEdit(false)
            }
        }

    }
    return (
        <div>
            <Header links={<HeaderLinks  {...props} />} fixed color="primary" />
            <Box className="casemanagement-container-first" component="div" display="block" >
                <Typography variant="h5" gutterBottom align="center">
                    Profile
                </Typography>
                <Box display="flex" component="div" className="cm-second d-flex justify-content-center">
                    <Typography variant="h6" gutterBottom align="center">
                        LAWE - An Integrated Legal Management Ecosystem
                    </Typography>
                </Box>
            </Box>
            <Box>
                <div className="container" >
                    <Box className="profile-head-container d-flex justify-content-start">
                        <div className="row d-flex justify-content-start mt-3">
                            {(props.status === "lawyer" || props.status === "companylawyer") &&
                                <div className="col d-flex justify-content-end" >
                                    <Avatar alt="Remy Sharp" src={props.userInfo?.profileKey ? props.userInfo.profileKey : face} className={classes.large} />
                                </div>
                            }{
                                (props.status !== "lawyer" || props.status !== "companylawyer") &&
                                <div className="col d-flex justify-content-end" >
                                    {/* <Avatar alt="Remy Sharp" src={face} className={classes.large} /> */}
                                </div>
                            }

                            <div className="col d-flex justify-content-start d-flex align-items-center" style={{ minWidth: "500px" }}>
                                {
                                    props.status === "individual" &&
                                    <Typography variant="h5" gutterBottom align="center">
                                        {user.fName}   {user.lName}
                                    </Typography>
                                }
                                {
                                    props.status === "clientfirm" &&
                                    <Typography variant="h5" gutterBottom align="center">
                                        {company.companyName}
                                    </Typography>
                                }
                                {
                                    props.status === "lawfirm" &&
                                    <Typography variant="h5" gutterBottom align="center">
                                        {company.companyName}
                                    </Typography>
                                }
                                {
                                    props.status === "lawyer" &&
                                    <Typography variant="h5" gutterBottom align="center">
                                        Advocate. {user.fName}   {user.lName}
                                    </Typography>
                                }
                                {
                                    props.status === "companylawyer" &&
                                    <Typography variant="h5" gutterBottom align="center">
                                        Advocate. {user.fName}   {user.lName}
                                    </Typography>
                                }

                            </div>
                        </div>
                    </Box>
                </div>
                <hr style={{ backgroundColor: "#FFC602", color: "#FFC602", height: "3px" }} />
                <div className=" d-flex justify-content-end" style={{ width: "100%" }}>
                    <IconButton className="mr-5" color="primary" onClick={handleProfileEdit}>
                        <EditIcon />    Edit
                    </IconButton></div>

            </Box>
            {props.status === "individual" &&
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col" style={{ width: "500px" }}>
                                <TextField
                                    style={{ width: "543px" }}
                                    className="my-4"
                                    variant="outlined"
                                    id="fName"
                                    label="First Name"
                                    defaultValue={user.fName}
                                    disabled={edit ? false : true}
                                    error={!isValidFName}
                                />
                            </div>
                            <div className="col" style={{ width: "500px" }}>
                                <TextField
                                    style={{ width: "543px" }}
                                    className="my-4"
                                    variant="outlined"
                                    id="lName"
                                    label="Last Name"
                                    defaultValue={user.lName}
                                    disabled={edit ? false : true}
                                    error={!isValidLName}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ width: "500px" }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        clearable
                                        value={dob}
                                        label="Date Of Birth"
                                        placeholder="dd/MM/YYYY"
                                        disabled={edit ? false : true}
                                        onChange={handleChange}
                                        maxDate={moment().subtract(6570, "days")}
                                        maxDateMessage="Age should be above 18 years"
                                        format="dd/MM/yyyy"
                                        variant="inline"
                                        inputVariant="outlined"
                                        fullWidth
                                        autoOk={true}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="col" style={{ width: "500px" }}>
                                <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                    Gender
                                </InputLabel>
                                <Select
                                    className="my-1"
                                    style={{ width: "" }}
                                    defaultValue={user.gender}
                                    disabled={edit ? false : true}
                                    variant="outlined"
                                    error={!isValidGender}
                                    inputProps={{
                                        name: 'gender',
                                        id: 'gender',

                                    }}
                                >
                                    <option value={"Female"}>Female</option>
                                    <option value={"Male"}>Male</option>
                                    <option value={"Other"}>Other</option>
                                    <option value={"Don’t want to Disclose"}>Don’t want to Disclose</option>
                                </Select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ width: "500px" }}>
                                <TextField
                                    style={{ width: "543px" }}
                                    className="my-4"
                                    id="email"
                                    variant="outlined"
                                    label="Email ID"
                                    defaultValue={user.email}
                                    error={!isValidEmail}
                                    disabled={edit ? false : true}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </div>
                            <div className="col" style={{ width: "500px" }}>
                                <TextField
                                    style={{ width: "543px" }}
                                    className="my-4"
                                    id="mobile"
                                    variant="outlined"
                                    label="Mobile Number"
                                    error={!isValidMobile}
                                    defaultValue={user.mobileNo}
                                    disabled={edit ? false : true}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ width: "500px" }}>
                                <TextField
                                    style={{ width: "543px" }}
                                    className="my-4"
                                    id="address"
                                    variant="outlined"
                                    label="Address"
                                    defaultValue={user.address}
                                    error={!isValidAddress}
                                    disabled={edit ? false : true}
                                />
                            </div>
                            <div className="col" style={{ width: "500px" }}>
                                <TextField
                                    style={{ width: "543px" }}
                                    className="my-4"
                                    id="area"
                                    variant="outlined"
                                    label="Area"
                                    error={!isValidArea}
                                    defaultValue={user.location}
                                    disabled={edit ? false : true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ width: "500px" }}>
                                <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                    State
                                </InputLabel>
                                <Select
                                    style={{ width: "543px" }}
                                    className="my-3"
                                    label="State"
                                    defaultValue={user.state.stateName}
                                    disabled={edit ? false : true}
                                    onChange={handleStateChange}
                                    variant="outlined"
                                    inputProps={{
                                        name: 'state',
                                        id: 'state'
                                    }}
                                >
                                    {
                                        state?.map(each => {
                                            return <option value={each.stateName}>{each.stateName}</option>
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="col" style={{ width: "500px" }}>
                                <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                    City
                                </InputLabel>
                                <Select
                                    style={{ width: "543px" }}
                                    className="my-3"
                                    label="City"
                                    defaultValue={user.city.cityName}
                                    disabled={edit ? false : true}
                                    onChange={handleCityChange}
                                    variant="outlined"
                                    inputProps={{
                                        name: 'city',
                                        id: 'city'
                                    }}
                                >
                                    {
                                        city?.map(each => {
                                            return <option value={each.cityName}>{each.cityName}</option>
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ width: "500px" }}>
                                <TextField
                                    style={{ width: "543px" }}
                                    className="my-4"
                                    id="country"
                                    variant="outlined"
                                    label="Country"
                                    defaultValue={user.country}
                                    disabled={edit ? false : true}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                            <div className="col" style={{ width: "500px" }}>
                                <TextField
                                    style={{ width: "543px" }}
                                    className="my-4"
                                    id="pincode"
                                    variant="outlined"
                                    label="Pincode"
                                    error={!isValidPincode}
                                    defaultValue={user.pincode}
                                    disabled={edit ? false : true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ width: "500px" }}>
                                <TextField
                                    style={{ width: "543px" }}
                                    className="my-4"
                                    id="aadhar"
                                    variant="outlined"
                                    label="Aadhar Number"
                                    defaultValue={user.aadhaarNumber}
                                    disabled={edit ? false : true}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {props.status === "lawyer" &&
                <div className="container">
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="fName"
                                label="First Name"
                                defaultValue={user.fName}
                                disabled={edit ? false : true}
                                error={!isValidFName}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="lName"
                                label="Last Name"
                                defaultValue={user.lName}
                                disabled={edit ? false : true}
                                error={!isValidLName}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    clearable
                                    value={dob}
                                    label="Date Of Birth"
                                    placeholder="dd/MM/YYYY"
                                    disabled={edit ? false : true}
                                    onChange={handleChange}
                                    maxDate={moment().subtract(6570, "days")}
                                    maxDateMessage="Age should be above 18 years"
                                    format="dd/MM/yyyy"
                                    variant="inline"
                                    inputVariant="outlined"
                                    fullWidth
                                    autoOk={true}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                Gender
                            </InputLabel>
                            <Select
                                className="my-1"
                                style={{ width: "543px" }}
                                defaultValue={user.gender}
                                disabled={edit ? false : true}
                                variant="outlined"
                                error={!isValidGender}
                                inputProps={{
                                    name: 'gender',
                                    id: 'gender',

                                }}
                            >
                                <option value={"Female"}>Female</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Other"}>Other</option>
                                <option value={"Don’t want to Disclose"}>Don’t want to Disclose</option>
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                id="email"
                                variant="outlined"
                                error={!isValidEmail}
                                label="Email ID"
                                defaultValue={user.email}
                                disabled={edit ? false : true}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                id="mobile"
                                variant="outlined"
                                error={!isValidMobile}
                                label="Mobile Number"
                                defaultValue={user.mobileNo}
                                disabled={edit ? false : true}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                id="address"
                                style={{ width: "543px" }}
                                variant="outlined"
                                label="Address"
                                defaultValue={user.address}
                                error={!isValidAddress}
                                disabled={edit ? false : true}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                id="area"
                                style={{ width: "543px" }}
                                variant="outlined"
                                label="Area"
                                error={!isValidArea}
                                defaultValue={user.location}
                                disabled={edit ? false : true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                State
                            </InputLabel>
                            <Select
                                className="my-3"
                                label="State"
                                style={{ width: "543px" }}
                                defaultValue={user.state.stateName}
                                disabled={edit ? false : true}
                                onChange={handleStateChange}
                                variant="outlined"
                                inputProps={{
                                    name: 'state',
                                    id: 'state'
                                }}
                            >
                                {
                                    state?.map(each => {
                                        return <option value={each.stateName}>{each.stateName}</option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                City
                            </InputLabel>
                            <Select
                                className="my-3"
                                style={{ width: "543px" }}
                                label="City"
                                defaultValue={user.city.cityName}
                                onChange={handleCityChange}
                                variant="outlined"
                                disabled={edit ? false : true}
                                inputProps={{
                                    name: 'city',
                                    id: 'city'
                                }}
                            >
                                {
                                    city?.map(each => {
                                        return <option value={each.cityName}>{each.cityName}</option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                style={{ width: "543px" }}
                                id="country"
                                variant="outlined"
                                label="Country"
                                defaultValue={user.country}
                                disabled={edit ? false : true}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                style={{ width: "543px" }}
                                id="pincode"
                                variant="outlined"
                                label="Pincode"
                                error={!isValidPincode}
                                defaultValue={user.pincode}
                                disabled={edit ? false : true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                variant="outlined"
                                style={{ width: "543px" }}
                                id="aadhar"
                                label="Aadhar Number"
                                defaultValue={user.aadhaarNumber}
                                disabled={edit ? false : true}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                variant="outlined"
                                style={{ width: "543px" }}
                                id="barcouncilcode"
                                label="Bar Council Code"
                                defaultValue={user.barCouncilCode}
                                disabled={edit ? false : true}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">

                        <div className="col" style={{ width: "500px" }}>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        className="my-4 mt-3"
                                        label="Practising From"
                                        inputFormat="dd/MM/yyyy"
                                        value={practiseFrom}
                                        onChange={handlePractisingFromChange}
                                        renderInput={(params) => <TextField error={!isValidPractiseFrom} id="practiseDate" className="my-4" variant="outlined"{...params} />}
                                        disabled={edit ? false : true}
                                    />

                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <div><InputLabel >Languages Known</InputLabel>
                                <ReactSelect
                                    className="my-2"
                                    options={languageArray}
                                    isDisabled={edit ? false : true}
                                    id="languagesKnow"
                                    isMulti
                                    isSearchable={true}
                                    closeMenuOnSelect={false}
                                    isClearable={true}
                                    hideSelectedOptions={true}
                                    onChange={handleMultiChange}
                                    value={languages}
                                    components={{
                                        Option
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <div><InputLabel >Practising Court</InputLabel>
                                <ReactSelect
                                    className="my-2"
                                    isSearchable={true}
                                    options={suggestions}
                                    id="court"
                                    isMulti
                                    isDisabled={edit ? false : true}
                                    closeMenuOnSelect={false}
                                    isClearable={true}
                                    hideSelectedOptions={true}
                                    onChange={handleMultiCourtChange}
                                    value={court}
                                    components={{
                                        Option
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                    <hr style={{ backgroundColor: "#FFC602", color: "#FFC602", height: "3px" }} />
                    <div><InputLabel >Skills</InputLabel></div>
                    <div className="row">
                        <table>
                            <tr>
                                <th style={{ fontSize: "17px", justifyContent: "center" }}>PRODUCT</th>
                                <th style={{ fontSize: "17px", justifyContent: "center" }}>SUB PRODUCT</th>
                                <th style={{ fontSize: "17px", justifyContent: "center" }}>EXPERIENCE</th>
                                {
                                    edit &&
                                    <div className=" d-flex justify-content-center mt-3" style={{ width: "100%" }}>
                                        <Button variant="contained" style={{ backgroundColor: "#292734", color: "#FFC602", height: "50px", width: "150px" }} onClick={handleAddSkill}>
                                            ADD SKILLS
                                        </Button>
                                    </div>
                                }
                            </tr>
                            {
                                skills?.map(each => {
                                    return (

                                        <tr>
                                            <td style={{ paddingRight: "20px" }}>
                                                <TextField
                                                    style={{ width: "300px" }}
                                                    className="my-4"
                                                    variant="outlined"
                                                    defaultValue={each.product}
                                                    disabled={edit ? false : true}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </td>
                                            <td style={{ paddingRight: "20px" }}>
                                                <TextField
                                                    style={{ width: "300px" }}
                                                    className="my-4"
                                                    variant="outlined"
                                                    defaultValue={each.subProduct}
                                                    disabled={edit ? false : true}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </td>
                                            <td style={{ paddingRight: "20px" }}>

                                                <Select
                                                    style={{ width: "300px" }}
                                                    className="my-4"
                                                    variant="outlined"
                                                    disabled={edit ? false : true}
                                                    defaultValue={each.experience}
                                                    onChange={event => { handleExperience(event, each["id"]) }}
                                                >
                                                    <option value="Novice(0-3yrs)">Novice(0-3yrs)</option>
                                                    <option value="Intermediate(3-6yrs)">Intermediate(3-6yrs)</option>
                                                    <option value="Advanced(6-15yrs)" >Advanced(6-15yrs)</option>
                                                    <option value="Practisoner(>15yrs)">Practisoner(&gt; 15yrs)</option>

                                                </Select>
                                            </td>
                                        </tr>

                                    );
                                })
                            }
                            {
                                inputFields.map(inputField => (
                                    (<tr>
                                        <td style={{ paddingRight: "20px" }}>
                                            <Select
                                                style={{ width: "300px" }}
                                                variant="outlined"
                                                className="my-4"
                                                value={inputField.product}
                                                onChange={event => handleProductChange(inputField, event)}

                                            >
                                                {
                                                    productList?.map(eachProduct => {
                                                        return <option value={eachProduct.name}>{eachProduct.name}</option>
                                                    })
                                                }
                                            </Select>
                                        </td>
                                        <td style={{ paddingRight: "20px" }}>
                                            <Select
                                                style={{ width: "300px" }}
                                                className="my-4"
                                                variant="outlined"
                                                value={inputField.subProduct}
                                                onChange={event => handleSubProductChange(inputField, event)}

                                            >
                                                {
                                                    subProductList?.map(
                                                        eachSubProduct => {
                                                            return <option value={eachSubProduct.name}>{eachSubProduct.name}</option>
                                                        }
                                                    )

                                                }
                                            </Select>
                                        </td>
                                        <td style={{ paddingRight: "20px" }}>
                                            <Select
                                                style={{ width: "300px" }}
                                                className="my-4"
                                                variant="outlined"
                                                value={inputField.experience}
                                                onChange={event => handleExperienceChange(inputField, event)}
                                            >
                                                <option value="Novice(0-3yrs)">Novice(0-3yrs)</option>
                                                <option value="Intermediate(3-6yrs)">Intermediate(3-6yrs)</option>
                                                <option value="Advanced(6-15yrs)" >Advanced(6-15yrs)</option>
                                                <option value="Practisoner(>15yrs)">Practisoner(&gt; 15yrs)</option>

                                            </Select>
                                        </td>
                                        <IconButton className="mr-5 mt-4" color="inherit" onClick={() => handleRemoveFields(inputField.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </tr>

                                    )
                                ))}
                        </table>


                    </div>
                </div>
            }
            {
                props.status === "companylawyer" &&
                <div className="container">
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="fName"
                                label="First Name"
                                defaultValue={user.fName}
                                disabled={edit ? false : true}
                                error={!isValidFName}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="lName"
                                label="Last Name"
                                defaultValue={user.lName}
                                disabled={edit ? false : true}
                                error={!isValidLName}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    clearable
                                    value={dob}
                                    label="Date Of Birth"
                                    placeholder="dd/MM/YYYY"
                                    disabled={edit ? false : true}
                                    onChange={handleChange}
                                    maxDate={moment().subtract(6570, "days")}
                                    maxDateMessage="Age should be above 18 years"
                                    format="dd/MM/yyyy"
                                    variant="inline"
                                    inputVariant="outlined"
                                    fullWidth
                                    autoOk={true}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                Gender
                            </InputLabel>
                            <Select
                                className="my-1"
                                style={{ width: "543px" }}
                                defaultValue={user.gender}
                                disabled={edit ? false : true}
                                variant="outlined"
                                error={!isValidGender}
                                inputProps={{
                                    name: 'gender',
                                    id: 'gender',

                                }}
                            >
                                <option value={"Female"}>Female</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Other"}>Other</option>
                                <option value={"Don’t want to Disclose"}>Don’t want to Disclose</option>
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                id="email"
                                variant="outlined"
                                error={!isValidEmail}
                                label="Email ID"
                                defaultValue={user.email}
                                disabled={edit ? false : true}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                id="mobile"
                                variant="outlined"
                                error={!isValidMobile}
                                label="Mobile Number"
                                defaultValue={user.mobileNo}
                                disabled={edit ? false : true}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                id="address"
                                style={{ width: "543px" }}
                                variant="outlined"
                                label="Address"
                                defaultValue={user.address}
                                error={!isValidAddress}
                                disabled={edit ? false : true}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                id="area"
                                style={{ width: "543px" }}
                                variant="outlined"
                                label="Area"
                                error={!isValidArea}
                                defaultValue={user.location}
                                disabled={edit ? false : true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                State
                            </InputLabel>
                            <Select
                                className="my-3"
                                label="State"
                                style={{ width: "543px" }}
                                defaultValue={user.state.stateName}
                                disabled={edit ? false : true}
                                onChange={handleStateChange}
                                variant="outlined"
                                inputProps={{
                                    name: 'state',
                                    id: 'state'
                                }}
                            >
                                {
                                    state?.map(each => {
                                        return <option value={each.stateName}>{each.stateName}</option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                City
                            </InputLabel>
                            <Select
                                className="my-3"
                                style={{ width: "543px" }}
                                label="City"
                                defaultValue={user.city.cityName}
                                onChange={handleCityChange}
                                variant="outlined"
                                disabled={edit ? false : true}
                                inputProps={{
                                    name: 'city',
                                    id: 'city'
                                }}
                            >
                                {
                                    city?.map(each => {
                                        return <option value={each.cityName}>{each.cityName}</option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                style={{ width: "543px" }}
                                id="country"
                                variant="outlined"
                                label="Country"
                                defaultValue={user.country}
                                disabled={edit ? false : true}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                style={{ width: "543px" }}
                                id="pincode"
                                variant="outlined"
                                label="Pincode"
                                error={!isValidPincode}
                                defaultValue={user.pincode}
                                disabled={edit ? false : true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                variant="outlined"
                                style={{ width: "543px" }}
                                id="aadhar"
                                label="Aadhar Number"
                                defaultValue={user.aadhaarNumber}
                                disabled={edit ? false : true}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                className="my-4"
                                variant="outlined"
                                style={{ width: "543px" }}
                                id="barcouncilcode"
                                label="Bar Council Code"
                                defaultValue={user.barCouncilCode}
                                disabled={edit ? false : true}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">

                        <div className="col" style={{ width: "500px" }}>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        className="my-4 mt-3"
                                        label="Practising From"
                                        inputFormat="dd/MM/yyyy"
                                        value={practiseFrom}
                                        onChange={handlePractisingFromChange}
                                        renderInput={(params) => <TextField error={!isValidPractiseFrom} id="practiseDate" className="my-4" variant="outlined"{...params} />}
                                        disabled={edit ? false : true}
                                    />

                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <div><InputLabel >Languages Known</InputLabel>
                                <ReactSelect
                                    className="my-2"
                                    options={languageArray}
                                    isDisabled={edit ? false : true}
                                    id="languagesKnow"
                                    isMulti
                                    isSearchable={true}
                                    closeMenuOnSelect={false}
                                    isClearable={true}
                                    hideSelectedOptions={true}
                                    onChange={handleMultiChange}
                                    value={languages}
                                    components={{
                                        Option
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <div><InputLabel >Practising Court</InputLabel>
                                <ReactSelect
                                    className="my-2"
                                    isSearchable={true}
                                    options={suggestions}
                                    id="court"
                                    isMulti
                                    isDisabled={edit ? false : true}
                                    closeMenuOnSelect={false}
                                    isClearable={true}
                                    hideSelectedOptions={true}
                                    onChange={handleMultiCourtChange}
                                    value={court}
                                    components={{
                                        Option
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                    <hr style={{ backgroundColor: "#FFC602", color: "#FFC602", height: "3px" }} />
                    <div><InputLabel >Skills</InputLabel></div>
                    <div className="row">
                        <table>
                            <tr>
                                <th style={{ fontSize: "17px", justifyContent: "center" }}>PRODUCT</th>
                                <th style={{ fontSize: "17px", justifyContent: "center" }}>SUB PRODUCT</th>
                                <th style={{ fontSize: "17px", justifyContent: "center" }}>EXPERIENCE</th>
                                {
                                    edit &&
                                    <div className=" d-flex justify-content-center mt-3" style={{ width: "100%" }}>
                                        <Button variant="contained" style={{ backgroundColor: "#292734", color: "#FFC602", height: "50px", width: "150px" }} onClick={handleAddSkill}>
                                            ADD SKILLS
                                        </Button>
                                    </div>
                                }
                            </tr>
                            {
                                skills?.map(each => {
                                    return (

                                        <tr>
                                            <td style={{ paddingRight: "20px" }}>
                                                <TextField
                                                    style={{ width: "300px" }}
                                                    className="my-4"
                                                    variant="outlined"
                                                    defaultValue={each.product}
                                                    disabled={edit ? false : true}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </td>
                                            <td style={{ paddingRight: "20px" }}>
                                                <TextField
                                                    style={{ width: "300px" }}
                                                    className="my-4"
                                                    variant="outlined"
                                                    defaultValue={each.subProduct}
                                                    disabled={edit ? false : true}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </td>
                                            <td style={{ paddingRight: "20px" }}>

                                                <Select
                                                    style={{ width: "300px" }}
                                                    className="my-4"
                                                    variant="outlined"
                                                    disabled={edit ? false : true}
                                                    defaultValue={each.experience}
                                                    onChange={event => { handleExperience(event, each["id"]) }}
                                                >
                                                    <option value="Novice(0-3yrs)">Novice(0-3yrs)</option>
                                                    <option value="Intermediate(3-6yrs)">Intermediate(3-6yrs)</option>
                                                    <option value="Advanced(6-15yrs)" >Advanced(6-15yrs)</option>
                                                    <option value="Practisoner(>15yrs)">Practisoner(&gt; 15yrs)</option>

                                                </Select>
                                            </td>
                                        </tr>

                                    );
                                })
                            }
                            {
                                inputFields.map(inputField => (
                                    (<tr>
                                        <td style={{ paddingRight: "20px" }}>
                                            <Select
                                                style={{ width: "300px" }}
                                                variant="outlined"
                                                className="my-4"
                                                value={inputField.product}
                                                onChange={event => handleProductChange(inputField, event)}

                                            >
                                                {
                                                    productList?.map(eachProduct => {
                                                        return <option value={eachProduct.name}>{eachProduct.name}</option>
                                                    })
                                                }
                                            </Select>
                                        </td>
                                        <td style={{ paddingRight: "20px" }}>
                                            <Select
                                                style={{ width: "300px" }}
                                                className="my-4"
                                                variant="outlined"
                                                value={inputField.subProduct}
                                                onChange={event => handleSubProductChange(inputField, event)}

                                            >
                                                {
                                                    subProductList?.map(
                                                        eachSubProduct => {
                                                            return <option value={eachSubProduct.name}>{eachSubProduct.name}</option>
                                                        }
                                                    )

                                                }
                                            </Select>
                                        </td>
                                        <td style={{ paddingRight: "20px" }}>
                                            <Select
                                                style={{ width: "300px" }}
                                                className="my-4"
                                                variant="outlined"
                                                value={inputField.experience}
                                                onChange={event => handleExperienceChange(inputField, event)}
                                            >
                                                <option value="Novice(0-3yrs)">Novice(0-3yrs)</option>
                                                <option value="Intermediate(3-6yrs)">Intermediate(3-6yrs)</option>
                                                <option value="Advanced(6-15yrs)" >Advanced(6-15yrs)</option>
                                                <option value="Practisoner(>15yrs)">Practisoner(&gt; 15yrs)</option>

                                            </Select>
                                        </td>
                                        <IconButton className="mr-5 mt-4" color="inherit" onClick={() => handleRemoveFields(inputField.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </tr>

                                    )
                                ))}
                        </table>


                    </div>
                </div>
            }
            {
                props.status === "clientfirm" &&
                <div className="container">

                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="companyName"
                                label="Client Firm Name"
                                defaultValue={company.companyName}
                                disabled={edit ? false : true}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>

                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="companyRepresentativeName"
                                label="Company Representative Name"
                                defaultValue={company.companyRepresentativeName}
                                disabled={edit ? false : true}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="companyRegistrationNumber"
                                label="Company Registration Number"
                                defaultValue={company.companyRegNo}
                                disabled={edit ? false : true}
                            />
                        </div>
                        <div className="col" style={{ width: "543px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="companyRepresentativeDesignation"
                                label="Company Represenative Designation"
                                defaultValue={company.companyRepresentativeDesignation}
                                disabled={edit ? false : true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                Type Of Firm
                            </InputLabel>
                            <Select
                                defaultValue={company.typeOfFirm}
                                style={{ width: "543px" }}
                                className="my-1"
                                variant="outlined"
                                disabled={edit ? false : true}
                                inputProps={{
                                    name: 'typeOfFirm',
                                    id: 'typeOfFirm'

                                }}
                            >
                                <option value={"Individual"}>Individual</option>
                                <option value={"Patnership"}>Patnership</option>
                                <option value={"Private limited"}>Private Limited</option>
                                <option value={"Public Limited"}>Public Limited</option>
                            </Select>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="gstNo"
                                label="GST Number"
                                defaultValue={company.gstNo}
                                disabled={edit ? false : true}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>

                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="officialEmailId"
                                label="Email Address"
                                defaultValue={company.officialEmailId}
                                disabled={edit ? false : true}
                                inputProps={
                                    { readOnly: true, }
                                }

                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="mobile"
                                label="Mobile Number"
                                defaultValue={company.mobileNo}
                                disabled={edit ? false : true}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="address"
                                label="Address"
                                defaultValue={company.address}
                                disabled={edit ? false : true}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="area"
                                label="Area"
                                defaultValue={company.location}
                                disabled={edit ? false : true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                State
                            </InputLabel>
                            <Select
                                style={{ width: "543px" }}
                                className="my-3"
                                label="State"
                                defaultValue={company.state.stateName}
                                onChange={handleStateChange}
                                disabled={edit ? false : true}
                                variant="outlined"
                                inputProps={{
                                    name: 'state',
                                    id: 'state'
                                }}
                            >
                                {
                                    state?.map(each => {
                                        return <option value={each.stateName}>{each.stateName}</option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                City
                            </InputLabel>
                            <Select
                                style={{ width: "543px" }}
                                className="my-3"
                                label="City"
                                defaultValue={company.city.cityName}
                                disabled={edit ? false : true}
                                onChange={handleCityChange}
                                variant="outlined"
                                inputProps={{
                                    name: 'city',
                                    id: 'city'
                                }}
                            >
                                {
                                    city?.map(each => {
                                        return <option value={each.cityName}>{each.cityName}</option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>

                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="country"
                                label="Country"
                                disabled={edit ? false : true}
                                defaultValue={company.country}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="pincode"
                                label="Pincode"
                                defaultValue={company.pincode}
                                disabled={edit ? false : true}
                            />
                        </div>
                    </div>
                </div>
            }
            {
                props.status === "lawfirm" &&
                <div className="container">

                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="companyName"
                                label="Client Firm Name"
                                defaultValue={company.companyName}
                                disabled={edit ? false : true}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>

                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="companyRepresentativeName"
                                label="Company Representative Name"
                                defaultValue={company.companyRepresentativeName}
                                disabled={edit ? false : true}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="companyRegistrationNumber"
                                label="Company Registration Number"
                                defaultValue={company.companyRegistrationNumber}
                                disabled={edit ? false : true}
                            />
                        </div>
                        <div className="col" style={{ width: "543px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="companyRepresentativeDesignation"
                                label="Company Represenative Designation"
                                defaultValue={company.companyRepresentativeDesignation}
                                disabled={edit ? false : true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                Type Of Firm
                            </InputLabel>
                            <Select
                                defaultValue={company.typeofFirm}
                                style={{ width: "543px" }}
                                className="my-1"
                                variant="outlined"
                                disabled={edit ? false : true}
                                inputProps={{
                                    name: 'typeOfFirm',
                                    id: 'typeOfFirm'

                                }}
                            >
                                <option value={"Individual"}>Individual</option>
                                <option value={"Patnership"}>Patnership</option>
                                <option value={"Private limited"}>Private Limited</option>
                                <option value={"Public Limited"}>Public Limited</option>
                            </Select>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="gstNo"
                                label="GST Number"
                                defaultValue={company.gstNo}
                                disabled={edit ? false : true}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>

                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="officialEmailId"
                                label="Email Address"
                                defaultValue={company.officialEmailId}
                                disabled={edit ? false : true}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="mobile"
                                label="Mobile Number"
                                defaultValue={company.mobileNo}
                                disabled={edit ? false : true}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="address"
                                label="Address"
                                defaultValue={company.address}
                                disabled={edit ? false : true}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="area"
                                label="Area"
                                defaultValue={company.location}
                                disabled={edit ? false : true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                State
                            </InputLabel>
                            <Select
                                style={{ width: "543px" }}
                                className="my-3"
                                label="State"
                                defaultValue={company.state.stateName}
                                onChange={handleStateChange}
                                disabled={edit ? false : true}
                                variant="outlined"
                                inputProps={{
                                    name: 'state',
                                    id: 'state'
                                }}
                            >
                                {
                                    state?.map(each => {
                                        return <option value={each.stateName}>{each.stateName}</option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <InputLabel className="mb-1" variant="standard" htmlFor="uncontrolled-native">
                                City
                            </InputLabel>
                            <Select
                                style={{ width: "543px" }}
                                className="my-3"
                                label="City"
                                defaultValue={company.city.cityName}
                                onChange={handleCityChange}
                                disabled={edit ? false : true}
                                variant="outlined"
                                inputProps={{
                                    name: 'city',
                                    id: 'city'
                                }}
                            >
                                {
                                    city?.map(each => {
                                        return <option value={each.cityName}>{each.cityName}</option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>

                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="country"
                                label="Country"
                                disabled={edit ? false : true}
                                defaultValue={company.country}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="col" style={{ width: "500px" }}>
                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="pincode"
                                label="Pincode"
                                disabled={edit ? false : true}
                                defaultValue={company.pincode}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col" style={{ width: "500px" }}>

                            <TextField
                                style={{ width: "543px" }}
                                className="my-4"
                                variant="outlined"
                                id="noOfLawyerInYourFirm"
                                label="Number of Lawyers"
                                defaultValue={company.noOfLawyerInYourFirm}
                                disabled={edit ? false : true}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                </div>

            }
            {
                edit &&
                <div className=" d-flex justify-content-center mt-3" style={{ width: "100%" }}>
                    <Button variant="contained" className="update" style={{ backgroundColor: "#292734", color: "#FFC602", height: "50px", width: "150px" }} onClick={handleProfileUpdate}>
                        Update Profile
                    </Button>
                </div>
            }
        </div >
    );
}



const mapStateToProps = (state: any) => ({
    userName: state.loginForm.userName,
    status: state.loginForm.status,
    userInfo: state.loginForm.userInfo,
    isLoading: state.caseManagement.loading,
    caseManagement: state.caseManagement,
    casehearingslist: state.caseManagement.casehearingslist,
    caseNotes: state.caseManagement.caseNotes,
    common: state.commonReducer,
    findJudgementLoaded: state.findJudgement.loaded,
    findJudgement: state.findJudgement.judgementList,
    isJudgementLoading: state.findJudgement.loading,
    findLawyer: state.findLawyer.lawyerList,
    findLawyerLoaded: state.findLawyer.loaded,
    notifications: state.loginForm.notifications,
    remainders: state.loginForm.remainders,
    appointments: state.loginForm.appointments,
    caseList: state.dashboard.caseList,
    success: state.loginForm.success,
    error: state.loginForm.error,
    states: state.loginForm.states,
    courts: state.loginForm.courts,
    city: state.loginForm.city,
    lawCategory: state.commonReducer.lawCategory,
    categoryLoading: state.commonReducer.loading,
    subCategory: state.commonReducer.subCategory,
    datagrid: state.dashboard.datagrid,
    userRole: state.loginForm.role,
});

function mapDispatchToProps(dispatch: any) {
    return {
        CaseManagementActions: bindActionCreators(CaseManagementActions as any, dispatch),
        snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
        loginActions: bindActionCreators(LoginActions as any, dispatch),
        commonActions: bindActionCreators(CommonActions as any, dispatch),
        finsJudgementActions: bindActionCreators(FindJudgementActions as any, dispatch),
        findLawyerActions: bindActionCreators(FindLawyerActions as any, dispatch),
        DashboardActions: bindActionCreators(DashboardActions as any, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

import React, { useEffect, useState } from 'react';
import classNames from "classnames";
import { RouteComponentProps } from "react-router-dom";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import * as FindJudgementActions from "../../reduxAction/findJudgement/findJudgementActions";
import findLawyer from "../../assets/img/icon/findlawyer.svg";
import FindJudgement from "../../assets/img/icon/findjudgement.svg";
import caseManagement from "../../assets/img/icon/casemanagement.svg";
import dashboard from "../../assets/img/icon/dashboard.svg";
import payment from "../../assets/img/icon/payment.svg";
import { PracticingCourtAutoSuggest } from "../AutoSuggest/react-autosuggest";
import './Search.scss';
import * as CommonActions from "../../reduxAction/common/commonActions";

import SearchIcon from '@material-ui/icons/Search';
import { Button, FormControl, Grid, InputLabel, makeStyles, Paper, Select, TextField, Typography } from '@material-ui/core';

interface Props extends RouteComponentProps<any> {
  userName: string | null;
  findLawyerActions: typeof FindLawyerActions;
  finsJudgementActions: typeof FindJudgementActions;
  findLawyer: any;
  findJudgement: any;
  lawCategory: any[];
  commonActions: typeof CommonActions;
  subCategory: any[];
}

const useStyles = makeStyles(() => ({
  searchCardTitle: {
    color: "#FFC602",
    textTransform: "unset",
    fontSize: "1.6rem !important",
    fontWeight: 600,
    letterSpacing: "0.02857em !important",
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  searchCardCantainer:{
    padding:"15px 10px",
    // marginLeft:"8rem!important",
  },
  // searchFieldContainer:{
  //   display: "flex",
  //   margin: "20px 0",
  // }, 
  marginTopEmpty:{
    marginTop: "0 !important",
  },
  textField:{
    flex: "1",
    marginRight: "10px",
  },
  selectLabel:{
    lineHeight: "0.2 !important",
  },
  selectInput:{
    // display: "block",
    "& select": {
      padding: "12px !important",
    } 
  },
  marginRight10:{
    marginRight: "10px !important", 
  },
  locationTextField:{
    flex: 1,        
    marginRight: "10px",    
    width: "100% !important",
    "& input": {
        height: "25px",
    }
  }

}));

export default function FixedContainer(props: Props) {

  const [isFindLawyer, setIsFindLawyer] = useState(false);
  // if(props.match.params?.type){
  //   if(props.match.params.type.toString()=="findlawyer"){
  //     setIsFindLawyer(true)
  //   }
  // }

  const setFindLawyer = () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    props.commonActions.getLawCategory({});
    setIsFindLawyer(true);
  }
  const setFindJudgement = () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    setIsFindLawyer(false);
  }

  const [product, setProduct] = useState('');
  const [subProduct, setSubProduct] = useState(''); 
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [court, setCourt] = useState([]);
  const [supProductList, setSubProductList] = useState([]);
  const [productList, setProductList] = useState(props.lawCategory);


  const [judgementDescription, setJudgementDescription] = useState('');

  const [isValidProduct, setIsValidProduct] = useState(true);
  const [isValidSubProduct, setIsValidSubProduct] = useState(true);
  const [isValidCourt, setIsValidCourt] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidCity, setIsValidCity] = useState(true);  
  const [isValidArea, setIsValidArea] = useState(true);
  const [isValidJudgementDescription, setIsValidJudgementDescription] = useState(true);

  useEffect(() => {
    setSubProductList(props.subCategory);
  }, [props.subCategory]);

  useEffect(() => {    
    setProductList(props.lawCategory);
  }, [props.lawCategory]);

  const handleReadMore= () => {
    window.open ("https://www.lawe.co.in/#whylawe", "_blank");
  }

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

  const handleCourtChange = (court: any) => {
    setIsValidCourt(true);
    setCourt(court);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsValidDescription(true);
    setDescription(event.target.value as string);
  };

  // const handleLocationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   const str = (event.target.value as string)?.split(","); 
  //   if(str.length == 2){
  //     setIsValidLocation(true);
  //     setLocation(event.target.value as string);
  //   }
  //   else{
  //     setIsValidLocation(false);
  //   }
  // };

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setIsValidCity(true);
      setCity(event.target.value as string);
  };  

  const handleAreaChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsValidArea(true);
    setArea(event.target.value as string);
};  

  const handleJudgementDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsValidJudgementDescription(true);
    setJudgementDescription(event.target.value as string);
  };

  const handleFindLawyer = async() => {
    let isFormValid = true;
   
    if (product === '') {
      setIsValidProduct(false);
    }
    if (subProduct === '') {
      isFormValid = false;
      setIsValidSubProduct(false);
    }
    if (court.length === 0) {
      isFormValid = false;
      setIsValidCourt(false);
    }
    if (description === '') {
      setIsValidDescription(false);
    }

    if (city === '') {
      isFormValid = false;
      setIsValidCity(false);
    }

    if (area === '') {
      setIsValidArea(false);
    }

    if (isFormValid) {

      const data:any = {
        product: product,
        subproduct: subProduct,
        practisingcourt: court.join(','),
        description: description,
        location: area,
        city: city,
        skip: 0,
        limit: 10
      };
      
      await props.findLawyerActions.findLawyerAction(data);
    }
  }

  

  const handleFindJudgement = () => {
    if (judgementDescription === '') {
      setIsValidJudgementDescription(false);
    } else {
      const data = {
        description: judgementDescription,
      }
      props.finsJudgementActions.findJudgementAction(data);
    }
  }
  const searchTitle = isFindLawyer ? 'Find a Lawyer' : 'Find Judgement'

  const bannerClass = classNames({
    'findlawyer-banner': isFindLawyer,
    'judgement-banner': !isFindLawyer
  });

  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={bannerClass}>
        <Grid container alignItems="center">
          <Grid item md={6}>
            <Typography variant="h5" className={classes.searchCardTitle} gutterBottom>
              {searchTitle}
            </Typography>
            {isFindLawyer &&
              <Paper elevation={3} className={classes.searchCardCantainer} >
                {/* <div className={`${classes.searchFieldContainer} ${classes.marginTopEmpty}`}> */}
                <div className="searchFieldContainer">

                  <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel error={!isValidProduct} id="product-select-label" className={classes.selectLabel}>Product*</InputLabel>
                    <Select
                      native
                      className={classes.selectInput}
                      labelId="product-select-label"
                      id="product-select-outlined"
                      value={product}
                      onChange={handleProductChange}
                      label="Product*"
                      error={!isValidProduct}
                      placeholder="Product"
                    >
                      <option aria-label="None" value="" />
                      {
                        productList?.map(eachProduct => {
                          return <option value={eachProduct.name}>{eachProduct.name}</option>
                        })
                      }
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel error={!isValidSubProduct} id="sub-product-select-label" className={classes.selectLabel}>Sub Product*</InputLabel>
                    <Select
                      native
                      className={classes.selectInput}
                      labelId="sub-product-select-label"
                      id="sub-product-select-outlined"
                      value={subProduct}
                      onChange={handleSubProductChange}
                      label="Sub Product*"
                      error={!isValidSubProduct}
                      placeholder="Product"
                    >
                      <option aria-label="None" value="" />
                      {
                        supProductList?.map(eachSubProduct => {
                          return <option value={eachSubProduct.name}>{eachSubProduct.name}</option>
                        })
                      }
                    </Select>
                  </FormControl>
                </div>
                {/* <div className={`${classes.searchFieldContainer} ${classes.marginRight10}`}> */}
                <div className="searchFieldContainer" style={{marginRight:"10px"}}>
                  <PracticingCourtAutoSuggest
                    label='Court*'
                    variant="outlined"
                    fullWidth
                    handleInputChange={handleCourtChange}
                    allowDuplicates={false}
                    error={!isValidCourt}
                    placeholder="Court"
                  />
                </div>
                <div className="searchFieldContainer">
                {/* <div className={classes.searchFieldContainer}> */}
                  {/* <TextField error={!isValidDescription} onChange={handleDescriptionChange} size="small" className="text-field" multiline rows={3} label="Description of issue*" variant="outlined" /> */}
                  <TextField onChange={handleDescriptionChange} size="small" className={classes.textField} multiline rows={3} label="Description of issue" variant="outlined" />
                </div>
                <div className="searchFieldContainer">
                {/* <div className={classes.searchFieldContainer}> */}
                  <Grid container>
                      <Grid item xs={12} sm={7}>
                          <TextField size="small" className={classes.locationTextField} onChange={handleAreaChange} label="Area" placeholder="Area" variant="outlined" />
                      </Grid>
                  </Grid>  
                </div>
                {/* <div className={classes.searchFieldContainer}> */}
                <div className="searchFieldContainer">
                  <Grid container>                   
                    
                    <Grid item xs={12} sm={7}>
                      {/* <TextField size="small" className="location-text-field" error={!isValidLocation} onChange={handleLocationChange} label="Area and City*" placeholder="Area, City" variant="outlined" helperText={!isValidLocation ? "Enter a valid format (Area, City) " : ""} */}
                      {/* <TextField size="small" className={classes.locationTextField} error={!isValidLocation} onChange={handleLocationChange} label="Area and City" placeholder="Area, City" variant="outlined" helperText={!isValidLocation ? "Enter a valid format (Area, City) " : ""} */}
                      <TextField size="small" className={classes.locationTextField} error={!isValidCity} onChange={handleCityChange} label="City*" placeholder="City" variant="outlined" helperText={!isValidCity ? "Enter a City" : ""}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={5}>
                      <div className="search-button">
                        <Button variant="contained" startIcon={<SearchIcon />} onClick={handleFindLawyer}>
                          <span>Find Lawyer</span>
                        </Button>
                      </div>
                    </Grid>
                    
                  </Grid>
                </div>
              </Paper>
            }
            {!isFindLawyer &&
              <Paper elevation={3} className="search-card-cantainer" >
                <div className="search-field-container">
                  <TextField error={!isValidJudgementDescription} size="small" onChange={handleJudgementDescriptionChange} className="text-field" multiline rows={3} label="Description of issue*" variant="outlined" />
                </div>
                <div className="search-button">
                  <Button variant="contained" startIcon={<SearchIcon />} onClick={handleFindJudgement}>Find Judgement</Button>
                </div>
              </Paper>
            }
          </Grid>
        </Grid>
      </div>
      <div className="button-banner">
        <div className="banner-container">
          <div className="btn-list-item" onClick={setFindLawyer}>
            <div className="btn-image">
              <Button >
                <img
                  className="image"
                  src={findLawyer}
                  alt='logo'
                />
              </Button>
            </div>
            <div className="btn-text">
              <Typography variant="button" display="block" gutterBottom>
                Find
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                Lawyer
              </Typography>
            </div>
          </div>
          <div className="btn-list-item" onClick={setFindJudgement}>
            <div className="btn-image">
              <Button>
                <img
                  className="image"
                  src={FindJudgement}
                  alt='logo'
                />
              </Button>
            </div>
            <div className="btn-text">
              <Typography variant="button" display="block" gutterBottom>
                Find
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                Judgement
              </Typography>
            </div>
          </div>
          {/* <div className="btn-list-item">
            <div className="btn-image">
              <Button>
                <img
                  className="image"
                  src={caseManagement}
                  alt='logo'
                />
              </Button>
            </div>
            <div className="btn-text">
              <Typography variant="button" display="block" gutterBottom>
                Case
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                Management
              </Typography>
            </div>
          </div>
          <div className="btn-list-item">
            <div className="btn-image">
              <Button>
                <img
                  className="image"
                  src={dashboard}
                  alt='logo'
                />
              </Button>
            </div>
            <div className="btn-text">
              <Typography variant="button" display="block" gutterBottom>
                Dashboard
              </Typography>
            </div>
          </div>
          <div className="btn-list-item">
            <div className="btn-image">
              <Button>
                <img
                  className="image"
                  src={payment}
                  alt='logo'
                />
              </Button>
            </div>
            <div className="btn-text">
              <Typography variant="button" display="block" gutterBottom>
                Payment &
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                Invoice
              </Typography>
            </div>
          </div> */}
        </div>
      </div>
      <div className="blog-banner">
        <div className="content-blog">
          <Typography variant="h3" display="block" gutterBottom>
            An Integrated
          </Typography>
          <Typography variant="h3" display="block" gutterBottom>
            Legal Management
          </Typography>
          <Typography variant="h3" display="block" gutterBottom>
            Ecosystem
          </Typography>
          <Button variant="contained" onClick={handleReadMore}>READ MORE</Button>
        </div>
        <div className="image-blog"></div>
      </div>
    </React.Fragment>
  );
}
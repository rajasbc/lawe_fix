import {
  blackColor,
  cardTitle,
  container,
  grayColor,
  hexToRgb,
  main,
  mlAuto,
  section,
  title
} from '../../Lawe-react';

import customSelectStyle from "../customSelectStyle";
import imagesStyles from "../imagesStyles";
import tooltipsStyle from "../tooltipsStyle";

const productStyle:any = {
  mlAuto,
  main,
  ...imagesStyles,
  ...customSelectStyle,
  ...tooltipsStyle,
  container: {
    ...container,
    zIndex: 2
  },
  mainRaised: {
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(blackColor) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(blackColor) +
      ", 0.12)",
  },
  section: {
    ...section,
    padding: "70px 0px"
  },
  logo:{
  width:'150px',
  height:'150px',
  paddingBottom:"20px"
  },
  text:{
   fontSize:"16px",
   fontWeight:"500",
   paddingBottom:"10px"
  },
  invoiceBox:{
    width:'800px'
  },
  title: {
    ...title,
    margin: "10px 0px 25px"
  },
  table: {
    minWidth: 700,
  },
  price:{
    padding:'2px'
  },
  right:{
float:"right"
  },
  access: {
    "&,&:hover,&:focus": {
      color: "inherit",
      textDecoration: "none",
      display: "flex",
    }
  },
  
  productPage: {
    backgroundColor: grayColor[2],
    padding:"20px"
  },
  
  floatRight: {
    float: "right!important"
  },
  pageHeader: {
    minHeight: "60vh",
    maxHeight: "600px",
    height: "auto",
    backgroundPosition: "top center"
  },
  
  pullRight: {
    float: "right"
  },
  
  cardTitle: {
    ...cardTitle,
    textAlign: "center"
  },
  cardDescription: {
    textAlign: "center",
    color: grayColor[0]
  },
 
 
};

export default productStyle;

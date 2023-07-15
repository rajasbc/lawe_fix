import {
  title,
  description,
  coloredShadow,
  cardTitle,
  mrAuto,
  mlAuto
} from '../../../Lawe-react';
import imagesStyles from "../../imagesStyles";

const imgRaised = imagesStyles.imgRaised;
const rounded = imagesStyles.imgRounded;
const imgFluid = imagesStyles.imgFluid;

const shopListStyle:any = {
  title,
  description,
  coloredShadow,
  cardTitle,
  mrAuto,
  mlAuto,
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    
  },
  textCenter: {
    textAlign: "center!important"
  },
  dropdownLink: {
    "&,&:hover,&:focus": {
      color: "inherit",
      textDecoration: "none",
      display: "flex",
    }
  },
  justifyContentCenter: {
    WebkitBoxPack: "center !important",
    MsFlexPack: "center !important",
    justifyContent: "center !important"
  },
  gridList: {
    height: 'auto',
  },
  gridbox:{
   width:'30% !important',
   padding:"17px !important"

  },
  cardCategory: {
    marginTop: "10px",
    "& svg": {
      position: "relative",
      top: "8px"
    }
  },
  cardDescription: {
    ...description
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  office: {
    "& img": {
      margin: "20px 0px"
    }
  },
  imgRaised,
  rounded,
  imgFluid
};

export default shopListStyle;

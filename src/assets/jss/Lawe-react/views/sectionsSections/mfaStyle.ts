import {
  blackColor,
  cardTitle,
  container,
  description,
  hexToRgb,
  mlAuto,
  section,
  sectionDark,
  title,
  whiteColor
} from '../../../Lawe-react';


import customCheckboxRadioSwitch from "../../customCheckboxRadioSwitchStyle";

const mfaStyle:any = {
  ...customCheckboxRadioSwitch,
  container,
  mlAuto,
  title,
  description,
  cardTitle,
  section: {
    display: "flex",
    ...sectionDark,
    ...section,
    position: "relative",
    height: "100vh",
    maxHeight: "1600px",
    backgroundSize: "cover",
    backgroundPosition: "50%",
    "& $container": {
      zIndex: "2",
      position: "relative"
    },
    "&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''",
      backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.7)"
    },
    "& $title": {
      color: whiteColor
    },
    "& $description": {
      color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)"
    },
    "& $infoArea": {}
  },
  contacts: {
    padding: "230px 0"
  },
  pageHeader: {
    position: "relative",
    height: "100vh",
    maxHeight: "1600px",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    WebkitBoxAlign: "center",
    MsFlexAlign: "center",
    alignItems: "center",
    "&:before": {
      background: "rgba(" + hexToRgb(blackColor) + ", 0.5)"
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    }
  },
  infoArea: {
    padding: "0",
    margin: "0",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      color: whiteColor
    },
    "& h4": {
      marginTop: "20px",
      color: whiteColor
    }
  },
  card1: {
    marginTop: "30px",
    "& $cardTitle": {
      marginBottom: "0.75rem !important",
      color: whiteColor
    }
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentBetween: {
    WebkitBoxPack: "justify !important",
    MsFlexPack: "justify !important",
    justifyContent: "space-between !important"
  },
  pullRight: {
    float: "right"
  },
  card2: {
    "@media (min-width: 991px)": {
      margin: "80px 0 80px 150px"
    },
    maxWidth: "560px",
    float: "left",
    "& $cardTitle": {
      marginBottom: "0.75rem !important",
      color: whiteColor
    }
  },
  map: {
    overflow: "hidden",
    width: "100%",
    height: "800px",
    position: "absolute"
  },
  contacts2: {
    padding: "0",
    height: "800px"
  },
  infoArea2: {
    padding: "0",
    margin: "0",
    "& h4": {
      fontSize: "1.0625rem",
      lineHeight: "1.55em"
    }
  }
};

export default mfaStyle;

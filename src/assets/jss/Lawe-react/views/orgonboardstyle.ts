import {
    container,
    title,
    main,
    mainRaised,
    mrAuto,
    whiteColor,
    mlAuto,
    hexToRgb,
  grayColor,
  cardTitle,
  blackColor,
 
  } from '../../Lawe-react'
  import {createStyles, Theme } from '@material-ui/core/styles';
  import customCheckboxRadioSwitchStyle from "../customCheckboxRadioSwitchStyle";
  const orgUsStyle = (theme:Theme) => createStyles({
    main,
    mainRaised,
    mrAuto,
    mlAuto,
    container: {
      ...container,
      zIndex: 1
    },
    title: {
      ...title,
      "&, & + h4": {
        color: whiteColor
      }
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    textCenter: {
      textAlign: "center"
    },
    cardSignup: {
        borderRadius: "6px",
        boxShadow:
          "0 16px 24px 2px rgba(" +
          hexToRgb(blackColor) +
          ", 0.14), 0 6px 30px 5px rgba(" +
          hexToRgb(blackColor) +
          ", 0.12), 0 8px 10px -5px rgba(" +
          hexToRgb(blackColor) +
          ", 0.2);",
        marginBottom: "100px",
        padding: "40px 0px"
      },
      cardTitle: {
        ...cardTitle,
        textDecoration: "none",
        textAlign: "center !important",
        marginBottom: "0.75rem"
      },
      ...customCheckboxRadioSwitchStyle,
      inputAdornment: {
        marginRight: "18px",
        position: "relative"
      },
      inputAdornmentIcon: {
        color: grayColor[13]
      },
      form: {
        margin: "0"
      },
    block: {
      color: "inherit",
      padding: "0.9375rem",
      fontWeight: "500",
      fontSize: "12px",
      textTransform: "uppercase",
      borderRadius: "3px",
      textDecoration: "none",
      position: "relative",
      display: "block"
    },
    inlineBlock: {
      display: "inline-block",
      padding: "0px",
      width: "auto"
    },
    list: {
      marginBottom: "0",
      padding: "0",
      marginTop: "0"
    },
    left: {
      float: "left!important",
      display: "block"
    },
    right: {
      padding: "15px 0",
      margin: "0",
      float: "right"
    },
    icon: {
      width: "18px",
      height: "18px",
      top: "3px",
      position: "relative"
    }
  });
  
  export default orgUsStyle;
  

  
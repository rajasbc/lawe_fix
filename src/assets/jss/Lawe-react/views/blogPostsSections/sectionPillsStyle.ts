import {
  whiteColor,
  hexToRgb,
  mlAuto,
  cardTitle,
  main,
  container,
  title,
  mainRaised,
} from '../../../Lawe-react';

import tooltipsStyle from "../../tooltipsStyle";

const sectionPillsStyle:any = {
  mlAuto,
  main,
  title,
  mainRaised,
  ...tooltipsStyle,
  container: {
    ...container,
    maxWidth: "970px !important"
  },
  info: {
    paddingBottom: "10px",
    paddingTop: 0
  },
  section: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 0"
  },
  contactContent: {
    paddingBottom: "40px",
    paddingTop: "40px"
  },
  textCenter: {
    textAlign: "center"
  },
  category: {
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.7) !important",
    marginTop: "10px"
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor + "  !important"
  },
  icons: {
    width: "1.1rem",
    height: "1.1rem",
    position: "relative",
    display: "inline-block",
    top: "0",
    marginTop: "-1em",
    marginBottom: "-1em",
    marginRight: "4px",
    verticalAlign: "middle"
  },
  tabSpace: {
    padding: "20px 0 50px"
  }
};

export default sectionPillsStyle;

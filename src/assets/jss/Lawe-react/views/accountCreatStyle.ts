import {
  container,
  title,
  main,
  mainRaised,
  cardTitle,
  mlAuto,
  description
} from '../../Lawe-react'
import customCheckboxRadioSwitchStyle from "../customCheckboxRadioSwitchStyle";
const accountCreatStyle:any = {
  main,
  mainRaised,
  title,
  mlAuto,
  description,
  container: {
    ...container,
    maxWidth: "970px !important"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  ...customCheckboxRadioSwitchStyle,
 
};

export default accountCreatStyle;

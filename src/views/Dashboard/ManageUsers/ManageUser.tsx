import {
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";

import React from "react";
import '../ManageCases/ManageCase.scss';
import { UserList } from "./UserList";

interface ManageUsersProps {
  lawyers: any[];
  isLoading: boolean;
  handleScroll:any;
  roles: any,
  updateRole:any,
  addCompanyLawyer:any,
  snackbarsActions: any,
  updateRoleRes: any,
  refreshLawyers: any,
}
export const ManageUser=(props: ManageUsersProps)=>{


const handleScroll = event => {
  props.handleScroll(event);
};

const {lawyers, isLoading,roles} = props;
  return(
      <main className="drawer-content">
          {lawyers?.length > 0 && (
            <div
              className="lawfirm-dashboard-container"
              onScroll={handleScroll}
              style={{ height: "500px", overflow: "auto" }}
            >
              <Grid container>
                <Grid item={true} xs={12}>
                  <UserList
                  lawyers={lawyers}
                  roles={roles}
                  updateRole={props.updateRole}
                  addCompanyLawyer={props.addCompanyLawyer}
                  snackbarsActions = {props.snackbarsActions}
                  updateRoleRes= {props.updateRoleRes}
                  refreshLawyers = {props.refreshLawyers}
                  ></UserList>
                  {isLoading && (
                    <div className="button-loader">
                      <CircularProgress disableShrink />
                    </div>
                  )}
                </Grid>
              </Grid>
            </div>
          )}
          {lawyers?.length === 0 && (
            <Box
              className="no-result-fount"
              alignItems="center"
              display="flex"
            >
              <Box>
                <FindReplaceSharpIcon />
              </Box>
              <Box>
                <Typography gutterBottom variant="h5" component="h2">
                  No results found
                </Typography>
              </Box>
            </Box>
          )}
        </main>
  )
};
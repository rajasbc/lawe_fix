import {
    Box,
    Grid,
    Typography,
    CircularProgress,
  } from "@material-ui/core";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import { CaseList } from "./CaseList";
import React from "react";
import './ManageCase.scss';

interface ManageCasesProps {
    caseList: any[];
    isLoading: boolean;
    lawyers:any[];
    handleCaseNavigation:any;
    viewCaseFile:any;
    reAssignLawyer:any;
    handleScroll:any;
}
export const ManageCase=(props: ManageCasesProps)=>{

  const handleScroll = event => {
    props.handleScroll(event);
  };

  const {caseList, isLoading, lawyers} = props;
    return(
        <main className="drawer-content">
            {caseList?.length > 0 && (
              <div
                className="lawfirm-dashboard-container"
                onScroll={handleScroll}
                style={{ height: "500px", overflow: "auto" }}
              >
                <Grid container>
                  <Grid item={true} xs={12}>
                    <CaseList
                      caseList={caseList}
                      lawyers={lawyers}
                      handleCaseNavigation={props.handleCaseNavigation}
                      viewCaseFile = {props.viewCaseFile}
                      reAssignLawyer = {props.reAssignLawyer}
                    />
                    {isLoading && (
                      <div className="button-loader">
                        <CircularProgress disableShrink />
                      </div>
                    )}
                  </Grid>
                </Grid>
              </div>
            )}
            {caseList?.length === 0 && (
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
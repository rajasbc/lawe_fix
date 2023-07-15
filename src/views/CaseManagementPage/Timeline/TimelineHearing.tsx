import React from "react";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { forOwn, get, isEmpty } from "lodash";
import { STAGES } from "../../../assets/constant/stage";

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: "red",
    width: "150px",
    borderRadius: "25px",
    padding: "5px",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  timeLineContent: {
    marginTop: "30px",
    marginBottom: "30px",
  },

}));
export function TimelineHearing(props) {
    const classes = useStyles();
    let hearings = props.data?.casehearingslist?.casehearingdetails;
    let monthname1 = null;
    let monthname = null;
    let arr = [];
    const stageList = [];
    if (!isEmpty(props.data.caseManagement.stage[0])) {
        const { stage: propsStage } = props.data.caseManagement;
        const [stage] = propsStage;
        forOwn(stage, (value, key) => {
            if (key.includes("phasePayment_")) {
                if (Number(value) > 0) {
                    stageList.push({
                        name: STAGES[Number(key.slice(-1)) - 1],
                        key: key.slice(-1),
                        checked: true,
                        amount: value,
                        status: stage[`phaseStatus_${key.slice(-1)}`],
                        date: stage[`phaseStatus_${key.slice(-1)}_date`],
                        completedDate: stage[`phaseStatus_${key.slice(-1)}_completeddate`]
                    });
                }
            }
        });
    }
    {
        stageList?.map((item) => {
            let statusName;
            if (item.status === 1 || item.status === 2) {
                statusName = "Started"
                let dummy = {
                    "samptxt": `${item.name} ${statusName}`,
                    "date": item.date,
                }
                arr.push(dummy)
            }
            else if (item.status === 3) {
                statusName = "Started"
                let dummy = {
                    "samptxt": `${item.name} ${statusName}`,
                    "date": item.date,
                }
                arr.push(dummy)
                let statusName1 = "Completed"
                let dummy1 = {
                    "samptxt": `${item.name} ${statusName1}`,
                    "date": item.completedDate,
                }
                arr.push(dummy1)
            }

        })
    }
    {
        hearings?.map((item) => {
            let dummy = {
                "id": item.id,
                "date": item.date,
                "purpose": item.purpose,
            }
            arr.push(dummy)
        })
    }
    const phaseNamespace = props.data?.caseManagement?.stage[0];
    let lawyerdate = new Date(phaseNamespace?.lawyer_proposed_date)
    let clientdate = new Date(phaseNamespace?.client_accepted_date)
    let startdate = new Date(phaseNamespace?.created)

    let clientaccept = {
        "samptxt": "Client Stage Acceptance",
        "date": clientdate
    }
    let lawyeraccept = {
        "samptxt": "Lawyer Case Acceptance",
        "date": lawyerdate
    }
    let caseInitiate = {
        "samptxt": "Case Initiation",
        "date": startdate
    }
    arr.push(clientaccept)
    arr.push(lawyeraccept)
    arr.push(caseInitiate)

    let sortedarr = arr.sort((a:any, b:any) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return bDate.getTime() - aDate.getTime();
    })
    let printText = false;
    let lastElement = false;
    return (
        <div className={classes.timeLineContent}>
            <Timeline>
                {sortedarr.map((item,i,{length}) => {
                    printText=false;
                    if(i + 1 === length){ //last element
                        printText = true;
                        lastElement = true;
                    }
                    let date = new Date(item.date)
                    monthname1 = monthname;
                    monthname = date.toLocaleString('default', { month: 'long' });
                    if(monthname1 != null && monthname1 != monthname){
                        printText = true;
                    }
                    let year = date.getFullYear();
                    let datenum = date.getUTCDate();
                    let day = date.toLocaleDateString('en-US', { weekday: 'short' });
                    return (
                        <div>
                            {printText && !lastElement &&
                                <TimelineItem>
                                  <TimelineSeparator>
                                        <TimelineDot style={{ backgroundColor: "#292734" }} />
                                        {!lastElement &&  <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent >
                                        <div className={classes.content} style={{ backgroundColor: "#FFC602", color: "#292734" }}>
                                            {monthname} {year}
                                        </div>
                                    </TimelineContent>
                                </TimelineItem>
                            }
                            
                            {item.id &&
                                <div>
                                    <TimelineItem>
                                        <TimelineOppositeContent>
                                            <div style={{ fontWeight: "bold", fontSize: "20px" }}>{datenum}</div>
                                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>{day}</div>
                                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>{year}</div>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot style={{ backgroundColor: "#ed8311" }} />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <div style={{ fontWeight: "bold", fontSize: "17px" }}>Hearing</div>
                                            <div style={{ color: "grey" }}>Purpose : {item.purpose}</div>
                                            {/* <div style={{ color: "grey" }}> Judge(s) : </div> */}
                                        </TimelineContent>
                                    </TimelineItem>
                                </div>
                            }
                            {item.samptxt &&
                                <div>
                                    <TimelineItem>
                                        <TimelineOppositeContent>
                                            <Typography color="initial">{datenum} - {day}</Typography>
                                            <Typography color="initial">{monthname} - {year}</Typography>                                      
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot color="grey" />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <div style={{ fontWeight: "bold", fontSize: "17px" }}>{item.samptxt}</div>
                                        </TimelineContent>
                                    </TimelineItem>
                                </div>
                            }
                             {printText && lastElement &&
                                <TimelineItem>
                                  <TimelineSeparator>
                                        <TimelineDot style={{ backgroundColor: "#292734" }} />
                                        {!lastElement &&  <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent >
                                        <div className={classes.content} style={{ backgroundColor: "#FFC602", color: "#292734" }}>
                                            {monthname} {year}
                                        </div>
                                    </TimelineContent>
                                </TimelineItem>
                            }

                        </div>
                    )
                })}
            </Timeline>
        </div>
    );
}

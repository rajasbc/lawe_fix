import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Button,
  makeStyles,
  Paper,
  TextField,
  MenuItem,
  MenuList,
  Popper,
  Grow,
  ClickAwayListener,
  Grid,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import FileViewer from 'react-file-viewer';
import ResponsiveDialog from "../../../components/ClouserDialog/ClouserDialog";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import { filter, isEqual } from "lodash";
import FolderIcon from "@material-ui/icons/Folder";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import moment from "moment";
import "./DocumentUpload.scss"

const maxFileSize = 10485760;

export enum Lawyer_Role_constant {
  
  LAW_FIRM_ADMIN = 1,
  CLIENT_FIRM_ADMIN = 2,
  SENIOR_MOST_LAWYER = 3,
  SENIOR_LAWYER = 4,
  LAWYER = 5,
  JUNIOR_LAWYER = 6,
  INDIVIDUAL = 7,
  PLATFORM_ADMIN = 8,
  SME = 9,
  JUDGE = 10,  
  
}

export enum Case_Folders_constant {
  
  WITNESS = 1,
  LAW_NOTES = 2,
  CASE_FILES = 3,
  VICTIM = 4,
  PRIVATE_FOLDER = 5,
  AUDIO = 6,
  VIDEO = 7,
  DOCUMENTS = 8,
  JUDGEMENT = 9,
  
}


const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    margin: "1rem 1rem",
    minHeight: "250px",
    padding: "1rem",
  },
  dropZone: {},
  previewContainer: {
    margin: "0px",
    width: "100%!important",
  },
  preview: {
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 50%)",
    borderRadius: "4px",
    padding: "0rem!important",
    textAlign: "start",
    display: "flex",
    margin: "2rem",
    "& img": {
      marginRight: "1rem",
    },
  },
  btnContainer: {
    paddingBottom: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: "2rem",
  },
  addBtn: {
    height: "40px",
    fontSize: "0.975rem",
    textTransform: "none",
    color: "#FFC602",
    backgroundColor: "#292734",
    "&:hover": {
      color: "#FFC602",
      backgroundColor: "#292734",
    },
    span: {
      color: "#FFC602",
    },
  },
  container: {},
  item: {
    textAlign: "center",
  },
  text: {
    fontSize: "1rem",
    fontWeight: 300,
    "& svg": {
      width: "100%",
    },
  },
  fileItem: {
    marginBottom: "1rem",
  },
  fileBox: {
    display: "flex",
    marginLeft: "1rem",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.5)",
    borderRadius: "4px",
    minHeight: "50px",
    padding: "1rem",
  },
  imgIcon: {
    display: "block",
  },
  imgBox: {
    alignItems: "center",
  },
  deleteIcon: {
    marginLeft: "auto",
  },
  img: {
    display: "none",
  },
  resultNotFound: {
    margin: "2rem",
    "& h2": {
      fontSize: "1rem",
    },
  },
  breadcrumb: {
    paddingTop: "1rem",
    paddingLeft: "2rem",
    cursor: "default",
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  nested: {
    paddingLeft: "4rem",
  },
}));

interface Props {
  caseDocuments: any;
  CaseManagementActions: any;
  changeParentFolder: any;
  parentId: number;
  isClient: boolean;
  userInfo: any;
  deleteCaseFile: any;
  userName: any;
  setFileType: any;
  status: string;
  caseManagement: any;
}

export const DocumentContainer = (props: Props) => {
  const classes = useStyles();
  const [folder, setFolder] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(0);
  const urls = props?.caseDocuments?.caesFile?.link;

  const handleClick = (event, id, folderName) => {
    setFolder(folderName);
    props.changeParentFolder(id, folderName);
  };
  const deleteCaseFile = (event, s3Key, id) => {
    props.deleteCaseFile(s3Key, id);
  };
  const viewCaseFile = (fileInfo) => {
    const { filePath, caseId, id } = fileInfo;
    //  props.setFileType("view");
    const check = props.CaseManagementActions.getCaseFile({
      caseId,
      fileName: filePath
   });
   setView(id);
  }

  const onError = e => {
    console.log(e, "error in file-viewer");
  };

  const downloadCaseFile = async(fileInfo) => {
    const { filePath, caseId } = fileInfo;
    props.setFileType("download");
    props.CaseManagementActions.getCaseFile({
      caseId,
      fileName: filePath
    });

  }

  return (
    <div>
    <Paper className={classes.paper}>
      {props.caseDocuments &&
        (props.caseDocuments.folder.length > 0 ||
          props.caseDocuments.files.length > 0) && (
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Folders
              </ListSubheader>
            }
          >
            {filter(props.caseDocuments.folder, {
              parentId: props.parentId,
            }).map((folder) => {
              if (props.isClient && (folder.folderName == "Private Folder" || folder.folderName == "Law Notes")) {
                return ""
              }
              else if (!props.isClient && props.status=="reassign_pending" &&(folder.folderName == "Private Folder" || folder.folderName == "Law Notes")) {
                return ""
              } else if (!props.isClient && (folder.folderName == "Victim" || folder.folderName == "Law Notes")) {
                return ""
              }
              else {
                return (
                  <Fragment>
                    <ListItem
                      button
                      onClick={(eve) => {
                        handleClick(eve, folder["id"], folder["folderName"]);
                      }}
                    >
                      <ListItemIcon><FolderIcon /></ListItemIcon>
                      {folder.folderName == "Victim" && props.isClient ? <ListItemText primary={`${props.userName}'s Personal Folder`} /> : <ListItemText primary={folder.folderName} />}
                    </ListItem>
                    {filter(props.caseDocuments.folder, {
                      parentId: folder.id,
                    }).map((sub) => {
                      return (
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            className={classes.nested}
                            onClick={(eve) => {
                              handleClick(
                                eve,
                                folder["id"],
                                folder["folderName"]
                              );
                              handleClick(eve, sub["id"], sub["folderName"]);
                            }}
                          >
                            <ListItemIcon>
                              <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary={sub.folderName} />
                          </ListItem>
                        </List>
                      );
                    })}
                  </Fragment>
                )
              }
            })}
          </List>
        )}
      {props.parentId != 0 && (
        <Typography gutterBottom variant="h5" component="h2">
          Files
        </Typography>
      )}
      {props.parentId != 0 && props.caseDocuments?.files.length == 0 && (
        <Box className={classes.resultNotFound} display="flex">
          <Box>
            <FindReplaceSharpIcon />
          </Box>
          <Box>
            <Typography gutterBottom variant="h5" component="h2">
              No Files Found
            </Typography>
          </Box>
        </Box>
      )}
      <Grid container alignItems="center" justify="flex-start" className="cssfile">
 {props.parentId != 0 &&
          props.caseDocuments?.files?.map((f) => {
            return (
              <Grid item xl = {3}className={classes.fileItem} key={f.id}>
                <div className={classes.fileBox}>
                  {/* <div className={classes.imgBox} onClick={() => viewCaseFile(f)}>
                    <ImageIcon className={classes.imgIcon} style={{ cursor: "pointer" }} />
                  </div> */}
                  <img className={classes.img} />
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    className={classes.text}
                    onClick={() => viewCaseFile(f)}
                    style={{ cursor: "pointer" }}
                  >
                    {f.fileName}
                  </Typography>
                  <div className={classes.deleteIcon} onClick={(eve) => {
                    deleteCaseFile(eve, f.filePath, f.id);
                  }}>
                    <DeleteIcon style={{ cursor: "pointer" }} />
                  </div>
                  <div className={classes.deleteIcon} onClick={(eve) => {
                    downloadCaseFile(f);
                  }}>
                    <DownloadIcon style={{ color:"black", cursor: "pointer" }}/>
                  </div>

                </div>
              </Grid>
            );
          })}
      </Grid>
      
    </Paper>
      <div style={{ height: '100%' }}>
        {props.caseDocuments?.files?.map((f:any) => {
          return (
            <div>
              {view == f.id ? (
                <FileViewer
                  fileType={f.fileName.split(".")[1]}
                  filePath={'https://lawedb.s3.ap-south-1.amazonaws.com/' + f.filePath}
                  onError={onError}
                />
              ) : (<div></div>)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DocumentUpload = (props: any) => {
  const classes = useStyles();
  // const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isValidFolderName, setIsValidFolderName] = useState(true);
  const [folderName, setFolderName] = useState("casefiles");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const uploadInputRef = useRef(null);
  const [parentFolder, setParentFolder] = useState(0);
  //const [createFolderResponse, setCreateFolderResponse] = useState({});
  const [uploadFileResponse, setUploadFileResponse] = useState({});
  const [deleteFileResponse, setDeleteFileResponse] = useState({});
  const [uploadParentId, setUploadParentId] = useState(0);
  const [folderFlow, setFolderFlow] = useState([
    {
      id: 0,
      name: "Home",
    },
  ]);
  const [isSelectFolder, setIsSelectFolder] = useState(false);
  const [selectedFolder, setselectedFolder] = useState("");
  const [mainFolders, setMainFolders] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [status,setStatus] = useState();
  const urls = props.caseManagement?.caesFile?.link;
 
  useEffect(() => {
    const { selectedCaseInfo } = props.caseManagement;
    refreshList(selectedCaseInfo.caseId, parentFolder);
    const isClient = (props.userInfo["status"] == "individual" || props.userInfo["status"] == "clientfirm") ? true : false;
    setIsClient(isClient);
    setStatus(selectedCaseInfo?.status);
  }, []);

  const refreshList = (caseId: number, parentId: number) => {
    
    let roleId = props?.userInfo?.role?.id;
    if ( roleId == Lawyer_Role_constant.CLIENT_FIRM_ADMIN ||
         roleId == Lawyer_Role_constant.LAW_FIRM_ADMIN ||
         roleId == Lawyer_Role_constant.PLATFORM_ADMIN) {

        props.CaseManagementActions.getCaseDocuments({caseId: caseId, parentId: parentId});
    } else {
        props.CaseManagementActions.getCaseDocuments({caseId: caseId, parentId: parentId, fileUploadedBy: props?.userInfo?.id});
    }
    
  };

  useEffect(() => {
    // if (
    //   props.caseManagement?.caseFolderResponse &&
    //   !isEqual(createFolderResponse, props.caseManagement?.caseFolderResponse)
    // ) {
    //   const { selectedCaseInfo } = props.caseManagement;
    //   refreshList(selectedCaseInfo.caseId, parentFolder);
    //   setCreateFolderResponse(props.caseManagement?.caseFolderResponse);
    // }

     if (
      props.caseManagement?.caseFileResponse &&
      !isEqual(uploadFileResponse, props.caseManagement?.caseFileResponse)
    ) {
      const { selectedCaseInfo } = props.caseManagement;
      refreshList(selectedCaseInfo.caseId, parentFolder);
      setUploadFileResponse(props.caseManagement?.caseFileResponse);
    }

    if (parentFolder == 0 && props.caseManagement.caseDocuments) {
      setMainFolders([...props.caseManagement.caseDocuments.folder]);
    }

    // if (props.caseManagement.deleteFileRes && !isEqual(deleteFileResponse, props.caseManagement.deleteFileRes)) {
      if (!isEqual(deleteFileResponse, props.caseManagement.deleteFileRes)) {
      const { selectedCaseInfo } = props.caseManagement;
      refreshList(selectedCaseInfo.caseId, parentFolder);
      setDeleteFileResponse(props.caseManagement?.deleteFileRes);
    }
  }, [props.caseManagement]);

  useEffect(() => {
    const { selectedCaseInfo } = props.caseManagement;
    refreshList(selectedCaseInfo.caseId, parentFolder);
  }, [parentFolder]);


  const changeParentFolder = (folderId, folderName) => {
    const p = {
      id: folderId,
      name: folderName,
    };
    setFolderFlow((pre) => {
      return [...pre, p];
    });

    setParentFolder(folderId);
  };

  const deleteCaseFile = (s3Key: string, id: number) => {

    const { selectedCaseInfo } = props.caseManagement;
    props.CaseManagementActions.deleteCaseFile({
      s3Key,
      caseId: selectedCaseInfo.caseId,
      id
    });

  };

  const handleChange = (event) => {
    let folderS = "";
    let m = moment(new Date());
    let date = m.utc().format();
    const { selectedCaseInfo } = props.caseManagement;
    setUploadFileResponse({});
    const userId = props.userInfo.id;
    const folderName = `${selectedFolder}`.toLowerCase();
    const folder = `casepublic/${selectedCaseInfo.caseId}/${selectedFolder}`;
    Object.values(event.target.files).map((file:any) => {
      if (file?.["size"] > maxFileSize) {
        props.snackbarsActions.showErrorSnackbarAction(`Please upload a file smaller than 10 MB`)
      }else if(folderName.includes("audio") && !file?.["type"].includes("audio")){
        props.snackbarsActions.showErrorSnackbarAction(`Please upload a audio file Only`)

      }else if(folderName.includes("video") && !file?.["type"].includes("video")){
        props.snackbarsActions.showErrorSnackbarAction(`Please upload a video file Only`)

      } else if(folderName.includes("document") && !file?.["type"].includes("application")){
        props.snackbarsActions.showErrorSnackbarAction(`Please upload a documents file Only`)

      }else if(folderName.includes("victim") && props?.userInfo?.role?.roleType?.includes("Lawyer")){
        props.snackbarsActions.showErrorSnackbarAction(`Lawyer cant't upload any file in Victim Folder`)
      }else {
        const formData = new FormData();
        formData.append("file", file);
        props.CaseManagementActions.saveCaseFile({
          formData: formData,
          type: "case",
          contenttype: file.type,
          caseId: selectedCaseInfo.caseId,
          folder: folder,
          folderId: uploadParentId,
          uploadedBy: isClient ? 0 : 1,
          userId: userId,
        });
      }

    });
    if(props.userInfo.status==="lawyer"){
      let notidata = {
        notification: `Lawyer has uploaded a file for Case: ${props.caseManagement.selectedCaseInfo.title}.`,
        created: date,
        caseId: selectedCaseInfo.caseId,
        fromId: selectedCaseInfo.lawyerId,
        fromName: selectedCaseInfo.lawyerName,
        toId: selectedCaseInfo.clientId ,
        toName: selectedCaseInfo.clientName,
        type:props.userInfo.status,
        }
      props.CaseManagementActions.sendNotification(notidata)
    }
    if(props.userInfo.status==="individual"){
      let notidata = {
        notification: `Client has uploaded a file for Case: ${props.caseManagement.selectedCaseInfo.title}.`,
        created: date,
        caseId: selectedCaseInfo.caseId,
        toId: selectedCaseInfo.lawyerId,
        toName: selectedCaseInfo.lawyerName,
        fromId: selectedCaseInfo.clientId ,
        fromName: selectedCaseInfo.clientName,
        type:props.userInfo.status,
        }
      props.CaseManagementActions.sendNotification(notidata)
    }
  };
  const handleClick = (event) => {
    event.target.value = null;
  };

  const handleSuccessStageClose = () => {
    //   if (!folderName) {
    //     setIsValidFolderName(false);
    //   }
    //   const { selectedCaseInfo } = props.caseManagement;
    //   const data = {
    //     lawyerName: selectedCaseInfo.lawyerName,
    //     lawyerId: selectedCaseInfo.lawyerId,
    //     caseId: selectedCaseInfo.caseId,
    //     parentId: parentFolder,
    //     folderName: folderName,
    //     created: new Date().toISOString(),
    //   };
    //  // setCreateFolderResponse({});
    //   props.CaseManagementActions.saveCaseFolder(data);

    // setIsCreateFolderOpen(false);
    setIsSelectFolder(false);
  };

  const handleCancelStageClose = () => {
    //setIsCreateFolderOpen(false);
    setIsSelectFolder(false);
  };

  const handleCloseDialog = () => {
    //setIsCreateFolderOpen(false);
    setIsSelectFolder(false);
  };

  // const handleNameChange = (event) => {
  //   setFolderName(event.target.value);
  //   setIsValidFolderName(true);
  // };
  const handleToggle = () => {
    setIsSelectFolder(true);
    //setOpen((prevOpen) => !prevOpen);
  };

  // const handleCreateFolder = (event) => {
  //   // handleClose(event);
  //   setIsCreateFolderOpen(open);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // function handleListKeyDown(event) {
  //   if (event.key === "Tab") {
  //     event.preventDefault();
  //     setOpen(false);
  //   }
  // }
  const handleMenuClick = (event, id) => {
    setParentFolder(id);
    const index = folderFlow
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    for (let i = index + 1; i < folderFlow.length; i++) {
      folderFlow.splice(i, 1);
    }
  };
  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }
  //   prevOpen.current = open;
  // }, [open]);

  const handleFolderClick = (event, folderName, folderId) => {
    let format = "";
    setselectedFolder(folderName);
    setUploadParentId(folderId);
    if (folderName.includes("Audio")) {
      format = "audio/*";
    } else if (folderName.includes("Video")) {
      format = "video/*";
    } else {
      format =
        "image/jpeg,image/png,.jpeg,.jpg,.png,.xls,.xlsx,.doc,.docx,.txt,.pdf";
    }
    setIsSelectFolder(false);
    uploadInputRef.current.accept = format;
    uploadInputRef.current.click();
  };

  return (
    <div className={classes.root}>
      {/* {selectedFolder.includes("Audio") &&
        <input
        ref={uploadInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
        onClick={handleClick}
        multiple={true}
        accept={acceptedFormat}
      />
      } */}
      <input
        ref={uploadInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
        onClick={handleClick}
        multiple={true}
      />
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        {folderFlow.map((value) => {
          if (value["name"] == "Home") {
            return (
              <Link
                color="inherit"
                onClick={(eve) => {
                  handleMenuClick(eve, value["id"]);
                }}
                className={classes.link}
                key={value["id"]}
              >
                Documents
              </Link>
            );
          } else {
            return (
              <Link
                color="inherit"
                onClick={(eve) => {
                  handleMenuClick(eve, value["id"]);
                }}
                className={classes.link}
                key={value["id"]}
              >
                {value["name"]}
              </Link>
            );
          }
        })}
      </Breadcrumbs>
      {/* <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem value="createfolder" onClick={handleCreateFolder}>
                      <CreateNewFolderIcon /> Create Folder
                    </MenuItem>
                    <MenuItem value="uploadfile" onClick={handleUploadFile}>
                      <CloudUploadIcon /> Upload File
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper> */}
      <DocumentContainer
        CaseManagementActions={props.CaseManagementActions}
        caseDocuments={props.caseManagement.caseDocuments}
        changeParentFolder={changeParentFolder}
        parentId={parentFolder}
        isClient={isClient}
        userInfo={props.userInfo}
        deleteCaseFile={deleteCaseFile}
        userName={props.userName}
        setFileType={props.setFileType}
        status={status} caseManagement={undefined}      ></DocumentContainer>
        {(status != "reassign_pending" && ( props?.caseManagement?.caseDocuments?.folder[3]?.folderName == "Victim" && 
        (props?.userInfo?.role?.roleType?.includes("Lawyer") || props?.userInfo?.role?.roleType?.includes("Client"))) &&
        <div className={classes.btnContainer}>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.addBtn}
        >
          Upload File 
        </Button>
      </div>
      )}
      
      <ResponsiveDialog
        title="Select Folder To Upload"
        content={""}
        isOpen={isSelectFolder}
        handleClose={handleCloseDialog}
        handleOk={handleSuccessStageClose}
        handleCancel={handleCancelStageClose}
        formContent={
          <Paper >
            {mainFolders &&
              mainFolders.filter( (roleFilter) => {

                if (roleFilter?.parentId == 0 && props.userInfo.status !== "individual" &&                     
                    roleFilter.id !== Case_Folders_constant.VICTIM) {
                      return roleFilter

                } else if ( roleFilter?.parentId == 0 &&
                  props.userInfo.status == "individual" &&
                  roleFilter.id !== Case_Folders_constant.PRIVATE_FOLDER) {
                    return roleFilter
                }               
                
              }).map((folder) => {
                return (
                  <Fragment>
                    <ListItem
                      button
                      onClick={(eve) => {
                        handleFolderClick(
                          eve,
                          `${folder.folderName}`,
                          folder.id
                        );
                      }}
                    >
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText primary={folder.folderName} />
                    </ListItem>
                    {filter(mainFolders, { parentId: folder.id }).map((sub) => {
                      return (
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            // className={classes.nested}
                            onClick={(eve) => {
                              handleFolderClick(
                                eve,
                                `${folder.folderName}/${sub.folderName}`,
                                sub.id
                              );
                            }}
                          >
                            <ListItemIcon>
                              <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary={sub.folderName} />
                          </ListItem>
                        </List>
                      );
                    })}
                  </Fragment>
                );
              })}
          </Paper>
        }
      />
    </div>
  );
};



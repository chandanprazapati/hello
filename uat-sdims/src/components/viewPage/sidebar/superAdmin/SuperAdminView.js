import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dash from "../superAdmin/data/Dashboard";
import common from "./data/Common";
import revenue from "../superAdmin/data/Revenue";
import planning from "../superAdmin/data/Planning";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import employee from "../superAdmin/data/Employee";
import pis from "../superAdmin/data/PIS";
import pds from "../superAdmin/data/PDS";
import attendance from "../superAdmin/data/attendance";
import identityProof from "../superAdmin/data/IdentityProof";
import ghaBarga from "../superAdmin/data/GhaBarga";
import legalCase from "../superAdmin/data/LegalCase";
import logOut from "../superAdmin/data/Logout";
import sifarish from "../superAdmin/data/Sifarish";
import disaster from "../superAdmin/data/Disaster";
import gharNaksa from "../superAdmin/data/GharNaksa";
import agantuk from "../superAdmin/data/Agantuk";
import agriculture from "../superAdmin/data/Agriculture";
import { logout } from "../../../../redux/userDetail";
import complaint from "../superAdmin/data/Complaint";
import medical from "../superAdmin/data/Medical";
import school from "../superAdmin/data/School";
import wadaProfile from "../superAdmin/data/WadaProfile";
import digitalProfile from "../superAdmin/data/DigitalProfile";
import archival from "../superAdmin/data/Archival";
import getApp from "../superAdmin/data/GetApp";
import eventManagement from "../superAdmin/data/EventManagement";
import suchanaPati from "../superAdmin/data/SuchanaPati";
import jobPortal from "../superAdmin/data/JobPortal";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Collapse,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import smsManagement from "./data/SmsManagement";
import nagarpalikaCalendar from "./data/NagarpalikaCalendar";
import { office } from "@/services/apiServices/common/office/officeService";
import { SiCircle } from "react-icons/si";

const drawerWidth = 240;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function SuperAdminView(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userData = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  // for munu right
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // For common
  const [openCommon, setOpenCommon] = React.useState(false);
  const [openCommon2, setOpenCommon2] = React.useState(false);
  const [openCommon3, setOpenCommon3] = React.useState(false);
  const [openCommon4, setOpenCommon4] = React.useState(false);

  // For Sifarish
  const [openSifarish, setOpenSifarish] = React.useState(false);

  // for PDS
  const [openPDS, setOpenPDS] = React.useState(false);

  // for legal case
  const [openLegal, setOpenLegal] = React.useState(false);
  const [openLegal2, setOpenLegal2] = React.useState(false);
  const [openLegal3, setOpenLegal3] = React.useState(false);
  const [openLegal4, setOpenLegal4] = React.useState(false);
  const [openLegal5, setOpenLegal5] = React.useState(false);

  // For Attendance
  // const [openAttendance, setOpenAttendance] = React.useState(false);

  // for ghabarga
  const [openGhabarga, setOpenGhabarga] = React.useState(false);

  // for identity proof
  const [openIdentity, setOpenIdentity] = React.useState(false);

  // For Employee
  const [openEmployee, setOpenEmployee] = React.useState(false);
  const [openEmployee2, setOpenEmployee2] = React.useState(false);

  // For planning
  const [openPlanning, setOpenPlanning] = React.useState(false);
  const [openPlanning2, setOpenPlanning2] = React.useState(false);
  const [openPlanning3, setOpenPlanning3] = React.useState(false);
  const [openPlanning4, setOpenPlanning4] = React.useState(false);

  // For Revenue
  const [openRevenue, setOpenRevenue] = React.useState(false);
  const [openRevenue2, setOpenRevenue2] = React.useState(false);

  // For Pis
  const [openPis, setOpenPis] = React.useState(false);
  const [openPis2, setOpenPis2] = React.useState(false);
  const [openPis3, setOpenPis3] = React.useState(false);
  const [openPis4, setOpenPis4] = React.useState(false);

  // For Attendance
  const [openAttendance, setOpenAttendance] = React.useState(false);

  // for Complaint
  const [openComplaint, setOpenComplaint] = React.useState(false);

  // for visitor
  const [openVisitor, setOpenVisitor] = React.useState(false);
  const [openVisitor2, setOpenVisitor2] = React.useState(false);
  const [openVisitor3, setOpenVisitor3] = React.useState(false);

  // for ghar naksa
  const [openGharNaksa, setOpenGharNaksa] = React.useState(false);
  const [openGharNaksa2, setOpenGharNaksa2] = React.useState(false);
  const [openGharNaksa3, setOpenGharNaksa3] = React.useState(false);

  // for sms
  const [openSms, setOpenSms] = React.useState(false);

  // for agriculture
  const [openAgriculture, setOpenAgriculture] = React.useState(false);
  const [openAgriculture2, setOpenAgriculture2] = React.useState(false);
  const [openAgriculture3, setOpenAgriculture3] = React.useState(false);
  const [openAgriculture4, setOpenAgriculture4] = React.useState(false);

  // for medical
  const [openMedical, setOpenMedical] = React.useState(false);
  const [openMedical2, setOpenMedical2] = React.useState(false);
  const [openMedical3, setOpenMedical3] = React.useState(false);
  const [openMedical4, setOpenMedical4] = React.useState(false);

  // for school
  const [openSchool, setOpenSchool] = React.useState(false);
  const [openSchool2, setOpenSchool2] = React.useState(false);
  const [openSchool3, setOpenSchool3] = React.useState(false);
  const [openSchool4, setOpenSchool4] = React.useState(false);

  // for wadProfile
  const [openWadaProfile, setOpenWadaProfile] = React.useState(false);

  // for digital Profile
  const [openDigitalProfile, setOpenDigitalProfile] = React.useState(false);
  const [openDigitalProfile2, setOpenDigitalProfile2] = React.useState(false);
  const [openDigitalProfile3, setOpenDigitalProfile3] = React.useState(false);
  const [openDigitalProfile4, setOpenDigitalProfile4] = React.useState(false);

  // for archival
  const [openArchival, setOpenArchival] = React.useState(false);

  // for Disaster
  const [openDisaster, setOpenDisaster] = React.useState(false);
  const [openDisaster2, setOpenDisaster2] = React.useState(false);

  // for jobPortal
  const [openJobPortal, setOpenJobPortal] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    dispatch(logout());

    router.push("/auth/login");
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const drawer = (
  //   <div>
  //     <Toolbar />
  //     <Divider />
  //     <List>
  //       {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {["All mail", "Trash", "Spam"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </div>
  // );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // to set the office data
  const [apiDataOffice, setApiDataOffice] = useState([]);

  useEffect(() => {
    const fetchedData = () => {
      office().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiDataOffice(data);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiDataOffice]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="bg-[#3c88b48e] flex justify-between py-1">
          <div className="flex justify-between gap-2  ">
            <div>
              <Image
                src="https://res.cloudinary.com/dg1opyudu/image/upload/v1684823308/Nepali-flag_5_l2xqfg.gif"
                height={50}
                width={50}
                alt="nagarpalika logo"
              />
            </div>
            <div className="text-xl font-extrabold pt-6 ">
              {apiDataOffice?.map((items, index) => {
                return <div key={index}>{items?.palikaName}</div>;
              })}
            </div>
          </div>

          <Typography variant="h6" noWrap component="div">
            <div className="flex gap-4 justify-end ">
              <div className="text-lg font-bold group ">
                {" "}
                Welcome {userData?.user?.data?.name} !!!
              </div>
              <div>
                <Tooltip title="Open Settings" placement="top">
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        className="group cursor-pointer "
                        alt="Remy Sharp"
                        src="https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg="
                      />
                    </IconButton>
                  </StyledBadge>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {menuCardTitle.map((item, index) => {
                    return (
                      <MenuItem key={index}>
                        <Link href={item.href}>
                          <Typography textAlign="center">
                            {item.title}
                          </Typography>
                        </Link>
                      </MenuItem>
                    );
                  })} */}

                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {/* <DrawerHeader className="bg-[#2a2e308e]">
            <div className="text-xl  font-bold pr-2 ">
              
एकीकृत व्यवस्थापन प्रणाली
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon className="text-white text-2xl " />
              ) : (
                <ChevronLeftIcon className="text-white" />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider /> */}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerHeader className="bg-[#1b71aafd]">
            <div className="text-xl  font-bold pr-2 text-white ">
              एकीकृत व्यवस्थापन प्रणाली
            </div>
          </DrawerHeader>
          <Divider />

          {/* dashboard */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {dash.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname === contentData.link ? "text-white" : ""
                      } `}
                    />
                  </ListItemButton>
                </>
              );
            })}
          </List>
          <Divider />

          {/* common */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {common.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenCommon(!openCommon);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pis"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openCommon ? (
                          <div onClick={() => setOpenCommon(!openCommon)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenCommon(!openCommon)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse
                    in={openCommon}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenCommon2(!openCommon2);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openCommon2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenCommon2(!openCommon2)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenCommon2(!openCommon2)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openCommon2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                  <Collapse
                    in={openCommon}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenCommon3(!openCommon3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openCommon2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenCommon3(!openCommon3)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenCommon3(!openCommon3)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openCommon3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                  <Collapse
                    in={openCommon}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle3?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenCommon4(!openCommon4);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openCommon3 ? (
                                    <div
                                      onClick={() =>
                                        setOpenCommon4(!openCommon4)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenCommon4(!openCommon4)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openCommon4}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* employee */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {employee.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl  "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => setOpenEmployee(!openEmployee)}
                      className={`${
                        router.pathname.split("/")[1] === "employee"
                          ? "text-white"
                          : ""
                      }`}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openEmployee ? (
                          <div onClick={() => setOpenEmployee(!openEmployee)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenEmployee(!openEmployee)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse
                    in={openEmployee}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenEmployee2(!openEmployee2);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openEmployee2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenEmployee2(!openEmployee2)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenEmployee2(!openEmployee2)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openEmployee2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* pis */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {pis.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenPis(!openPis);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pis"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openPis ? (
                          <div onClick={() => setOpenPis(!openPis)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenPis(!openPis)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse
                    in={openPis}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenPis2(!openPis2);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openPis2 ? (
                                    <div onClick={() => setOpenPis2(!openPis2)}>
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div onClick={() => setOpenPis2(!openPis2)}>
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openPis2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                  <Collapse
                    in={openPis}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenPis3(!openPis3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openPis2 ? (
                                    <div onClick={() => setOpenPis3(!openPis3)}>
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div onClick={() => setOpenPis3(!openPis3)}>
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openPis3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                  <Collapse
                    in={openPis}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle3?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenPis4(!openPis4);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openPis3 ? (
                                    <div onClick={() => setOpenPis4(!openPis4)}>
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div onClick={() => setOpenPis4(!openPis4)}>
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openPis4}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for attendance */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {attendance.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenAttendance(!openAttendance);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "attendance"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openAttendance ? (
                          <div
                            onClick={() => setOpenAttendance(!openAttendance)}
                          >
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div
                            onClick={() => setOpenAttendance(!openAttendance)}
                          >
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openAttendance} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for planning */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {planning.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenPlanning(!openPlanning);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "planning"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openPlanning ? (
                          <div onClick={() => setOpenPlanning(!openPlanning)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenPlanning(!openPlanning)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>

                  <Collapse
                    in={openPlanning}
                    timeout="auto"
                    className=" bg-gray-300 "
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenPlanning2(!openPlanning2);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openPlanning2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenPlanning2(!openPlanning2)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenPlanning2(!openPlanning2)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openPlanning2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black uppercase bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openPlanning}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenPlanning3(!openPlanning3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openPlanning2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenPlanning3(!openPlanning3)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenPlanning3(!openPlanning3)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openPlanning3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openPlanning}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle3?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenPlanning4(!openPlanning4);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openPlanning3 ? (
                                    <div
                                      onClick={() =>
                                        setOpenPlanning4(!openPlanning4)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenPlanning4(!openPlanning4)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openPlanning4}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for revenue */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {revenue.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenRevenue(!openRevenue);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "revenue"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openRevenue ? (
                          <div onClick={() => setOpenRevenue(!openRevenue)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenRevenue(!openRevenue)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse
                    in={openRevenue}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link ||
                                  router.pathname.split("/")[2] ===
                                    contentData1.link.split("/")[2]
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openRevenue2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenRevenue2(!openRevenue2)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenRevenue2(!openRevenue2)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openRevenue2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                  {/* <Collapse
                    in={openRevenue}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenRevenue3(!openRevenue3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openRevenue2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenRevenue3(!openRevenue3)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenRevenue3(!openRevenue3)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openRevenue3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse> */}
                </>
              );
            })}
          </List>
          <Divider />

          {/* for PDS */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {pds.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenPDS(!openPDS);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pds"
                          ? "text-white "
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openCommon ? (
                          <div onClick={() => setOpenPDS(!openPDS)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenPDS(!openPDS)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openPDS} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      <div className=" pt-4 flex justify-center  text-red-500 ">
                        <a
                          href="http://dtt.meropalika.com"
                          className="flex gap-2 "
                        >
                          <text className="font-bold uppercase ">Demo </text>
                          <div className="text-2xl">
                            <SiCircle />
                          </div>
                        </a>
                      </div>
                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for Sifarish */}
          <List className="bg-[#0c6aa8fd]">
            {sifarish.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenSifarish(!openSifarish);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "sifarish"
                          ? "text-white "
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openSifarish ? (
                          <div onClick={() => setOpenSifarish(!openSifarish)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenSifarish(!openSifarish)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openSifarish} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for Identity Proof */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {identityProof.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenIdentity(!openIdentity);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pds"
                          ? "text-white "
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openIdentity ? (
                          <div onClick={() => setOpenIdentity(!openIdentity)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenIdentity(!openIdentity)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openIdentity} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      <div className=" pt-4 flex justify-center  text-red-500 ">
                        <Link
                          href="http://softechid.meropalika.com"
                          className="flex gap-2 "
                        >
                          <text className="font-bold uppercase ">Demo </text>
                          <div className="text-2xl">
                            <SiCircle />
                          </div>
                        </Link>
                      </div>
                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for disaster */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {disaster.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl  "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => setOpenDisaster(!openDisaster)}
                      className={`${
                        router.pathname.split("/")[1] === "employee"
                          ? "text-white"
                          : ""
                      }`}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openDisaster ? (
                          <div onClick={() => setOpenDisaster(!openDisaster)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenDisaster(!openDisaster)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse
                    in={openDisaster}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenDisaster2(!openDisaster2);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openDisaster2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenDisaster2(!openDisaster2)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenDisaster2(!openDisaster2)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openDisaster2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for aagantuk */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {agantuk.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenVisitor(!openVisitor);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pis"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openVisitor ? (
                          <div onClick={() => setOpenVisitor(!openVisitor)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenVisitor(!openVisitor)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse
                    in={openVisitor}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      <div className=" pt-4 flex justify-center  text-red-500 ">
                        <Link
                          href="http://visitor.meropalika.com"
                          className="flex gap-2 "
                        >
                          <text className="font-bold uppercase ">Demo </text>
                          <div className="text-2xl">
                            <SiCircle />
                          </div>
                        </Link>
                      </div>

                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenVisitor2(!openVisitor2);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openVisitor2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenVisitor2(!openVisitor2)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenVisitor2(!openVisitor2)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openVisitor2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                  <Collapse
                    in={openVisitor}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenVisitor3(!openVisitor3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openVisitor2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenVisitor3(!openVisitor3)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenVisitor3(!openVisitor3)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openVisitor3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for ghar naksa */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {gharNaksa.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenGharNaksa(!openGharNaksa);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pis"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openGharNaksa ? (
                          <div onClick={() => setOpenGharNaksa(!openGharNaksa)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenGharNaksa(!openGharNaksa)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>

                  <Collapse
                    in={openGharNaksa}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <div className=" pt-4 flex justify-center  text-red-500 ">
                      <Link
                        href="http://ebps.meropalika.com"
                        className="flex gap-2 "
                      >
                        <text className="font-bold uppercase ">Demo </text>
                        <div className="text-2xl">
                          <SiCircle />
                        </div>
                      </Link>
                    </div>
                    <List component="div" disablePadding>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link ||
                                  router.pathname.split("/")[2] ===
                                    contentData1.link.split("/")[2]
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openGharNaksa2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenGharNaksa2(!openGharNaksa2)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenGharNaksa2(!openGharNaksa2)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openGharNaksa2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openGharNaksa}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenGharNaksa3(!openGharNaksa3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openGharNaksa2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenGharNaksa3(!openGharNaksa3)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenGharNaksa3(!openGharNaksa3)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openGharNaksa3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for GhaBarga */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {ghaBarga.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenGhabarga(!openGhabarga);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pds"
                          ? "text-white "
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openGhabarga ? (
                          <div onClick={() => setOpenGhabarga(!openGhabarga)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenGhabarga(!openGhabarga)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openGhabarga} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      <div className=" pt-4 flex justify-center  text-red-500 ">
                        <Link
                          href="http://dartapatra.meropalika.com"
                          className="flex gap-2 "
                        >
                          <text className="font-bold uppercase ">Demo </text>
                          <div className="text-2xl">
                            <SiCircle />
                          </div>
                        </Link>
                      </div>

                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for legalCase Case */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {legalCase.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenCommon(!openCommon);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pis"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openLegal ? (
                          <div onClick={() => setOpenLegal(!openLegal)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenLegal(!openLegal)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>

                  <Collapse
                    in={openLegal}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link ||
                                  router.pathname.split("/")[2] ===
                                    contentData1.link.split("/")[2]
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openLegal2 ? (
                                    <div
                                      onClick={() => setOpenLegal2(!openLegal2)}
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => setOpenLegal2(!openLegal2)}
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openLegal2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openLegal}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle4?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenLegal5(!openLegal5);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openLegal3 ? (
                                    <div
                                      onClick={() => setOpenLegal5(!openLegal5)}
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => setOpenLegal5(!openLegal5)}
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openLegal5}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openLegal}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenLegal3(!openLegal3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openLegal2 ? (
                                    <div
                                      onClick={() => setOpenLegal3(!openLegal3)}
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => setOpenLegal3(!openLegal3)}
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openLegal3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openLegal}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle3?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenLegal4(!openLegal4);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openLegal3 ? (
                                    <div
                                      onClick={() => setOpenLegal4(!openLegal4)}
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => setOpenLegal4(!openLegal4)}
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openLegal4}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for complaint */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {complaint.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenComplaint(!openComplaint);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "complaint"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openComplaint ? (
                          <div onClick={() => setOpenComplaint(!openComplaint)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenComplaint(!openComplaint)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openComplaint} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      <div className=" pt-4 flex justify-center  text-red-500 ">
                        <Link
                          href="http://gunaso-demo.meropalika.com"
                          className="flex gap-2 "
                        >
                          <text className="font-bold uppercase ">Demo </text>
                          <div className="text-2xl">
                            <SiCircle />
                          </div>
                        </Link>
                      </div>
                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for sms */}
          <List className="bg-[#0c6aa8fd]  transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring">
            {smsManagement.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenSms(!openSms);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "common"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openSms ? (
                          <div onClick={() => setOpenSms(!openSms)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenSms(!openSms)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openSms} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300"
                    >
                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for agriculture */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {agriculture.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenAgriculture(!openAgriculture);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pis"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openAgriculture ? (
                          <div
                            onClick={() => setOpenAgriculture(!openAgriculture)}
                          >
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div
                            onClick={() => setOpenAgriculture(!openAgriculture)}
                          >
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>

                  <Collapse
                    in={openAgriculture}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      <div className=" pt-4 flex justify-center  text-red-500 ">
                        <Link
                          href="http://kishan-profile.meropalika.com"
                          className="flex gap-2 "
                        >
                          <text className="font-bold uppercase ">Demo </text>
                          <div className="text-2xl">
                            <SiCircle />
                          </div>
                        </Link>
                      </div>

                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link ||
                                  router.pathname.split("/")[2] ===
                                    contentData1.link.split("/")[2]
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openAgriculture2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenAgriculture2(!openAgriculture2)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenAgriculture2(!openAgriculture2)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openAgriculture2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openAgriculture}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenAgriculture3(!openAgriculture3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openAgriculture2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenAgriculture3(!openAgriculture3)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenAgriculture3(!openAgriculture3)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openAgriculture3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openAgriculture}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle3?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenAgriculture4(!openAgriculture4);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openAgriculture3 ? (
                                    <div
                                      onClick={() =>
                                        setOpenAgriculture4(!openAgriculture4)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenAgriculture4(!openAgriculture4)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openAgriculture4}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>

          <Divider />

          {/* for medical */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {medical.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenMedical(!openMedical);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pis"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openMedical ? (
                          <div onClick={() => setOpenMedical(!openMedical)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenMedical(!openMedical)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>

                  <Collapse
                    in={openMedical}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      <div className=" pt-4 flex justify-center  text-red-500 ">
                        <Link
                          href="http://emrms-demo.meropalika.com"
                          className="flex gap-2 "
                        >
                          <text className="font-bold uppercase ">Demo </text>
                          <div className="text-2xl">
                            <SiCircle />
                          </div>
                        </Link>
                      </div>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link ||
                                  router.pathname.split("/")[2] ===
                                    contentData1.link.split("/")[2]
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openMedical2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenMedical2(!openMedical2)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenMedical2(!openMedical2)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openMedical2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openMedical}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenMedical3(!openMedical3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openMedical2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenMedical3(!openMedical3)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenMedical3(!openMedical3)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openMedical3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openMedical}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle3?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenMedical4(!openMedical4);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openMedical3 ? (
                                    <div
                                      onClick={() =>
                                        setOpenMedical4(!openMedical4)
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenMedical4(!openMedical4)
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openMedical4}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>

          <Divider />

          {/* for school */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {school.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenSchool(!openSchool);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pds"
                          ? "text-white "
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openSchool ? (
                          <div onClick={() => setOpenSchool(!openSchool)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenSchool(!openSchool)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openSchool} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>

          <Divider />

          {/* for wada profile */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {wadaProfile.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenWadaProfile(!openWadaProfile);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pds"
                          ? "text-white "
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openWadaProfile ? (
                          <div
                            onClick={() => setOpenWadaProfile(!openWadaProfile)}
                          >
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div
                            onClick={() => setOpenWadaProfile(!openWadaProfile)}
                          >
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openWadaProfile} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      <div className=" pt-4 flex justify-center  text-red-500 ">
                        <Link
                          href="https://walingmun.prabidhienterprises.com.np/"
                          className="flex gap-2 "
                        >
                          <text className="font-bold uppercase ">Demo </text>
                          <div className="text-2xl">
                            <SiCircle />
                          </div>
                        </Link>
                      </div>

                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for digital profile */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {digitalProfile.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenDigitalProfile(!openDigitalProfile);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pis"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.subTitle?.length > 0 ? (
                      <>
                        {openDigitalProfile ? (
                          <div
                            onClick={() =>
                              setOpenDigitalProfile(!openDigitalProfile)
                            }
                          >
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div
                            onClick={() =>
                              setOpenDigitalProfile(!openDigitalProfile)
                            }
                          >
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>

                  <Collapse
                    in={openDigitalProfile}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      <div className=" pt-4 flex justify-center  text-red-500 ">
                        <Link
                          href="http://meropalikaprofile.meropalika.com/"
                          className="flex gap-2 "
                        >
                          <text className="font-bold uppercase ">Demo </text>
                          <div className="text-2xl">
                            <SiCircle />
                          </div>
                        </Link>
                      </div>
                      {contentData?.subTitle?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link ||
                                  router.pathname.split("/")[2] ===
                                    contentData1.link.split("/")[2]
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openDigitalProfile2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenDigitalProfile2(
                                          !openDigitalProfile2
                                        )
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenDigitalProfile2(
                                          !openDigitalProfile2
                                        )
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openDigitalProfile2}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemIcon>{data.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openDigitalProfile}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle2?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenDigitalProfile3(!openDigitalProfile3);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openDigitalProfile2 ? (
                                    <div
                                      onClick={() =>
                                        setOpenDigitalProfile3(
                                          !openDigitalProfile3
                                        )
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenDigitalProfile3(
                                          !openDigitalProfile3
                                        )
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openDigitalProfile3}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Collapse
                    in={openDigitalProfile}
                    timeout="auto"
                    unmountOnExit
                    className=" bg-gray-300 "
                  >
                    <List component="div" disablePadding>
                      {contentData?.subTitle3?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.title}
                                onClick={() => {
                                  setOpenDigitalProfile4(!openDigitalProfile4);
                                  router.push(contentData1.link);
                                }}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                    : ""
                                }`}
                              />
                              {contentData1.items?.length > 0 ? (
                                <>
                                  {openDigitalProfile3 ? (
                                    <div
                                      onClick={() =>
                                        setOpenDigitalProfile4(
                                          !openDigitalProfile4
                                        )
                                      }
                                    >
                                      {" "}
                                      <ExpandLess className="text-white" />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() =>
                                        setOpenDigitalProfile4(
                                          !openDigitalProfile4
                                        )
                                      }
                                    >
                                      {" "}
                                      <ExpandMore className="text-white" />{" "}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </ListItemButton>

                            <Collapse
                              in={openDigitalProfile4}
                              timeout="auto"
                              unmountOnExit
                            >
                              {contentData1.items?.map((data, index) => {
                                return (
                                  <>
                                    <ListItemButton key={index}>
                                      <ListItemText
                                        primary={data.list}
                                        onClick={() => {
                                          router.push(data.link);
                                        }}
                                        className={`${
                                          router.pathname === data.link
                                            ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 items-center flex justify-center "
                                            : ""
                                        }`}
                                      />
                                    </ListItemButton>
                                  </>
                                );
                              })}
                            </Collapse>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for eventManagemnt */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            <ListItemButton onClick={() => router.push(eventManagement.link)}>
              <ListItemIcon className=" text-3xl " sx={{ color: "#fff" }}>
                {eventManagement.icon}
              </ListItemIcon>
              <ListItemText primary={eventManagement.title} />
            </ListItemButton>
          </List>
          <Divider />

          {/* for nagarpalika Calendar */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            <ListItemButton
              onClick={() => router.push(nagarpalikaCalendar.link)}
            >
              <ListItemIcon className=" text-3xl " sx={{ color: "#fff" }}>
                {nagarpalikaCalendar.icon}
              </ListItemIcon>
              <ListItemText primary={nagarpalikaCalendar.title} />
            </ListItemButton>
          </List>
          <Divider />

          {/* for suchanaPati Calendar */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            <ListItemButton onClick={() => router.push(suchanaPati.link)}>
              <ListItemIcon className=" text-3xl " sx={{ color: "#fff" }}>
                {suchanaPati.icon}
              </ListItemIcon>
              <ListItemText primary={suchanaPati.title} />
            </ListItemButton>
          </List>
          <Divider />

          {/* for jobportal */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {jobPortal.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenJobPortal(!openJobPortal);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pds"
                          ? "text-white "
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openJobPortal ? (
                          <div onClick={() => setOpenJobPortal(!openJobPortal)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenJobPortal(!openJobPortal)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openJobPortal} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* for archival system */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            {archival.map((contentData, index) => {
              return (
                <>
                  <ListItemButton key={index}>
                    <ListItemIcon
                      onClick={() => setOpen(!open)}
                      className=" text-3xl "
                      sx={{ color: "#fff" }}
                    >
                      {contentData.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={contentData.title}
                      onClick={() => {
                        setOpenArchival(!openArchival);
                        router.push(contentData.link);
                      }}
                      className={`${
                        router.pathname.split("/")[1] === "pds"
                          ? "text-white "
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
                      <>
                        {openArchival ? (
                          <div onClick={() => setOpenArchival(!openArchival)}>
                            {" "}
                            <ExpandLess className="text-white" />
                          </div>
                        ) : (
                          <div onClick={() => setOpenArchival(!openArchival)}>
                            {" "}
                            <ExpandMore className="text-white" />{" "}
                          </div>
                        )}
                      </>
                    ) : null}
                  </ListItemButton>
                  <Collapse in={openArchival} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      className=" bg-gray-300 "
                    >
                      {contentData?.item?.map((contentData1, index) => {
                        return (
                          <>
                            <ListItemButton sx={{ pl: 6 }} key={index}>
                              <ListItemText
                                primary={contentData1.list}
                                onClick={() => router.push(contentData1.link)}
                                className={`${
                                  router.pathname === contentData1.link
                                    ? " border-2  border-[#1876D2] text-black  bg-white rounded-md  py-2 flex justify-center items-center"
                                    : ""
                                }`}
                              />
                            </ListItemButton>
                          </>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          </List>
          <Divider />

          {/* to download the app */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            <ListItemButton onClick={() => router.push(getApp.link)}>
              <ListItemIcon className=" text-3xl " sx={{ color: "#fff" }}>
                {getApp.icon}
              </ListItemIcon>
              <ListItemText primary={getApp.title} />
            </ListItemButton>
          </List>
          <Divider />

          {/* for logout */}
          <List className="bg-[#0c6aa8fd] transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring ">
            <ListItemButton onClick={() => router.push(logOut.link)}>
              <ListItemIcon className=" text-3xl " sx={{ color: "#fff" }}>
                {logOut.icon}
              </ListItemIcon>
              <ListItemText primary={logOut.title} />
            </ListItemButton>
          </List>
          <Divider />
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}

const menuCardTitle = [
  {
    title: "Register Account",
    href: "/employeeSetup/user/registerUser",
  },
  {
    title: "Logout",
    href: "/auth/login",
  },
];

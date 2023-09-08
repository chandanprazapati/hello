import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dash from "./sidebar/data/Dashboard";
import common from "./sidebar/data/Common";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {  signOut } from "next-auth/react";


import { BiLogOut } from "react-icons/bi";
import { logout } from "../../redux/userDetail";
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Badge, Collapse } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

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

function ViewPage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const userData = useSelector((state) => state.userDetail);
  console.log(userData, "user data");
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  // For common
  const [openCommon, setOpenCommon] = React.useState(false);

  // For Sifarish
  const [openSifarish, setOpenSifarish] = React.useState(false);

  // for PDS
  const [openPDS, setOpenPDS] = React.useState(false);

  // for legal case
  const [openLegalCase, setOpenLegalCase] = React.useState(false);

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
  const [openRevenue3, setOpenRevenue3] = React.useState(false);

  // For Pis
  const [openPis, setOpenPis] = React.useState(false);
  const [openPis2, setOpenPis2] = React.useState(false);
  const [openPis3, setOpenPis3] = React.useState(false);
  const [openPis4, setOpenPis4] = React.useState(false);

  // For Attendance
  const [openAttendance, setOpenAttendance] = React.useState(false);

  // for Complaint
  const [openComplaint, setOpenComplaint] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    signOut();
    // localStorage.removeItem("token");
    dispatch(logout());

    router.push("/");
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
            <div className="text-xl font-extrabold pt-6 ">फिदिम नगरपालिका</div>
          </div>

          <Typography variant="h6" noWrap component="div">
            <div className="flex gap-4 justify-end ">
              <div className="text-lg font-bold group ">
                {" "}
                Welcome {userData?.user?.data?.name} !!!
                <div
                  className="flex  cursor-pointer hover:border-2 w-1/2 rounded border-black p-1 hover:bg-red-400  "
                  onClick={handleLogout}
                >
                  <div className="invisible group-hover:visible text-white text-lg font-medium   ">
                    <BiLogOut size={30} />
                  </div>
                  <p className="invisible group-hover:visible text-white text-lg font-medium w-1/2">
                    Log out
                  </p>
                </div>
              </div>
              <div>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    className="group cursor-pointer "
                    alt="Remy Sharp"
                    src="https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg="
                  ></Avatar>
                </StyledBadge>
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
          <DrawerHeader className="bg-[#2a2e308e]">
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
          <Divider />
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
          <List className="bg-[#0c6aa8fd]  transition-transform transform  hover:translate-x-1 focus:outline-none focus:ring">
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
                        router.pathname.split("/")[1] === "common"
                          ? "text-white"
                          : ""
                      } `}
                    />
                    {contentData.item?.length > 0 ? (
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
                  <Collapse in={openCommon} timeout="auto" unmountOnExit>
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

         
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}

ViewPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ViewPage;


// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// export default function Viewpage() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Persistent drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//           tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
//           enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
//           imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
//           Convallis convallis tellus id interdum velit laoreet id donec ultrices.
//           Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//           adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
//           nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
//           leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
//           feugiat vivamus at augue. At augue eget arcu dictum varius duis at
//           consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
//           sapien faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
//           eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
//           neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
//           tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
//           sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
//           tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
//           gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
//           et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
//           tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
//           eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
//           posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography>
//       </Main>
//     </Box>
//   );
// }

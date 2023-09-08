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
import revenue from "./data/Revenue";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/userDetail";
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
import React from "react";
import Link from "next/link";
import dash from "../data/Dashboard";

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

export default function CounterView(props) {
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

  // For Revenue
  const [openRevenue, setOpenRevenue] = React.useState(false);
  const [openRevenue2, setOpenRevenue2] = React.useState(false);
  const [openRevenue3, setOpenRevenue3] = React.useState(false);

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
                    console.log(item, "item");
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
                                  setOpenRevenue2(!openRevenue2);
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
                  <Collapse
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

const menuCardTitle = [
  {
    title: "Register Account",
    href: "/auth/login",
  },
  {
    title: "Logout",
    href: "/",
  },
];

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
const Aanusuchi1 = dynamic(
  () => import("../../../../components/planning/aanusuchi/Aanusuchi1"),
  { ssr: false }
);
const Aanusuchi2 = dynamic(
  () => import("../../../../components/planning/aanusuchi/Aanusuchi2"),
  { ssr: false }
);
const Aanusuchi3 = dynamic(
  () => import("../../../../components/planning/aanusuchi/Aanusuchi3"),
  { ssr: false }
);
const Aanusuchi4 = dynamic(
  () => import("../../../../components/planning/aanusuchi/Aanusuchi4"),
  { ssr: false }
);
const Aanusuchi5 = dynamic(
  () => import("../../../../components/planning/aanusuchi/Aanusuchi5"),
  { ssr: false }
);
const Aanusuchi6 = dynamic(
  () => import("../../../../components/planning/aanusuchi/Aanusuchi6"),
  { ssr: false }
);
const Aanusuchi7 = dynamic(
  () => import("../../../../components/planning/aanusuchi/Aanusuchi7"),
  { ssr: false }
);
const Aanusuchi8 = dynamic(
  () => import("../../../../components/planning/aanusuchi/Aanusuchi8"),
  { ssr: false }
);
const Aanusuchi9 = dynamic(
  () => import("../../../../components/planning/aanusuchi/Aanusuchi9"),
  { ssr: false }
);


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CompleteReportById = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider"  }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          
        >
          <Tab  label="अनुसूची १" {...a11yProps(0)}  />
          <Tab label=" अनुसूची २ " {...a11yProps(1)} />
            <Tab label=" अनुसूची ३ " {...a11yProps(2)} />
            <Tab label=" अनुसूची ४ " {...a11yProps(3)} />
            <Tab label=" अनुसूची ५ " {...a11yProps(4)} />
            <Tab label=" अनुसूची ६ " {...a11yProps(5)} />
            <Tab label=" अनुसूची ७ " {...a11yProps(6)} />
            <Tab label=" अनुसूची ८ " {...a11yProps(7)} />
            <Tab label=" अनुसूची ९ " {...a11yProps(8)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
       <Aanusuchi1/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Aanusuchi2/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Aanusuchi3/>
      </TabPanel>
        <TabPanel value={value} index={3}>
        <Aanusuchi4/>
        </TabPanel>
        <TabPanel value={value} index={4}>
        <Aanusuchi5/>
        </TabPanel>
        <TabPanel value={value} index={5}>
        <Aanusuchi6/>
        </TabPanel>
        <TabPanel value={value} index={6}>
        <Aanusuchi7/>
        </TabPanel>
        <TabPanel value={value} index={7}>
        <Aanusuchi8/>
        </TabPanel>
        <TabPanel value={value} index={8}>
        <Aanusuchi9/>
        </TabPanel>
    </>
  );
};
export default CompleteReportById;

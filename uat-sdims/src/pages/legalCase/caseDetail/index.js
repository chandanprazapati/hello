import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
const CaseList = dynamic(
  () => import("../../../components/legalCase/CaseList"),
  { ssr: false }
);
const ChaluCase = dynamic(
  () => import("../../../components/legalCase/ChaluCase"),
  { ssr: false }
);
const Tamoli = dynamic(() => import("../../../components/legalCase/Tamoli"), {
  ssr: false,
});
const MelMilap = dynamic(
  () => import("../../../components/legalCase/MelMilap"),
  { ssr: false }
);
const WardMelMilap = dynamic(
  () => import("../../../components/legalCase/WardMelMilap"),
  { ssr: false }
);
const Sampanna = dynamic(
  () => import("../../../components/legalCase/Sampanna"),
  { ssr: false }
);
const AapilCase = dynamic(
  () => import("../../../components/legalCase/AapilCase"),
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

export default function CompleteCaseDetail() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <  >
      <Box sx={{ borderBottom: 1, borderColor: "divider" ,bgcolor: '#dbc9c9'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="सबै विवादहरु" {...a11yProps(0)} />
          <Tab label=" चालु विवाद " {...a11yProps(1)} />
          <Tab label=" तामेली " {...a11yProps(2)} />
          <Tab label=" मेलमिलाप " {...a11yProps(3)} />
          <Tab label=" वार्ड मेलमिलाप " {...a11yProps(4)} />
          <Tab label=" सम्पन्न " {...a11yProps(5)} />
          <Tab label=" अपिल गरेको विवादहरु " {...a11yProps(6)} />
        </Tabs>
        <Box sx={{ p: 1 }} />
      </Box>
      <TabPanel value={value} index={0}>
        <CaseList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChaluCase />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tamoli />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MelMilap />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <WardMelMilap />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Sampanna />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <AapilCase />
      </TabPanel>
    </>
  );
}

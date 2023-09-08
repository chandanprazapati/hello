import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
const NagarPalika = dynamic(
  () =>
    import("../../../../components/legalCase/caseDetail/milaPatra/nagarPalika"),
  { ssr: false }
);
const Wada = dynamic(
  () => import("../../../../components/legalCase/caseDetail/milaPatra/wada"),
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

export default function MilaPatraById() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#dbc9c9" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="नगरपालिका मिलापत्र" {...a11yProps(0)} />
          <Tab label=" वडा मिलापत्र" {...a11yProps(1)} />
        </Tabs>
        <Box sx={{ p: 1 }} />
      </Box>
      <TabPanel value={value} index={0}>
        <NagarPalika />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Wada />
      </TabPanel>
    </>
  );
}

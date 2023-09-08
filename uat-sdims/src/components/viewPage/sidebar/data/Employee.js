import { FaUsers } from "react-icons/fa";

const employee = [
  {
    title: "कर्मचारी मास्टर सेटअप",
    link: "",
    icon: <FaUsers />,

    subTitle: [
      {
        title: " कर्मचारी आधारभूत सेटअप",
        link: "",

        items: [
          {
            list: "कर्मचारी विवरण",
            link: "/employeeSetup/employee",
          },
          {
            list: " कर्मचारी परिवार विवरण",
            link: "/employeeSetup/familyDetails",
          },
          {
            list: "कर्मचारी जागीर विवरण",
            link: "/employeeSetup/jobDescription",
          },
          {
            list: " कर्मचारी शिक्षा विवरण",
            link: "/employeeSetup/educationDetails",
          },
          {
            list: "कर्मचारी अन्य विवरण",
            link: "/employeeSetup/othersDetails",
          },
        ],
      },
      {
        title: "कर्मचारी प्रयोगकर्ता दर्ता ",
        link: "/employeeSetup/user",
      },
    ],
  },
];
export default employee;

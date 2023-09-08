import { FaFileSignature } from "react-icons/fa";

const complaint = [
  {
    title: "गुनासो व्यवस्थापन",
    link: "",
    icon: <FaFileSignature />,

    item: [
      {
        list: " गुनासो विवरण ",
        link: "/complaint/complaintDetails",
      },
      {
        list: " गुनासो प्रकार ",
        link: "/complaint/complaintType",
      },
      {
        list: " गुनासो संवेदनशीलता ",
        link: "/complaint/complaintSensitivity",
      },
    ],
  },
];
export default complaint;

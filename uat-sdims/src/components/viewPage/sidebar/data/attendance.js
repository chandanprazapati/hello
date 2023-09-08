import { FaFingerprint } from "react-icons/fa";

const attendance = [
  {
    title: "हाजिरी रिपोर्ट / विवरण ",
    link: "",
    icon: <FaFingerprint />,

    item: [
      {
        list: "आवधिक हाजिरी",
        link: "/attendance/report/aabadhik",
      },
      {
        list: "मासिक हाजिरी",
        link: "/attendance/report/mashik",
      },
      {
        list: "हाजिरी सारांश",
        link: "/attendance/report/overViewHajari",
      },
      {
        list: "ढिला आउने/चाडो जानेको विवरण",
        link: "/attendance/report/dhiloBibran",
      },
      {
        list: "अनुपस्थित कर्मचारी विवरण",
        link: "/attendance/report/absentEmployee",
      },
    ],
  },
];
export default attendance;

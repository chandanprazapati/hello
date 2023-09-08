import { GrFingerPrint } from "react-icons/gr";
const att = [
  {
    id: 1,
    title: " ई हाजिरी प्रणाली",
    icon: <GrFingerPrint />,
    link : "",
    items: [
      {
        list: "आवधिक हाजिरीली ",
        link: "/attendance/awadhik",
      },
      {
        list: "मासिक हाजिरी",
        link: "/attendance/monthly",
      },
      {
        list: "बार्षिक हाजिरी",
        link: "/attendance/yearly",
      },
      {
        list: "हाजिरी सारांश",
        link: "/attendance/summary",
      },
    ],
    subTitle: [
      {
        title: "रिपोर्ट/विवरण ",

        items: [
          {
            list: "ढिला आउने/चाडो जानेको विवरण",
            link: "/attendance/report/late%20yearly",
          },
          {
            list: "कर्मचारीको कार्य विवरण ",
            link: "/attendance/report/employeework",
          },
          {
            list: "हाजिर गर्न बिर्सेको विवरण",
            link: "/attendance/report/forgot",
          },
          {
            list: "लग हाजिरी रिपोर्ट",
            link: "/attendance/report/logattendance",
          },
          {
            list: "जम्मा बाँकी विदा रिपोर्ट ",
            link: "/attendance/report/leavebalance",
          },
          {
            list: "अनुपस्थित कर्मचारीको विवरण",
            link: "/attendance/report/absentemployee",
          },
        ],
      },
    ],
  },
];
export default att;



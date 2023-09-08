import { FaUserTie } from "react-icons/fa";

const pis = [
  {
    title: "PIS",
    link: "",
    icon: <FaUserTie />,
    subTitle: [
      {
        title: "आधारभूत सेटअप",
        link: "",
        items: [
          {
            list: "काज प्रकार ",
            link: "/pis/kajType",
          },
          {
            list: "सार्वजनिक विदा",
            link: "/pis/publicHoliday",
          },
          {
            list: "बिदा प्रकार",
            link: "/pis/leaveType",
          },
          {
            list: "कार्यालयको समय",
            link: "/pis/officeTime",
          },
        ],
      },
     
    ],
    subTitle2: [
      {
        title: "कर्मचारी व्यवस्थापन",
        link: "",
        items: [
          {
            list: "अघिल्लो कार्यालय ",
            link: "/pis/previousOfficeRecord",
          },
          {
            list: "तालिम",
            link: "/pis/trainingRecord",
          },
          {
            list: "तालिम मोड्युल",
            link: "/pis/talimModule",
          },
          {
            list: "भ्रमण",
            link: "/pis/abroadVisit",
          },
          {
            list: "विभूषण/सम्मान",
            link: "/pis/awardDetail",
          },
          {
            list: "निष्क्रिय कर्मचारी",
            link: "/pis/deactiveEmployee",
          },
          {
            list: "कर्मचारी सजाय",
            link: "/pis/employeePunishment",
          },
          {
            list: "सेवा लग                ",
            link: "/pis/sewalog",
          },
        ],
      },
    ],
    // subTitle3: [
    //   {
    //     title: "कुल राजस्व रिपोर्ट",
    //     link: "",
    //     items: [
    //       {
    //         list: " सम्पत्ति तथा भूमिकरको बिल सूचि",
    //         // link: "/revenue/report/invoicetransaction",
    //       },
    //       {
    //         list: " आमदानी सूचि",
    //         // link: "/revenue/report/incomesummary",
    //       },
    //     ],
    //   },
    // ],
  },
];
export default pis;

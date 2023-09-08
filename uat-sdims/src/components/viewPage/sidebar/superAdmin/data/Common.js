import { FaClipboardList} from "react-icons/fa";

const common = [
  {
    title: "आधारभूत सेटअप",
    link: "",
    icon: <FaClipboardList />,
    subTitle: [
      {
        title: "कार्यालय सेटअप",
        link: "",
        items: [
          {
            list: "आर्थिक बर्ष",
            link: "/common/fiscal",
          },
          {
            list: "कार्यालय",
            link: "/common/office",
          },
          {
            list: " कार्यालयको हाजिरी प्रकार ",
            link: "/common/attOfficeType",
          },
          {
            list: "कार्यालयको हाजिरी ",
            link: "/common/attOffice",
          },
          {
            list: "साखा ",
            link: "/common/department",
          },
          {
            list: "उप-साखा ",
            link: "/common/subDepartment",
          },
          {
            list: "वडा सेटअप",
            link: "/common/ward",
          },
          {
            list: "काउन्टर",
            link: "/common/counter",
          },
          {
            list: "पुरानो गा.वि.स",
            link: "/common/oldVdc",
          },
        ],
      },
     
    ],
    subTitle2: [
      {
        title: "कर्मचारी सेटअप",
        link: "",
        items: [
          {
            list: "राज पत्रांकित श्रेणी",
            link: "/common/rajpatrankitsheni",
          },
          {
            list: "श्रेणी",
            link: "/common/shredi",
          },
          {
            list: "पद",
            link: "/common/post",
          },
          {
            list: "सेवा",
            link: "/common/sewa",
          },
          {
            list: "समूह",
            link: "/common/group",
          },
          {
            list: "उप-समूह",
            link: "/common/subGroup",
          },
          {
            list: "नियुक्ति",
            link: "/common/appointment",
          },
          {
            list: "सेवा परिमान",
            link: "/common/sewaParimad",
          },
          {
            list: "पदपुर्ती",
            link: "/common/padPurtiType",
          },
        ],
      },
    ],
    subTitle3: [
      {
        title: "कर्मचारी अन्य सेटअप",
        link: "",
        items: [
          {
            list: "जात",
            link: "/common/cast",
          },
          {
            list: "सम्बन्ध",
            link: "/common/relation",
          },
          {
            list: "शिक्षा",
            link: "/common/education",
          },
          {
            list: "संकाय",
            link: "/common/faculty",
          },
          {
            list: "पेशा",
            link: "/common/occupation",
          },
          {
            list: "तालिम",
            link: "/common/talimType",
          },
          {
            list: "पुरस्कार",
            link: "/common/awardType",
          },
          {
            list: "सजाय",
            link: "/common/punishment",
          },
          {
            list: "उप-सजाय",
            link: "/common/subPunishment",
          },
          {
            list: "राष्ट्रियता",
            link: "/common/nationality",
          },
          {
            list: "भाषा",
            link: "/common/language",
          },
          
          {
            list: "बोदार्थ",
            link: "/common/bodartha",
          },
        ],
      },
    ],
  },
];
export default common;

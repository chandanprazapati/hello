import { ImProfile } from "react-icons/im";

const digitalProfile = [
  {
    id: 1,
    title: " डिजिटल प्रोफाइल",
    link: "",
    icon: <ImProfile />,
    subTitle: [
      {
        title: "सर्वेक्षण",
        link: "",
        items: [
          {
            list: "घरमुलीको विवरण",
            link: "/digitalProfile/survey/houseOwnerDetails",
          },
          {
            list: "जनसंख्या विवरण",
            link: "/digitalProfile/survey/populationDetails",
          },
          {
            list: " आर्थिक अवस्था विवरण  ",
            link: "/digitalProfile/survey/economicDetails",
          },
          {
            list: " कृषि विवरण  ",
            link: "/digitalProfile/survey/agricultureDetails",
          },
          {
            list: " स्वास्थ्य विवरण",
            link: "/digitalProfile/survey/healthDetails",
          },
          {
            list: " शैक्षिक विवरण",
            link: "/digitalProfile/survey/educationDetails",
          },
          {
            list: "खाने पानी सरसफाई विवरण",
            link: "/digitalProfile/survey/waterDetails",
          },
          {
            list: "आवास विवरण",
            link: "/digitalProfile/survey/houseDetails",
          },
          {
            list: " संस्थागत विवरण",
            link: "/digitalProfile/survey/institutionDetails",
          },
        ],
      },
    ],

    subTitle2: [
      {
        title: "प्रयोगकर्ता मोड्युल",
        link: "",
        items: [
          {
            list: "हवाईअडा",
            link: "/digitalProfile/userModule/airport",
          },
          {
            list: "एटिएम",
            link: "/digitalProfile/userModule/atm",
          },
          {
            list: "रक्त बैंक",
            link: "/digitalProfile/userModule/bloodBank",
          },
          {
            list: "जनप्रतिनिधि",
            link: "/digitalProfile/userModule/representative",
          },
          {
            list: "होटल",
            link: "/digitalProfile/userModule/hotel",
          },
          {
            list: "स्वास्थ्य सुविधा",
            link: "/digitalProfile/userModule/healthFacility",
          },
          {
            list: "हाइड्रो पावर",
            link: "/digitalProfile/userModule/hydroPower",
          },
          {
            list: "ऐतिहासिक स्थान",
            link: "/digitalProfile/userModule/historicalPlace",
          },
          {
            list: "उद्योग",
            link: "/digitalProfile/userModule/industry",
          },
          {
            list: "ताल",
            link: "/digitalProfile/userModule/lake",
          },
          {
            list: "माउन्टेन/हिमाल",
            link: "/digitalProfile/userModule/mountain",
          },
          {
            list: "सूचना",
            link: "/digitalProfile/userModule/information",
          },
          {
            list: "प्रहरी चौकी",
            link: "/digitalProfile/userModule/policeStation",
          },
          {
            list: "प्रोजेक्ट",
            link: "/digitalProfile/userModule/project",
          },
          {
            list: "संरक्षित क्षेत्र",
            link: "/digitalProfile/userModule/protectedArea",
          },
          {
            list: "शिक्षा",
            link: "/digitalProfile/userModule/education",
          },
          {
            list: "झरना",
            link: "/digitalProfile/userModule/waterfall",
          },
        ],
      },
    ],

    subTitle3: [
      {
        title: "रिपोर्ट",
        link: "",
        items: [
          {
            list: "सबै रिपोर्ट",
            link: "/digitalProfile/report/allReport",
          },
        ],
      },
    ],
  },
];
export default digitalProfile;

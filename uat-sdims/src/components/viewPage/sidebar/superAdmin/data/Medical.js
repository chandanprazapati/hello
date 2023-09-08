import { MdLocalHospital } from "react-icons/md";
const medical = [
  {
    id: 1,
    title: "स्वस्थ चौकी ",
    link: "",
    icon: <MdLocalHospital />,
    subTitle: [
      {
        title: "बिरामीको विवरण",
        link: " ",
        items: [
          {
            list: "बिरामीको विवरण",
            link: "/medical/patientDetail",
          },
          {
            list: "नियुक्ति सिर्जना गर्नुहोस्",
            link: "/medical/appointment",
          },
          {
            list: "Health Report",
            link: "/medical/healthReport",
          },
          {
            list: "Medicine Report",
            link: "/medical/medicineReport",
          },
          {
            list: "Medical History",
            link: "/medical/medicalHistory",
          },
          {
            list: "Billing",
            link: "/medical/billing",
          },
        ],
      },
    ],
    subTitle2: [
      {
        title: " महिला स्वास्थ्य स्वयंसेविका रजिष्टर",
        link: "",
        items: [
          {
            list: " महिला स्वास्थ्य स्वयंसेविका रजिष्टर",
            link: "/medical/female/femaleHealthWorker",
          },
          {
            list: "आमा समुह बैठक",
            link: "/medical/female/motherGroupMeeting",
          },
          {
            list: "मातृ तथा नवजात शिशु सम्वन्धि विवरण",
            link: "/medical/female/motherAndNewBornDetail",
          },
        ],
      },
    ],

    subTitle3: [
      {
        title: "रजिस्टर",
        link: "",
        items: [
          {
            list: "गाउँ क्लिनिक विवरण",
            link: "/medical/register/villageClinicDetail",
          },
          {
            list: "सुरक्षित गर्भपतन सेवा रजिस्टर",
            link: "/medical/register/safeAbortionServiceRegister",
          },
          {
            list: "  औलो, कुष्ठ र कालाजार रोगको प्रयोगशाला ",
            link: "/medical/register/leprosyLaboratory",
          },
          {
            list: "औलो तथा कालाजार उपचार",
            link: "/medical/register/leprosyTreatment",
          },
        ],
      },
    ],
  },
];
export default medical;

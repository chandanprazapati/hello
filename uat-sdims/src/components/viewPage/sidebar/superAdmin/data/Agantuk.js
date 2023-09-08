import { FaPeopleArrows } from "react-icons/fa";

const agantuk = [
  {
    title: "आगन्तुक ",
    link: "",
    icon: <FaPeopleArrows />,

    subTitle: [
      {
        title: "आगन्तुक बिबरण",
        link: "",
        items: [
          {
            list: "आजको बिबरण ",
            link: "/visitor/todayVisitorDetails",
          },
          {
            list: "सम्पूर्ण बिबरण",
            link: "/visitor/totalVisitorDetails",
          },
        ],
      },
    ],

    subTitle2: [
      {
        title: "महत्वपूर्ण आगन्तुकको बिबरण",
        link: "",
        items: [
          {
            list: "आजको बिबरण ",
            link: "/visitor/vip/todayVisitorDetails",
          },
          {
            list: "सम्पूर्ण बिबरण",
            link: "/visitor/vip/totalVisitorDetails",
          },
        ],
      },
    ],
  },
];
export default agantuk;

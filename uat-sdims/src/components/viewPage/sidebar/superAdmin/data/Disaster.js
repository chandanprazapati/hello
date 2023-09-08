import { GiLightningDissipation } from "react-icons/gi";

const disaster = [
  {
    title: "विपद् सेटअप",
    link: "",
    icon: <GiLightningDissipation />,
    subTitle: [
      {
        title: "विपद् सेटअप",
        link: "",
        items: [
          {
            list: "विपद् प्रकार",
            link: "/disaster/disasterType",
          },
          {
            list: "मौसम्गत विपद् प्रकार ",
            link: "/disaster/seasonalDisaster",
          },
        ],
      },
      {
        title: "आपदा दान कार्यक्रम",
        link: "/disaster/donationEvent",
      },
     
      {
        title:"प्रकोप जोखिम स्थान",
        link:"/disaster/dangerPlace"
      }
    ],
    
  },

];
export default disaster;

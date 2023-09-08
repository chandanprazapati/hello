import { MdAgriculture } from "react-icons/md";
const agriculture = [
  {
    id: 1,
    title: "कृषि",
    link: "",
    icon: <MdAgriculture />,
    subTitle: [
      {
        title: "मुख्य सेटअप",
        link: "",
        items: [
            {
                list: " कामदारहरु ",
                link: "/agriculture/mainSetup/worker",
            },
            {
                list :" ऋतु",
                link: "/agriculture/mainSetup/season",
            },
            {
                list :" पशुपन्छी ",
                link: "/agriculture/mainSetup/birds",
            },
            {
                list:"बालीनाली",
                link: "/agriculture/mainSetup/balinali",
            },{
                list :" बिमा ",
                link: "/agriculture/mainSetup/insurance",
            },
            {
                list : " अनुदान ",
                link: "/agriculture/mainSetup/subsidy",
            },
            {
                list : " तालिम",
                link: "/agriculture/mainSetup/training",
            },
            {
                list :" बिउ बिजन ",
                link: "/agriculture/mainSetup/seed",
            },
            {
                list :"  मल बिबरण ",
                link: "/agriculture/mainSetup/fertilizer",
            }
        ]
      },

    
    ],
    subTitle2: [
        {
            title: "किसान प्रोफाइल बिबरण ",
            link: "",
            items: [
                {
                    list: "किसान प्रोफाइलहरु",
                    link: "/agriculture/kisanProfile",
                }
            ]
        }
    ],
    subTitle3: [
        {
            title : "रिपोर्ट",
            link: "",
            items: [
                {
                list:" कृषक बिबरण ",
                link: "/agriculture/report/farmerDetail",
                },
                {
                    list: " पशुपन्छी बिबरण",
                    link: "/agriculture/report/birdsDetail",
                },
                {
                    list : " बालि बिबरण",
                    link: "/agriculture/report/balinaliDetail",
                },
                {
                    list : "  बीमा बिबरण",
                    link: "/agriculture/report/insuranceDetail",
                },
                {
                    list : " अनुदान बिबरण",
                    link: "/agriculture/report/subsidyDetail",
                },
                {
                    list : "  बिउ बिजन बिबरण",
                    link: "/agriculture/report/seedDetail",
                },
                {
                    list : " मल बिबरण",
                    link: "/agriculture/report/fertilizerDetail",
                },
                {
                    list : " तालिम बिबरण",
                    link: "/agriculture/report/trainingDetail",
                }
            ],
        },
    ]
  },
];
export default agriculture;

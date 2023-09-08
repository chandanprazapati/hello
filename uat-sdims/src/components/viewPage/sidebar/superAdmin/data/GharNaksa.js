import { BsFillHouseFill } from "react-icons/bs";

const gharNaksa = [
  {
    title: "घर नक्सा",
    link: "",
    icon: <BsFillHouseFill />,
    subTitle: [
      {
        title: " डिजाइन डाटा सेटअप",
        link: "",
        items: [
          {
            list: "Building By Law",
            link: "/gharNaksa/buildingByLaw",
          },
          {
            list : "Architectural Design",
            link : "/gharNaksa/architecturalDesign"
          },
          {
            list : "Structural Design",
            link : "/gharNaksa/structuralDesign"
          },
          {
            list : "Technical Report Data",
            link : "/gharNaksa/technicalReport"
          },
          {
            list :"Technical Level1 Report Data",
            link : "/gharNaksa/technicalReportLevel1"
          },
          {
            list : "ElectricaL Design" ,
            link : "/gharNaksa/electricalDesign"
          },
          {
            list : "Sanitary Design",
            link : "/gharNaksa/sanitaryDesign"
          }
        ],
      },

      {
        title: "फर्मको सेटअप",
        link: "/gharNaksa/formSetup",
      },

    
    ],

    subTitle2: [
      {
        title: "सामान्य सेटउप",
        link: "",
        items: [
          {
            list : "भवन वर्ग",
            link : "/gharNaksa/setup/buildingCategory"
          },
          {
            list :" भवन प्रकार",
            link : "/gharNaksa/setup/buildingType"
          },
          {
            list : "भवन उदेश्य",
            link : "/gharNaksa/setup/buildingPurpose"
          },
          {
            list : "भवन कर वर्ग",
            link : "/gharNaksa/setup/buildingTaxCategory"
          },

          {
            list :"तल्ला प्रकार",
            link : "/gharNaksa/setup/floorType"
          },
          {
            list :"माटो प्रकार",
            link : "/gharNaksa/setup/sandType"
          },
          {
            list :"Land Scape Category",
            link : "/gharNaksa/setup/landScapeCategory"
          },
          {
            list : "Land Scape Type",
            link : "/gharNaksa/setup/landScapeType"
          },
          {
            list :"Land Scape Name",
            link : "/gharNaksa/setup/landScapeName"
          },
          {
            list : "Land Use Type",
            link : "/gharNaksa/setup/landUseType"
          },
          {
              list : "Land Owner Type",
              link : "/gharNaksa/setup/landOwnerType"
          },
          {
            list : "House Owner Type",
            link : "/gharNaksa/setup/houseOwnerType"
          }
        ]
      },
      {
        title : "Application List",
        link : "/gharNaksa/applicationList"
      }
    ]


  },
];
export default gharNaksa;

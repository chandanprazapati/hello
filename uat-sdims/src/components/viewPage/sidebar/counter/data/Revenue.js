import { FaMoneyCheckAlt } from "react-icons/fa";
import { SiTheirishtimes } from "react-icons/si";

const revenue = [
  {
    title: "राजस्व ",
    link: "",
    icon: <FaMoneyCheckAlt />,
    subTitle: [
      {
        title: "  करदाता विवरण ",
        link: "/revenue/taxpayerdetail",
      },
      {
        title: " आम्दानी रसिद ",
        link: "/revenue/servicebill",
      },
    ],
    subTitle2: [
      {
        title: "कुल राजस्व रिपोर्ट",
        link: "",
        items: [
          {
            list: " सम्पत्ति तथा भूमिकरको बिल सूचि",
            link: "/revenue/report/invoicetransaction",
          },
          {
            list: " आमदानी सूचि",
            link: "/revenue/report/incomesummary",
          },
          {
            list: "  रद्द भएका आम्दानी सुची",
            link: "/revenue/report/cancelincomesummary",
          },
          {
            list: "  आम्दानि विवरणको सारांश वडा अनुसार",
            link: "/revenue/report/wardincomesummary",
          },
          {
            list: "   आय शिर्षक अनुसार आम्दानि विवरण",
            link: "/revenue/report/incomesummaryservicewise",
          },
          {
            list: "  करदाता करकोदर अनुसार",
            link: "/revenue/report/taxpayerratewise",
          },
          {
            list: "  करदाता सारांश",
            link: "/revenue/report/taxpayersummary",
          },
          {
            list: " करदाता मोड्युल अनुसार",
            link: "/revenue/report/taxpayermodulewisesummary",
          },
          {
            list: " करदाता सेवा अनुसार",
            link: "/revenue/report/taxpayerservicewise",
          },
          {
            list: " करदाता व्यापार अनुसार",
            link: "/revenue/report/taxpayerbusinesswise",
          },
          {
            list: " महालेखापरीक्षकक 102",
            link: "/revenue/report/malepa102",
          },
          {
            list: " महालेखापरीक्षकक 108",
            link: "/revenue/report/malepa108",
          },
          {
            list: "रद्द खाता कारोबार ",
            link: "/revenue/report/cancelledtransactionaccount",
          },
          {
            list: "IPT करदाता ",
            link: "/revenue/report/ipttaxpayer",
          },
          {
            list: "सेवा करदाता",
            link: "/revenue/report/servicetaxpayer",
          },
          {
            list: "वार्षिक कर दर विवरण",
            link: "/revenue/report/taxrateyearly",
          },
          {
            list: "वार्षिक कर विवरण",
            link: "/revenue/report/taxyearly",
          },
          {
            list: "व्यापार नवीकरण/दर्ता ",
            link: "/revenue/report/businessnawikaran",
          },
          {
            list: "दैनिक कार्य विवरण ",
            link: "/revenue/report/dailyworkdetail",
          },
        ],
      },
    ],
  },
];
export default revenue;





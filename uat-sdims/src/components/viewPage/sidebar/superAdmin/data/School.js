import { FaSchool } from "react-icons/fa";
const school = [
  {
    id: 1,
    title: "विद्यालय",
    link: "",
    icon: <FaSchool />,
    item: [
        {

            list  : "Academics",
            link : "/school/academics",

        },
        {
            list : "Examination & Result",
            link : "/school/examResult",
        },
        {
                list  : "Employee",
                link : "/school/employee",
        },
        {
            list : "School Billing",
            link : "/school/schoolBilling",
        },
        {
            list : "School Bus",
            link : "/school/schoolBus",
        },
        {
            list : "Online class",
            link : "/school/onlineClass",
        },
        {
            list  : " Notice Board",
            link : "/school/noticeBoard",
        },
        {
            list  : "Teacher Information ",
            link : "/school/teacherInfo",
        },
        {
            list : "Physical Details",
            link : "/school/physicalDetails",
        },
    ],
  },
];
export default school;

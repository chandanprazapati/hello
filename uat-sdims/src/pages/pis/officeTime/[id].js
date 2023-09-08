// import { yupResolver } from "@hookform/resolvers/yup";
// import { NepaliDatePicker } from "nepali-datepicker-reactjs";
// import { useRouter } from "next/router";
// import React, { use, useEffect, useState } from "react";
// import { set, useForm } from "react-hook-form";
// import { FaPlus } from "react-icons/fa";
// import { toast } from "react-toastify";
// import * as yup from "yup";
// const BS = require("bikram-sambat-js");
// import AddButton from "@/components/reusableDesign/AddButton";
// import CommonHeaderDesign from "@/components/reusableDesign/CommonHeaderDesign";
// import SeoOptimization from "@/components/reusableDesign/SeoOptimzation";
// import ViewPage from "@/components/viewPage/ViewPage";
// import { TimeSpanTimeOnly } from "@/utils/utility";
// import {
//   fetchDataWithAxiox,
//   postRequestWithAxiosInstance,
// } from "@/services/apiHelpers";

// export default function CreateOfficeTime({ response }) {
//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();
//   const router = useRouter();
//   const { status, data } = response;
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setValue,
//   } = useForm({
//     defaultValues: data,
//     resolver: yupResolver(
//       yup.object().shape({
//         startDate: yup.date().min(new Date("1950-01-01")).required(),
//         endDate: yup.date().min(new Date("1950-01-01")).required(),
//         startTime: yup.string().required(),
//         endTime: yup.string().required(),
//       })
//     ),
//   });

//   useEffect(() => {
//     if (data) {
//       setStartDate(BS.ADToBS(data.startDate || aa));
//       setEndDate(BS.ADToBS(data.endDate || aa));
//       setValue("startTime", TimeSpanTimeOnly(data.startTime));
//       setValue("endTime", TimeSpanTimeOnly(data.endTime));
//     }
//   }, [data,setValue]);

//   const onSubmit = async (formData) => {
//     const res = await postRequestWithAxiosInstance(
//       "/PIS/PisCommon/CreateOfficeTime",
//       formData
//     ).then((response) => {
//       if (response.status === true) {
//         toast.success(response.message, {
//           icon: "🚀",
//           autoClose: 1000,
//         });
//         router.push("/pis/officeTime");
//       }
//     });
//   };
//   useEffect(() => {
//     if (
//       status &&
//       data &&
//       data.startDate > new Date("1943-01-01") &&
//       data.endDate > new Date("1943-01-01")
//     ) {
//       setStartDate(BS.ADToBS(data.startDate));
//       setEndDate(BS.ADToBS(data.endDate));
//       setValue("startTime", TimeSpanTimeOnly(data.startTime));
//       setValue("endTime", TimeSpanTimeOnly(data.endTime));
//     }
//   }, [ data, status, setValue]);

//   return (
//     <React.Fragment>
//       <SeoOptimization title={"कार्यालयको समय"} />
//       <CommonHeaderDesign title={"कार्यालयको हाजिरी  राख्नुहोस"} />

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
//           <div className="relative  w-full mb-6 group">
//             <input type="hidden" {...register("id")} />
//             <label
//               htmlFor=""
//               className=" absolute text-[10px] text-blue-900 -top-[15%]"
//             >
//               सूरु मिति
//             </label>

//             <NepaliDatePicker
//               value={startDate}
//               className="peer"
//               onChange={(value) => {
//                 setValue("startDate", BS.BSToAD(value));
//               }}
//               options={{ calenderLocale: "ne", valueLocale: "en" }}
//             />
//             <input type="hidden" {...register("startDate")} />
//             <p> {errors?.startDate?.message}</p>
//           </div>
//           <div className="relative  w-full mb-6 group">
//             <label
//               htmlFor=""
//               className=" absolute text-[10px] text-blue-900 -top-[15%]"
//             >
//               अन्त्य मिति
//             </label>

//             <NepaliDatePicker
//               value={endDate}
//               className="peer"
//               onChange={(value) => {
//                 setValue("endDate", BS.BSToAD(value));
//               }}
//               options={{ calenderLocale: "ne", valueLocale: "en" }}
//             />
//             <input type="hidden" {...register("endDate")} />
//             <p> {errors?.endDate?.message}</p>
//           </div>
//           <div className="relative z-0 w-full mb-6 group">
//             <input type="time" className="peer" {...register("startTime")} />
//             <label className="label">पुरादिन सुरु समय</label>
//             <p> {errors?.startTime?.message}</p>
//           </div>
//           <div className="relative z-0 w-full mb-6 group">
//             <input type="time" className="peer" {...register("endTime")} />
//             <label className="label">पुरादिन अन्त्य समय</label>
//             <p> {errors?.endTime?.message}</p>
//           </div>
//         </div>
//         <AddButton
//           icon={<FaPlus />}
//           title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
//         />
//       </form>
//     </React.Fragment>
//   );
// }

// CreateOfficeTime.getInitialProps = async (context) => {
//   return {
//     response: await fetchDataWithAxiox(
//       "/PIS/PisCommon/GetOfficeTimeById/" + context.query.id,
//       context
//     ),
//   };
// };

import React from 'react'

export default function index() {
  return (
    <div>index</div>
  )
}


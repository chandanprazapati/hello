import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { post } from "../../../services/apiServices/common/post/postService";
const BS = require("bikram-sambat-js");
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { TextareaAutosize } from "@mui/material";
import { createPreviousOffice } from "../../../services/apiServices/pis/previousOfficeRecord/prerviosOfficeRecordService";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { previousOfficeValidationResolver } from "../../../utils/validateField";
const aa = new BikramSambat(new Date()).toBS();

export default function CreatePreviousOfficeRecord({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: previousOfficeValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      previousOfficeName: clickedIdData?.previousOfficeName,
      employeeId: clickedIdData?.employeeId,
      postId: clickedIdData?.postId,
      remarks: clickedIdData?.remarks,
    },
  });

  // submit function
  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          startDateNep: startNepDate,
          endDateNep: endNepDate,
          startDate: new Date(BS.BSToAD(startNepDate)),
          endDate: new Date(BS.BSToAD(endNepDate)),
        };

        try {
          createPreviousOffice(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/pis/previousOfficeRecord");
              return;
            } else response.status === false;
            {
              toast.error(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
            }
            return;
          });
        } catch (error) {
          toast.error(error.message);
        }
        resolve();
      }, 2000);
    });
  };
  // for post option data fetching and displayed down side
  const [apiDataPost, setApiDataPost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await post();
        if (status) {
          setApiDataPost(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const postOtions = apiDataPost.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.postId}
      >
        {item.name}
      </option>
    );
  });

  // for employee option data fetching and displayed down side
  const [apiDataEmployee, setApiDataEmployee] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await employee();
        if (status) {
          setApiDataEmployee(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const employeeoOtions = apiDataEmployee.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.employeeId}
      >
        {item.firstName}
      </option>
    );
  });

  // to set date in nepali date picker
  const [startNepDate, setStartNepDate] = useState(aa);
  const [endNepDate, setEndNepDate] = useState(aa);

  // for setting the values of start date and end date
  useEffect(() => {
    if (clickedIdData) {
      setStartNepDate(clickedIdData.startDateNep || aa);
      setEndNepDate(clickedIdData.endDateNep || aa);
    }
  }, [clickedIdData]);

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"पुरानो कार्यालयको विवरण थप्नुहोस्"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              कर्मचारी
              <span className="requiredField">*</span>
            </label>
            <select {...register("employeeId")} className="peer requiredField">
              <option value={""}>---- कर्मचारी चयन गर्नुहोस् ----</option>
              {employeeoOtions}
            </select>
            <p> {errors?.employeeId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("previousOfficeName")}
              placeholder="."
            />
            <label className="label">अघिल्लो कार्यालयको नाम</label>
            <p> {errors?.previousOfficeName?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              पद
              <span className="requiredField">*</span>
            </label>
            <select {...register("postId")} className="peer requiredField">
              <option value={""}>---- पद चयन गर्नुहोस् ----</option>
              {postOtions}
            </select>
            <p> {errors?.postId?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              सुरु मिति
            </label>

            <NepaliDatePicker
              value={startNepDate}
              className="peer"
              onChange={(e) => {
                setStartNepDate(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              अन्तिम मिति
            </label>

            <NepaliDatePicker
              value={endNepDate}
              className="peer"
              onChange={(e) => {
                setEndNepDate(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>कैफियत</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("remarks")}
              placeholder="write something here......"
            />
          </div>
        </div>

        <AddButton
          icon={<FaPlus />}
          disabled={isSubmitting}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        />
      </form>
    </React.Fragment>
  );
}

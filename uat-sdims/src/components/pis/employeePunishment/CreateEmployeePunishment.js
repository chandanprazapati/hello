import React, { useCallback, useEffect, useState } from "react";
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
import { shredi } from "../../../services/apiServices/common/shredi/shrediService";
import { punishment } from "../../../services/apiServices/common/punishment/punishmentService";
import { subPunishment } from "../../../services/apiServices/common/subPunishment/subPunishmentService";
import { CreateEmployeePunishment } from "../../../services/apiServices/pis/employeePunishment/employeePunishmentService";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { englishToNepali } from "../../../utils/utility";
const aa = new BikramSambat(new Date()).toBS();

export default function CreatePunishment({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver : emloyeePunishmentResolver,
    defaultValues: {
      id: clickedIdData?.id,
      decisionOrganization: clickedIdData?.decisionOrganization,
      period: clickedIdData?.period,
      employeeId: clickedIdData?.employeeId,
      postId: clickedIdData?.postId,
      shrediId: clickedIdData?.shrediId,
      remarks: clickedIdData?.remarks,
      punishmentId: clickedIdData?.punishmentId,
      subPunishmentId: clickedIdData?.subPunishmentId,
      remarks: clickedIdData?.remarks,
    },
  });

  // submit function
  const onSubmit = async (data) => {
    data = {
      ...data,
      startDateNep: new Date(BS.BSToAD(startDateNep)),
      endDateNep: new Date(BS.BSToAD(endDateNep)),
      decisionDateNep: new Date(BS.BSToAD(decisionDateNep)),
      startDateNep: startDateNep,
      endDateNep: endDateNep,
      decisionDateNep: decisionDateNep,
    };

    try {
      const response = await CreateEmployeePunishment(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/pis/employeePunishment");
      }
    } catch (error) {
      console.error(error);
    }
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
  const postOptions = apiDataPost.map((item) => {
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
        {item.firstName} {item.middleName} {item.lastName} [
        {englishToNepali(item.empCode)}]
      </option>
    );
  });

  // for shredi option data fetching and displayed down side
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await shredi();
        if (status) {
          setApiData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const shrediOptions = apiData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.shrediId}
      >
        {item.name}
      </option>
    );
  });

  // for punishment
  const [apiDataPunishment, setApiDataPunishment] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await punishment();
        if (status) {
          setApiDataPunishment(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const punishmentOptions = apiDataPunishment.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.punishmentId}
      >
        {item.name}
      </option>
    );
  });

  // for subPunishment
  const [apiDataSubPunishment, setApiSubDataPunishment] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await subPunishment();
        if (status) {
          setApiSubDataPunishment(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const subPunishmentOptions = apiDataSubPunishment.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.subPunishmentId}
      >
        {item.name}
      </option>
    );
  });

  //  for date
  const [startDateNep, setStartDateNep] = useState(aa);
  const [endDateNep, setEndDateNep] = useState(aa);
  const [decisionDateNep, setDecisionDateNep] = useState(aa);

  // for setting the values of start date and end date
  useEffect(() => {
    if (clickedIdData) {
      setStartDateNep(clickedIdData.startDateNep || aa);
      setEndDateNep(clickedIdData.endDateNep || aa);
      setDecisionDateNep(clickedIdData.decisionDateNep || aa);
    }
  }, [clickedIdData]);

  return (
    <>
      <CommonHeaderDesign title={"कर्मचारी सजाय विवरण थप्नुहोस्"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              कर्मचारी
              <span className="requiredField">*</span>
            </label>
            <select {...register("employeeId")} className="peer requiredField">
              <option value={""}>--- कर्मचारी छान्नुहोस् ---</option>
              {employeeoOtions}
            </select>
            <p> {errors?.employeeId?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              श्रेणी
              <span className="requiredField">*</span>
            </label>
            <select {...register("shrediId")} className="peer requiredField">
              <option value={""}>--- श्रेणी छान्नुहोस् ---</option>
              {shrediOptions}
            </select>
            <p> {errors?.shrediId?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              पद <span className="requiredField">*</span>{" "}
            </label>
            <select {...register("postId")} className="peer requiredField">
              <option value={""}>--- पद छान्नुहोस् ---</option>
              {postOptions}
            </select>
            <p> {errors?.postId?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              सजाय
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("punishmentId")}
              className="peer requiredField"
            >
              <option value={""}>--- सजाय छान्नुहोस् ---</option>
              {punishmentOptions}
            </select>
            <p> {errors?.punishmentId?.message} </p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              सजाय प्रकार
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("subPunishmentId")}
              className="peer requiredField"
            >
              <option value={""}>--- सजाय प्रकार छान्नुहोस् ---</option>
              {subPunishmentOptions}
            </select>
            <p> {errors?.subPunishmentId?.message} </p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              देखि मिति(बि.सं.)
            </label>

            <NepaliDatePicker
              value={startDateNep}
              className="peer"
              onChange={(e) => setStartDateNep(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              value={new Date(BS.BSToAD(startDateNep)).toLocaleDateString(
                "en-US"
              )}
              className="peer"
            />
            <label className="label">देखि देखि(ई.सं.)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              सम्म मिति(बि.सं.)
            </label>

            <NepaliDatePicker
              value={endDateNep}
              className="peer"
              onChange={(e) => setEndDateNep(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              value={new Date(BS.BSToAD(endDateNep)).toLocaleDateString(
                "en-US"
              )}
              className="peer"
            />
            <label className="label">सम्म सम्म(ई.सं.)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("decisionOrganization")}
              placeholder="."
            />
            <label className="label">निर्णायक संस्था </label>
            <p> {errors?.decisionOrganization?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              निर्णय मिति(बि.सं.)
            </label>

            <NepaliDatePicker
              value={decisionDateNep}
              className="peer"
              onChange={(e) => setDecisionDateNep(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              value={new Date(BS.BSToAD(decisionDateNep)).toLocaleDateString(
                "en-US"
              )}
              className="peer"
            />
            <label className="label">निर्णय मिति(ई.सं.)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("period")}
              placeholder="."
            />
            <label className="label">अवधि </label>
            <p> {errors?.period?.message}</p>
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
    </>
  );
}

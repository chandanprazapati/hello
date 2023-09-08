import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import { TextareaAutosize } from "@mui/material";
import { post } from "../../../services/apiServices/common/post/postService";
import "nepali-datepicker-reactjs/dist/index.css";
import { shredi } from "../../../services/apiServices/common/shredi/shrediService";
import { awardType } from "../../../services/apiServices/common/awardType/awardTypeService";
import { createAwardDetail } from "../../../services/apiServices/pis/awardDetail/awardDetailService";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { awardDetailValidateResolver } from "../../../utils/validateField";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
const aa = new BikramSambat(new Date()).toBS();
export default function CreateAwardDetail({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: awardDetailValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      awardProvidedBy: clickedIdData?.awardProvidedBy,
      employeeId: clickedIdData?.employeeId,
      postId: clickedIdData?.postId,
      shredi: clickedIdData?.shrediId,
      remarks: clickedIdData?.remarks,
      awardTypeId: clickedIdData?.awardTypeId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      data = {
        ...data,
        awardDateNep: awardDateNep,
        awardDate: new Date(BS.BSToAD(awardDateNep)),
      };
      try {
        if (isSubmitting) return;
        const response = await createAwardDetail(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/pis/awardDetail");
        } else if (response.status === false) {
          toast.error(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, isSubmitting]
  );

  // employee
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

  // for award option data fetching and displayed down side
  const [apiDataAward, setApiDataAward] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await awardType();
        if (status) {
          setApiDataAward(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const awardOtions = apiDataAward.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.awardTypeId}
      >
        {item.name}
      </option>
    );
  });

  // to set date
  const [awardDateNep, setAwardDateNep] = useState(aa);
  useEffect(() => {
    if (clickedIdData) {
      setAwardDateNep(clickedIdData?.awardDateNep || aa);
    }
  }, [clickedIdData]);
  return (
    <>
      <CommonHeaderDesign title={"पुरस्कार/तक्मा/बिभुसन विवरण थप्नुहोस्"} />
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
            <label className="label text-blue-900 ">
              क्षेडी
              <span className="requiredField">*</span>
            </label>
            <select {...register("shrediId")} className="peer requiredField">
              <option value={""}>--- क्षेडी छान्नुहोस् ---</option>
              {shrediOptions}
            </select>
            <p> {errors?.shrediId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              पद <span className="requiredField">*</span>
            </label>
            <select {...register("postId")} className="peer requiredField">
              <option value={""}>---- पद चयन गर्नुहोस् ----</option>
              {postOtions}
            </select>
            <p> {errors?.postId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              बिभुषणको नाम
              <span className="requiredField">*</span>
            </label>
            <select {...register("awardTypeId")} className="peer requiredField">
              <option value={""}>---- बिभुषणको चयन गर्नुहोस् ----</option>
              {awardOtions}
            </select>
            <p> {errors?.awardTypeId?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              विभूषण/सम्मान मिति
            </label>

            <NepaliDatePicker
              value={awardDateNep}
              className="peer"
              onChange={(e) => {
                setAwardDateNep(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>
              विभूषण/सम्मान प्रधानगर्ने कार्यालयकोनाम
              <span className="requiredField">*</span>
            </label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("awardProvidedBy")}
              placeholder="write something here......"
            />
            <p> {errors?.awardProvidedBy?.message}</p>
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

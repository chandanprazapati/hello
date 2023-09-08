import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../../components/reusableDesign/CommonHeaderDesign";
import SeoOptimization from "../../../../../components/reusableDesign/SeoOptimzation";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
const aa = new BikramSambat(new Date()).toBS();
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  createSanyojakSadasya,
  postApi,
} from "../../../../../services/apiServices/legalCase/legalCaseService";
import { ward } from "../../../../../services/apiServices/common/ward/wardService";
import AddButton from "../../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
export default function CreateSadasya({ clickedIdData }) {
  const router = useRouter();
  const titleRef = React.useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: personDetailValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      postId: clickedIdData?.postId,
      wardId: clickedIdData?.wardId,
      address: clickedIdData?.address,
      mobileNo: clickedIdData?.mobileNo,
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      approvedDate: approvedDate,
      renewDate: renewDate,
    };

    try {
      const response = await createSanyojakSadasya(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/legalCase/sanyojak/sadasya");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   for post
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await postApi();
        if (status) {
          setPostData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const postOptions = postData.map((item) => {
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

  //   for ward
  const [wardData, setWardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setWardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const wardOptions = wardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.wardId}
      >
        {item.name}
      </option>
    );
  });

    // For date picker
    const [approvedDate, setApprovedDate] = useState(aa);
    const [renewDate, setRenewDate] = useState(aa);
  
    useEffect(() => {
      if (clickedIdData) {
        setApprovedDate(clickedIdData?.approvedDate || aa);
        setRenewDate(clickedIdData?.renewDate || aa);
      }
    }, [clickedIdData]);

  return (
    <div>
      <CommonHeaderDesign title={"संयोजक / सदस्य राख्नुहोस  "} />
      <SeoOptimization title={"संयोजक / सदस्य"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. व्यक्तिगत विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              पुरा नाम थर
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.name?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              पद<span className="requiredField">*</span>
            </label>
            <select {...register("postId")} className="peer requiredField">
              <option value={""}>--- पद छान्नुहोस् ---</option>
              {postOptions}
            </select>
            <p> {errors?.postId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              वार्ड<span className="requiredField">*</span>
            </label>
            <select {...register("wardId")} className="peer requiredField">
              <option value={""}>--- वार्ड छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.wardId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("address")}
              placeholder="."
            />
            <label className="label">
              ठेगाना<span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.address?.message} </p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              स्वीकृत मिति
            </label>

            <NepaliDatePicker
              value={approvedDate}
              className="peer "
              onChange={(e) => setApprovedDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              नवीकरण मिति
            </label>

            <NepaliDatePicker
              value={renewDate}
              className="peer "
              onChange={(e) => setRenewDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("mobileNo")}
              placeholder="."
            />
            <label className="label">
              मोबाइल नम्बर <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.mobileNo?.message} </p>
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}

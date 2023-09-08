import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { TextareaAutosize } from "@mui/material";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { post } from "../../../services/apiServices/common/post/postService";
import { shredi } from "../../../services/apiServices/common/shredi/shrediService";
import { getDistrict } from "../../../services/apiServices/common/office/officeService";
import { country } from "../../../services/apiServices/common/country/countryService";
import { createAbroadVisit } from "../../../services/apiServices/pis/abroadVisit/abroadVisitService";
import { abroadVisitValidateResolver } from "../../../utils/validateField";
import "nepali-datepicker-reactjs/dist/index.css";
import AddButton from "../../reusableDesign/AddButton";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
const aa = new BikramSambat(new Date()).toBS();
export default function CreateAbroadVisit({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: abroadVisitValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      visitSubject: clickedIdData?.visitSubject,
      duration: clickedIdData?.duration,
      sponsor: clickedIdData?.sponsor,
      aimtoVisit: clickedIdData?.aimtoVisit,
      remarks: clickedIdData?.remarks,
      employeeId: clickedIdData?.employeeId,
      postId: clickedIdData?.postId,
      shrediId: clickedIdData?.shrediId,
      sifarisByEmployeeId: clickedIdData?.sifarisByEmployeeId,
      approvedByEmployeeId: clickedIdData?.approvedByEmployeeId,
      chooseVisitType: clickedIdData?.chooseVisitType,
      districtId: clickedIdData?.districtId,
      countryId: clickedIdData?.countryId,
    },
  });

  // watching thw value so that render the field according to the value
  const watchChooseVisitType = watch("chooseVisitType");

  const onSubmit = useCallback(
    async (data) => {
      try {
        data = {
          ...data,
          startDateNep: startDateNep,
          endDateNep: endDateNep,
          startDate: new Date(BS.BSToAD(startDateNep)),
          endDate: new Date(BS.BSToAD(endDateNep)),
        };
        if (isSubmitting) return;
        const response = await createAbroadVisit(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/pis/abroadVisit");
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
  const [apiDataSifarish, setApiDataSifarish] = useState([]);
  const [apiDataSwikriti, setApiDataSwikriti] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await employee();
        if (status) {
          setApiDataEmployee(data);
          setApiDataSifarish(data);
          setApiDataSwikriti(data);
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

  const sifarishoOtions = apiDataSifarish.map((item) => {
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

  const swikritiOtions = apiDataSwikriti.map((item) => {
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

  // to set date in nepali date picker
  const [startDateNep, setStartDateNep] = useState(aa);
  const [endDateNep, setEndDateNep] = useState(aa);

  // for setting the values of start date and end date
  useEffect(() => {
    if (clickedIdData) {
      setStartDateNep(clickedIdData.startDateNep || aa);
      setEndDateNep(clickedIdData.endDateNep || aa);
    }
  }, [clickedIdData]);

  // for country option data fetching and displayed down side
  const [apiDataCountry, setApiDataCountry] = useState([]);
  console.log(apiDataCountry, "apiDataCountry");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await country();
        if (status) {
          setApiDataCountry(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const countryOptions = apiDataCountry.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.countryId}
      >
        {item.name}
      </option>
    );
  });

  // for district option data fetching and displayed down side
  const [apiDataDistrict, setApiDataDistrict] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getDistrict();
        if (status) {
          setApiDataDistrict(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const districtOptions = apiDataDistrict.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.districtId}
      >
        {item.districtNameNep}
      </option>
    );
  });

  console.log(errors, "errors");
  return (
    <React.Fragment>
      <CommonHeaderDesign title={"भ्रमण विवरण थप्नुहोस्"} />
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
              पद
              <span className="requiredField">*</span>
            </label>
            <select {...register("postId")} className="peer requiredField">
              <option value={""}>---- पद चयन गर्नुहोस् ----</option>
              {postOtions}
            </select>
            <p> {errors?.postId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("visitSubject")}
              placeholder="."
            />
            <label className="label">
              भ्रमणको बिषय
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.visitSubject?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("aimtoVisit")}
              placeholder="."
            />
            <label className="label">
              भ्रमणको उद्देश्य
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.aimtoVisit?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("duration")}
              placeholder="."
            />
            <label className="label">
              भ्रमण अवधि
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.duration?.message}</p>
          </div>
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              सुरु मिति
            </label>

            <NepaliDatePicker
              value={startDateNep}
              className="peer"
              onChange={(e) => {
                setStartDateNep(e);
              }}
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
            <label className="label">मिति देखि(ई.सं.)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              अन्तिम मिति
            </label>

            <NepaliDatePicker
              value={endDateNep}
              className="peer"
              onChange={(e) => {
                setEndDateNep(e);
              }}
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
            <label className="label">मिति सम्म(ई.सं.)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              सिफारिस गर्ने
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("sifarisByEmployeeId")}
              className="peer requiredField"
            >
              <option value={""}>--- सिफारिस गर्ने छान्नुहोस् ---</option>
              {sifarishoOtions}
            </select>
            <p> {errors?.sifarisByEmployeeId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              स्वीकृत गर्ने
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("approvedByEmployeeId")}
              className="peer requiredField"
            >
              <option value={""}>--- स्वीकृत गर्ने छान्नुहोस् ---</option>
              {swikritiOtions}
            </select>
            <p> {errors?.approvedByEmployeeId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              भ्रमण प्रकार
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("chooseVisitType")}
              className="peer requiredField"
            >
              <option value={""}>--- भ्रमण प्रकार छान्नुहोस् ---</option>

              <option value={"स्वदेश"}>स्वदेश</option>
              <option value={"विदेश"}>विदेश</option>
            </select>
            <p> {errors?.chooseVisitType?.message}</p>
          </div>

          {watchChooseVisitType === "स्वदेश" ? (
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">जिल्ला</label>
              <select {...register("districtId")} className="peer">
                <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
                {districtOptions}
              </select>
              <p> {errors?.districtId?.message}</p>
            </div>
          ) : watchChooseVisitType === "विदेश" ? (
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">देश</label>
              <select {...register("countryId")} className="peer">
                <option value={""}>--- देश छान्नुहोस् ---</option>
                {countryOptions}
              </select>
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col gap-2">
            <label>कैफियत</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("remarks")}
              placeholder="write something here......"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>प्रायोजकको नाम</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("sponsor")}
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

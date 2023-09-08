import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { TextareaAutosize } from "@mui/material";
const BS = require("bikram-sambat-js");
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { post } from "../../../services/apiServices/common/post/postService";
import "nepali-datepicker-reactjs/dist/index.css";
import { shredi } from "../../../services/apiServices/common/shredi/shrediService";
import { country } from "../../../services/apiServices/common/country/countryService";
import { getDistrict } from "../../../services/apiServices/common/office/officeService";
import { talimType } from "../../../services/apiServices/common/talimType/talimTypeService";
import { CreateTrainingRecord } from "../../../services/apiServices/pis/training/trainingService";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { trainingRecordValidateResolver } from "../../../utils/validateField";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateTraining({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: trainingRecordValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      trainingOfficeName: clickedIdData?.trainingOfficeName,
      chooseTrainingType: clickedIdData?.chooseTrainingType,
      trainingDetailAndsubject: clickedIdData?.trainingDetailAndsubject,
      employeeId: clickedIdData?.employeeId,
      postId: clickedIdData?.postId,
      shrediId: clickedIdData?.shrediId,
      countryId: clickedIdData?.countryId,
      districtId: clickedIdData?.districtId,
      talimTypeId: clickedIdData?.talimTypeId,
      remarks: clickedIdData?.remarks,
    },
  });

  // submit function
  const onSubmit = async (data) => {
    data = {
      ...data,
      startDateNep: new Date(BS.BSToAD(startDateNep)),
      endDateNep: new Date(BS.BSToAD(endDateNep)),
      startDateNep: startDateNep,
      endDateNep: endDateNep,
    };

    try {
      const response = await CreateTrainingRecord(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/pis/trainingRecord");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // post
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await post();
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

  // employee
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await employee();
        if (status) {
          setEmployeeData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const employeeOptions = employeeData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.id}
      >
        {`${item?.firstName} ${item?.lastName} [${item.empCode}]`}
      </option>
    );
  });

  // shredi
  const [shrediData, setShrediData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await shredi();
        if (status) {
          setShrediData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const shrediOptions = shrediData.map((item) => {
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

  // country
  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await country();
        if (status) {
          setCountryData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const countryOptions = countryData.map((item) => {
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

  //   for district
  const [districtData, setDistrictData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getDistrict();
        if (status) {
          setDistrictData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const districtOptions = districtData.map((item) => {
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

  //   for talimType
  const [talimData, setTalimData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await talimType();
        if (status) {
          setTalimData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const talimOptions = talimData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.talimTypeId}
      >
        {item.name}
      </option>
    );
  });

  // for date picker
  const [startDateNep, setStartDateNep] = useState(aa);
  const [endDateNep, setEndDateNep] = useState(aa);
  // for setting the values of start date and end date
  useEffect(() => {
    if (clickedIdData) {
      setStartDateNep(clickedIdData.startDateNep || aa);
      setEndDateNep(clickedIdData.endDateNep || aa);
    }
  }, [clickedIdData]);

  return (
    <>
      <CommonHeaderDesign title={"प्रशिक्षण विवरण थप्नुहोस्"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              कर्मचारी
              <span className="requiredField">*</span>
            </label>
            <select {...register("employeeId")} className="peer requiredField">
              <option value={""}>--- कर्मचारी छान्नुहोस् ---</option>
              {employeeOptions}
            </select>
            <p> {errors?.employeeId?.message} </p>
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
            <p> {errors?.shrediId?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              पद
              <span className="requiredField">*</span>
            </label>
            <select {...register("postId")} className="peer requiredField">
              <option value={""}>--- पद छान्नुहोस् ---</option>
              {postOptions}
            </select>
            <p> {errors?.postId?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              देश
              <span className="requiredField">*</span>
            </label>
            <select {...register("countryId")} className="peer requiredField">
              <option value={""}>--- देश छान्नुहोस् ---</option>
              {countryOptions}
            </select>
            <p> {errors?.countryId?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              जिल्ला
              <span className="requiredField">*</span>
            </label>
            <select {...register("districtId")} className="peer requiredField">
              <option value={""} selected disabled>
                --- जिल्ला छान्नुहोस् ---
              </option>
              {districtOptions}
            </select>
            <p> {errors?.districtId?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              तालिम प्रशिक्षण प्रकार
              <span className="requiredField">*</span>
            </label>
            <select {...register("talimTypeId")} className="peer requiredField">
              <option value={""}>
                --- तालिम प्रशिक्षण प्रकार छान्नुहोस् ---
              </option>
              {talimOptions}
            </select>
            <p> {errors?.talimTypeId?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("trainingOfficeName")}
              placeholder="."
            />
            <label className="label">
              प्रशिक्षण कार्यालय नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.trainingOfficeName?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("chooseTrainingType")}
              placeholder="."
            />
            <label className="label">
              प्रशिक्षण प्रकार नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.chooseTrainingType?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("trainingDetailAndsubject")}
              placeholder="."
            />
            <label className="label">प्रशिक्षण विस्तार / विषय </label>
            <p> {errors?.trainingDetailAndsubject?.message}</p>
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
              onChange={(e) => setStartDateNep(e)}
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
              value={endDateNep}
              className="peer"
              onChange={(e) => setEndDateNep(e)}
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
    </>
  );
}

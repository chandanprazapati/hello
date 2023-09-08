import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../../services/apiServices/common/office/officeService";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
import { aadivasiValidationResolver } from "../../../../utils/validateField";
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import { TextareaAutosize } from "@mui/material";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateGharJaggaKar({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aadivasiValidationResolver,
    // defaultValues: {
    //   id: clickedIdData?.id,
    //   nameThar: clickedIdData?.nameThar,
    //   fullName: clickedIdData?.fullName,
    //   genderId: clickedIdData?.genderId,
    //   permaPradeshId: clickedIdData?.permaPradeshId,
    //   prmajillaId: clickedIdData?.prmajillaId,
    //   permaPalikaId: clickedIdData?.permaPalikaId,
    //   permaWardNo: clickedIdData?.permaWardNo,
    //   nagritaPraPaNo: clickedIdData?.nagritaPraPaNo,
    //   nagariktaIssueDistrictId: clickedIdData?.nagariktaIssueDistrictId,
    //   grandfatherNaamThar: clickedIdData?.grandfatherNaamThar,
    //   grandfatherFullName: clickedIdData?.grandfatherFullName,
    //   fatherNaamThar: clickedIdData?.fatherNaamThar,
    //   fatherFullName: clickedIdData?.fatherFullName,
    //   jaati: clickedIdData?.jaati,
    //   aadibasiTypeId: clickedIdData?.aadibasiTypeId,
    //   govtSuchikrit: clickedIdData?.govtSuchikrit,
    // },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      nagariktIssueDate: nagariktIssueDate,
    };

    console.log(data, "data");
    // try {
    //   const response = await insertAwabihawit(data);
    //   if (response.status === true) {
    //     toast.success(response.message, {
    //       icon: "🚀",
    //       autoClose: 1000,
    //     });
    //     router.push("/sifarish/adivasi");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

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
  const nagritaDistrictOptions = apiDataDistrict.map((item) => {
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

  // for state
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setStateData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // permanent address
  const stateValue = watch("stateId");
  const districtValue = watch("districtId");

  const stateOptions = stateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.stateId}
      >
        {item.stateNameNep}
      </option>
    );
  });

  // district
  const [districtData, setDistrictData] = useState([]);
  //   const []
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(stateValue);
        if (response.status === true) {
          setDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [stateValue]);

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

  // palika
  const [palikaData, setPalikaData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(districtValue);
        if (response.status === true) {
          setPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [districtValue]);

  const palikaOptions = palikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.palikaId}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  // for ward
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
  const [nagariktIssueDate, setNagariktIssueDate] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setNagariktIssueDate(clickedIdData?.nagariktIssueDate || aa);
    }
  }, [clickedIdData]);

  return (
    <>
      <CommonHeaderDesign title={"घर बाटो प्रमाणित सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १.व्यक्तिगत विवरण
        </div>

        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              पूरा नाम थर <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर (In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("nagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">
              नागरिकता प्रमाणपत्र नं. <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.nagariktaPraPaNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("nagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">
              फोन नं. <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.nagariktaPraPaNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">मार्फत </label>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          (क).स्थायी ठेगाना
        </div>

        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              प्रदेश <span className="requiredField">*</span>{" "}
            </label>
            <select
              {...register("permaPradeshId")}
              className="peer requiredField"
            >
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
            <p> {errors?.permaPradeshId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              जिल्ला<span className="requiredField">*</span>
            </label>
            <select
              {...register("permaDistrictId")}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं<span className="requiredField">*</span>
            </label>
            <select
              {...register("permaDistrictId")}
              className="peer requiredField"
            >
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा.<span className="requiredField">*</span>
            </label>
            <select
              {...register("permaDistrictId")}
              className="peer requiredField"
            >
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          (ख).अस्थायी ठेगाना
        </div>

        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              प्रदेश <span className="requiredField">*</span>{" "}
            </label>
            <select
              {...register("permaPradeshId")}
              className="peer requiredField"
            >
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
            <p> {errors?.permaPradeshId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              जिल्ला<span className="requiredField">*</span>
            </label>
            <select
              {...register("permaDistrictId")}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं<span className="requiredField">*</span>
            </label>
            <select
              {...register("permaDistrictId")}
              className="peer requiredField"
            >
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा.<span className="requiredField">*</span>
            </label>
            <select
              {...register("permaDistrictId")}
              className="peer requiredField"
            >
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. घर जग्गाको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              घर नं. <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              कित्ता नं. <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              क्षेत्रफल <span className="requiredField">*</span>{" "}
            </label>
          </div>


          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              निर्माण मिति 
            </label>

            <NepaliDatePicker
              value={nagariktIssueDate}
              className="peer "
              onChange={(e) => setNagariktIssueDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

       

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">Length</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">Breadth</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">Height</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">GharDesigin</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">RoadType</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">बाटो</label>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          ३. जग्गा ठेगाना
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("permaPradeshId")} className="peer">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
            <p> {errors?.permaPradeshId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("permaDistrictId")} className="peer">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वडा नं</label>
            <select {...register("permaDistrictId")} className="peer">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("permaDistrictId")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>
        </div>

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}

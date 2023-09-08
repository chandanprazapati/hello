import React, { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTrash, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../../services/apiServices/common/office/officeService";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateTwoNameOnePerson({ clickedIdData }) {
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

  //   design
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animate-up");
  }, []);

    // For date picker
    const [nagariktIssueDate, setNagariktIssueDate] = useState(aa);
    const [janmaMiti, setJanmaMiti] = useState(aa);

    useEffect(() => {
      if (clickedIdData) {
        setNagariktIssueDate(clickedIdData?.nagariktIssueDate || aa);
        setJanmaMiti(clickedIdData?.janmaMiti || aa);
      }
    }, [clickedIdData]);

  return (
    <>
      <CommonHeaderDesign title={"दुई नाम एक व्यक्ति सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
        १. व्यक्तिगत विवरण
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
            पुरा नाम
              <span className="requiredField">*</span>{" "}
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
            पुरा नाम(English) <span className="requiredField">*</span>{" "}
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
            अर्को पुरा नाम <span className="requiredField">*</span>{" "}
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
            अर्को पुरा नाम(English) <span className="requiredField">*</span>{" "}
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
            अर्को पुरा नाम <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              जन्म मिति
            </label>

            <NepaliDatePicker
              value={janmaMiti}
              className="peer "
              onChange={(e) => setJanmaMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
            नागरिकता नं  <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
            नागरिकता जन्म मिति
            </label>

            <NepaliDatePicker
              value={nagariktIssueDate}
              className="peer "
              onChange={(e) => setNagariktIssueDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
            नागरिकता  जारी जिल्ला<span className="requiredField">*</span>
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

         
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
        २. ठेगाना
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
        ३. बाबु/आमा को विवरण
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
            बुबाको नाम 
              <span className="requiredField">*</span>{" "}
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
            बुबाको नाम(English) 
              <span className="requiredField">*</span>{" "}
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
            बुबाको नागरिकता नं 
              <span className="requiredField">*</span>{" "}
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
            आमाको नाम 
              <span className="requiredField">*</span>{" "}
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
            आमाको नाम(English) 
              <span className="requiredField">*</span>{" "}
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
            आमाको नागरिकता नं 
              <span className="requiredField">*</span>{" "}
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
            पुरा नाम
              <span className="requiredField">*</span>{" "}
            </label>
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

import React, { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTrash, FaTrashAlt } from "react-icons/fa";
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
import { relation } from "../../../../services/apiServices/common/relation/realtionService";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";
import { gender } from "../../../../services/apiServices/common/gender/genderService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateMritakHakdarko({ clickedIdData }) {
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

  //   for relation
  const [relationData, setRelationData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await relation();
        if (status) {
          setRelationData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const relationOptions = relationData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.relationId}
      >
        {item.name}
      </option>
    );
  });

  //   for gender
  const [genderData, setGenderData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await gender();
        if (status) {
          setGenderData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const genderOptions = genderData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.genderId}
      >
        {item.name}
      </option>
    );
  });

  // For date picker
  const [nagariktIssueDate, setNagariktIssueDate] = useState(aa);
  const [nataPramanitMiti, setNataPramanitMiti] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setNagariktIssueDate(clickedIdData?.nagariktIssueDate || aa);
      setNataPramanitMiti(clickedIdData?.nataPramanitMiti || aa);
    }
  }, [clickedIdData]);

  //   for dynamic form
  const [personDetails, setPersonDetails] = useState([
    {
      name: "",
      relationId: "",
      fatherName: "",
      nagritaNo: "",
      gharNo: "",
      bato: "",
    },
  ]);

  const handleAddPersonDetails = () => {
    setPersonDetails([
      ...personDetails,
      {
        name: "",
        relationId: "",
        fatherName: "",
        nagritaNo: "",
        gharNo: "",
        bato: "",
      },
    ]);
  };

  const handleDeletePersonDetails = (index) => {
    const list = [...personDetails];
    list.splice(index, 1);
    setPersonDetails(list);
  };

  const handleNameChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleFatherNameChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleNagritaNoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleGharNoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleBatoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleRelationChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  //   design
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animate-up");
  }, []);
  return (
    <>
      <CommonHeaderDesign title={"मृतक हकदारको सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              दर्ता मिति
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
              className="peer  "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर (English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              लिङ्ग <span className="requiredField">*</span>{" "}
            </label>
            <select
              {...register("permaPradeshId")}
              className="peer requiredField"
            >
              <option value={""}>--- लिङ्ग छान्नुहोस् ---</option>
              {genderOptions}
            </select>
            <p> {errors?.permaPradeshId?.message}</p>
          </div>

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

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              नाता प्रमाणित दर्ता मिति
            </label>

            <NepaliDatePicker
              value={nataPramanitMiti}
              className="peer "
              onChange={(e) => setNataPramanitMiti(e)}
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
            <label className="label">नाता प्रमाणित दर्ता नं</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              मृतक नाम थर<span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">मृतक नाम थर(In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              नाता प्रमाणित गा.पा./न.पा.<span className="requiredField">*</span>
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

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              जम्मा हकदारहरु<span className="requiredField">*</span>{" "}
            </label>
          </div>
        </div>

        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold">२. हकदारहरुको विवरण</text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddPersonDetails}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>

        <div className="text-lg font-bold  py-4 flex justify-between px-20 ">
          <div className=" ">
            नाम थर <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            नाता <span className="text-red-500">*</span>{" "}
          </div>
          <div className="  ">
            बाबुको नाम <span className="text-red-500">*</span>{" "}
          </div>
          <div className="  ">
            {" "}
            नागरिकता नं. <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">
            घर नं. <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">
            बाटोको नाम <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">कार्य </div>
        </div>

        {personDetails.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-7 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="name"
                value={detail.name}
                onChange={(e) => handleNameChange(e, index)}
                placeholder="."
              />

              <select
                className="border-2 border-gray-300  rounded-lg "
                name="relationId"
                value={detail.relationId}
                onChange={(e) => handleRelationChange(e, index)}
                placeholder="."
              >
                <option value="">-----नाता छान्नुहोस्-----</option>
                {relationOptions}
              </select>

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="fatherName"
                value={detail.fatherName}
                onChange={(e) => handleFatherNameChange(e, index)}
                placeholder="."
              />

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="nagritaNo"
                value={detail.nagritaNo}
                onChange={(e) => handleNagritaNoChange(e, index)}
                placeholder="."
              />

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="gharNo"
                value={detail.gharNo}
                onChange={(e) => handleGharNoChange(e, index)}
                placeholder="."
              />

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="bato"
                value={detail.bato}
                onChange={(e) => handleBatoChange(e, index)}
                placeholder="."
              />

              <div className="py-2">
                {personDetails.length > 1 && (
                  <div className="flex justify-center   ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeletePersonDetails(index)}
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          ३. निवेदकको विवरण
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
              className="peer  "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर (English)</label>
          </div>

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

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              ना.प्र.प.नं. <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              ना.प्र.प जारी जिल्ला.<span className="requiredField">*</span>
            </label>
            <select
              {...register("permaDistrictId")}
              className="peer requiredField"
            >
              <option value={""}>
                --- ना.प्र.प जारी जिल्ला. छान्नुहोस् ---
              </option>
              {nagritaDistrictOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              ना.प्र.प जारी मिति
            </label>

            <NepaliDatePicker
              value={nagariktIssueDate}
              className="peer "
              onChange={(e) => setNagariktIssueDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
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

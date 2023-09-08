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
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { relation } from "../../../../services/apiServices/common/relation/realtionService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateThreePuste({ clickedIdData }) {
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

  //   design
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animate-up");
  }, []);

  // For date picker
  const [nagariktIssueDate, setNagariktIssueDate] = useState(aa);
  const [dartaMiti, setDartaMiti] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setNagariktIssueDate(clickedIdData?.nagariktIssueDate || aa);
      setDartaMiti(clickedIdData?.janmaMiti || aa);
    }
  }, [clickedIdData]);

  //   for dynamic form jaaga biwaran
  const [personDetails, setPersonDetails] = useState([
    {
      details: "",
      kittaNo: "",
      seatNo: "",
      area: "",
      remarks: "",
    },
  ]);

  const handleAddPersonDetails = () => {
    setPersonDetails([
      ...personDetails,
      {
        details: "",
        kittaNo: "",
        seatNo: "",
        area: "",
        remarks: "",
      },
    ]);
  };

  const handleDeletePersonDetails = (index) => {
    const list = [...personDetails];
    list.splice(index, 1);
    setPersonDetails(list);
  };

  const handleDetailsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleKittaNoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleSeatNoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleAreaChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleRemarksChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  //   for dynamic form three puste biwaran

  const [threePusteDetails, setThreePuSteDetails] = useState([
    {
      name: "",
      nameEng: "",
      relationId: "",
      nagritaNo: "",
      nagariktIssueDate: "",
      nagritaIssueDistrict: "",
    },
  ]);

  const handleAddThreePusteDetails = () => {
    setThreePuSteDetails([
      ...threePusteDetails,
      {
        name: "",
        nameEng: "",
        relationId: "",
        nagritaNo: "",
        nagariktIssueDate: "",
        nagritaIssueDistrict: "",
      },
    ]);
  };

  const handleDeleteThreePusteDetails = (index) => {
    const list = [...threePusteDetails];
    list.splice(index, 1);
    setThreePuSteDetails(list);
  };

  const handleNameChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleNameEngChange = (e, index) => {
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

  const handleNagritaNoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleNagritaIssueDateChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  const handleNagritaIssueDistrictChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...personDetails];
    list[index][name] = value;
    setPersonDetails(list);
  };

  return (
    <>
      <SeoOptimization title={"Three Puste"} />
      <CommonHeaderDesign title={"तीन पुस्ते सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. विवरण
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
              नाम थर <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">नाम(English) </label>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              दर्ता मिति
            </label>

            <NepaliDatePicker
              value={dartaMiti}
              className="peer "
              onChange={(e) => setDartaMiti(e)}
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
              ना.प्र.प.नं. <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              ना.प्र.प.नं. जिल्ला<span className="requiredField">*</span>
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
          ३. अस्थायी ठेगाना
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

        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold">२. जग्गाको विवरण</text>

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

        <div className="text-lg font-bold  py-4 flex  pr-10 justify-around ">
          <div className=" ">
            विवरण <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">
            कित्ता नं. <span className="text-red-500">*</span>{" "}
          </div>
          <div className="  ">
            सिट नं <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            क्षेत्रफल <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            कैफियत <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">कार्य </div>
        </div>

        {personDetails.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-6 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="details"
                value={detail.details}
                onChange={(e) => handleDetailsChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="kittaNo"
                value={detail.kittaNo}
                onChange={(e) => handleKittaNoChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="name"
                value={detail.seatNo}
                onChange={(e) => handleSeatNoChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="area"
                value={detail.area}
                onChange={(e) => handleAreaChange(e, index)}
                placeholder="."
              />

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="remarks"
                value={detail.remarks}
                onChange={(e) => handleRemarksChange(e, index)}
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

        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold">३. तीन पुस्ते विवरण</text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddThreePusteDetails}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>

        <div className="text-lg font-bold  py-4 flex   justify-between px-10 pr-20 ">
          <div className=" ">
            नाम(नेपाली) <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">
            नाम(अंग्रेजीमा) <span className="text-red-500">*</span>{" "}
          </div>
          <div className="  ">
            नाता<span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            ना.प्र.प.नं. <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            ना.प्र.प मिति <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            ना.प्र.प जिल्ला <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">कार्य </div>
        </div>

        {threePusteDetails.map((detail, index) => {
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
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="nameEng"
                value={detail.nameEng}
                onChange={(e) => handleNameEngChange(e, index)}
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
                name="nagritaNo"
                value={detail.nagritaNo}
                onChange={(e) => handleNagritaNoChange(e, index)}
                placeholder="."
              />
              <div className="border-2 rounded-md border-gray-300  items-center flex justify-center pl-4 ">
                <NepaliDatePicker
                  value={detail.nagariktIssueDate}
                  className="peer "
                  onChange={(e) => handleNagritaIssueDateChange(e, index)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </div>

              <select
                className="border-2 border-gray-300  rounded-lg "
                name="nagritaIssueDistrict"
                value={detail.nagritaIssueDistrict}
                onChange={(e) => handleNagritaIssueDistrictChange(e, index)}
                placeholder="."
              >
                <option value="">-----जिल्ला छान्नुहोस्-----</option>
                {relationOptions}
              </select>

              <div className="py-2">
                {threePusteDetails.length > 1 && (
                  <div className="flex justify-center   ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeleteThreePusteDetails(index)}
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
          ४. निवेदकको विवरण
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
              नाम थर <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">नाम(English) </label>
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

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              ना.प्र.प.नं. जिल्ला<span className="requiredField">*</span>
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

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}

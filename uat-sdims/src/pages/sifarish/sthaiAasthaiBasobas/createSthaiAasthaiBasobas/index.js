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
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { insertBasobas } from "../../../../services/apiServices/sifarish/sthaiAsthaiBasobas/sthaiAsthaiBasobasService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateSthaiAasthaiBasobas({ clickedIdData }) {
  useEffect(() => {
    if (clickedIdData) {
      setBasobasGharDetailModelList(
        clickedIdData?.basobasGharDetailModelList || [
          {
            tole: "",
            bato: "",
            gharNo: "",
          },
        ]
      );
    }
  }, [clickedIdData]);

  useEffect(() => {
    if (clickedIdData) {
      setBasobasFamilyList(
        clickedIdData?.basobasFamilyList || [
          {
            name: "",
            relationId: "",
            remarks: "",
          },
        ]
      );
    }
  }, [clickedIdData]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aadivasiValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      basobasTypeId: clickedIdData?.basobasTypeId,
      naamThar: clickedIdData?.naamThar,
      fullName: clickedIdData?.fullName,
      basobasMiti: clickedIdData?.basobasMiti,
      nagariktaPraPaNo: clickedIdData?.nagariktaPraPaNo,

      nagariktaIssueDistrictId: clickedIdData?.nagariktaIssueDistrictId,
      permaPradeshId: clickedIdData?.permaPradeshId,
      permaJillaId: clickedIdData?.clickedIdData?.permaJillaId,
      permaPalikaId: clickedIdData?.clickedIdData?.permaPalikaId,
      permaWardNo: clickedIdData?.clickedIdData?.permaWardNo,

      ghardhaniNaamThar: clickedIdData?.ghardhaniNaamThar,
      ghardhaniFullName: clickedIdData?.ghardhaniFullName,
      ghardhaniNagariktaPraPaNo: clickedIdData?.ghardhaniNagariktaPraPaNo,
      basobasNivedak: {
        infNaamThar: clickedIdData?.basobasNivedak?.infNaamThar,
        infFullName: clickedIdData?.basobasNivedak?.infFullName,
        infNagariktaPraPaNo: clickedIdData?.basobasNivedak?.infNagariktaPraPaNo,
        infNagariktaIssueDistrictId:
          clickedIdData?.basobasNivedak?.infNagariktaIssueDistrictId,
        infNagariktaIssueDate:
          clickedIdData?.basobasNivedak?.infNagariktaIssueDate,
        infStateId: clickedIdData?.basobasNivedak?.infStateId,
        infDistrictId: clickedIdData?.basobasNivedak?.infDistrictId,
        infPalikaId: clickedIdData?.basobasNivedak?.infPalikaId,
        infWardNo: clickedIdData?.basobasNivedak?.infWardNo,
      },
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      basobasMiti: basobasMiti,
      nagariktIssueDate: nagariktIssueDate,
      basobasNivedak: {
        ...data.basobasNivedak,
        infNagariktaIssueDate: infNagariktaIssueDate,
      },
      basobasGharDetailModelList: basobasGharDetailModelList,
      basobasFamilyList: basobasFamilyList,
    };

    console.log(data, "data");
    try {
      const response = await insertBasobas(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/sthaiAasthaiBasobas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const watchFields = watch();

  // for state
  const [stateData, setStateData] = useState([]);
  // const [nivedakStateData, setNivedakStateData] = useState([]);

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getAllState();
  //       if (response.status === true) {
  //         setNivedakStateData(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const stateOptions = stateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.permaPradeshId}
      >
        {item.stateNameNep}
      </option>
    );
  });

  // const nivedakStateOptions = nivedakStateData.map((item) => {
  //   return (
  //     <option
  //       value={item.stateId}
  //       key={item.stateId}
  //       selected={item.stateId === clickedIdData?.infStateId}
  //     >
  //       {item.stateNameNep}
  //     </option>
  //   );
  // });

  // district
  const [districtData, setDistrictData] = useState([]);
  // const [nivedakDistrictData, setNivedakDistrictData] = useState([]);
  // console.log(nivedakDistrictData, "dataaa");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.permaPradeshId);
        if (response.status === true) {
          setDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.permaPradeshId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getDistrict(watchFields?.infStateId);
  //       if (response.status === true) {
  //         setNivedakDistrictData(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [watchFields?.infStateId]);

  const districtOptions = districtData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.permaJillaId}
      >
        {item.districtNameNep}
      </option>
    );
  });

  // const nivedakdistrictOption = nivedakDistrictData.map((item) => {
  //   return (
  //     <option
  //       value={item.districtId}
  //       key={item.districtId}
  //       selected={item.districtId === clickedIdData?.infDistrictId}
  //     >
  //       {item.districtNameNep}
  //     </option>
  //   );
  // });

  // palika
  const [palikaData, setPalikaData] = useState([]);
  // const [nivedakPalikaData, setNivedakPalikaData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.permaJillaId);
        if (response.status === true) {
          setPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.permaJillaId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getPalika(watchFields?.infPalikaId);
  //       if (response.status === true) {
  //         setNivedakPalikaData(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [watchFields?.infPalikaId]);

  const palikaOptions = palikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.permaPalikaId}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  // const nivedakpalikaOptions = nivedakPalikaData.map((item) => {
  //   return (
  //     <option
  //       value={item.palikaId}
  //       key={item.palikaId}
  //       selected={item.palikaId === clickedIdData?.infPalikaId}
  //     >
  //       {item.palikaNameNep}
  //     </option>
  //   );
  // });

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
        selected={item.id === clickedIdData?.permaWardNo}
      >
        {item.name}
      </option>
    );
  });

  // const nivedakWardOptions = wardData.map((item) => {
  //   return (
  //     <option
  //       value={item.id}
  //       key={item.id}
  //       selected={item.id === clickedIdData?.infWardNo}
  //     >
  //       {item.name}
  //     </option>
  //   );
  // });

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
        selected={item.id === clickedIdData?.clickedIdData?.relationId}
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
  const [basobasMiti, setBasobasMiti] = useState(aa);
  const [infNagariktaIssueDate, setInfNagariktaIssueDate] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setNagariktIssueDate(clickedIdData?.nagariktIssueDate || aa);
      setBasobasMiti(clickedIdData?.basobasMiti || aa);
      setInfNagariktaIssueDate(clickedIdData?.infNagariktaIssueDate || aa);
    }
  }, [clickedIdData]);

  //   for dynamic form jaaga biwaran
  const [basobasGharDetailModelList, setBasobasGharDetailModelList] = useState([
    {
      tole: "",
      bato: "",
      gharNo: "",
    },
  ]);

  const handleAddPersonDetails = () => {
    setBasobasGharDetailModelList([
      ...basobasGharDetailModelList,
      {
        tole: "",
        bato: "",
        gharNo: "",
      },
    ]);
  };

  const handleDeletePersonDetails = (index) => {
    const list = [...basobasGharDetailModelList];
    list.splice(index, 1);
    setBasobasGharDetailModelList(list);
  };

  const handleToleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...basobasGharDetailModelList];
    list[index][name] = value;
    setBasobasGharDetailModelList(list);
  };

  const handleBatoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...basobasGharDetailModelList];
    list[index][name] = value;
    setBasobasGharDetailModelList(list);
  };

  const handleGharNoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...basobasGharDetailModelList];
    list[index][name] = value;
    setBasobasGharDetailModelList(list);
  };

  //   for dynamic form three puste biwaran

  const [basobasFamilyList, setBasobasFamilyList] = useState([
    {
      name: "",
      relationId: "",
      remarks: "",
    },
  ]);

  const handleAddThreePusteDetails = () => {
    setBasobasFamilyList([
      ...basobasFamilyList,
      {
        name: "",
        relationId: "",
        remarks: "",
      },
    ]);
  };

  const handleDeleteThreePusteDetails = (index) => {
    const list = [...basobasFamilyList];
    list.splice(index, 1);
    setBasobasFamilyList(list);
  };

  const handleNameChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...basobasFamilyList];
    list[index][name] = value;
    setBasobasFamilyList(list);
  };

  const handleRelationChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...basobasFamilyList];
    list[index][name] = value;
    setBasobasFamilyList(list);
  };

  const handleRemarksChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...basobasFamilyList];
    list[index][name] = value;
    setBasobasFamilyList(list);
  };

  return (
    <>
      <SeoOptimization title={"Sthai Aasthai Basobas "} />

      <CommonHeaderDesign title={"स्थाई/अस्थाई बसोबास सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <FormLabel id="demo-row-radio-buttons-group-label">
          बसोबास प्रकार <span className="text-lg text-red-500">*</span>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="1"
            {...register("basobasTypeId")}
            control={<Radio />}
            label="स्थाई"
          />
          <FormControlLabel
            value="2"
            {...register("basobasTypeId")}
            control={<Radio />}
            label="अस्थाई"
          />
        </RadioGroup>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. बसोबास गर्नेको विवरण
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
              {...register("fullName")}
              placeholder="."
            />
            <label className="label">नाम(English) </label>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              बसोबास गरेको मिति
            </label>

            <NepaliDatePicker
              value={basobasMiti}
              className="peer "
              onChange={(e) => setBasobasMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("nagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">
              ना.प्र.प.नं. <span className="requiredField">*</span>{" "}
            </label>
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

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              ना.प्र.प.नं. जिल्ला<span className="requiredField">*</span>
            </label>
            <select
              {...register("nagariktaIssueDistrictId")}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
            <p> {errors?.nagariktaIssueDistrictId?.message}</p>
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
              {...register("permaJillaId")}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
            <p> {errors?.permaJillaId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं<span className="requiredField">*</span>
            </label>
            <select {...register("permaWardNo")} className="peer requiredField">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.permaWardNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा.<span className="requiredField">*</span>
            </label>
            <select
              {...register("permaPalikaId")}
              className="peer requiredField"
            >
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.permaPalikaId?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. घरधनीको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("ghardhaniNaamThar")}
              placeholder="."
            />
            <label className="label">
              नाम थर <span className="requiredField">*</span>{" "}
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("ghardhaniFullName")}
              placeholder="."
            />
            <label className="label">नाम थर(In English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("ghardhaniNagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">
              ना.प्र.प.नं. <span className="requiredField">*</span>{" "}
            </label>
          </div>
        </div>

        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold">३. घरको विवरण</text>

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
            टोल <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">बाटो</div>
          <div className="  ">घर नं</div>

          <div className=" ">कार्य </div>
        </div>

        {basobasGharDetailModelList.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-4 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="tole"
                value={detail.tole}
                onChange={(e) => handleToleChange(e, index)}
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
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="gharNo"
                value={detail.gharNo}
                onChange={(e) => handleGharNoChange(e, index)}
                placeholder="."
              />

              <div className="py-2">
                {basobasGharDetailModelList.length > 1 && (
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

        <div className="text-lg font-bold  py-4 flex   justify-around px-10  ">
          <div className=" ">
            नाम थर(नेपाली) <span className="text-red-500">*</span>{" "}
          </div>
          <div className="  ">
            नाता<span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">कैफियत</div>

          <div className=" ">कार्य </div>
        </div>

        {basobasFamilyList.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-4 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100    "
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
                name="remarks"
                value={detail.remarks}
                onChange={(e) => handleRemarksChange(e, index)}
                placeholder="."
              />

              <div className="py-2">
                {basobasFamilyList.length > 1 && (
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
              {...register("basobasNivedak.infNaamThar")}
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
              {...register("basobasNivedak.infFullName")}
              placeholder="."
            />
            <label className="label">नाम(English) </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("basobasNivedak.infNagariktaPraPaNo")}
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
              {...register("basobasNivedak.infNagariktaIssueDistrictId")}
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
              value={infNagariktaIssueDate}
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
              {...register("basobasNivedak.infStateId")}
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
              {...register("basobasNivedak.infDistrictId")}
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
              {...register("basobasNivedak.infWardNo")}
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
              {...register("basobasNivedak.infPalikaId")}
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

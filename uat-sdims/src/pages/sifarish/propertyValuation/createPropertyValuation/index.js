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

export default function CreatePropertyValuation({ clickedIdData }) {
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
      propertyValueDetailInsertList: propertyValueDetailInsertList,
    };
    console.log(data, "propertyData");
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

  const watchFields = watch();
  // console.log(watchFields, "watchdata");

  // for state
  const [parmanentStateData, setParmanentStateData] = useState([]);
  const [temporaryStateData, setTemporaryStateData] = useState([]);
  const [propertyState, setPropertyState] = useState([]);
  console.log(propertyState, "hello");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setParmanentStateData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const permanentStateOptions = parmanentStateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.permaPradesh}
      >
        {item.stateNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setTemporaryStateData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const temporaryStateOptions = temporaryStateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.tempPradesh}
      >
        {item.stateNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setPropertyState(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const propertyStateOptions = propertyState.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.propertyPradesh}
      >
        {item.stateNameNep}
      </option>
    );
  });

  // district
  const [parmanentdistrictData, setParmanentDistrictData] = useState([]);
  const [temporarydistrictData, setTemporaryDistrictData] = useState([]);
  const [citizenDistrict, setCitizenDistrict] = useState([]);
  const [propertyDistrict, setPropertyDistrict] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.permaPradesh);
        if (response.status === true) {
          setParmanentDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.permaPradesh]);

  const permanentDistrictOptions = parmanentdistrictData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.permaJilla}
      >
        {item.districtNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.tempPradesh);
        if (response.status === true) {
          setTemporaryDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.tempPradesh]);

  const temporaryDistrictOptions = temporarydistrictData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.tempJilla}
      >
        {item.districtNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict();
        if (response.status === true) {
          setCitizenDistrict(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });

  const citizenshipDistrictOptions = citizenDistrict.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.nagariktaIssueDistrict}
      >
        {item.districtNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.propertyPradesh);
        if (response.status === true) {
          setPropertyDistrict(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.propertyPradesh]);

  const propertyDistrictOptions = propertyDistrict.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.propertyJilla}
      >
        {item.districtNameNep}
      </option>
    );
  });

  // palika
  const [parmanentPalikaData, setParmanentPalikaData] = useState([]);
  const [temporaryPalikaData, setTemporaryPalikaData] = useState([]);
  const [propertyPalikaData, setPropertyPalikaData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.permaJilla);
        if (response.status === true) {
          setParmanentPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.permaJilla]);

  const permanentPalikaOptions = parmanentPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.permaPalika}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.tempJilla);
        if (response.status === true) {
          setTemporaryPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.tempJilla]);

  const temporaryPalikaOptions = temporaryPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.tempPalika}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.propertyJilla);
        if (response.status === true) {
          setPropertyPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.propertyJilla]);

  const propertyPalikaOptions = propertyPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.propertyPalika}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  // for ward
  const [parmanentWardData, setParmanentWardData] = useState([]);
  const [temporaryWardData, setTemporaryWardData] = useState([]);
  const [wardPropertyData, setWardPropertyData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setParmanentWardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const parmanentWardOptions = parmanentWardData.map((item) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setTemporaryWardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const temporaryWardOptions = temporaryWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.tempWardNo}
      >
        {item.name}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setWardPropertyData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const propertyWardOptions = wardPropertyData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.propertyWardNo}
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
  const [janmaMiti, setJanmaMiti] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setNagariktIssueDate(clickedIdData?.nagariktIssueDate || aa);
      setJanmaMiti(clickedIdData?.janmaMiti || aa);
    }
  }, [clickedIdData]);

  //   for dynamic form
  const [propertyValueDetailInsertList, setPropertyValueDetailInsertList] =
    useState([
      {
        name: "",
        plotNo: "",
        area: "",
        stateId: "",
        districtId: "",
        palikaId: "",
        wardId: "",
        valuation: "",
        description: "",
        remarks: "",
      },
    ]);
  console.log(propertyValueDetailInsertList, "test");

  const handleAddPersonDetails = () => {
    setPropertyValueDetailInsertList([
      ...propertyValueDetailInsertList,
      {
        name: "",
        plotNo: "",
        area: "",
        stateId: "",
        districtId: "",
        palikaId: "",
        wardId: "",
        valuation: "",
        description: "",
        remarks: "",
      },
    ]);
  };

  const handleDeletePersonDetails = (index) => {
    const list = [...propertyValueDetailInsertList];
    list.splice(index, 1);
    setPropertyValueDetailInsertList(list);
  };

  const handleNameChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };

  const handlePlotNoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };

  const handleAreaChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };

  const handleStateChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };

  const handleDistrictChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };

  const handlePalikaChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };

  const handleWardChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };

  const handleValuationChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };
  const handleDescriptionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };
  const handleRemarksChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...propertyValueDetailInsertList];
    list[index][name] = value;
    setPropertyValueDetailInsertList(list);
  };

  return (
    <>
      <SeoOptimization title={"Property Valuation"} />
      <CommonHeaderDesign title={"Property Valuation सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. निवेदकको विवरण
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
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("nagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">
              ना.प्र.प.नं.<span className="requiredField">*</span>
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              ना.प्र.प.नं. जिल्ला<span className="requiredField">*</span>
            </label>
            <select
              {...register("nagariktaIssueDistrict")}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {citizenshipDistrictOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              नाता<span className="requiredField">*</span>
            </label>
            <select
              {...register("relationWithApplicant")}
              className="peer requiredField"
            >
              <option value={""}>--- नाता छान्नुहोस् ---</option>
              {relationOptions}
            </select>
            <p> {errors?.relationWithApplicant?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. स्थायी ठेगाना
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              प्रदेश <span className="requiredField">*</span>{" "}
            </label>
            <select
              {...register("permaPradesh")}
              className="peer requiredField"
            >
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {permanentStateOptions}
            </select>
            <p> {errors?.permaPradesh?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              जिल्ला<span className="requiredField">*</span>
            </label>
            <select {...register("permaJilla")} className="peer requiredField">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {permanentDistrictOptions}
            </select>
            <p> {errors?.permaJilla?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं<span className="requiredField">*</span>
            </label>
            <select {...register("permaWardNo")} className="peer requiredField">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {parmanentWardOptions}
            </select>
            <p> {errors?.permaWardNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा.<span className="requiredField">*</span>
            </label>
            <select {...register("permaPalika")} className="peer requiredField">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {permanentPalikaOptions}
            </select>
            <p> {errors?.permaPalika?.message}</p>
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
            <select {...register("tempPradesh")} className="peer requiredField">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {temporaryStateOptions}
            </select>
            <p> {errors?.tempPradesh?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              जिल्ला<span className="requiredField">*</span>
            </label>
            <select {...register("tempJilla")} className="peer requiredField">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {temporaryDistrictOptions}
            </select>
            <p> {errors?.tempJilla?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं<span className="requiredField">*</span>
            </label>
            <select {...register("tempWardNo")} className="peer requiredField">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {temporaryWardOptions}
            </select>
            <p> {errors?.tempWardNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा.<span className="requiredField">*</span>
            </label>
            <select {...register("tempPalika")} className="peer requiredField">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {temporaryPalikaOptions}
            </select>
            <p> {errors?.tempPalika?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold">४. Property Details</text>

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
          <div className=" ">SN.</div>
          <div className=" ">description</div>
          <div className=" ">
            Owner <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">Plot No</div>
          <div className="  ">Area(sq.ft)</div>

          <div className=" ">
            State <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            District <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            Palika <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            Ward <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">
            Valuation <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">Remarks</div>

          <div className=" ">कार्य </div>
        </div>

        {propertyValueDetailInsertList.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-9 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <span>{index + 1}</span>
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="description"
                value={detail.description}
                onChange={(e) => handleDescriptionChange(e, index)}
                placeholder="."
              />
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
                name="name"
                value={detail.plotNo}
                onChange={(e) => handlePlotNoChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="name"
                value={detail.area}
                onChange={(e) => handleAreaChange(e, index)}
                placeholder="."
              />

              <select
                className="border-2 border-gray-300  rounded-lg "
                name="stateId"
                value={detail.stateId}
                onChange={(e) => handleStateChange(e, index)}
              >
                <option value="">-----प्रदेश छान्नुहोस्-----</option>
                {propertyStateOptions}
              </select>

              <select
                className="border-2 border-gray-300  rounded-lg "
                name="districtId"
                value={detail.districtId}
                onChange={(e) => handleDistrictChange(e, index)}
              >
                <option value="">----जिल्ला छान्नुहोस्----</option>
                {propertyDistrictOptions}
              </select>
              <select
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="palikaId"
                value={detail.palikaId}
                onChange={(e) => handlePalikaChange(e, index)}
              >
                <option value="">-गा.पा./न.पा. छान्नुहोस्-</option>
                {propertyPalikaOptions}
              </select>
              <select
                className="border-2 border-gray-300  rounded-lg "
                name="wardId"
                value={detail.wardId}
                onChange={(e) => handleWardChange(e, index)}
                placeholder="."
              >
                <option value="">----वडा नं. छान्नुहोस्----</option>
                {propertyWardOptions}
              </select>

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="name"
                value={detail.valuation}
                onChange={(e) => handleValuationChange(e, index)}
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
                {propertyValueDetailInsertList.length > 1 && (
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
          ५. Applicant Info
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("propertyValueApplicantInsert?.applicantNaamThar")}
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
              {...register("propertyValueApplicantInsert?.applicantFullName")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर(Eng)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              प्रदेश <span className="requiredField">*</span>{" "}
            </label>
            <select
              {...register("propertyValueApplicantInsert?.applicantPradesh")}
              className="peer requiredField"
            >
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {permanentStateOptions}
            </select>
            <p> {errors?.applicantPradesh?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              जिल्ला<span className="requiredField">*</span>
            </label>
            <select
              {...register("propertyValueApplicantInsert?.applicantJilla")}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {permanentDistrictOptions}
            </select>
            <p> {errors?.applicantJilla?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं<span className="requiredField">*</span>
            </label>
            <select
              {...register("propertyValueApplicantInsert?.applicantWardNo")}
              className="peer requiredField"
            >
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {parmanentWardOptions}
            </select>
            <p> {errors?.applicantWardNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा.<span className="requiredField">*</span>
            </label>
            <select
              {...register("propertyValueApplicantInsert?.applicantPalika")}
              className="peer requiredField"
            >
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {permanentPalikaOptions}
            </select>
            <p> {errors?.applicantPalika?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("propertyValueApplicantInsert?.nagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">
              ना.प्र.प.नं. <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              ना.प्र.प जारी जिल्ला<span className="requiredField">*</span>
            </label>
            <select
              {...register(
                "propertyValueApplicantInsert?.nagariktaIssueDistrict"
              )}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {permanentDistrictOptions}
            </select>
            <p> {errors?.nagariktaIssueDistrict?.message}</p>
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

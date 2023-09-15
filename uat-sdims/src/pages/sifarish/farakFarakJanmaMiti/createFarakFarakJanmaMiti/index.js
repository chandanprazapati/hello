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
import { Checkbox, FormControlLabel } from "@mui/material";
import { date } from "yup";
import { insertFaraJanmakMiti } from "../../../../services/apiServices/sifarish/farakFarakJanmaMiti/farakFarakJanmaMitiService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateFarakFarakJanmaMiti(clickedIdData) {
  useEffect(() => {
    if (clickedIdData) {
      setFarakJanmaMitiCorrectionInsertViewModelList(
        clickedIdData?.clickedIdData
          ?.farakJanmaMitiCorrectionInsertViewModelList || [
          {
            janmaDateToBe: janmaDateToBe,
            differentJanmaDate: differentJanmaDate,
            namilekoKagjat: "",
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aadivasiValidationResolver,
    defaultValues: {
      id: clickedIdData?.clickedIdData?.id,
      name_Nep: clickedIdData?.clickedIdData?.name_Nep,
      name_Eng: clickedIdData?.clickedIdData?.name_Eng,
      fatherName_Eng: clickedIdData?.clickedIdData?.fatherName_Eng,
      fatherName_Nep: clickedIdData?.clickedIdData?.fatherName_Nep,
      motherName_Eng: clickedIdData?.clickedIdData?.motherName_Eng,
      motherName_Nep: clickedIdData?.clickedIdData?.motherName_Nep,
      citizenNo_Father: clickedIdData?.clickedIdData?.citizenNo_Father,
      citizenNo_Mother: clickedIdData?.clickedIdData?.citizenNo_Mother,
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      farakJanmaMitiCorrectionInsertViewModelList:
        farakJanmaMitiCorrectionInsertViewModelList,
    };
    try {
      const response = await insertFaraJanmakMiti(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/farakFarakJanmaMiti");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //watch fields
  const watchFields = watch();
  useEffect(() => {
    if (watchFields.isActive) {
      setValue("sabState", watchFields.state);
      setValue("sabDistrict", watchFields.district);
      setValue("sabPalika", watchFields.palika);
      setValue("sabWard", watchFields.ward);
    } else {
      setValue("sabState", "");
      setValue("sabDistrict", "");
      setValue("sabPalika", "");
      setValue("sabWard", "");
    }
  }, [
    setValue,
    watchFields.isActive,
    watchFields.state,
    watchFields.district,
    watchFields.palika,
    watchFields.ward,
  ]);

  // for state
  const [parmanentStateData, setParmanentStateData] = useState([]);
  const [temporaryStateData, setTemporaryStateData] = useState([]);

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
  const parmanentStateOptions = parmanentStateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.clickedIdData?.state}
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
        selected={item.stateId === clickedIdData?.clickedIdData?.sabState}
      >
        {item.stateNameNep}
      </option>
    );
  });
  // for district
  const [parmanentdistrictData, setParmanentDistrictData] = useState([]);
  const [temporarydistrictData, setTemporaryDistrictData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.state);
        if (response.status === true) {
          setParmanentDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.state]);
  const parmanentDistrictOptions = parmanentdistrictData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.clickedIdData?.district}
      >
        {item.districtNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.sabState);
        if (response.status === true) {
          setTemporaryDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.sabState]);

  const temporaryDistrictOptions = temporarydistrictData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.clickedIdData?.sabDistrict}
      >
        {item.districtNameNep}
      </option>
    );
  });

  // for palika
  const [parmanentPalikaData, setParmanentPalikaData] = useState([]);
  const [temporaryPalikaData, setTemporaryPalikaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.district);
        if (response.status === true) {
          setParmanentPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.district]);
  const parmanentPalikaOptions = parmanentPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.clickedIdData?.palika}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.sabDistrict);
        if (response.status === true) {
          setTemporaryPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.sabDistrict]);

  const temporaryPalikaOptions = temporaryPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.clickedIdData?.sabPalika}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  //for ward
  const [parmanentWardData, setParmanentWardData] = useState([]);
  const [temporaryWardData, setTemporaryWardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ward(watchFields?.palika);
        if (response.status === true) {
          setParmanentWardData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchFields?.palika]);
  const parmanentWardOptions = parmanentWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item?.id === clickedIdData?.clickedIdData?.ward}
      >
        {item.name}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ward(watchFields?.sabPalika);
        if (response.status === true) {
          setTemporaryWardData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchFields?.sabPalika]);

  const temporaryWardOptions = temporaryWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item?.id === clickedIdData?.clickedIdData?.sabWard}
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
  const [janmaDateToBe, setJanmaDateToBe] = useState(aa);
  const [differentJanmaDate, setDifferentJanmaDate] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setJanmaDateToBe(clickedIdData?.janmaDateToBe || aa);
      setDifferentJanmaDate(clickedIdData?.differentJanmaDate || aa);
    }
  }, [clickedIdData]);

  //   for dynamic form
  const [
    farakJanmaMitiCorrectionInsertViewModelList,
    setFarakJanmaMitiCorrectionInsertViewModelList,
  ] = useState([
    {
      janmaDateToBe: janmaDateToBe,
      differentJanmaDate: differentJanmaDate,
      namilekoKagjat: "",
    },
  ]);
  console.log(farakJanmaMitiCorrectionInsertViewModelList, "hellos");

  const handleAddFarakJanmaMiti = () => {
    setFarakJanmaMitiCorrectionInsertViewModelList([
      ...farakJanmaMitiCorrectionInsertViewModelList,
      {
        janmaDateToBe: janmaDateToBe,
        differentJanmaDate: differentJanmaDate,
        namilekoKagjat: "",
      },
    ]);
  };

  const handleDeleteFarakJanmaMiti = (index) => {
    const list = [...farakJanmaMitiCorrectionInsertViewModelList];
    list.splice(index, 1);
    setFarakJanmaMitiCorrectionInsertViewModelList(list);
  };

  // Assuming date is in the correct format
  const handleChangeHunuParneMiti = (date, index) => {
    const list = [...farakJanmaMitiCorrectionInsertViewModelList];
    list[index].janmaDateToBe = date;
    setFarakJanmaMitiCorrectionInsertViewModelList(list);
  };

  const handleChangeNaMilekoMiti = (date, index) => {
    const list = [...farakJanmaMitiCorrectionInsertViewModelList];
    list[index].differentJanmaDate = date;
    setFarakJanmaMitiCorrectionInsertViewModelList(list);
  };

  const handleChangeNamilekoKagjat = (e, index) => {
    const { name, value } = e.target;
    const list = [...farakJanmaMitiCorrectionInsertViewModelList];
    list[index][name] = value;
    setFarakJanmaMitiCorrectionInsertViewModelList(list);
  };

  return (
    <>
      <SeoOptimization title={"FarakFarak Janmamiti"} />
      <CommonHeaderDesign title={"फरक फरक जन्म मिति सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. निवेदकको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("name_Nep")}
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
              {...register("name_Eng")}
              placeholder="."
            />
            <label className="label">नाम(English) </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("fatherName_Eng")}
              placeholder="."
            />
            <label className="label">बाबुको नाम(English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("fatherName_Nep")}
              placeholder="."
            />
            <label className="label">
              बाबुको नाम<span className="requiredField">*</span>{" "}
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("motherName_Eng")}
              placeholder="."
            />
            <label className="label">आमाको नाम(English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("motherName_Nep")}
              placeholder="."
            />
            <label className="label">
              आमाको नाम<span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("citizenNo_Father")}
              placeholder="."
            />
            <label className="label">बाबुको ना.प्र.प.नं.</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("citizenNo_Mother")}
              placeholder="."
            />
            <label className="label">आमाको ना.प्र.प.नं.</label>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          (क).स्थायी ठेगाना
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("state")} className="peer">
              <option value={""}>--- प्रदेश छानुहोस ---</option>
              {parmanentStateOptions}
            </select>
            <p> {errors?.state?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("district")} className="peer">
              <option value={""}>--- जिल्ला छानुहोस ---</option>
              {parmanentDistrictOptions}
            </select>
            <p> {errors?.district?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("palika")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छानुहोस ---</option>
              {parmanentPalikaOptions}
            </select>
            <p> {errors?.palika?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label">वडा नं</label>
            <select className="peer" {...register("ward")}>
              <option value={""}>--- वडा नं छानुहोस ---</option>
              {parmanentWardOptions}
            </select>
            <p> {errors?.ward?.message}</p>
          </div>
          <FormControlLabel
            className="pl-3"
            {...register("isActive")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.isActive}
              />
            }
            label="स्थायी ठेगाना नै अस्थायी ठेगाना भए"
          />
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          (ख).अस्थायी ठेगाना
        </div>
        <div className="grid lg:grid-cols-4 shadow-2xl bg-gray-100 gap-5 px-5 pt-6 border border-black border-dashed">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("sabState")} className="peer">
              <option value={""}>--- प्रदेश छानुहोस ---</option>
              {temporaryStateOptions}
            </select>
            <p> {errors?.sabState?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("sabDistrict")} className="peer">
              <option value={""}>--- जिल्ला छानुहोस ---</option>
              {temporaryDistrictOptions}
            </select>
            <p> {errors?.sabDistrict?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("sabPalika")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छानुहोस ---</option>
              {temporaryPalikaOptions}
            </select>
            <p> {errors?.sabPalika?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label">वडा नं</label>
            <select className="peer" {...register("sabWard")}>
              <option value={""}>--- वडा नं छानुहोस ---</option>
              {temporaryWardOptions}
            </select>
            <p> {errors?.sabWard?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold">
            २. फरक फरक जन्म मिति र कागजात
          </text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddFarakJanmaMiti}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>

        <div className="text-lg font-bold  py-4 flex justify-around pr-10 ">
          <div className=" ">
            हुनुपर्ने जन्म मिती<span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">
            नमिलेको जन्म मिती <span className="text-red-500">*</span>{" "}
          </div>
          <div className="  ">
            नमिलेको कागजात <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">कार्य </div>
        </div>

        {farakJanmaMitiCorrectionInsertViewModelList.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-4 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <div className="border-2 rounded-md border-gray-300  items-center flex justify-center pl-4 ">
                <NepaliDatePicker
                  name="janmaDateToBe"
                  value={detail.janmaDateToBe}
                  className="peer "
                  onChange={(e) => handleChangeHunuParneMiti(e, index)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </div>
              <div className="border-2 rounded-md border-gray-300  items-center flex justify-center pl-4 ">
                <NepaliDatePicker
                  name="differentJanmaDate"
                  value={detail.differentJanmaDate}
                  className="peer "
                  onChange={(e) => handleChangeNaMilekoMiti(e, index)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </div>

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="namilekoKagjat"
                value={detail.namilekoKagjat}
                onChange={(e) => handleChangeNamilekoKagjat(e, index)}
                placeholder="."
              />

              <div className="py-2">
                {farakJanmaMitiCorrectionInsertViewModelList.length > 1 && (
                  <div className="flex justify-center   ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeleteFarakJanmaMiti(index)}
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}

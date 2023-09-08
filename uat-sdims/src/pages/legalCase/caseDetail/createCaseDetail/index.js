import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { TextareaAutosize } from "@mui/material";
import {
  createCase,
  getIndexCaseStage,
  personDetailApi,
} from "../../../../services/apiServices/legalCase/legalCaseService";
import { indexCaseType } from "../../../../services/apiServices/legalCase/indexCaseType/indexCaseTypeService";
import { indexCaseSubType } from "../../../../services/apiServices/legalCase/indexCaseSubType/indexCaseSubTypeService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateCaeDetail({ clickedIdData }) {
  useEffect(() => {
    if (clickedIdData) {
      setPetitionerViewModelList(clickedIdData.petitionerViewModelList);
      setRespondentViewModelList(clickedIdData.respondentViewModelList);
    }
  }, [clickedIdData]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      id: clickedIdData?.id,
      filingNo: clickedIdData?.filingNo,
      regNum: clickedIdData?.regNum,
      subject: clickedIdData?.subject,
      description: clickedIdData?.description,
      caseTypeId: clickedIdData?.caseTypeId,
      caseSubTypeId: clickedIdData?.caseSubTypeId,
      caseStageId: clickedIdData?.caseStageId,
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      petitionerViewModelList: petitionerViewModelList,
      respondentViewModelList: respondentViewModelList,
      regDate: regDate,
      filingDate: filingDate,
      firstHearingDate: firstHearingDate,
    };

    try {
      const response = await createCase(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/legalCase/caseDetail");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   design
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animate-up");
  }, []);

  // For date picker
  const [regDate, setRegDate] = useState(aa);
  const [filingDate, setFilingDate] = useState(aa);
  const [firstHearingDate, setFirstHearingDate] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setRegDate(clickedIdData?.regDate || aa);
      setFilingDate(clickedIdData?.filingDate || aa);
      setFirstHearingDate(clickedIdData?.firstHearingDate || aa);
    }
  }, [clickedIdData]);

  //   for dynamic form petitioner
  const [petitionerViewModelList, setPetitionerViewModelList] = useState([
    {
      personDetailId: "",
      advocateName: "",
    },
  ]);

  //   for petitioner  personDetail
  const [petitionerPersonDetailData, setPetitionerPersonDetailData] = useState(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await personDetailApi();
        if (response.status === true) {
          setPetitionerPersonDetailData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const petitionerPersonDetailOptions = petitionerPersonDetailData.map(
    (item) => {
      return (
        <option
          value={item.id}
          key={item.id}
          selected={
            item.id === clickedIdData?.petitionerDetailViewModelList?.fullName
          }
        >
          {`${item?.firstName} ${item?.middleName} ${item.lastName}`}
        </option>
      );
    }
  );

  const handleAddPetitionerViewModelList = () => {
    setPetitionerViewModelList([
      ...petitionerViewModelList,
      {
        personDetailId: "",
        advocateName: "",
      },
    ]);
  };

  const handleDeletePetitionerViewModelList = (index) => {
    const list = [...petitionerViewModelList];
    list.splice(index, 1);
    setPetitionerViewModelList(list);
  };

  const handlePersonDetail = (e, index) => {
    const { name, value } = e.target;
    const list = [...petitionerViewModelList];
    list[index][name] = value;
    setPetitionerViewModelList(list);
  };

  const handleAdvocateNameChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...petitionerViewModelList];
    list[index][name] = value;
    setPetitionerViewModelList(list);
  };

  //   for dynamic form respondent

  const [respondentViewModelList, setRespondentViewModelList] = useState([
    {
      personDetailId: "",
      advocateName: "",
    },
  ]);

  //   for respondent  personDetail
  const [respondentPersonDetailData, setRespondentPersonDetailData] = useState(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await personDetailApi();
        if (response.status === true) {
          setRespondentPersonDetailData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const respondentPersonDetailOptions = respondentPersonDetailData.map(
    (item) => {
      return (
        <option
          value={item.id}
          key={item.id}
          selected={item.id === clickedIdData?.personDetailId}
        >
          {`${item?.firstName} ${item?.middleName} ${item.lastName}`}
        </option>
      );
    }
  );

  const handleAddRespondentViewModelList = () => {
    setRespondentViewModelList([
      ...respondentViewModelList,
      {
        personDetailId: "",
        advocateName: "",
      },
    ]);
  };

  const handleDeleteRespondentViewModelList = (index) => {
    const list = [...respondentViewModelList];
    list.splice(index, 1);
    setRespondentViewModelList(list);
  };

  const handlePersonDetail2 = (e, index) => {
    const { name, value } = e.target;
    const list = [...respondentViewModelList];
    list[index][name] = value;
    setRespondentViewModelList(list);
  };

  const handleAdvocateNameChange2 = (e, index) => {
    const { name, value } = e.target;
    const list = [...respondentViewModelList];
    list[index][name] = value;
    setRespondentViewModelList(list);
  };

  //   for caseType
  const [caseTypeData, setCaseTypeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await indexCaseType();
        if (status) {
          setCaseTypeData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const caseTypeOptions = caseTypeData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.caseTypeId}
      >
        {item.name}
      </option>
    );
  });

  //   for caseSubType
  const [caseSubTypeData, setCaseSubTypeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await indexCaseSubType();
        if (status) {
          setCaseSubTypeData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const caseSubTypeOptions = caseSubTypeData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.caseSubTypeId}
      >
        {item.name}
      </option>
    );
  });

  //   for indexCaseStage
  const [indexCaseStageData, setIndexCaseStageData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getIndexCaseStage();
        if (status) {
          setIndexCaseStageData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const indexCaseStageOptions = indexCaseStageData.map((item) => {
    return (
      <option value={item.id} key={item.id} selected={item.id === parseInt(2)}>
        {item.name}
      </option>
    );
  });

  return (
    <>
      <SeoOptimization title={"विवाद/उजुरी"} />
      <CommonHeaderDesign title={"विवाद/उजुरी  दर्ता गर्नुहोस  "} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold"> १.प्रथम पक्ष</text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddPetitionerViewModelList}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>

        <div className="text-lg font-bold  py-4 flex  pr-10 justify-around ">
          <div className=" ">
            सेवाग्राही <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">
            न्यायपालिका/मेलमिलाप कर्ता <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">कार्य </div>
        </div>

        {petitionerViewModelList.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-3 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <select
                className="border-2 border-gray-300  rounded-lg "
                name="personDetailId"
                value={detail.personDetailId}
                onChange={(e) => handlePersonDetail(e, index)}
                placeholder="."
              >
                <option value="">
                  ------------------------ सेवाग्राही छान्नुहोस्
                  --------------------------
                </option>
                {petitionerPersonDetailOptions}
              </select>

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="advocateName"
                value={detail.advocateName}
                onChange={(e) => handleAdvocateNameChange(e, index)}
                placeholder="."
              />

              <div className="py-2">
                {petitionerViewModelList.length > 1 && (
                  <div className="flex justify-center   ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeletePetitionerViewModelList(index)}
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
          <text className="text-xl pt-2 font-bold"> २. प्रतिपक्ष दोस्रो </text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddRespondentViewModelList}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>

        <div className="text-lg font-bold  py-4 flex  pr-10 justify-around ">
          <div className=" ">
            सेवाग्राही <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">
            न्यायपालिका/मेलमिलाप कर्ता <span className="text-red-500">*</span>{" "}
          </div>

          <div className=" ">कार्य </div>
        </div>

        {respondentViewModelList.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-3 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <select
                className="border-2 border-gray-300  rounded-lg "
                name="personDetailId"
                value={detail.personDetailId}
                onChange={(e) => handlePersonDetail2(e, index)}
                placeholder="."
              >
                <option value="">
                  ------------------------ सेवाग्राही छान्नुहोस्
                  --------------------------
                </option>
                {respondentPersonDetailOptions}
              </select>

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="advocateName"
                value={detail.advocateName}
                onChange={(e) => handleAdvocateNameChange2(e, index)}
                placeholder="."
              />

              <div className="py-2">
                {respondentViewModelList.length > 1 && (
                  <div className="flex justify-center   ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeleteRespondentViewModelList(index)}
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
          ३.मामिलाको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              मामिला<span className="requiredField">*</span>
            </label>
            <select {...register("caseTypeId")} className="peer requiredField">
              <option value={""}>--- मामिला छान्नुहोस् ---</option>
              {caseTypeOptions}
            </select>
            <p> {errors?.caseTypeId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              मामिलाको प्रकार<span className="requiredField">*</span>
            </label>
            <select
              {...register("caseSubTypeId")}
              className="peer requiredField"
            >
              <option value={""}>--- मामिलाको प्रकार छान्नुहोस् ---</option>
              {caseSubTypeOptions}
            </select>
            <p> {errors?.caseSubTypeId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              मामिलाको चरण<span className="requiredField">*</span>
            </label>
            <select
              {...register("indexCaseStage")}
              className="peer requiredField"
            >
              <option value={""}>--- मामिलाको चरण छान्नुहोस् ---</option>
              {indexCaseStageOptions}
            </select>
            <p> {errors?.indexCaseStage?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("filingNo")}
              placeholder="."
            />
            <label className="label">
              फाइलिङ नम्बर <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.filingNo?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              फाइलिङ मिति
            </label>

            <NepaliDatePicker
              value={filingDate}
              className="peer "
              onChange={(e) => setFilingDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("regNum")}
              placeholder="."
            />
            <label className="label">
              दर्ता नम्बर <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.regNum?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              दर्ता मिति
            </label>

            <NepaliDatePicker
              value={regDate}
              className="peer "
              onChange={(e) => setRegDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              पहिलो तारिख
            </label>

            <NepaliDatePicker
              value={firstHearingDate}
              className="peer "
              onChange={(e) => setFirstHearingDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="time"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              तारिक समय <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.naamThar?.message}</p>
          </div> */}

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("subject")}
              placeholder="."
            />
            <label className="label">बिषय</label>
            <p> {errors?.subject?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label>कैफियत</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("description")}
              placeholder="write something here......"
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

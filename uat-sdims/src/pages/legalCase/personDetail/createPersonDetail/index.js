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
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import { Checkbox, FormControlLabel } from "@mui/material";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import { createPersonDetailApi } from "../../../../services/apiServices/legalCase/legalCaseService";
import { personDetailValidateResolver } from "../../../../utils/validateField";
const aa = new BikramSambat(new Date()).toBS();

export default function CreatePersonDetail({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: personDetailValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      firstName: clickedIdData?.firstName,
      middleName: clickedIdData?.middleName,
      lastName: clickedIdData?.lastName,
      fatherName: clickedIdData?.fatherName,
      grandFatherName: clickedIdData?.grandFatherName,
      genderId: clickedIdData?.genderId,
      email: clickedIdData?.email,
      age: clickedIdData?.age,
      mobileNo: clickedIdData?.mobileNo,
      panNo: clickedIdData?.panNo,
      citizenNo: clickedIdData?.citizenNo,
      citizenIssueDistrict: clickedIdData?.citizenIssueDistrict,
      pStateId: clickedIdData?.pStateId,
      pDistrictId: clickedIdData?.pDistrictId,
      pPalikaId: clickedIdData?.pPalikaId,
      pWardId: clickedIdData?.pWardId,
      tStateId: clickedIdData?.tStateId,
      tDistrictId: clickedIdData?.tDistrictId,
      tPalikaId: clickedIdData?.tPalikaId,
      tWardId: clickedIdData?.tWardId,
      status: clickedIdData?.status,
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      jariMiti: jariMiti,
      dob: dob,
      status : data.status ? 1 : 0,
    };


    try {
      const response = await createPersonDetailApi(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/legalCase/personDetail");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const watchedFields = watch();

  useEffect(() => {
    if (watchedFields.status) {
      // Set temporary address fields to permanent address values
      setValue("tStateId", watchedFields.pStateId);
      setValue("tDistrictId", watchedFields.pDistrictId);
      setValue("tPalikaId", watchedFields.pPalikaId);
      setValue("tWardId", watchedFields.pWardId);
    } else {
      // Reset temporary address fields to empty values
      setValue("tStateId", "");
      setValue("tDistrictId", "");
      setValue("tPalikaId", "");
      setValue("tWardId", "");
    }
  }, [
    setValue,
    watchedFields.status,
    watchedFields.pStateId,
    watchedFields.pDistrictId,
    watchedFields.pPalikaId,
    watchedFields.pWardId,
  ]);

  // for permanent state
  const [stateDataPerm, setStateDataPerm] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setStateDataPerm(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const stateOptionsPerm = stateDataPerm.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.pStateId}
      >
        {item.stateNameNep}
      </option>
    );
  });

  //   for temporary state
  const [stateDataTemp, setStateDataTemp] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setStateDataTemp(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const stateOptionsTemp = stateDataTemp.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.tStateId}
      >
        {item.stateNameNep}
      </option>
    );
  });

  // nagrita issued district
  const [nagritaIssuedDistrict, setNagritaIssuedDistrict] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict();
        if (response.status === true) {
          setNagritaIssuedDistrict(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const nagritaIssuedDistrictOptions = nagritaIssuedDistrict.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.citizenIssueDistrict}
      >
        {item.districtNameNep}
      </option>
    );
  });

  // permanent district
  const [districtDataPerm, setDistrictDataPerm] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchedFields.pStateId);
        if (response.status === true) {
          setDistrictDataPerm(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchedFields.pStateId]);

  const districtOptionsPerm = districtDataPerm.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.pDistrictId}
      >
        {item.districtNameNep}
      </option>
    );
  });

  // temporary district
  const [districtDataTemp, setDistrictDataTemp] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchedFields.tStateId);
        if (response.status === true) {
          setDistrictDataTemp(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchedFields.tStateId]);

  const districtOptionsTemp = districtDataTemp.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.tDistrictId}
      >
        {item.districtNameNep}
      </option>
    );
  });

  // permanent palika
  const [palikaDataPerm, setPalikaDataPerm] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchedFields.pDistrictId);
        if (response.status === true) {
          setPalikaDataPerm(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchedFields.pDistrictId]);

  const palikaOptionsPerm = palikaDataPerm.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.pPalikaId}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  //   temporary palika
  const [palikaDataTemp, setPalikaDataTemp] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchedFields.tDistrictId);
        if (response.status === true) {
          setPalikaDataTemp(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchedFields.tDistrictId]);

  const palikaOptionsTemp = palikaDataTemp.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.tPalikaId}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  // for ward permanent
  const [wardDataPerm, setWardDataPerm] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
            setWardDataPerm(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const wardOptionsPerm = wardDataPerm.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.pWardId}
      >
        {item.name}
      </option>
    );
  });

  // for ward temporary
  const [wardDataTemp, setWardDataTemp] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
            setWardDataTemp(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const wardOptionsTemp = wardDataTemp.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.tWardId}
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

  //   design
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animate-up");
  }, []);

  // For date picker
  const [jariMiti, setJariMiti] = useState(aa);
  const [dob, setDob] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setJariMiti(clickedIdData?.jariMiti || aa);
      setDob(clickedIdData?.dob || aa);
    }
  }, [clickedIdData]);

  return (
    <>
      <CommonHeaderDesign title={"सेवाग्राही राख्नुहोस  "} />
      <SeoOptimization title={"Person Detail"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. व्यक्तिगत विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("firstName")}
              placeholder="."
            />
            <label className="label">
              पहिलो नाम
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.firstName?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("middleName")}
              placeholder="."
            />
            <label className="label">बिचको नाम</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("lastName")}
              placeholder="."
            />
            <label className="label">
              अन्तिम नाम<span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.lastName?.message} </p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              जन्म मिति
            </label>

            <NepaliDatePicker
              value={dob}
              className="peer "
              onChange={(e) => setDob(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("age")}
              placeholder="."
            />
            <label className="label">
              उमेर <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.age?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              लिङ्ग<span className="requiredField">*</span>
            </label>
            <select {...register("genderId")} className="peer requiredField">
              <option value={""}>--- लिङ्ग छान्नुहोस् ---</option>
              {genderOptions}
            </select>
            <p> {errors?.genderId?.message}</p>
          </div>

         

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("mobileNo")}
              placeholder="."
            />
            <label className="label">
              मोबाइल नम्बर <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.mobileNo?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("grandFatherName")}
              placeholder="."
            />
            <label className="label">हजुरबाबूको नाम</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("email")}
              placeholder="."
            />
            <label className="label">Email Id </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("panNo")}
              placeholder="."
            />
            <label className="label">पान.न </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("fatherName")}
              placeholder="."
            />
            <label className="label">
              बाबुको नाम/पतिको नाम<span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.mobileNo?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("citizenNo")}
              placeholder="."
            />
            <label className="label">
              नागरिकता नं <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.citizenNo?.message} </p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              नागरिकता जारी जिल्ला<span className="requiredField">*</span>
            </label>
            <select
              {...register("citizenIssueDistrict")}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {nagritaIssuedDistrictOptions}
            </select>
            <p> {errors?.citizenIssueDistrict?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              नागरिकता जारी मिति
            </label>

            <NepaliDatePicker
              value={jariMiti}
              className="peer "
              onChange={(e) => setJariMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
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
            <select {...register("pStateId")} className="peer requiredField">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptionsPerm}
            </select>
            <p> {errors?.pStateId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              जिल्ला<span className="requiredField">*</span>
            </label>
            <select {...register("pDistrictId")} className="peer requiredField">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptionsPerm}
            </select>
            <p> {errors?.pDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा.<span className="requiredField">*</span>
            </label>
            <select {...register("pPalikaId")} className="peer requiredField">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptionsPerm}
            </select>
            <p> {errors?.pPalikaId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं<span className="requiredField">*</span>
            </label>
            <select {...register("pWardId")} className="peer requiredField">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {wardOptionsPerm}
            </select>
            <p> {errors?.pWardId?.message}</p>
          </div>

          <div>
            <FormControlLabel
              className="text-center bg-red-500 px-4 py-1 flex justify-center "
              {...register("status")}
              control={
                <Checkbox
                  defaultChecked={clickedIdData?.status}
                  color="primary"
                />
              }
              label="स्थायी ठेगाना नै अस्थायी ठेगाना भए ?"
            />
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          ३. स्थायी ठेगाना
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("tStateId")} className="peer ">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptionsTemp}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("tDistrictId")} className="peer ">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptionsTemp}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("tPalikaId")} className="peer ">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptionsTemp}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वडा नं</label>
            <select {...register("tWardId")} className="peer ">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {wardOptionsTemp}
            </select>
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

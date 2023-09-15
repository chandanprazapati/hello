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
import { Checkbox, FormControlLabel } from "@mui/material";
import { insertSadakKhanne } from "../../../../services/apiServices/sifarish/sadakKhanee/sadakKhanneService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateSadakKhanne({ clickedIdData }) {
  console.log(clickedIdData, "clickedSadak");
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
      id: clickedIdData?.id,
      name_Nep: clickedIdData?.name_Nep,
      name_Eng: clickedIdData?.name_Eng,
      citizenNo: clickedIdData?.citizenNo,
      roadName: clickedIdData?.roadName,
      depth: clickedIdData?.depth,
      depositAmount: clickedIdData?.depositAmount,
      sadakKhanneAddress: clickedIdData?.sadakKhanneAddress,
      deadlinedays: clickedIdData?.deadlinedays,
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      jariMiti: jariMiti,
    };

    console.log(data, "SadakKhanedata");
    try {
      const response = await insertSadakKhanne(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/sadakKhanne");
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
        selected={item.stateId === clickedIdData?.state}
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
        selected={item.stateId === clickedIdData?.sabState}
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
        selected={item.districtId === clickedIdData?.district}
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
        selected={item.districtId === clickedIdData?.sabDistrict}
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
        selected={item.palikaId === clickedIdData?.palika}
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
        selected={item.palikaId === clickedIdData?.sabPalika}
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
        selected={item?.id === clickedIdData?.ward}
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
        selected={item?.id === clickedIdData?.sabWard}
      >
        {item.name}
      </option>
    );
  });

  // For date picker
  const [jariMiti, setJariMiti] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setJariMiti(clickedIdData?.jariMiti || aa);
    }
  }, [clickedIdData]);

  return (
    <>
      <CommonHeaderDesign title={"सडक खन्ने सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १.व्यक्तिगत विवरण
        </div>

        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name_Nep")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name_Eng")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर (In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("citizenNo")}
              placeholder="."
            />
            <label className="label">ना.प्र.प.नं. </label>
            <p> {errors?.citizenNo?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              ना.प्र.प जारी मिति
            </label>

            <NepaliDatePicker
              value={jariMiti}
              className="peer"
              onChange={(e) => setJariMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
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
        <div className="grid lg:grid-cols-4 shadow-2xl bg-gray-100 gap-5 px-5 pt-6 border border-black border-dashed border-t-0 ">
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

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. खन्ने सडकको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("roadName")}
              placeholder="."
            />
            <label className="label">स्विकृत सडक</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("depth")}
              placeholder="."
            />
            <label className="label">ईकाइ</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("depositAmount")}
              placeholder="."
            />
            <label className="label">धरौटी रकम</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("sadakKhanneAddress")}
              placeholder="."
            />
            <label className="label">सडक खन्ने पुरा ठेगाना</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("deadlinedays")}
              placeholder="."
            />
            <label className="label">खन्ने म्याद(दीनमा)</label>
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

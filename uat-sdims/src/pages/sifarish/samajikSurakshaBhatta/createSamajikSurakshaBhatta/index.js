import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../../services/apiServices/common/office/officeService";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
const aa = new BikramSambat(new Date()).toBS();

export default function index(clickedIdData) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aayaShrotValidationResolver,
    // defaultValues: {
    //   id: clickedIdData?.id,
    //   nivedakNaamThar: clickedIdData?.nivedakNaamThar,
    //   nivedakFullName: clickedIdData?.nivedakFullName,
    //   genderId: clickedIdData?.genderId,
    //   stateId: clickedIdData?.stateId,
    //   districtId: clickedIdData?.districtId,
    //   palikaId: clickedIdData?.palikaId,
    //   wardNo: clickedIdData?.wardNo,
    //   infNaamThar: clickedIdData?.infNaamThar,
    //   infFullName: clickedIdData?.infFullName,
    //   infStateId: clickedIdData?.infStateId,
    //   infDistrictId: clickedIdData?.infDistrictId,
    //   infPalikaId: clickedIdData?.infPalikaId,
    //   infWardNo: clickedIdData?.infWardNo,
    //   infNagariktaPraPaNo: clickedIdData?.infNagariktaPraPaNo,
    //   infNagariktaIssueDistrictId: clickedIdData?.infNagariktaIssueDistrictId,
    // },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      dartaMiti: dartaMiti,
    };
    console.log(data, "data");
    //   try {
    //     const response = await insertAayaShrot(data);
    //     console.log(data, "status");
    //     if (response.status === true) {
    //       toast.success(response.message, {
    //         icon: "🚀",
    //         autoClose: 1000,
    //       });
    //       router.push("/sifarish/aayaShrot");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
  };

  // for darta miti
  const [dartaMiti, setDartaMiti] = useState(aa);
  const handelDartaMiti = (e) => {
    setDartaMiti(e);
  };
  //for gender
  const [genderData, setGenderData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await gender();
        if (status === true) {
          setGenderData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const genderOption = genderData.map((item) => {
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

  // for state
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getAllState();
        if (status === true) {
          setStateData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const stateOption = stateData.map((item) => {
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

  const watchfields = watch();
  console.log(watchfields, "watches");
  // for district
  const [districtData, setDistrictData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getDistrict(watchfields?.stateId);
        if (status === true) {
          setDistrictData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchfields?.stateId]);

  const districtOption = districtData.map((item) => {
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
  // for palika
  const [palikaData, setPalikaData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getPalika();
        if (status === true) {
          setPalikaData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const palikaOption = palikaData.map((item) => {
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

  // for ward selection
  const [wardData, setWardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status === true) {
          setWardData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const wardOption = wardData.map((item) => {
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

  return (
    <>
      <CommonHeaderDesign title={"सामाजिक सुरक्षा भत्ता"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              दर्ता मिति
            </label>

            <NepaliDatePicker
              value={dartaMiti}
              onChange={handelDartaMiti}
              className="peer"
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          हकदारको विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">
              नाम थर
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">नाम थर(Eng)</label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              लिङ्ग <span className="requiredField">*</span>
            </label>
            <select {...register("genderId")} className="peer requiredField">
              <option value={""}>--- लिङ्ग छान्नुहोस् ---</option>
              {genderOption}
            </select>
            <p> {errors?.genderId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              प्रदेश <span className="requiredField">*</span>
            </label>
            <select {...register("stateId")} className="peer requiredField">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOption}
            </select>
            <p> {errors?.stateId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              जिल्ला <span className="requiredField">*</span>
            </label>
            <select {...register("districtId")} className="peer requiredField">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOption}
            </select>
            <p> {errors?.districtId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा. <span className="requiredField">*</span>
            </label>
            <select {...register("palikaId")} className="peer requiredField">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOption}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं. <span className="requiredField">*</span>
            </label>
            <select {...register("wardNo")} className="peer requiredField">
              <option value={""}>--- वडा नं. छान्नुहोस् ---</option>
              {wardOption}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">व्यक्तिगत परिचय पत्र नं.</label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">ना.प्र.प.नं.</label>
            <p>{errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nagriktapraNo")}
              placeholder="."
            />
            <label className="label">नेपाली भरपाई सि.नं.</label>
            <p> {errors?.verify?.message}</p>
          </div>
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          अन्य विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">आ.व.</label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              महिना <span className="requiredField">*</span>
            </label>
            <select {...register("months")} className="peer requiredField">
              <option value={""}>--- महिना छान्नुहोस् ---</option>
              {/* {palikaOptions} */}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">
              भत्ता किसिम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">
              बैंक नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">बैंक शाखा</label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">बैंक जिल्ला</label>
            <select {...register("districtId")} className="peer">
              <option value={""}>--- बैंक जिल्ला छान्नुहोस् ---</option>
              {districtOption}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. निवेदकको विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              मिति
            </label>

            <NepaliDatePicker
              value={dartaMiti}
              onChange={handelDartaMiti}
              className="peer"
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">
              नाम थर
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">नाम थर(Eng)</label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              प्रदेश <span className="requiredField">*</span>
            </label>
            <select {...register("stateId")} className="peer requiredField">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOption}
            </select>
            <p> {errors?.stateId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              जिल्ला <span className="requiredField">*</span>
            </label>
            <select {...register("districtId")} className="peer requiredField">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOption}
            </select>
            <p> {errors?.districtId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा. <span className="requiredField">*</span>
            </label>
            <select {...register("palikaId")} className="peer requiredField">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOption}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं. <span className="requiredField">*</span>
            </label>
            <select {...register("wardNo")} className="peer requiredField">
              <option value={""}>--- वडा नं. छान्नुहोस् ---</option>
              {wardOption}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">ना.प्र.प.नं.</label>
            <p> {errors?.verify?.message}</p>
          </div>
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              ना.प्र.प जारी मिति
            </label>

            <NepaliDatePicker
              value={dartaMiti}
              onChange={handelDartaMiti}
              className="peer"
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">ना.प्र.प जारी जिल्ला</label>
            <select {...register("districtId")} className="peer">
              <option value={""}>
                --- ना.प्र.प जारी जिल्ला छान्नुहोस् ---
              </option>
              {districtOption}
            </select>
            <p> {errors?.palikaId?.message}</p>
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

import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import "nepali-datepicker-reactjs/dist/index.css";
import { ward } from "../../../services/apiServices/common/ward/wardService";
import { awabihawitValidationResolver } from "../../../utils/validateField";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../services/apiServices/common/office/officeService";
import { insertAwabihawit } from "../../../services/apiServices/sifarish/awabiwahit/awabiwahitService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateAwabihawit({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: awabihawitValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      fullName_Nepali: clickedIdData?.fullName_Nepali,
      fullName_English: clickedIdData?.fullName_English,
      karRasidNo : clickedIdData?.karRasidNo,
      nagriktaNo : clickedIdData?.nagriktaNo,
      nagriktaJariJillaId : clickedIdData?.nagriktaJariJillaId,
      passportNo : clickedIdData?.passportNo,
      stateId : clickedIdData?.stateId,
      districtId : clickedIdData?.districtId,
      palikaId : clickedIdData?.palikaId,
      wardNo : clickedIdData?.wardNo,
      fatherName_Nepali : clickedIdData?.fatherName_Nepali,
      fatherName_English : clickedIdData?.fatherName_English,
      fathersNagariktaPraPaNo : clickedIdData?.fathersNagariktaPraPaNo,
      motherName_Nepali : clickedIdData?.motherName_Nepali,
      motherName_Englsih : clickedIdData?.motherName_Englsih,
      motherNagariktaPraPaNo : clickedIdData?.motherNagariktaPraPaNo,


    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      doB_English: new Date(BS.BSToAD(doB_Nepali)),
      doB_Nepali: doB_Nepali,
      jariMiti: jariMiti,
      passportIssuedDate: passportIssuedDate,
      

    };
    try {
      const response = await insertAwabihawit(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/awabihawit");
      }
    } catch (error) {
      console.error(error);
    }
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
        selected={item.id === clickedIdData?.wardNo}
      >
        {item.name}
      </option>
    );
  });

  // For date picker
  const [doB_Nepali, setDOb_Nepali] = useState(aa);
  const [jariMiti, setJariMiti] = useState(aa);
  const [passportIssuedDate, setPassportIssuedDate] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setDOb_Nepali(clickedIdData?.doB_Nepali || aa);
      setJariMiti(clickedIdData?.jariMiti || aa);
      setPassportIssuedDate(clickedIdData?.passportIssuedDate || aa);
    }
  }, [clickedIdData]);


  return (
    <>
      <CommonHeaderDesign title={"अविवाहित सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. व्यक्तिगत विवरण
        </div>

        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर</label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_English")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर (In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("karRasidNo")}
              placeholder="."
            />
            <label className="label">कर तिरेको रसिद नं</label>
            <p> {errors?.karRasidNo?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              जन्म मिति(BS)
            </label>

            <NepaliDatePicker
              value={doB_Nepali}
              className="peer"
              onChange={(e) => setDOb_Nepali(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              value={new Date(BS.BSToAD(doB_Nepali)).toLocaleDateString(
                "en-US"
              )}
              className="peer"
            />
            <label className="label">जन्म मिति(AD)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nagriktaNo")}
              placeholder="."
            />
            <label className="label">नागरिकता नं</label>
            <p> {errors?.nagriktaNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              नागरिकता जारी जिल्ला
            </label>
            <select {...register("nagriktaJariJillaId")} className="peer">
              <option value={""}>--- नागरिकता जिल्ला छान्नुहोस् ---</option>
              {nagritaDistrictOptions}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              नागरिकता जारी मिति(BS)
            </label>

            <NepaliDatePicker
              value={jariMiti}
              className="peer"
              onChange={(e) => setJariMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("passportNo")}
              placeholder="."
            />
            <label className="label">राहदानी नं</label>
            <p> {errors?.passportNo?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              राहदानी जारी मिति(BS)
            </label>

            <NepaliDatePicker
              value={passportIssuedDate}
              className="peer"
              onChange={(e) => setPassportIssuedDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("stateId")} className="peer">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
            <p> {errors?.stateId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("districtId")} className="peer">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
            <p> {errors?.districtId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("palikaId")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वडा नं</label>
            <select {...register("wardNo")} className="peer">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>

              {wardOptions}
            </select>
            <p> {errors?.wardNo?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. बाबुको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherName_Nepali")}
              placeholder="."
            />
            <label className="label">बाबुको नाम</label>
            <p> {errors?.fatherName_Nepali?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherName_English")}
              placeholder="."
            />
            <label className="label">बाबुको नाम(English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fathersNagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">नागरिकता नं</label>
            <p> {errors?.fathersNagariktaPraPaNo?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          ३. आमाको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("motherName_Nepali")}
              placeholder="."
            />
            <label className="label">आमाको नाम</label>
            <p> {errors?.motherName_Nepali?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("motherName_Englsih")}
              placeholder="."
            />
            <label className="label">आमाको नाम(English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("motherNagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">नागरिकता नं</label>
            <p> {errors?.motherNagariktaPraPaNo?.message}</p>
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

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
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import { getAadibasiType, insertAadibasiJanjati } from "../../../../services/apiServices/sifarish/aadiwasiJanajaati/aadiwasiJanjatiService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateAadivasi({ clickedIdData }) {
  console.log(clickedIdData, "clickedIdData");
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
      naamThar: clickedIdData?.naamThar,
      fullName: clickedIdData?.fullName,
      genderId: clickedIdData?.genderId,
      permaPradeshId: clickedIdData?.permaPradeshId,
      prmajillaId: clickedIdData?.prmajillaId,
      permaPalikaId: clickedIdData?.permaPalikaId,
      permaWardNo: clickedIdData?.permaWardNo,
      nagariktaPraPaNo: clickedIdData?.nagariktaPraPaNo,
      nagariktaIssueDistrictId: clickedIdData?.nagariktaIssueDistrictId,
      grandfatherNaamThar: clickedIdData?.grandfatherNaamThar,
      grandfatherFullName: clickedIdData?.grandfatherFullName,
      fatherNaamThar: clickedIdData?.fatherNaamThar,
      fatherFullName: clickedIdData?.fatherFullName,
      jaati: clickedIdData?.jaati,
      aadibasiTypeId: clickedIdData?.aadibasiTypeId,
      govtSuchikrit: clickedIdData?.govtSuchikrit,
      aadiwasiNivedak: {
        infNaamThar: clickedIdData?.aadiwasiNivedak?.infNaamThar,
        infFullName: clickedIdData?.aadiwasiNivedak?.infFullName,
        infStateId: clickedIdData?.aadiwasiNivedak?.infStateId,
        infDistrictId: clickedIdData?.aadiwasiNivedak?.infDistrictId,
        infPalikaId: clickedIdData?.aadiwasiNivedak?.infPalikaId,
        infWardNo: clickedIdData?.aadiwasiNivedak?.infWardNo,
        infNagariktaPraPaNo: clickedIdData?.aadiwasiNivedak?.infNagariktaPraPaNo,
      },
     
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      nagariktIssueDate: nagariktIssueDate,
      aadiwasiNivedak:{
        ...data.aadiwasiNivedak,
        infNagariktaIssueDate : infNagariktaIssueDate
      }
    
    };

    try {
      const response = await insertAadibasiJanjati(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/adivasi");
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
        selected={item.districtId === clickedIdData?.nagariktaIssueDistrictId}
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
        selected={item.stateId === clickedIdData?.permaPradeshId}
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
        selected={item.districtId === clickedIdData?.permaJillaId}
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
        selected={item.palikaId === clickedIdData?.permaPalikaId}
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
        selected={item.id === clickedIdData?.permaWardNo}
      >
        {item.name}
      </option>
    );
  });

  // for gender
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

  // for aadbasiType
  const [aasbasiTypeData, setAasbasiTypeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getAadibasiType();
        if (status) {
          setAasbasiTypeData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const aasbasiTypeOptions = aasbasiTypeData.map((item) => {
    return (
      <option

        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.aadibasiTypeId}
      >
        {item.name}
      </option>
    );
  });

  // For date picker
  const [nagariktIssueDate, setNagariktIssueDate] = useState(aa);
  const [infNagariktaIssueDate, setInfNagariktaIssueDate] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setNagariktIssueDate(clickedIdData?.nagariktIssueDate || aa);
      setInfNagariktaIssueDate(clickedIdData?.infNagariktaIssueDate || aa);
    }
  }, [clickedIdData]);


  return (
    <>
      <CommonHeaderDesign title={"आदिवासी/जनजाती सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. विवरण
        </div>

        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर</label>
           
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर (In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 "> लिङ्ग</label>
            <select {...register("genderId")} className="peer">
              <option value={""}>--- लिङ्ग छान्नुहोस् ---</option>
              {genderOptions}
            </select>
            <p> {errors?.genderId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("permaPradeshId")} className="peer">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
            <p> {errors?.permaPradeshId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("permaJillaId")} className="peer">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
            <p> {errors?.permaJillaId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("permaPalikaId")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.permaPalikaId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वडा नं</label>
            <select {...register("permaWardNo")} className="peer">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>

              {wardOptions}
            </select>
            <p> {errors?.permaWardNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">ना.प्र.प.नं. </label>
            <p> {errors?.nagariktaPraPaNo?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              ना.प्र.प जारी मिति
            </label>

            <NepaliDatePicker
              value={nagariktIssueDate}
              className="peer"
              onChange={(e) => setNagariktIssueDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              नागरिकता जारी जिल्ला
            </label>
            <select {...register("nagariktaIssueDistrictId")} className="peer">
              <option value={""}>--- नागरिकता जिल्ला छान्नुहोस् ---</option>
              {nagritaDistrictOptions}
            </select>
            <p> {errors?.nagariktaIssueDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("grandfatherNaamThar")}
              placeholder="."
            />
            <label className="label">हजुरबुबाको नाम थर</label>
            <p> {errors?.grandfatherNaamThar?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("grandfatherFullName")}
              placeholder="."
            />
            <label className="label">हजुरबुबाको नाम थर(In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherNaamThar")}
              placeholder="."
            />
            <label className="label">बाबुको नाम थर </label>
            <p> {errors?.fatherNaamThar?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherFullName")}
              placeholder="."
            />
            <label className="label">बाबुको नाम थर (In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("jaati")}
              placeholder="."
            />
            <label className="label">जाती</label>
            <p> {errors?.jaati?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("govtSuchikrit")}
              placeholder="."
            />
            <label className="label">सुचिकृत</label>
            <p> {errors?.govtSuchikrit?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              आदिवासी प्रकार 
            </label>
            <select {...register("aadibasiTypeId")} className="peer">
              <option value={""}>--- आदिवासी प्रकार छान्नुहोस् ---</option>
              {aasbasiTypeOptions}
            </select>
            <p> {errors?.aadibasiTypeId?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. निवेदकको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aadiwasiNivedak.infNaamThar")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aadiwasiNivedak.infFullName")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर(In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("aadiwasiNivedak.infStateId")} className="peer">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("aadiwasiNivedak.infDistrictId")} className="peer">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("aadiwasiNivedak.infPalikaId")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वडा नं</label>
            <select {...register("aadiwasiNivedak.infWardNo")} className="peer">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>

              {wardOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aadiwasiNivedak.infNagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">ना.प्र.प.नं.</label>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              ना.प्र.प जारी मिति
            </label>

            <NepaliDatePicker
              value={infNagariktaIssueDate}
              className="peer"
              onChange={(e) => setInfNagariktaIssueDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">ना.प्र.प जारी जिल्ला</label>
            <select {...register("aadiwasiNivedak.infNagariktaIssueDistrictId")} className="peer">
              <option value={""}>
                --- ना.प्र.प जारी जिल्ला छान्नुहोस् ---
              </option>
              {districtOptions}
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

import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { insertAnnualIncome } from "../../../../services/apiServices/sifarish/annualIncome/annualIncomeService";
import { useForm } from "react-hook-form";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import { relation } from "../../../../services/apiServices/common/relation/realtionService";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../../services/apiServices/common/office/officeService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
import BikramSambat from "bikram-sambat-js";
const dd = new BikramSambat(new Date()).toBS();

export default function CreateAnnualIncome(clickedIdData) {
  // console.log(clickedIdData, "clickedIdData");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aayaShrotValidationResolver,
    defaultValues: {
      id: clickedIdData?.clickedIdData?.id,
      name_Nep: clickedIdData?.clickedIdData?.name_Nep,
      name_Eng: clickedIdData?.clickedIdData?.name_Eng,
      citizenNo: clickedIdData?.clickedIdData?.citizenNo,
      fatherName_Nep: clickedIdData?.clickedIdData?.fatherName_Nep,
      fatherName_Eng: clickedIdData?.clickedIdData?.fatherName_Eng,
      motherName_Nep: clickedIdData?.clickedIdData?.motherName_Nep,
      motherName_Eng: clickedIdData?.clickedIdData?.motherName_Eng,
      relationId: clickedIdData?.clickedIdData?.relationId,
      // annualIncomeDartaNo: clickedIdData?.clickedIdData?.annualIncomeDartaNo,
      annualIncomeDetail: {
        businessIncome:
          clickedIdData?.clickedIdData?.annualIncomeDetail?.businessIncome,
        rentIncome:
          clickedIdData?.clickedIdData?.annualIncomeDetail?.rentIncome,
        salaryIncome:
          clickedIdData?.clickedIdData?.annualIncomeDetail?.salaryIncome,
        totalAmountNep:
          clickedIdData?.clickedIdData?.annualIncomeDetail?.totalAmountNep,
        exchangeRate:
          clickedIdData?.clickedIdData?.annualIncomeDetail?.exchangeRate,
        totalAmountForeign:
          clickedIdData?.clickedIdData?.annualIncomeDetail?.totalAmountForeign,
      },
    },
  });
  //for date picker
  const [dateData, setDateData] = useState(dd);
  useEffect(() => {
    if (clickedIdData) {
      setDateData(clickedIdData?.dateData || dd);
    }
  });
  const onSubmit = async (data) => {
    console.log(data, "annualData");
    try {
      const response = await insertAnnualIncome(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/annualIncome");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // for relation
  const [relationData, setrelationData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await relation();
        if (status) {
          setrelationData(data);
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
  //watch fields
  const watchFields = watch();

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
  const stateOptions = stateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.clickedIdData?.stateId}
      >
        {item.stateNameNep}
      </option>
    );
  });
  // for district
  const [districtData, setDistrictData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.stateId);
        if (response.status === true) {
          setDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.stateId]);
  const districtOptions = districtData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.clickedIdData?.districtId}
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
        const response = await getPalika(watchFields?.districtId);
        if (response.status === true) {
          setPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.districtId]);
  const palikaOptions = palikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.clickedIdData?.palikaId}
      >
        {item.palikaNameNep}
      </option>
    );
  });
  //for ward
  const [wardData, setWardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ward(watchFields?.palikaId);
        if (response.status === true) {
          setWardData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchFields?.palikaId]);
  const wardOptions = wardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item?.id === clickedIdData?.clickedIdData?.wardNo}
      >
        {item.name}
      </option>
    );
  });
  return (
    <>
      <CommonHeaderDesign title={"बार्षिक आम्दानी फारम"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. निवेदकको विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name_Nep")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर </label>
            <p> {errors?.name_Nep?.message}</p>
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
            <label className="label">नागरिकता नं</label>
            <p> {errors?.citizenNo?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherName_Nep")}
              placeholder="."
            />
            <label className="label">बाबुको नाम</label>
            <p> {errors?.fatherName_Nep?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherName_Eng")}
              placeholder="."
            />
            <label className="label">बाबुको नाम(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("motherName_Nep")}
              placeholder="."
            />
            <label className="label">आमाको नाम</label>
            <p> {errors?.motherName_Nep?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("motherName_Eng")}
              placeholder="."
            />
            <label className="label">आमाको नाम(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">नाता</label>
            <select {...register("relationId")} className="peer">
              <option value={""}>--- नाता छानुहोस ---</option>
              {relationOptions}
            </select>
            <p> {errors?.relationId?.message}</p>
          </div>
          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("annualIncomeDartaNo")}
              placeholder="."
            />
            <label className="label">annual incom Darta No:</label>
            <p> {errors?.annualIncomeDartaNo?.message}</p>
          </div> */}
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. आम्दानी विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("annualIncomeDetail.businessIncome")}
              placeholder="."
            />
            <label className="label">व्यपारको आम्दानी</label>
            <p> {errors?.businessIncome?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("annualIncomeDetail.rentIncome")}
              placeholder="."
            />
            <label className="label">भाडाको आम्दानी</label>
            <p> {errors?.rentIncome?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("annualIncomeDetail.salaryIncome")}
              placeholder="."
            />
            <label className="label">तलब आम्दानी</label>
            <p> {errors?.salaryIncome?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("annualIncomeDetail.totalAmountNep")}
              placeholder="."
            />
            <label className="label">जम्मा रकम(रु)</label>
            <p> {errors?.totalAmountNep?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("annualIncomeDetail.exchangeRate")}
              placeholder="."
            />
            <label className="label">मुद्र विनिमय दर</label>
            <p> {errors?.exchangeRate?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("annualIncomeDetail.totalAmountForeign")}
              placeholder="."
            />
            <label className="label">जम्मा रकम($)</label>
            <p> {errors?.totalAmountForeign?.message}</p>
          </div>
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          3. पुरा ठेगाना
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("stateId")} className="peer">
              <option value={""}>--- प्रदेश छानुहोस ---</option>
              {stateOptions}
            </select>
            <p> {errors?.stateId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("districtId")} className="peer">
              <option value={""}>--- जिल्ला छानुहोस ---</option>
              {districtOptions}
            </select>
            <p> {errors?.districtId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("palikaId")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छानुहोस ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label">वडा नं</label>
            <select className="peer" {...register("wardNo")}>
              <option value={""}>--- वडा नं छानुहोस ---</option>
              {wardOptions}
            </select>
            <p> {errors?.wardNo?.message}</p>
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

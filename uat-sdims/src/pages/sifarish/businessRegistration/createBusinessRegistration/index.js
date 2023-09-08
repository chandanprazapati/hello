import React, { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
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
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import { insertBusinessRegistration } from "../../../../services/apiServices/sifarish/businessRegistration/businessRegistrationService";
const aa = new BikramSambat(new Date()).toBS();

export default function createBusinessRegistration(clickedIdData) {
  // console.log(clickedIdData, "clickedDataBusiness");
  useEffect(() => {
    if (clickedIdData) {
      setBewasayaDartaDetailList(
        clickedIdData?.clickedIdData?.bewasayaDartaDetailList || [
          {
            ahsuliFiscalYear: "",
            rasidNumber: "",
            dastakhat: "",
            kaifiyat: "",
            nabikaranDate: nabikaranDate,
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
      id: clickedIdData?.clickedIdData?.id,
      bewasayaDartaNo: clickedIdData?.clickedIdData?.bewasayaDartaNo,
      bewasayaFaramName_Np: clickedIdData?.clickedIdData?.bewasayaFaramName_Np,
      bewasayaFaramName_En: clickedIdData?.clickedIdData?.bewasayaFaramName_En,
      bewasayiName_Np: clickedIdData?.clickedIdData?.bewasayiName_Np,
      bewasayiName_En: clickedIdData?.clickedIdData?.bewasayiName_En,
      gharDhaniName_Np: clickedIdData?.clickedIdData?.gharDhaniName_Np,
      gharDhaniName_En: clickedIdData?.clickedIdData?.gharDhaniName_En,
      bewasayaPlace_Np: clickedIdData?.clickedIdData?.bewasayaPlace_Np,
      bewasayaPlace_En: clickedIdData?.clickedIdData?.bewasayaPlace_En,
      bewasayaRoadName_Np: clickedIdData?.clickedIdData?.bewasayaRoadName_Np,
      bewasayaRoadName_En: clickedIdData?.clickedIdData?.bewasayaRoadName_En,
      bewasayaGharNo: clickedIdData?.clickedIdData?.bewasayaGharNo,
      bewasayaType_Np: clickedIdData?.clickedIdData?.bewasayaType_Np,
      bewasayaType_En: clickedIdData?.clickedIdData?.bewasayaType_En,
      bewasayaPrakriti_Np: clickedIdData?.clickedIdData?.bewasayaPrakriti_Np,
      bewasayaPrakriti_En: clickedIdData?.clickedIdData?.bewasayaPrakriti_En,
      bewasayaToleName_Np: clickedIdData?.clickedIdData?.bewasayaToleName_Np,
      bewasayaToleName_En: clickedIdData?.clickedIdData?.bewasayaToleName_En,
      bewasayaBatoName_Np: clickedIdData?.clickedIdData?.bewasayaBatoName_Np,
      bewasayaBatoName_En: clickedIdData?.clickedIdData?.bewasayaBatoName_En,
      bewasayaWardNo: clickedIdData?.clickedIdData?.bewasayaWardNo,
      email: clickedIdData?.clickedIdData?.email,
      phoneNumber: clickedIdData?.clickedIdData?.phoneNumber,
      paNumber: clickedIdData?.clickedIdData?.paNumber,
      registeredInDiffNikaye:
        clickedIdData?.clickedIdData?.registeredInDiffNikaye,
      registeredNikayeName_Np:
        clickedIdData?.clickedIdData?.registeredNikayeName_Np,
      registeredNikayeName_En:
        clickedIdData?.clickedIdData?.registeredNikayeName_En,
      registeredNikayeDartaNo:
        clickedIdData?.clickedIdData?.registeredNikayeDartaNo,
      registeredNikayeDate: clickedIdData?.clickedIdData?.registeredNikayeDate,
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      bewasayaDartaDetailList: bewasayaDartaDetailList,
    };
    console.log(data, "dataaaaa");

    try {
      const response = await insertBusinessRegistration(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/businessRegistration");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //for date picker
  const [nabikaranDate, setNabikaranDate] = useState(aa);
  useEffect(() => {
    if (clickedIdData) {
      setNabikaranDate(clickedIdData?.nabikaranDate || aa);
    }
  }, [clickedIdData]);

  // for WatchFields
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
        selected={item?.stateId === clickedIdData?.clickedIdData?.stateId}
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
        selected={item?.districtId === clickedIdData?.clickedIdData?.districtId}
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

  // for ward
  const [wardData, setWardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward(watchFields?.palikaId);
        if (status) {
          setWardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [watchFields?.palikaId]);
  const wardOptions = wardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.clickedIdData?.wardNo}
      >
        {item.name}
      </option>
    );
  });

  //   for dynamic form
  const [bewasayaDartaDetailList, setBewasayaDartaDetailList] = useState([
    {
      ahsuliFiscalYear: "",
      rasidNumber: "",
      dastakhat: "",
      kaifiyat: "",
      nabikaranDate: nabikaranDate,
    },
  ]);
  // console.log(bewasayaDartaDetailList, "bewasayaDataaa");

  const handleAddBewasayaDartaDetail = () => {
    setBewasayaDartaDetailList([
      ...bewasayaDartaDetailList,
      {
        ahsuliFiscalYear: "",
        rasidNumber: "",
        dastakhat: "",
        kaifiyat: "",
        nabikaranDate: nabikaranDate,
      },
    ]);
  };

  const handleDeleteBewasayaDetails = (index) => {
    const list = [...bewasayaDartaDetailList];
    list.splice(index, 1);
    setBewasayaDartaDetailList(list);
  };

  // const handleChangeNabikaranDate = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...bewasayaDartaDetailList];
  //   list[index][name] = value;
  //   setBewasayaDartaDetailList(list);
  // };

  const handleChangeNabikaranDate = (date, index) => {
    const list = [...bewasayaDartaDetailList];
    list[index].nabikaranDate = date; // Assuming date is in the correct format
    setBewasayaDartaDetailList(list);
  };

  const handleChangeAhsuliFiscalYear = (e, index) => {
    const { name, value } = e.target;
    const list = [...bewasayaDartaDetailList];
    list[index][name] = value;
    setBewasayaDartaDetailList(list);
  };

  const handleChangeRasidNumber = (e, index) => {
    const { name, value } = e.target;
    const list = [...bewasayaDartaDetailList];
    list[index][name] = value;
    setBewasayaDartaDetailList(list);
  };

  const handleChangeDastakhat = (e, index) => {
    const { name, value } = e.target;
    const list = [...bewasayaDartaDetailList];
    list[index][name] = value;
    setBewasayaDartaDetailList(list);
  };

  const handleChangeKaifiyat = (e, index) => {
    const { name, value } = e.target;
    const list = [...bewasayaDartaDetailList];
    list[index][name] = value;
    setBewasayaDartaDetailList(list);
  };

  //   design
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animate-up");
  }, []);

  const watchAllFields = watch();
  return (
    <>
      <CommonHeaderDesign title={"व्यवसाय दर्ता सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. आवेदनको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayaDartaNo")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय दर्ता न.:
              <span className="requiredField">*</span>
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayaFaramName_Np")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय/फरम को नाम(Nepali){" "}
              <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("bewasayaFaramName_En")}
              placeholder="."
            />
            <label className="label">व्यवसाय/फरम को नाम(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayiName_Np")}
              placeholder="."
            />
            <label className="label">
              व्यवसायी को नाम(Nepali) <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("bewasayiName_En")}
              placeholder="."
            />
            <label className="label">व्यवसायी को नाम(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("gharDhaniName_Np")}
              placeholder="."
            />
            <label className="label">
              घरधनी को नाम(Nepali) <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("gharDhaniName_En")}
              placeholder="."
            />
            <label className="label">घरधनी को नाम(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayaPlace_Np")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय रहेको स्थान(Nepali){" "}
              <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("bewasayaPlace_En")}
              placeholder="."
            />
            <label className="label">व्यवसाय रहेको स्थान(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayaRoadName_Np")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय रहेको बाटो को नाम(Nepali){" "}
              <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("bewasayaRoadName_En")}
              placeholder="."
            />
            <label className="label">व्यवसाय रहेको बाटो को नाम(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayaGharNo")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय रहेको घरको नं.(Nepali){" "}
              <span className="requiredField">*</span>{" "}
            </label>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. संस्थाको पूरा ठेगाना
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              प्रदेश <span className="requiredField">*</span>{" "}
            </label>
            <select {...register("stateId")} className="peer requiredField">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
            <p> {errors?.stateId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group ">
            <label className="label text-blue-900 ">
              जिल्ला<span className="requiredField">*</span>
            </label>
            <select {...register("districtId")} className="peer requiredField">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा.<span className="requiredField">*</span>
            </label>
            <select {...register("palikaId")} className="peer requiredField">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.permaDistrictId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं<span className="requiredField">*</span>
            </label>
            <select {...register("wardNo")} className="peer requiredField">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.wardNo?.message}</p>
          </div>

          <FormControlLabel
            className="pl-4"
            {...register("registeredInDiffNikaye")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.registeredInDiffNikaye}
              />
            }
            label="अन्य निकायमा दर्ता भएको छ भने ?"
          />
        </div>

        {watchAllFields?.registeredInDiffNikaye && (
          <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-6 border border-black border-dashed border-t-0 ">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer  "
                {...register("registeredNikayeName_Np")}
                placeholder="."
              />
              <label className="label">निकाय(Nepali)</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer  "
                {...register("registeredNikayeName_En")}
                placeholder="."
              />
              <label className="label">निकाय(English)</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer  "
                {...register("registeredNikayeDartaNo")}
                placeholder="."
              />
              <label className="label">निकाय र्दर्ता नं</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer  "
                {...register("registeredNikayeDate")}
                placeholder="."
              />
              <label className="label">निकाय दर्ता मिति</label>
            </div>
          </div>
        )}

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          ३. व्यावसायको पूरा विवरण
        </div>

        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayaType_Np")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय प्रकार(Nepali) <span className="requiredField">*</span>{" "}
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("bewasayaType_En")}
              placeholder="."
            />
            <label className="label">व्यवसाय प्रकार(English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayaPrakriti_Np")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय प्रकृति(Nepali) <span className="requiredField">*</span>{" "}
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("bewasayaPrakriti_En")}
              placeholder="."
            />
            <label className="label">व्यवसाय प्रकृति(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayaToleName_Np")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय टोल नाम(Nepali) <span className="requiredField">*</span>{" "}
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("bewasayaToleName_En")}
              placeholder="."
            />
            <label className="label">व्यवसाय टोल नाम(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("bewasayaBatoName_Np")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय बाटोको नाम(Nepali){" "}
              <span className="requiredField">*</span>{" "}
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("bewasayaBatoName_En")}
              placeholder="."
            />
            <label className="label">व्यवसाय बाटोको नाम(English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("bewasayaWardNo")}
              placeholder="."
            />
            <label className="label">व्यवसाय वडा नं</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("email")}
              placeholder="."
            />
            <label className="label">
              व्यवसायको इमेल <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("phoneNumber")}
              placeholder="."
            />
            <label className="label">
              व्यवसायको फोन नं.(Nepali) <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("paNumber")}
              placeholder="."
            />
            <label className="label">
              व्यवसाय प्यान नं. <span className="requiredField">*</span>{" "}
            </label>
          </div>
        </div>

        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold">४. व्यावसाय विवरण</text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddBewasayaDartaDetail}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>

        <div className="text-lg font-bold  py-4 flex gap- justify-between  pr-28 ">
          <div className=" ">
            नविकरण मिति <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">
            असुली आ.व. <span className="text-red-500">*</span>{" "}
          </div>
          <div className="  ">
            रसिद न. <span className="text-red-500">*</span>{" "}
          </div>
          <div className="  ">
            दस्तखत <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">
            कैफियत <span className="text-red-500">*</span>{" "}
          </div>
          <div className=" ">कार्य </div>
        </div>

        {bewasayaDartaDetailList.map((detail, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-6 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <div className="border-2 rounded-md border-gray-300  items-center flex justify-center ">
                <NepaliDatePicker
                  value={detail.nabikaranDate}
                  name="nabikaranDate "
                  className="peer "
                  onChange={(date) => handleChangeNabikaranDate(date, index)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </div>

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="ahsuliFiscalYear"
                value={detail.ahsuliFiscalYear}
                onChange={(e) => handleChangeAhsuliFiscalYear(e, index)}
                placeholder="."
              />

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="rasidNumber"
                value={detail.rasidNumber}
                onChange={(e) => handleChangeRasidNumber(e, index)}
                placeholder="."
              />

              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="dastakhat"
                value={detail.dastakhat}
                onChange={(e) => handleChangeDastakhat(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg "
                name="kaifiyat"
                value={detail.kaifiyat}
                onChange={(e) => handleChangeKaifiyat(e, index)}
                placeholder="."
              />

              <div className="py-2">
                {bewasayaDartaDetailList.length > 1 && (
                  <div className="flex justify-center   ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeleteBewasayaDetails(index)}
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

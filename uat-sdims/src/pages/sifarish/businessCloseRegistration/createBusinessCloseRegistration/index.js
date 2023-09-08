import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../../services/apiServices/common/office/officeService";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
import BikramSambat from "bikram-sambat-js";
import { insertBusinessClose } from "../../../../services/apiServices/sifarish/businessClose/businessClose";
import { toast } from "react-toastify";
const dd = new BikramSambat(new Date()).toBS();

export default function CreateBusinessCloseRegistration(clickedIdData) {
  console.log(clickedIdData, "hello");
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
      bewasayaFaramName_Np: clickedIdData?.clickedIdData?.bewasayaFaramName_Np,
      bewasayaFaramName_En: clickedIdData?.clickedIdData?.bewasayaFaramName_En,
      bewasayiName_Np: clickedIdData?.clickedIdData?.bewasayiName_Np,
      bewasayiName_En: clickedIdData?.clickedIdData?.bewasayiName_En,
      bewasayaPlace_Np: clickedIdData?.clickedIdData?.bewasayaPlace_Np,
      bewasayaPlace_En: clickedIdData?.clickedIdData?.bewasayaPlace_En,
      bewasayaBandYear: clickedIdData?.clickedIdData?.bewasayaBandYear,
      bewasayaGharNo: clickedIdData?.clickedIdData?.bewasayaGharNo,
      wardNo: clickedIdData?.clickedIdData?.wardNo,
      bewasayaType_Np: clickedIdData?.clickedIdData?.bewasayaType_Np,
      bewasayaType_En: clickedIdData?.clickedIdData?.bewasayaType_En,
      bewasayaPrakriti_Np: clickedIdData?.clickedIdData?.bewasayaPrakriti_Np,
      bewasayaPrakriti_En: clickedIdData?.clickedIdData?.bewasayaPrakriti_En,
      bewasayaToleName_Np: clickedIdData?.clickedIdData?.bewasayaToleName_Np,
      bewasayaToleName_En: clickedIdData?.clickedIdData?.bewasayaToleName_En,
      bewasayaBatoName_Np: clickedIdData?.clickedIdData?.bewasayaBatoName_Np,
      bewasayaBatoName_En: clickedIdData?.clickedIdData?.bewasayaBatoName_En,
      bewasayaWardNo: clickedIdData?.clickedIdData?.bewasayaWardNo,
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
    // console.log(data, "dataaaa");
    try {
      const response = await insertBusinessClose(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/businessCloseRegistration");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // For Watch district palika according to state
  const watchFields = watch();
  // console.log(watchFields, "watchdata");

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
        selected={item.districtId === clickedIdData?.clickedIdData?.districtId}
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
        selected={item.id === clickedIdData?.clickedIdData?.wardId}
      >
        {item.name}
      </option>
    );
  });

  //design;
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animate-up");
  }, []);

  return (
    <>
      <CommonHeaderDesign title={"व्यवसाय बन्द सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. आवेदनको विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
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
            <p> {errors?.bewasayaFaramName_Np?.message}</p>
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
          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              घरधनी को नाम(Nepali) <span className="requiredField">*</span>{" "}
            </label>
          </div> */}

          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">घरधनी को नाम(English)</label>
          </div> */}
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
              className="peer  "
              {...register("bewasayaBandYear")}
              placeholder="."
            />
            <label className="label">ब्यवसाय बन्द भएको वर्ष</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("bewasayaGharNo")}
              placeholder="."
            />
            <label className="label">व्यवसाय रहेको घरको नं.</label>
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
            <p> {errors?.districtId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा.<span className="requiredField">*</span>
            </label>
            <select {...register("palikaId")} className="peer requiredField">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>

          {/* <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              वडा नं<span className="requiredField">*</span>
            </label>
            <select {...register("wardNo")} className="peer requiredField">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.wardNo?.message}</p>
          </div> */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("wardNo")}
              placeholder="."
            />
            <label className="label"> वडा नं</label>
          </div>

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

          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">व्यवसाय वडा नं</label>
          </div> */}
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              व्यवसाय वडा नं<span className="requiredField">*</span>
            </label>
            <select
              {...register("bewasayaWardNo")}
              className="peer requiredField"
            >
              <option value={""}>---व्यवसाय वडा नं छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.bewasayaWardNo?.message}</p>
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

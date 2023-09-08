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
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateBusinessRenewal({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aadivasiValidationResolver,
    // defaultValues: {
    //   id: clickedIdData?.id,
    //   nameThar: clickedIdData?.nameThar,
    //   fullName: clickedIdData?.fullName,
    //   genderId: clickedIdData?.genderId,
    //   permaPradeshId: clickedIdData?.permaPradeshId,
    //   prmajillaId: clickedIdData?.prmajillaId,
    //   permaPalikaId: clickedIdData?.permaPalikaId,
    //   permaWardNo: clickedIdData?.permaWardNo,
    //   nagritaPraPaNo: clickedIdData?.nagritaPraPaNo,
    //   nagariktaIssueDistrictId: clickedIdData?.nagariktaIssueDistrictId,
    //   grandfatherNaamThar: clickedIdData?.grandfatherNaamThar,
    //   grandfatherFullName: clickedIdData?.grandfatherFullName,
    //   fatherNaamThar: clickedIdData?.fatherNaamThar,
    //   fatherFullName: clickedIdData?.fatherFullName,
    //   jaati: clickedIdData?.jaati,
    //   aadibasiTypeId: clickedIdData?.aadibasiTypeId,
    //   govtSuchikrit: clickedIdData?.govtSuchikrit,
    // },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      nagariktIssueDate: nagariktIssueDate,
    };

    console.log(data, "data");
    // try {
    //   const response = await insertAwabihawit(data);
    //   if (response.status === true) {
    //     toast.success(response.message, {
    //       icon: "🚀",
    //       autoClose: 1000,
    //     });
    //     router.push("/sifarish/adivasi");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };



  

  //   design
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animate-up");
  }, []);

  // For date picker
  const [nagariktIssueDate, setNagariktIssueDate] = useState(aa);

  useEffect(() => {
    if (clickedIdData) {
      setNagariktIssueDate(clickedIdData?.nagariktIssueDate || aa);
    }
  }, [clickedIdData]);

  return (
    <>
      <CommonHeaderDesign title={"व्यवसाय नविकरण दर्ता फारम"} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <FormLabel id="demo-row-radio-buttons-group-label">
          फर्म वा कम्पनीको प्रकृति{" "}
          <span className="text-lg text-red-500">*</span>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="प्राइभेट लिमिटेड कम्पनी"
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="पब्लिक लिमिटेड कम्पनी "
          />
          <FormControlLabel value="2" control={<Radio />} label="एकलौटी" />
        </RadioGroup>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. दस्तखत पेश गर्ने फर्म वा कम्पनीको
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              नाम <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              ठेगाना<span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              प्यान नं <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer  "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">भ्यट नं</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              पोष्ट बक्स नं <span className="requiredField">*</span>{" "}
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              टेलिफोन नं<span className="requiredField">*</span>{" "}
            </label>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. सम्पर्कको लागि फर्म वा कम्पनीको आधिकारिक व्यक्तिको नामथर
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              नाम थर <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              नागरिकता नं <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              ठेगाना<span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              ईमेल <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">
              टेलिफोन नं <span className="requiredField">*</span>{" "}
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">पोष्ट बक्स नं</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer "
              {...register("naamThar")}
              placeholder="."
            />
            <label className="label">फ्याक्स नं</label>
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

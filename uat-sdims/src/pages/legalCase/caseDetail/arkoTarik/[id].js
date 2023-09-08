import React, { useRef, useState } from "react";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";
import Image from "next/image";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { FaPlus } from "react-icons/fa";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
import { arkoTarik } from "../../../../services/apiServices/legalCase/legalCaseService";
import { toast } from "react-toastify";
const aa = new BikramSambat(new Date()).toBS();

export default function ArkoTarikById() {
  const titleRef = useRef(null);
  const router = useRouter();
  const { query } = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  //   images for petitioner
  const [imagePreviewsPetitioner, setImagePreviewsPetitioner] = useState([]);
  const handleFileChangePetitioner = (e) => {
    const files = e.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviewsPetitioner(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  // const handleFileChangePetitioner = (e) => {
  //   const files = e.target.files;
  //   const previews = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     previews.push(URL.createObjectURL(file));
  //   }

  //   setImagePreviewsPetitioner(previews);
  // };

  //   images for respondent

  const [imagePreviewsRespondent, setImagePreviewsRespondent] = useState([]);
  const handleFileChangeRespondent = (e) => {
    const files = e.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviewsRespondent(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  // const handleFileChangeRespondent = (e) => {
  //   const files = e.target.files;
  //   const previews = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     previews.push(URL.createObjectURL(file));
  //   }

  //   setImagePreviewsRespondent(previews);
  // };

  //   imagesfor Judges
  const [imagePreviewsJudges, setImagePreviewsJudges] = useState([]);
  // const handleFileChangeJudges = (e) => {
  //   const files = e.target.files;
  //   const previews = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       previews.push(event.target.result);
  //       if (previews.length === files.length) {
  //         setImagePreviewsJudges(previews);
  //       }
  //     };
  //     reader.readAsDataURL(files[i]);
  //   }
  // };

  const handleFileChangeJudges = (e) => {
    const files = e.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      previews.push(URL.createObjectURL(file));
    }

    setImagePreviewsJudges(previews);
  };

  //   for date picker
  const [arkoDate, setArkoDate] = useState(aa);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("petitionerRemark", data.petitionerRemark);
      formData.append("respondentRemark", data.respondentRemark);
      formData.append("judgeDecision", data.judgeDecision);
      formData.append("nextdate", arkoDate);
      formData.append("caseId", query.id);
      formData.append("tarikTime", data.tarikTime);

      // Append image files directly (not previews)
      for (let i = 0; i < imagePreviewsPetitioner.length; i++) {
        const file = data.filesP[i]; // Get the File object from input element
        formData.append("filesP", file);
      }

      for (let i = 0; i < imagePreviewsRespondent.length; i++) {
        const file = data.filesR[i]; // Get the File object from input element
        formData.append("filesR", file);
      }

      for (let i = 0; i < imagePreviewsJudges.length; i++) {
        const file = data.filesJ[i]; // Get the File object from input element
        formData.append("filesJ", file);
      }

      console.log(formData, "hello");

      const response = await arkoTarik(formData);
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

  return (
    <div>
      <SeoOptimization title={"अर्को तारिक"} />
      <CommonHeaderDesign title={"अर्को तारिको विवरण थप्नुहोस  "} />
      <form onSubmit={handleSubmit(onSubmit)} ref={titleRef}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १.बादीको टिप्पणी
        </div>
        <div className="grid lg:grid-cols-2  gap-5 px-5  pt-2 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">बादीको टिप्पणी</label>

            <TextareaAutosize
              type="string"
              className="border-2  pb-6 border-black"
              {...register("petitionerRemark")}
              placeholder="write something here......"
              minRows={2} // Minimum number of rows
              style={{ width: "500px" }} // Set the desired width using inline styles
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Petitioner File</label>

            {/* Display image previews */}
            <div className="flex gap-2 flex-wrap">
              {imagePreviewsPetitioner.map((preview, index) => (
                <Image
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  style={{ maxWidth: "200px" }}
                />
              ))}
            </div>

            <input
              type="file"
              className="border-2  pb-6 border-black"
              {...register("filesP")}
              placeholder="write something here......"
              multiple // Enable multiple file selection
              accept="image/*" // Specify that only image files are allowed
              onChange={handleFileChangePetitioner}
            />
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २.प्रतिवादी को टिप्पणी
        </div>
        <div className="grid lg:grid-cols-2  gap-5 px-5  pt-2 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">प्रतिवादी को टिप्पणी</label>

            <TextareaAutosize
              type="string"
              className="border-2  pb-6 border-black"
              {...register("respondentRemark")}
              placeholder="write something here......"
              minRows={2} // Minimum number of rows
              style={{ width: "500px" }} // Set the desired width using inline styles
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Respondent File</label>

            {/* Display image previews */}
            <div className="flex gap-2 flex-wrap">
              {imagePreviewsRespondent.map((preview, index) => (
                <Image
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  style={{ maxWidth: "200px" }}
                />
              ))}
            </div>

            <input
              type="file"
              className="border-2  pb-6 border-black"
              {...register("filesR")}
              placeholder="write something here......"
              multiple // Enable multiple file selection
              accept="image/*" // Specify that only image files are allowed
              onChange={handleFileChangeRespondent}
            />
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          ३.न्यायिक समितिको टिप्पणी
        </div>
        <div className="grid lg:grid-cols-2  gap-5 px-5  pt-2 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">
              न्यायिक समितिको टिप्पणी{" "}
            </label>

            <TextareaAutosize
              type="string"
              className="border-2  pb-6 border-black"
              {...register("judgeDecision")}
              placeholder="write something here......"
              minRows={2} // Minimum number of rows
              style={{ width: "500px" }} // Set the desired width using inline styles
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">न्यायिक समितिको पत्र</label>

            {/* Display image previews */}
            <div className="flex gap-2 flex-wrap">
              {imagePreviewsJudges.map((preview, index) => (
                <Image
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  style={{ maxWidth: "200px" }}
                />
              ))}
            </div>

            <input
              type="file"
              className="border-2  pb-6 border-black"
              {...register("filesJ")}
              placeholder="write something here......"
              multiple // Enable multiple file selection
              accept="image/*" // Specify that only image files are allowed
              onChange={handleFileChangeJudges}
            />
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              आर्को तारिख (मिति)
            </label>

            <NepaliDatePicker
              value={arkoDate}
              className="peer "
              onChange={(e) => setArkoDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="time"
              className="peer requiredField "
              {...register("tarikTime")}
              placeholder="."
            />
            <label className="label">
              तारिक समय <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.tarikTime?.message}</p>
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { TextareaAutosize } from "@mui/material";
import { createLegalDarta } from "../../../../services/apiServices/legalCase/legalCaseService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
const aa = new BikramSambat(new Date()).toBS();

export default function CreateDarta({ clickedIdData }) {

  console.log("clickedIdData", clickedIdData);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      id: clickedIdData?.id,
      dartaNo: clickedIdData?.dartaNo,
      subject: clickedIdData?.subject,
      remarks: clickedIdData?.remarks,
      receiverName: clickedIdData?.receiverName,
      office: clickedIdData?.office,
      patraKoChalaniNo : clickedIdData?.patraKoChalaniNo,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        data = {
          ...data,
          dartaMiti: dartaMiti,
          patrakoMiti: patrakoMiti,
          reciverdate: reciverdate,
        };
        console.log("data", data);
        if (isSubmitting) return;
        const response = await createLegalDarta(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/legalCase/darta");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, isSubmitting]
  );

  // to set date in nepali date picker
  const [dartaMiti, setDartaMiti] = useState(aa);
  const [patrakoMiti, setPatrakoMiti] = useState(aa);
  const [reciverdate, setReciverdate] = useState(aa);

  // for setting the values of start date and end date
  useEffect(() => {
    if (clickedIdData) {
      setDartaMiti(clickedIdData.dartaMiti || aa);
      setPatrakoMiti(clickedIdData.patrakoMiti || aa);
      setReciverdate(clickedIdData.reciverdate || aa);
    }
  }, [clickedIdData]);

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"दर्ता राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
        
        {clickedIdData === undefined ? (""
        ): (
          <div className="relative z-0 w-full mb-6 group">
          <input
          value={clickedIdData?.dartaNo}
          />
          <label className="label">
          दर्ता नम्बर
            <span className="requiredField">*</span>{" "}
          </label>
        </div>
        )
        }

       
        
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              दर्ता मिति
            </label>

            <NepaliDatePicker
              value={dartaMiti}
              className="peer"
              onChange={(e) => {
                setDartaMiti(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              पत्रको मिति
            </label>

            <NepaliDatePicker
              value={patrakoMiti}
              className="peer"
              onChange={(e) => {
                setPatrakoMiti(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("patraKoChalaniNo")}
              placeholder="."
            />
            <label className="label">
              पत्रको चलानी नम्बर
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.patraKoChalaniNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("subject")}
              placeholder="."
            />
            <label className="label">
              बिषय
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.subject?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("office")}
              placeholder="."
            />
            <label className="label">
              पठाउने अफिसको नाम
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.office?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("reciverName")}
              placeholder="."
            />
            <label className="label">
              बुझिलिने को नाम
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.reciverName?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              बुझिलिने मिति
            </label>

            <NepaliDatePicker
              value={reciverdate}
              className="peer"
              onChange={(e) => {
                setReciverdate(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>कैफियत</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("remarks")}
              placeholder="write something here......"
            />
          </div>
        </div>
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </React.Fragment>
  );
}

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { createTalimModule } from "../../../services/apiServices/pis/talimModule/talimModuleService";
import { Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import "nepali-datepicker-reactjs/dist/index.css";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
const aa = new BikramSambat(new Date()).toBS();
export default function CreateTalimModule({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      remarks: clickedIdData?.remarks,
      status: clickedIdData?.status,
    },
  });

  // submit funciton
  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          startMiti: startMiti,
          endMiti: endMiti,
          startDate: new Date(BS.BSToAD(startMiti)),
          endDate: new Date(BS.BSToAD(endMiti)),
        };

        try {
          createTalimModule(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/pis/talimModule");
              return;
            } else response.status === false;
            {
              toast.error(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
            }
            return;
          });
        } catch (error) {
          toast.error(error.message);
        }
        resolve();
      }, 2000);
    });
  };

  // state for storing the nepali date
  const [startMiti, setStartMiti] = useState(aa);
  const [endMiti, setEndMiti] = useState(aa);

  // for setting the values of start date and end date
  useEffect(() => {
    if (clickedIdData) {
      setStartNepDate(clickedIdData.startMiti || aa);
      setEndNepDate(clickedIdData.endMiti || aa);
    }
  }, [clickedIdData]);

  //    for स्थिति
  const [checked2, setChecked2] = useState(false);
  const handleCheckbox2 = () => {
    setChecked2(!checked2);
  };

  return (
    <>
      <CommonHeaderDesign title={"तालिम मोड्युल विवरण राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-4 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name")}
              placeholder="."
            />
            <label className="label"> नाम</label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              सुरु मिति (नेपाली)
            </label>

            <NepaliDatePicker
              value={startMiti}
              className="peer"
              onChange={(e) => {
                setStartMiti(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              अन्तिम मिति (नेपाली)
            </label>

            <NepaliDatePicker
              value={endMiti}
              className="peer"
              onChange={(e) => {
                setEndMiti(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <FormControlLabel
            className="pl-4"
            onChange={handleCheckbox2}
            {...register("status")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.status}
              />
            }
            label="स्थिति ?"
          />

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
          disabled={isSubmitting}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        />
      </form>
    </>
  );
}

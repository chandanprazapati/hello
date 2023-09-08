import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Checkbox, FormControlLabel } from "@mui/material";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
const BS = require("bikram-sambat-js");
import BikramSambat from "bikram-sambat-js";
import { publicHolidayValidateResolver } from "../../../utils/validateField";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { attOffice } from "../../../services/apiServices/common/attOffice/attOfficeService";
import "nepali-datepicker-reactjs/dist/index.css";
import { createPublicHoliday } from "../../../services/apiServices/pis/publicHoliday/publicHolidayService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreatePublicHoliday({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: publicHolidayValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      attOfficeId: clickedIdData?.attOfficeId,
      status: clickedIdData?.status,
    },
  });

  // for start date and end date
  const [startNepData, setStartNepDate] = useState(aa);
  const [endNepDate, setEndNepDate] = useState(aa);

  // for setting the values of start date and end date
  useEffect(() => {
    if (clickedIdData) {
      setStartNepDate(clickedIdData.startDateNep || aa);
      setEndNepDate(clickedIdData.endDateNep || aa);
    }
  }, [clickedIdData]);

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          startDateNep: startNepData,
          endDateNep: endNepDate,
          startDate: new Date(BS.BSToAD(startNepData)),
          endDate: new Date(BS.BSToAD(endNepDate)),
        };
        try {
          createPublicHoliday(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/pis/publicHoliday");
              return;
            }
            if (response.status === false) {
              toast.error(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              return;
            }
          });
        } catch (error) {
          toast.error(error.message);
        }
        resolve();
      }, 2000);
    });
  };

  // attOffice
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await attOffice();
        if (status) {
          setApiData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const options = apiData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.attOfficeId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"सार्वजनिक विदा राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              नाम(नेपाली)
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.name?.message}</p>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              जारी मिति
            </label>

            <NepaliDatePicker
              value={startNepData}
              className="peer"
              onChange={(e) => {
                setStartNepDate(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              value={new Date(BS.BSToAD(startNepData)).toLocaleDateString(
                "en-US"
              )}
              className="peer"
            />
            <label className="label">Start Date</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              अन्तिम मिति
            </label>

            <NepaliDatePicker
              value={endNepDate}
              className="peer"
              onChange={(e) => {
                setEndNepDate(e);
              }}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />

            <p> {errors?.dateTo?.message}</p>
          </div>
          <div className="relative z-0 w-full  group">
            <input
              className="peer"
              value={new Date(BS.BSToAD(endNepDate)).toLocaleDateString(
                "en-US"
              )}
            />
            <label className="label">End Date</label>
            <p> {errors?.dateToEng?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              कार्यालयको हाजिरी
              <span className="requiredField">*</span>
            </label>
            <select {...register("attOfficeId")} className="peer requiredField">
              <option value={""}>
                --- कार्यालयको हाजिरी चयन गर्नुहोस् ---
              </option>
              {options}
            </select>
            <p> {errors?.attOfficeId?.message}</p>
          </div>

          <FormControlLabel
            className="pl-4"
            {...register("status")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.status}
              />
            }
            label="स्थिति ?"
          />
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

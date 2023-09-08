import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  createFiscal,
  fiscal,
} from "../../../services/apiServices/common/fiscal/fiscalService";
import { fiscalValidationResolver } from "../../../utils/validateField";
import "nepali-datepicker-reactjs/dist/index.css";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateFiscal({ clickedIdData }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: fiscalValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      name_En: clickedIdData?.name_En,
      code: clickedIdData?.code,
      startYear: clickedIdData?.startYear,
      endYear: clickedIdData?.endYear,
      isActive: clickedIdData?.isActive,
      previousFiscalYearId: clickedIdData?.previousFiscalYearId || null ,
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      dateFromEng: new Date(BS.BSToAD(dateFrom)),
      dateToEng: new Date(BS.BSToAD(dateTo)),
      dateFrom: dateFrom,
      dateTo: dateTo,
    };

    try {
      const response = await createFiscal(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/common/fiscal");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // for previous fiscal year
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchFiscalData = async () => {
      try {
        const response = await fiscal();
        if (response.status === true) {
          setApiData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiscalData();
  }, []);

  const options = apiData.map((item) => {
    return (
      <option
        value={item.id  }
        key={item.id}
        selected={item.id === clickedIdData?.previousFiscalYearId}
      >
        {item.name}
      </option>
    );
  });

  // for date picker
  const [dateFrom, setDateFrom] = useState(aa);
  const [dateTo, setDateTo] = useState(aa);
  // for setting the values of start date and end date
  useEffect(() => {
    if (clickedIdData) {
      setDateFrom(clickedIdData.dateFrom || aa);
      setDateTo(clickedIdData.setDateTo || aa);
    }
  }, [clickedIdData]);

  // Set default value of previousFiscalYearId to null
  useEffect(() => {
    setValue("previousFiscalYearId", null);
  }, []);

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"आर्थिक वर्ष राख्नुहोस"} />
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
              {" "}
              Name(नेपाली)
              <span className="requiredField">*</span>
            </label>
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name_En")}
              placeholder="."
            />
            <label className="label">Name(English)</label>
            {errors.name_En && <p>{errors.name_En.message}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("code")}
              placeholder="."
            />
            <label className="label">कोड </label>
            {errors.code && <p>{errors.code.message}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer requiredField"
              {...register("startYear")}
              placeholder="."
            />
            <label className="label">
              Start Year
              <span className="requiredField">*</span>
            </label>
            {errors.startYear && <p>{errors.startYear.message}</p>}
          </div>
          <div className="relative z-0 w-full  group">
            <input
              type="number"
              className="peer requiredField"
              {...register("endYear")}
              placeholder="."
            />
            <label className="label">
              End Year
              <span className="requiredField">*</span>
            </label>
            {errors.endYear && <p>{errors.endYear.message}</p>}
          </div>
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              जारी मिति (BS)
            </label>
            <NepaliDatePicker
              value={dateFrom}
              className="peer"
              onChange={(e) => setDateFrom(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={new Date(BS.BSToAD(dateFrom)).toLocaleDateString("en-US")}
              className="peer"
            />
            <label className="label">Start Date</label>
            {errors.dateFromEng && <p>{errors.dateFromEng.message}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              अन्तिम मिति
            </label>
            <NepaliDatePicker
              value={dateTo}
              className="peer"
              onChange={(e) => setDateTo(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={new Date(BS.BSToAD(dateTo)).toLocaleDateString("en-US")}
              className="peer   "
            />
            <label className="label">End Date</label>
            {errors.dateToEng && <p>{errors.dateToEng.message}</p>}
          </div>
          <div className="relative z-0 w-full  group">

           

            <select
              {...register("previousFiscalYearId")}
              className="peer requiredField"
            >
              <option value="">---पूरानो आर्थिक वर्ष छानुहोस---</option>

              {options}
            </select>
            <label className="label">
              पूरानो आर्थिक वर्ष
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.previousFiscalYearId?.message}</p>
          </div>

          <FormControlLabel
            className="pl-4"
            {...register("isActive")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.isActive}
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

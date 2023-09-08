import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Checkbox, FormControlLabel } from "@mui/material";
import { sewa } from "../../../services/apiServices/common/sewa/sewaService";
import { attOffice } from "../../../services/apiServices/common/attOffice/attOfficeService";
import { createLeaveType } from "../../../services/apiServices/pis/leaveType/leaveTypeService";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { leaveTypeValidateResolver } from "../../../utils/validateField";
const CreateLeaveType = ({ clickedIdData }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: leaveTypeValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      attOfficeId: clickedIdData?.attOfficeId,
      status: clickedIdData?.status,
      isHalfAllowed: clickedIdData?.isHalfAllowed,
      sewaId: clickedIdData?.sewaId,
      eachYearDays: clickedIdData?.eachYearDays,
      maxDays: clickedIdData?.maxDays,
      noOfTimes: clickedIdData?.noOfTimes,
      isPreserved: clickedIdData?.isPreserved,
      maxDayToSave: clickedIdData?.maxDayToSave,
    },
  });
  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createLeaveType(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/pis/leaveType");
        } else if (response.status === false) {
          toast.error(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, isSubmitting]
  );

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

  // attOffice
  const [apiDataSewa, setApiDataSewa] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await sewa();
        if (status) {
          setApiDataSewa(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const optionsSewa = apiDataSewa.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.sewaId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"कार्यालयको हाजिरी  राख्नुहोस"} />
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

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("eachYearDays")}
              placeholder="."
            />
            <label className="label">Each Year Days</label>
            <p> {errors?.eachYearDays?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("maxDays")}
              placeholder="."
            />
            <label className="label">Max Days</label>
            <p> {errors?.maxDays?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("noOfTimes")}
              placeholder="."
            />
            <label className="label">No.Of Times</label>
            <p> {errors?.noOfTimes?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("isPreserved")}
              placeholder="."
            />
            <label className="label">Is Preserved</label>
            <p> {errors?.isPreserved?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("maxDayToSave")}
              placeholder="."
            />
            <label className="label">Max Day To Save</label>
            <p> {errors?.maxDayToSave?.message}</p>
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
            <p>{errors.attOfficeId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              सेवा
              <span className="requiredField">*</span>
            </label>
            <select {...register("sewaId")} className="peer requiredField">
              <option value={""}>----- सेवा चयन गर्नुहोस् -----</option>
              {optionsSewa}
            </select>
            <p>{errors.sewaId?.message}</p>
          </div>

          <FormControlLabel
            className="pl-4"
            {...register("status")}
            control={
              <Checkbox
                defaultChecked={clickedIdData?.status}
                color="primary"
              />
            }
            label="स्थिति ?"
          />
          <FormControlLabel
            className="pl-4"
            {...register("isHalfAllowed")}
            control={
              <Checkbox
                defaultChecked={clickedIdData?.isHalfAllowed}
                color="primary"
              />
            }
            label="आधा विदा अनुमति छ ?"
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
};

export default CreateLeaveType;

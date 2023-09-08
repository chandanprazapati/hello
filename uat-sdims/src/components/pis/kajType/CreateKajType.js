import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Checkbox, FormControlLabel } from "@mui/material";
import { kajTypeValidateResolver } from "../../../utils/validateField";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { attOffice } from "../../../services/apiServices/common/attOffice/attOfficeService";
import { createKajType } from "../../../services/apiServices/pis/kajType/kajTypeService";

export default function CreateKajType({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: kajTypeValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      status: clickedIdData?.status,
      attOfficeId: clickedIdData?.attOfficeId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      console.log(data, "data");
      try {
        if (isSubmitting) return;
        const response = await createKajType(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/pis/kajType");
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

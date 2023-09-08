import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { postValidateResolver } from "../../../utils/validateField";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { shredi } from "../../../services/apiServices/common/shredi/shrediService";
import { createPost } from "../../../services/apiServices/common/post/postService";
import AddButton from "../../reusableDesign/AddButton";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CreatePost({ clickedIdData }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: postValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      nameEng: clickedIdData?.nameEng,
      shrediId: clickedIdData?.shrediId,
      status: clickedIdData?.status,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createPost(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/common/post");
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

  // for shredi
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await shredi();
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
        selected={item.id === clickedIdData?.shrediId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"पद राख्नुहोस"} />
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
              Name(नेपाली)
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.name?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nameEng")}
              placeholder="."
            />
            <label className="label">Name(English)</label>

            <p> {errors?.nameEng?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              क्षेडी
              <span className="requiredField">*</span>
            </label>
            <select {...register("shrediId")} className="peer requiredField">
              <option value={""}>--- क्षेडी छान्नुहोस् ---</option>
              {options}
            </select>
            <p> {errors?.shrediId?.message}</p>
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
            label="हाल कार्यरत् छ  ?"
          />
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

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { upaChetraValidationResolver } from "../../../utils/validateField";
import { createUpaChetra } from "../../../services/apiServices/planning/upaChetra/upaChetraService";
import { chetra } from "../../../services/apiServices/planning/chetra/chetraService";

const CreateUpaChetraComp = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: upaChetraValidationResolver });

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("upaChettraId", clickedIdData?.upaChettraId);
    setValue("upaChettra", clickedIdData?.upaChettra);
    setValue("kharchaSirshark", clickedIdData?.kharchaSirshark);
    setChetraValue(clickedIdData?.chettraId);
  }, [clickedIdData, setValue]);

  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          chettraId: chetraValue,
        };
        try {
          createUpaChetra(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/upachetra");
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

  // for Chetra
  const [chetraId, setChetraId] = useState([]);
  const [chetraValue, setChetraValue] = useState("");

  const handleChetraId = (e) => {
    setChetraValue(e.target.value);
  };
  useEffect(() => {
    let chetraApiData = () => {
      chetra().then((response) => {
        try {
          response.status === true;

          {
            setChetraId(response.data);
          }
        } catch (error) {}
      });
    };

    chetraApiData();
  }, []);

  return (
    <>
      <CommonHeaderDesign title={"उप क्षेत्र राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("upaChettra")}
              placeholder="."
            />
            <label className="label">उप क्षेत्र नाम </label>
            <p> {errors?.upaChettra?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("kharchaSirshark")}
              placeholder="."
            />
            <label className="label">खर्च शीर्षक</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">क्षेत्रको नाम</label>
            <select
              onChange={handleChetraId}
              value={chetraValue}
              className="peer"
              required
            >
              <option value={""} selected disabled>
                ---- क्षेत्रको नाम छान्नुहोस् ----
              </option>

              {chetraId.map((items, index) => {
                return (
                  <option key={index} value={items?.chettraId}>
                    {items.chettraName}
                  </option>
                );
              })}
            </select>
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
};

export default CreateUpaChetraComp;

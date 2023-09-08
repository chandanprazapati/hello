import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import {  TextareaAutosize } from "@mui/material";
import { createUpaChetraDetail } from "../../../../services/apiServices/planning/upaChetraDetail/upachetraDetailService";
import { upaChetra } from "../../../../services/apiServices/planning/upaChetra/upaChetraService";
import { fiscal } from "../../../../services/apiServices/common/fiscal/fiscalService";

export default function CreateUpaChetraDetail({ clickedIdData }) {
  console.log("clickedIdData", clickedIdData);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: castValidateResolver,
    defaultValues: {
      upaChetraDetailId: clickedIdData?.upaChetraDetailId,
      upaChetraId: clickedIdData?.upaChetraId,
      upaChetraDetailName: clickedIdData?.upaChetraDetailName,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createUpaChetraDetail(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/planning/upachetradetail");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, isSubmitting]
  );

    //   for upaChetraOptions
    const [upaChetraData, setUpaChetraData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { status, data } = await upaChetra();
          if (status) {
            setUpaChetraData(data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
    const upaChetraOptions = upaChetraData.map((item) => {
      return (
        <option
          value={item.upaChettraId}
          key={item.upaChettraId}
          selected={item.upaChettra === clickedIdData?.upaChettra}
        >
          {item.upaChettra}
        </option>
      );
    });

    // for  fiscal year
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

  const fiscalYearOptions = apiData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.previousFiscalYearId}
      >
        {item.name}
      </option>
    );
  });

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"उप क्षेत्र विवरण राख्नुहोस "} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
        
        <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
            उप क्षेत्रको नाम <span className="requiredField">*</span>{" "}
            </label>
            <select
              {...register("upaChetraId")}
              className="peer requiredField"
            >
              <option value={""}>----- उप क्षेत्रको नाम छान्नुहोस्-----</option>
              {upaChetraOptions}
            </select>
            <p> {errors?.upaChetraId?.message}</p>
          </div>

          {/* <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
            आर्थिक वर्ष नाम <span className="requiredField">*</span>{" "}
            </label>
            <select
              {...register("fiscalYearId")}
              className="peer requiredField"
            >
              <option value={""}>----- आर्थिक वर्ष छान्नुहोस्-----</option>
              {fiscalYearOptions}
            </select>
            <p> {errors?.fiscalYearId?.message}</p>
          </div> */}
        
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("detail")}
              placeholder="."
            />
            <label className="label">
            उप क्षेत्र विवरणको नाम
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.detail?.message}</p>
          </div>
          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("upaChetraName")}
              placeholder="."
            />
            <label className="label">उप क्षेत्रको नाम
            <span className="requiredField">*</span>{" "}
            </label>
            
            <p> {errors?.upaChetraName?.message}</p>
          </div> */}

          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fiscalYearFrom")}
              placeholder="."
            />
            <label className="label">उसुरुवात आर्थिक वर्ष 
            <span className="requiredField">*</span>{" "}</label>
            <p> {errors?.fiscalYearFrom?.message}</p>
          </div> */}

          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fiscalYearFrom")}
              placeholder="."
            />
            <label className="label">अन्तिम आर्थिक वर्ष 
            <span className="requiredField">*</span>{" "}</label>
            <p> {errors?.fiscalYearFrom?.message}</p>
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <label>विवरण</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("detail")}
              placeholder="write something here......"
            />
          </div> */}
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

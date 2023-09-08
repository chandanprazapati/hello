import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createIndexCaseType, indexCaseType } from "../../../../services/apiServices/legalCase/indexCaseType/indexCaseTypeService";
import { castValidateResolver, mamilaTypeVAlidateResolver } from "../../../../utils/validateField";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import { createIndexCaseSubType } from "../../../../services/apiServices/legalCase/indexCaseSubType/indexCaseSubTypeService";
import SeoOptimization from "../../../../components/reusableDesign/SeoOptimzation";

export default function CreateMamilaType({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: mamilaTypeVAlidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      caseTypeId: clickedIdData?.caseTypeId,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createIndexCaseSubType(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/legalCase/mamilaType");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, isSubmitting]
  );

  //   for gender
  const [mamilaData, setMamilaData] = useState([]);
  console.log("mamilaData", mamilaData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await indexCaseType();
        if (status) {
          setMamilaData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const mamilaOptions = mamilaData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.id}
      >
        {item.name}
      </option>
    );
  });
  return (
    <React.Fragment>
      <SeoOptimization title={"Mamila  Type"} />

      <CommonHeaderDesign title={"मामिलाका प्रकारहरु राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField "
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              पुरा नाम(नेपाली)
              <span className="requiredField">*</span>{" "}
            </label>
            <p> {errors?.name?.message}</p>
          </div>
         
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
            मामिला <span className="requiredField">*</span>{" "}
            </label>
            <select
              {...register("caseTypeId")}
              className="peer requiredField"
            >
              <option value={""}>----- मामिला छान्नुहोस् -----</option>
              {mamilaOptions}
            </select>
            <p> {errors?.caseTypeId?.message}</p>
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

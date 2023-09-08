import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { yojanaValidationResolver } from "../../../utils/validateField";
import { budgetType } from "../../../services/apiServices/planning/budgetType/budgetTypeService";
import { budgetSubType } from "../../../services/apiServices/planning/budgetSubType/budgetSubTypeService";
import { ward } from "../../../services/apiServices/common/ward/wardService";
import { createYojana } from "../../../services/apiServices/planning/yojana/yojanaService";
import { upabhoktaSamiti } from "../../../services/apiServices/planning/upabhoktaSamiti/upabhoktaSamitiService";
const CreateYojana = ({ clickedIdData }) => {
  console.log("clickedIdData", clickedIdData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: yojanaValidationResolver });

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("yojanaSetupId", clickedIdData?.yojanaSetupId);
    setValue("amount", clickedIdData?.amount);
    setValue("yojanaName", clickedIdData?.yojanaName);
    setValue("estimatedAmount", clickedIdData?.estimatedAmount);
    setValue("remainingBudget", clickedIdData?.remainingBudget);
  }, [clickedIdData, setValue]);

  const router = useRouter();

  // to set incoming value of id
  useEffect(() => {
    if (!clickedIdData) return;
    setBudgetTypeId(clickedIdData?.budgetTypeId);
    setBudgetSubTypeId(clickedIdData?.budgetSubTypeId);
    setWardId(clickedIdData?.wardId);
    setUpabhoktaSamitiId(clickedIdData?.upabhoktaSamitiDetailId);
  }, [clickedIdData]);


  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = {
          ...data,
          budgetTypeId: budgetTypeId,
          budgetSubTypeId: budgetSubTypeId,
          wardId: wardId,
          upabhoktaSamitiDetailId: upabhoktaSamitiId,
          shrot: "string",
          fiscalYearId: 0,
        };
        try {
          createYojana(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/planning/yojana");
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

  const watchedFields = watch();

  const [budgetTypeId, setBudgetTypeId] = useState("");
  const [budgetTypeApiData, setBudgetTypeApiData] = useState([]);

  const handleBudgetType = (e) => {
    setBudgetTypeId(e.target.value);
  };

  useEffect(() => {
    let budgetApiData = () => {
      budgetType().then((response) => {
        try {
          response.status === true;
          {
            setBudgetTypeApiData(response.data);
          }
        } catch (error) {}
      });
    };
    budgetApiData();
  }, [setBudgetTypeApiData]);

  const [budgetSubTypeId, setBudgetSubTypeId] = useState("");

  const [budgetSubTypeApiData, setBudgetSubTypeApiData] = useState([]);


  const handleBudgetSubType = (e) => {
    setBudgetSubTypeId(e.target.value);
  };

  useEffect(() => {
    let budgetSubTypeApiData = () => {
      budgetSubType().then((response) => {
        try {
          response.status === true;
          {
            setBudgetSubTypeApiData(response.data);
          }
        } catch (error) {}
      });
    };
    budgetSubTypeApiData();
  }, [setBudgetSubTypeApiData]);

  // for budget sub type amount
  const budgetSubTypeAmount = budgetSubTypeApiData?.find( 
    (item) => item.id === parseInt(budgetSubTypeId)
  );

  const [wardId, setWardId] = useState("");
  const [wardApiData, setWardApiData] = useState([]);

  const handleWard = (e) => {
    setWardId(e.target.value);
  };

  useEffect(() => {
    let wardApiData = () => {
      ward().then((response) => {
        try {
          response.status === true;
          {
            setWardApiData(response.data);
          }
        } catch (error) {}
      });
    };
    wardApiData();
  }, [setWardApiData]);

  const [upabhoktaSamitiId, setUpabhoktaSamitiId] = useState("");
  const [upabhoktaSamitiApiData, setUpabhoktaSamitiApiData] = useState([]);

  const handleUpabhoktaSamiti = (e) => {
    setUpabhoktaSamitiId(e.target.value);
  };

  useEffect(() => {
    let upabhoktaSamitiApiData = () => {
      upabhoktaSamiti().then((response) => {
        try {
          response.status === true;
          {
            setUpabhoktaSamitiApiData(response.data);
          }
        } catch (error) {}
      });
    };
    upabhoktaSamitiApiData();
  }, [setUpabhoktaSamitiApiData]);

  return (
    <>
      <CommonHeaderDesign title={"योजना राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("yojanaName")}
              placeholder="."
            />
            <label className="label">योजनको नाम</label>
            <p> {errors?.yojanaName?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">बजेटको प्रकार </label>
            <select
              onChange={handleBudgetType}
              value={budgetTypeId}
              className="peer"
              required
            >
              <option value={""}>--- बजेटको प्रकार छान्नुहोस् ---</option>
              {budgetTypeApiData.map((items, index) => {
                return (
                  <>
                    <option value={items.budgetTypeId} key={index}>
                      {items.budgetTypeName}
                    </option>
                  </>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">बजेटको उप प्रकार</label>
            <select
              onChange={handleBudgetSubType}
              value={budgetSubTypeId}
              className="peer"
              required
            >
              <option value={""}>--- बजेटको उप प्रकार छान्नुहोस् ---</option>
              {budgetSubTypeApiData?.map((items, index) => {
                return (
                  <>
                    <option value={items.id} key={index}>
                      {items?.budgetSubTypeName}
                    </option>
                  </>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वार्ड नं.</label>
            <select
              onChange={handleWard}
              value={wardId}
              className="peer"
              required
            >
              <option value={""}>--- वार्ड छान्नुहोस् ---</option>
              {wardApiData?.map((items, index) => {
                return (
                  <>
                    <option value={items.id} key={index}>
                      {items?.name}
                    </option>
                  </>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">उपभोक्ता समितिको नाम</label>
            <select
              onChange={handleUpabhoktaSamiti}
              value={upabhoktaSamitiId}
              required
              className="peer"
            >
              <option value={""}>
                --- उपभोक्ता समितिको नाम छान्नुहोस् ---
              </option>
              {upabhoktaSamitiApiData?.map((items, index) => {
                return (
                  <>
                    <option value={items.upabhoktaSamitiDetailId} key={index}>
                      {items?.name}
                    </option>
                  </>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("amount")}
              value={budgetSubTypeAmount?.amount}
              placeholder="."
            />
            <label className="label">बजेट रकम</label>
            <p> {errors?.amount?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("remainingBudget")}
              placeholder="."
            />
            <label className="label">बाँकी रकम</label>
            <p> {errors?.remainingBudget?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("estimatedAmount")}
              placeholder="."
            />
            <label className="label">अनुमानित रकम</label>
            {watchedFields?.estimatedAmount > budgetSubTypeAmount?.amount  ?(
            <p>बजेट रकम भन्दा अनुमानित रकम भन्दा धेरै राख्न पाइदैन  </p>
            ):""}
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

export default CreateYojana;

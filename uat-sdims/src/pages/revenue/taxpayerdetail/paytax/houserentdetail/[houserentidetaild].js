import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ViewPage from "../../../../../components/viewPage/ViewPage";
import CommonHeaderDesign from "../../../../../components/reusableDesign/CommonHeaderDesign";
import { fiscal } from "../../../../../services/apiServices/common/fiscal/fiscalService";
import { Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import { houseRentType } from "../../../../../services/apiServices/revenue/houseRentType/houseRentTypeService";
import { createHouseRentDetail } from "../../../../../services/apiServices/revenue/houseRentDetail/houseRentDetailService";
import AddButton from "../../../../../components/reusableDesign/AddButton";
const CreateHouseRentTaxById = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue, 
  } = useForm();
  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("fiscalYearId", clickedIdData?.fiscalYearId);
    setValue("rentTypeId", clickedIdData?.rentTypeId);
    setValue("taxPayerId", clickedIdData?.taxPayerId);
    setValue("buildingCodeNo", clickedIdData?.buildingCodeNo);
    setValue("totalBulding", clickedIdData?.totalBulding);
    setValue("totalRoom", clickedIdData?.totalRoom);
    setValue("totalRoomOnRent", clickedIdData?.totalRoomOnRent);
    setValue("yearlyRentAmount", clickedIdData?.yearlyRentAmount);
    setValue("outstandingAmount", clickedIdData?.outstandingAmount);
    setValue("remarks", clickedIdData?.remarks);
    setValue("status", clickedIdData?.status);
  }, [clickedIdData, setValue]);

  const router = useRouter();
  const userId = router?.query?.houserentidetaild;

  const [loading, setLoading] = useState(true);

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (fiscalValue === 0) {
          setFiscalMsg(<p>This field is required</p>);
        }
        else if (houseRentValue === 0){
          setHouseRentMsg(<p>This field is required</p>)
        }
        else {
          data = {
            ...data,
            fiscalYearId: fiscalValue,
            taxPayerId : userId,
            status : checked,
            rentTypeId : houseRentValue
          };
        }
        try {
          createHouseRentDetail(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push(`/revenue/taxpayerdetail/paytax/${userId}`);

            return;
            }else response.status === false;
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




  //   for FISCAL
  const [fiscalId, setFiscalId] = useState([0]);
  const [fiscalValue, setFiscalValue] = useState(0);
  const [fiscalMsg, setFiscalMsg] = useState("");

  const handleFiscal = (e) => {
    setFiscalValue(e.target.value);
  };
  useEffect(() => {
    let getFiscalById = () => {
      fiscal(0).then((response) => {
        try {
          response.status === true;
          setLoading(false)
          {
            setFiscalId(response.data);
          }
        } catch (error) {}
      });
    };
    getFiscalById();
  }, []);

  //   for FISCAL
  const [houseRentId, setHouseRentId] = useState([0]);
  const [houseRentValue, setHouseRentValue] = useState(0);
  const [houseRentMsg, setHouseRentMsg] = useState("");

  const handleHouseRent = (e) => {
    setHouseRentValue(e.target.value);
  };
  useEffect(() => {
    let getHouseRentById = () => {
      houseRentType().then((response) => {
        try {
          response.status === true;
          setLoading(false)
          {
            setHouseRentId(response.data);
          }
        } catch (error) {}
      });
    };
    getHouseRentById();
  }, []);

   //    for स्थिति
   const [checked, setChecked] = useState(false);
   const handleCheckbox = () => {
     setChecked(!checked);
   };
  

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"घरबहाल कर विवरण राख्नुहोस "} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {loading ? (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            {/* loading text */}
            <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
              Loading...
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">

            
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">भाडाको प्रकार</label>
              <select
                onChange={handleHouseRent}
                value={houseRentValue}
                className="peer"
              >
                <option value={0} disabled>
                  Select the house rent type
                </option>

                {houseRentId.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.name}
                    </option>
                  );
                })}
              </select>
              {houseRentMsg}
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">आर्थिक वर्ष</label>
              <select
                onChange={handleFiscal}
                value={fiscalValue}
                className="peer"
              >
                <option value={0} disabled>
                  Select the fiscal year
                </option>

                {fiscalId.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.name}
                    </option>
                  );
                })}
              </select>
              {fiscalMsg}
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("buildingCodeNo")}
                placeholder="."
              />
              <label className="label">भवनको कोड नं</label>
              <p> {errors?.buildingCodeNo?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("totalBulding")}
                placeholder="."
              />
              <label className="label">कुल भवन</label>
              <p> {errors?.totalBulding?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("totalRoom")}
                placeholder="."
              />
              <label className="label">कुल कोठा</label>
              <p> {errors?.totalRoom?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("totalRoomOnRent")}
                placeholder="."
              />
              <label className="label">भाडामा कुल कोठा</label>
              <p> {errors?.totalRoomOnRent?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("yearlyRentAmount")}
                placeholder="."
              />
              <label className="label">वार्षिक भाडा रकम </label>
              <p> {errors?.yearlyRentAmount?.message}</p>
            </div>

           
            <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("outstandingAmount")}
              placeholder="."
            />
            <label className="label">बकाया रकम</label>
            <p> {errors?.outstandingAmount?.message}</p>
          </div>
        
            <div className="flex flex-col gap-2">
              <label>कैफियत</label>

              <TextareaAutosize
                type="string"
                className="border-2 w-full pb-6 border-black"
                {...register("remarks")}
                placeholder="write something here......"
              />
              <p> {errors?.remarks?.message}</p>
            </div>
          
            <FormControlLabel
              className="pl-4"
              onChange={handleCheckbox}
              control={<Checkbox value={checked} color="primary" />}
              label="स्थिति"
            />

          </div>
        )}


<AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </React.Fragment>
  );
};

export default CreateHouseRentTaxById;

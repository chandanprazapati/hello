import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ViewPage from "../../../../../components/viewPage/ViewPage";
import CommonHeaderDesign from "../../../../../components/reusableDesign/CommonHeaderDesign";
import { vehicleDetailValidationResolver } from "../../../../../utils/validateField";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
const BS = require("bikram-sambat-js");
import BikramSambat from "bikram-sambat-js";
import { fiscal } from "../../../../../services/apiServices/common/fiscal/fiscalService";
import { Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import { takeoverType } from "../../../../../services/apiServices/revenue/takeoverType/takeoverTypeService";
import { fuelType } from "../../../../../services/apiServices/revenue/fuelType/fuelTypeService";
import { vehicleCloseReason } from "../../../../../services/apiServices/revenue/vehicleCloseReason/vehicleCloseReasonService";
import { vehicleStatus } from "../../../../../services/apiServices/revenue/vehicleStatus/vehicleStatusService";
import { vehicleType } from "../../../../../services/apiServices/revenue/vehicleType/vehicleTypeService";
import { getTaxRateNames } from "../../../../../services/apiServices/revenue/landDetail/landDetailService";
import { taxSubCategory } from "../../../../../services/apiServices/revenue/taxSubCategory/taxSubCategoryServices";
import { taxCategory } from "../../../../../services/apiServices/revenue/taxCategory/taxCategoryService";
import { createVehicleDetail } from "../../../../../services/apiServices/revenue/vehicleDetail/vehicleDetailService";
import AddButton from "../../../../../components/reusableDesign/AddButton";
const CreateVehicleTaxById = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: vehicleDetailValidationResolver }); // <--- resolver is here;

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("name", clickedIdData?.name);
    setValue("officeId", clickedIdData?.officeId);
    setValue("taxCategoryId", clickedIdData?.taxCategoryId);
    setValue("taxSubCategoryId", clickedIdData?.taxSubCategoryId);
    setValue("taxRateNameId", clickedIdData?.taxRateNameId);
    setValue("vehicleTypeId", clickedIdData?.vehicleTypeId);
    setValue("takeoverTypeId", clickedIdData?.mcpRegNo);
    setValue("mcpRegMiti", clickedIdData?.mcpRegMiti);
    setValue("vehicleStatusId", clickedIdData?.vehicleStatusId);
    setValue("vehicleCloseReasonId", clickedIdData?.vehicleCloseReasonId);
    setValue("usesTypeId", clickedIdData?.usesTypeId);
    setValue("totalSeat", clickedIdData?.totalSeat);
    setValue("totalCylinder", clickedIdData?.totalCylinder);
    setValue("fuelTypeId", clickedIdData?.fuelTypeId);
    setValue("taxStartFiscalYearId", clickedIdData?.taxStartFiscalYearId);
    setValue("regNo", clickedIdData?.regNo);
    setValue("regMiti", clickedIdData?.regMiti);
    setValue("regOffice", clickedIdData?.regOffice);
    setValue("mcpRegNo", clickedIdData?.mcpRegNo);
    setValue("mcpRegMiti", clickedIdData?.mcpRegMiti);
    setValue("takeoverMiti", clickedIdData?.takeoverMiti);
    setValue("takeoverFrom", clickedIdData?.takeoverFrom);
    setValue("closedMiti", clickedIdData?.closedMiti);
    setValue("handoverMiti", clickedIdData?.handoverMiti);
    setValue("handOverFrom", clickedIdData?.handOverFrom);
    setValue("bodyColor", clickedIdData?.bodyColor);
    setValue("engineCapacity", clickedIdData?.engineCapacity);
    setValue("engineNo", clickedIdData?.engineNo);
    setValue("chassisNo", clickedIdData?.chassisNo);
    setValue("modelNo", clickedIdData?.modelNo);
    setValue("remarks", clickedIdData?.remarks);
    setValue("outstandingTaxAmount", clickedIdData?.outstandingTaxAmount);
    setValue("outstandingRemarks", clickedIdData?.outstandingRemarks);
    setValue("isNabikaran", clickedIdData?.isNabikaran);
  }, [clickedIdData, setValue]);

  const router = useRouter();
  const userId = router?.query?.vehicledetailid;

  const [loading, setLoading] = useState(true);

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (vehicleTypeValue === 0) {
          setVehicleTypeMsg(<p>This field is required</p>);
        } else if (fiscalValue === 0) {
          setFiscalMsg(<p>This field is required</p>);
        } else if (taxCategoryValue === 0) {
          setTaxCategoryMsg(<p>This field is required</p>);
        } else if (taxSubCategoryValue === 0) {
          setTaxSubCategoryMsg(<p>This field is required</p>);
        } else if (indexTaxRateValue === 0) {
          setIndexTaxRateMsg(<p>This field is required</p>);
        } else if (fuelTypeValue === 0) {
          setFuelTypeMsg(<p>This field is required</p>);
        } else if (takeOverTypeValue === 0) {
          setTakeOverTypeMsg(<p>This field is required</p>);
        } else if (vehicleCloseResonValue === 0) {
          setVehicleCloseResonMsg(<p>This field is required</p>);
        } else if (vehicleStatusValue === 0) {
          setVehicleStatusMsg(<p>This field is required</p>);
        } else {
          data = {
            ...data,
            vehicleTypeId: vehicleTypeValue,
            regMiti: dartaMiti,
            mcpRegMiti: mcpRegMiti,
            taxStartFiscalYearId: fiscalValue,
            taxCategoryId: taxCategoryValue,
            taxSubCategoryId: taxSubCategoryValue,
            taxRateNameId: indexTaxRateValue,
            isNabikaran: checked,
            takeoverTypeId: takeOverTypeValue,
            takeoverMiti: takeoverMiti,
            closedMiti: closeMiti,
            vehicleCloseReasonId: vehicleCloseResonValue,
            vehicleStatusId: vehicleStatusValue,
            fuelTypeId: fuelTypeValue,
            handoverMiti: handOverMiti,
            taxPayerId: userId,
          };
        }
        try {
          createVehicleDetail(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push(`/revenue/taxpayerdetail/paytax/${userId}`);
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

  //   for date
  const aa = new BikramSambat(new Date()).toBS();

  const [mcpRegMiti, setMcpRegMiti] = useState(aa);
  const handelMcpRegMiti = (e) => {
    setMcpRegMiti(e);
  };

  // for close miti
  const [closeMiti, setCloseMiti] = useState(aa);
  const handleCloseMiti = (e) => {
    setCloseMiti(e);
  };

  // for namesarimiti
  const [handOverMiti, setHandOverMiti] = useState(aa);
  const handleHandOverMiti = (e) => {
    setHandOverMiti(e);
  };
  // for darta miti
  const [dartaMiti, setDartaMiti] = useState(aa);
  const handelDartaMiti = (e) => {
    setDartaMiti(e);
  };

  // for take over miti
  const [takeoverMiti, setTakeoverMiti] = useState(aa);
  const handeleTakeoverMiti = (e) => {
    setTakeoverMiti(e);
  };

  //   for VehicleType
  const [vehicleTypeId, setVehicleTypeId] = useState([0]);
  const [vehicleTypeValue, setVehicleTypeValue] = useState(0);
  const [vehicleTypeMsg, setVehicleTypeMsg] = useState("");

  const handleVehicleType = (e) => {
    setVehicleTypeValue(e.target.value);
  };
  useEffect(() => {
    let getVehicleTypeById = () => {
      vehicleType(0).then((response) => {
        try {
          response.status === true;
          setLoading(false);
          {
            setVehicleTypeId(response.data);
          }
        } catch (error) {}
      });
    };
    getVehicleTypeById();
  }, []);

  //   for TakeOverType
  const [takeOverTypeId, setTakeOverTypeId] = useState([0]);
  const [takeOverTypeValue, setTakeOverTypeValue] = useState(0);
  const [takeOverTypeMsg, setTakeOverTypeMsg] = useState("");

  const handleTakeOverType = (e) => {
    setTakeOverTypeValue(e.target.value);
  };
  useEffect(() => {
    let getTakeOverTypeById = () => {
      takeoverType(0).then((response) => {
        try {
          response.status === true;
          setLoading(false);
          {
            setTakeOverTypeId(response.data);
          }
        } catch (error) {}
      });
    };
    getTakeOverTypeById();
  }, []);

  //   for vehicle close reason
  const [vehicleCloseResonId, setVehicleCloseResonId] = useState([0]);
  const [vehicleCloseResonValue, setvehicleCloseReValue] = useState(0);
  const [vehicleCloseResonMsg, setVehicleCloseResonMsg] = useState("");

  const handleVehicleCloseReson = (e) => {
    setvehicleCloseReValue(e.target.value);
  };
  useEffect(() => {
    let getvehicleCloseReValueById = () => {
      vehicleCloseReason(0).then((response) => {
        try {
          response.status === true;
          setLoading(false);
          {
            setVehicleCloseResonId(response.data);
          }
        } catch (error) {}
      });
    };
    getvehicleCloseReValueById();
  }, []);

  //   for vehicle status
  const [vehicleStatusId, setVehicleStatusId] = useState([0]);
  const [vehicleStatusValue, setVehicleStatusValue] = useState(0);
  const [vehicleStatusMsg, setVehicleStatusMsg] = useState("");

  const handleVehicleStatus = (e) => {
    setVehicleStatusValue(e.target.value);
  };
  useEffect(() => {
    let getVehicleStatusById = () => {
      vehicleStatus(0).then((response) => {
        try {
          response.status === true;
          setLoading(false);
          {
            setVehicleStatusId(response.data);
          }
        } catch (error) {}
      });
    };
    getVehicleStatusById();
  }, []);

  //   for fuel type
  const [fuelTypeId, setFuelTypeId] = useState([0]);
  const [fuelTypeValue, setFuelTypeValue] = useState(0);
  const [fuelTypeMsg, setFuelTypeMsg] = useState("");

  const handleFuelType = (e) => {
    setFuelTypeValue(e.target.value);
  };
  useEffect(() => {
    let getFuelTypeById = () => {
      fuelType(0).then((response) => {
        try {
          response.status === true;
          setLoading(false);
          {
            setFuelTypeId(response.data);
          }
        } catch (error) {}
      });
    };
    getFuelTypeById();
  }, []);

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
          {
            setFiscalId(response.data);
          }
        } catch (error) {}
      });
    };
    getFiscalById();
  }, []);

  //   for tax category
  const [taxCategoryId, setTaxCategoryId] = useState([0]);
  const [taxCategoryValue, setTaxCategoryValue] = useState(0);
  const [taxCategoryMsg, setTaxCategoryMsg] = useState("");

  const handleTaxCategory = (e) => {
    setTaxCategoryValue(e.target.value);
  };
  useEffect(() => {
    let getTaxCategoryById = () => {
      taxCategory(0).then((response) => {
        try {
          response.status === true;
          {
            setTaxCategoryId(response.data);
          }
        } catch (error) {}
      });
    };
    getTaxCategoryById();
  }, []);

  //   for tax sub category
  const [taxSubCategoryId, setTaxSubCategoryId] = useState([0]);
  const [taxSubCategoryValue, setTaxSubCategoryValue] = useState(0);
  const [taxSubCategoryMsg, setTaxSubCategoryMsg] = useState("");

  const handleTaxSubCategory = (e) => {
    setTaxSubCategoryValue(e.target.value);
  };
  useEffect(() => {
    let getTaxSubCategoryById = () => {
      if (taxCategoryValue !== 0) {
        taxSubCategory(taxCategoryValue).then((response) => {
          try {
            response.status === true;
            {
              setTaxSubCategoryId(response.data);
            }
          } catch (error) {}
        });
      }
    };
    getTaxSubCategoryById();
  }, [taxCategoryValue]);

  //   for index tax rate
  const [indexTaxRateId, setIndexTaxRateId] = useState([0]);
  const [indexTaxRateValue, setIndexTaxRateValue] = useState(0);
  const [indexTaxRateMsg, setIndexTaxRateMsg] = useState("");

  const handleIndexTaxRate = (e) => {
    setIndexTaxRateValue(e.target.value);
  };
  useEffect(() => {
    let getIndexTaxRateById = () => {
      if (fiscalValue !== 0) {
        getTaxRateNames(taxSubCategoryValue, fiscalValue).then((response) => {
          try {
            response.status === true;
            {
              setIndexTaxRateId(response.data);
            }
          } catch (error) {}
        });
      }
    };
    getIndexTaxRateById();
  }, [fiscalValue, taxSubCategoryValue]);

  //    for nawikaran
  const [checked, setChecked] = useState(false);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"सवारी साधनको विवरण राख्नुहोस"} />
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
          <>
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl   ">
              <div className="font-bold text-xl ">सवारी साधनको विवरण</div>
            </div>

            <div className="py-4">
              <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100   ">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("name")}
                    placeholder="."
                  />
                  <label className="label">नाम</label>
                  <p> {errors?.name?.message}</p>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">
                    सवारी साधनको प्रकार
                  </label>
                  <select
                    onChange={handleVehicleType}
                    value={vehicleTypeValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the Vehicle Type
                    </option>

                    {vehicleTypeId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {vehicleTypeMsg}
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("regNo")}
                    placeholder="."
                  />
                  <label className="label"> दर्ता नं.</label>
                  <p> {errors?.regNo?.message}</p>
                </div>

                <div className="relative  w-full mb-6 group">
                  <label
                    htmlFor=""
                    className=" absolute text-[10px] text-blue-900 -top-[15%]"
                  >
                    दर्ता मिति
                  </label>

                  <NepaliDatePicker
                    value={dartaMiti}
                    className="peer"
                    onChange={handelDartaMiti}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("regOffice")}
                    placeholder="."
                  />
                  <label className="label">दर्ता कार्यालय</label>
                  <p> {errors?.regOffice?.message}</p>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    className="peer"
                    {...register("mcpRegNo")}
                    placeholder="."
                  />
                  <label className="label">MCP दर्ता नं</label>
                  <p> {errors?.mcpRegNo?.message}</p>
                </div>

                <div className="relative  w-full mb-6 group">
                  <label
                    htmlFor=""
                    className=" absolute text-[10px] text-blue-900 -top-[15%]"
                  >
                    दर्ता मिति
                  </label>

                  <NepaliDatePicker
                    value={mcpRegMiti}
                    className="peer"
                    onChange={handelMcpRegMiti}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    className="peer"
                    {...register("usesTypeId")}
                    placeholder="."
                  />
                  <label className="label">प्रयोग प्रकार</label>
                  <p> {errors?.usesTypeId?.message}</p>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">
                    कर लागु हुने आर्थिक वर्ष
                  </label>
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
                  <label className="label text-blue-900 ">
                    कमुल्याङ्कन समूह
                  </label>
                  <select
                    onChange={handleTaxCategory}
                    value={taxCategoryValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the Tax Category
                    </option>

                    {taxCategoryId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {taxCategoryMsg}
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">
                    मुल्याङ्कन उपसमूह
                  </label>
                  <select
                    onChange={handleTaxSubCategory}
                    value={taxSubCategoryValue}
                    className="peer"
                  >
                    {taxCategoryValue === 0 ? (
                      <>
                        <option value={0} disabled selected>
                          Select First Tax Category
                        </option>
                      </>
                    ) : (
                      <option value={0} disabled selected>
                        Select the Tax Sub Category
                      </option>
                    )}

                    {taxSubCategoryId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {taxSubCategoryMsg}
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">दर रेट</label>
                  <select
                    onChange={handleIndexTaxRate}
                    value={indexTaxRateValue}
                    className="peer"
                  >
                    {fiscalValue === 0 ? (
                      <>
                        <option value={0} disabled>
                          Select the Fiscal Year First
                        </option>
                      </>
                    ) : (
                      <>
                        <option value={0} disabled>
                          Select the Tax Rate
                        </option>
                      </>
                    )}

                    {indexTaxRateId?.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {indexTaxRateMsg}
                </div>

                <FormControlLabel
                  className="pl-4"
                  onChange={handleCheckbox}
                  control={<Checkbox value="remember" color="primary" />}
                  label="नबिकरण हो ?"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">सवारी प्राप्तिको विवरण</div>
            </div>
            <div className="py-4">
              <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">टेकओभर प्रकार</label>
                  <select
                    onChange={handleTakeOverType}
                    value={takeOverTypeValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the take Over Type
                    </option>

                    {takeOverTypeId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {takeOverTypeMsg}
                </div>

                <div className="relative  w-full mb-6 group">
                  <label
                    htmlFor=""
                    className=" absolute text-[10px] text-blue-900 -top-[15%]"
                  >
                    टेकओभर मिती
                  </label>

                  <NepaliDatePicker
                    value={takeoverMiti}
                    className="peer"
                    onChange={handeleTakeoverMiti}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("takeoverFrom")}
                    placeholder="."
                  />
                  <label className="label">बाट अधिग्रहण</label>
                  <p> {errors?.takeoverFrom?.message}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">सवारीको बिधमान अवस्था</div>
            </div>

            <div className="py-4">
              <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">
                    सवारी साधनको स्थिति
                  </label>
                  <select
                    onChange={handleVehicleStatus}
                    value={vehicleStatusValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the vehicle status
                    </option>

                    {vehicleStatusId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {vehicleStatusMsg}
                </div>

                <div className="relative  w-full mb-6 group">
                  <label
                    htmlFor=""
                    className=" absolute text-[10px] text-blue-900 -top-[15%]"
                  >
                    बन्द मिती
                  </label>

                  <NepaliDatePicker
                    value={closeMiti}
                    className="peer"
                    onChange={handleCloseMiti}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">
                    सवारी साधन बन्द कारण
                  </label>
                  <select
                    onChange={handleVehicleCloseReson}
                    value={vehicleCloseResonValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the vehicle close Reason
                    </option>

                    {vehicleCloseResonId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {vehicleCloseResonMsg}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">सवारीको प्राबिधिक विवरण</div>
            </div>
            <div className="py-4">
              <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("bodyColor")}
                    placeholder="."
                  />
                  <label className="label">शरीरको रङ</label>
                  <p> {errors?.bodyColor?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("engineCapacity")}
                    placeholder="."
                  />
                  <label className="label">इन्जिन क्षमता</label>
                  <p> {errors?.engineCapacity?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    className="peer"
                    {...register("totalSeat")}
                    placeholder="."
                  />
                  <label className="label">कुल सिट</label>
                  <p> {errors?.totalSeat?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("engineNo")}
                    placeholder="."
                  />
                  <label className="label">इन्जिन नम्बर</label>
                  <p> {errors?.engineNo?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("chassisNo")}
                    placeholder="."
                  />
                  <label className="label">चेसिस नम्बर</label>
                  <p> {errors?.chassisNo?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("modelNo")}
                    placeholder="."
                  />
                  <label className="label">मोडेल नम्बर</label>
                  <p> {errors?.modelNo?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    className="peer"
                    {...register("totalCylinder")}
                    placeholder="."
                  />
                  <label className="label">कुल सिलिन्डर</label>
                  <p> {errors?.totalCylinder?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <label className="label text-blue-900 ">इन्धनको प्रकार</label>
                  <select
                    onChange={handleFuelType}
                    value={fuelTypeValue}
                    className="peer"
                  >
                    <option value={0} disabled>
                      Select the fuel type
                    </option>

                    {fuelTypeId.map((items, index) => {
                      return (
                        <option key={index} value={items?.id}>
                          {items.name}
                        </option>
                      );
                    })}
                  </select>
                  {fuelTypeMsg}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">सवारीको साधन नामसारी</div>
            </div>
            <div className="py-4">
              <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
                <div className="relative  w-full mb-6 group">
                  <label
                    htmlFor=""
                    className=" absolute text-[10px] text-blue-900 -top-[15%]"
                  >
                    हस्तान्तरण मिती
                  </label>

                  <NepaliDatePicker
                    value={handOverMiti}
                    className="peer"
                    onChange={handleHandOverMiti}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("handOverFrom")}
                    placeholder="."
                  />
                  <label className="label">बाट हस्तान्तरण</label>
                  <p> {errors?.handOverFrom?.message}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label>टिप्पणीहरू</label>

                  <TextareaAutosize
                    type="string"
                    className="border-2 w-full pb-6 border-black"
                    {...register("remarks")}
                    placeholder="write something here......"
                  />
                  <p> {errors?.remarks?.message}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">
                बिगत आर्थिक वर्षको बक्यौता बिवरण
              </div>
            </div>
            <div className="py-4">
              <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer"
                    {...register("outstandingTaxAmount")}
                    placeholder="."
                  />
                  <label className="label">बकाया कर रकम</label>
                  <p> {errors?.outstandingTaxAmount?.message}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label>उत्कृष्ट टिप्पणीहरू</label>

                  <TextareaAutosize
                    type="string"
                    className="border-2 w-full pb-6 border-black"
                    {...register("outstandingRemarks")}
                    placeholder="write something here......"
                  />
                  <p> {errors?.outstandingRemarks?.message}</p>
                </div>
              </div>
            </div>
          </>
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

export default CreateVehicleTaxById;

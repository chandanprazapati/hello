import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import ViewPage from "../../../../../components/viewPage/ViewPage";
import CommonHeaderDesign from "../../../../../components/reusableDesign/CommonHeaderDesign";
import {
  getAllState,
  getDistrict,
  getPalika,
  office,
} from "../../../../../services/apiServices/common/office/officeService";
import { fiscal } from "../../../../../services/apiServices/common/fiscal/fiscalService";
import { buildingDetialValidationResolver } from "../../../../../utils/validateField";
import { buildingType } from "../../../../../services/apiServices/revenue/buildingType/buildingTypeService";
import { taxCategory } from "../../../../../services/apiServices/revenue/taxCategory/taxCategoryService";
import { taxSubCategory } from "../../../../../services/apiServices/revenue/taxSubCategory/taxSubCategoryServices";
import { getTaxRateNames } from "../../../../../services/apiServices/revenue/landDetail/landDetailService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
const BS = require("bikram-sambat-js");
import BikramSambat from "bikram-sambat-js";
import { Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import { taxModule } from "../../../../../services/apiServices/revenue/taxModule/taxModuleService";
import { createBuildingDetail } from "../../../../../services/apiServices/revenue/buildingDetail/buildingDetailService";
import { toast } from "react-toastify";
import AddButton from "../../../../../components/reusableDesign/AddButton";
const CreateBuildingTaxById = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: buildingDetialValidationResolver });

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("jaggaSanketNo", clickedIdData?.jaggaSanketNo);
    setValue("bhawanSanketNo", clickedIdData?.bhawanSanketNo);
    setValue("state", clickedIdData?.state);
    setValue("district", clickedIdData?.district);
    setValue("localLevel", clickedIdData?.localLevel);
    setValue("wardNo", clickedIdData?.wardNo);
    setValue("tole", clickedIdData?.tole);
    setValue("gharNo", clickedIdData?.gharNo);
    setValue("gharPrakar", clickedIdData?.gharPrakar);
    setValue("tallaSankhya", clickedIdData?.tallaSankhya);
    setValue("buildingFloorTypeId", clickedIdData?.buildingFloorTypeId);
    setValue("taxMouleId", clickedIdData?.taxMouleId);
    setValue("taxCategoryId", clickedIdData?.taxCategoryId);
    setValue("taxRateNameId", clickedIdData?.taxRateNameId);
    setValue("totalLength", clickedIdData?.totalLength);
    setValue("totalWidth", clickedIdData?.totalWidth);
    setValue("fiscalYearId", clickedIdData?.fiscalYearId);
    setValue("floorNo", clickedIdData?.floorNo);
    setValue("isAilani", clickedIdData?.isAilani);
    setValue("remarks", clickedIdData?.remarks);
    setValue("status", clickedIdData?.status);
  }, [clickedIdData, setValue]);

  const router = useRouter();
  const userId = router?.query?.buildingdetailid;

  const [loading, setLoading] = useState(true);

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (officeValue === "") {
          setOfficeMsg(<p>This field is required</p>);
        } else if (fiscalValue === 0) {
          setFiscalMsg(<p>This field is required</p>);
        } else if (taxCategoryValue === 0) {
          setTaxCategoryMsg(<p>This field is required</p>);
        } else if (taxSubCategoryValue === 0) {
          setTaxSubCategoryMsg(<p>This field is required</p>);
        } else if (indexTaxRateValue === 0) {
          setIndexTaxRateMsg(<p>This field is required</p>);
        } else if (stateValue === "") {
          setStateMsg(<p>This field is required</p>);
        } else if (districtValue === "") {
          setDistrictMsg(<p>This field is required</p>);
        } else if (palikaValue === "") {
          setPalikaMsg(<p>This field is required</p>);
        } else if (taxModuleValue === "") {
          setTaxModuleMsg(<p>This field is required</p>);
        } else if (buildingValue === "") {
          setBuildingMsg(<p>This field is required</p>);
        } else {
          data = {
            ...data,
            officeId: officeValue,
            fiscalYearId: fiscalValue,
            state: stateValue,
            district: districtValue,
            localLevel: palikaValue,
            gharPrakar: buildingValue,
            taxCategoryId: taxCategoryValue,
            taxSubCategoryId: taxSubCategoryValue,
            taxRateNameId: indexTaxRateValue,
            taxMouleId: taxModuleValue,
            completeMiti: startNepDate,
            isAilani: checked,
            status: checked2,
            taxPayerId: userId,
            buildingFloorTypeId: 0,
            transectionId: 0,
            totalLength: totalLength,
            totalWidth: totalWidth,
            totalArea: totalArea,
            gharName: "",
          };
        }
        try {
          createBuildingDetail(data).then((response) => {
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

  const [startNepDate, setStartNepDate] = useState(aa);
  const handelNepaliStartDate = (e) => {
    setStartNepDate(e);
  };

  //   for buildingId
  const [buildingApi, setBuildingApi] = useState("");
  const [buildingValue, setBuildingValue] = useState("");
  const [buildingMsg, setBuildingMsg] = useState("");

  const handleBuilding = (e) => {
    setBuildingValue(e.target.value);
  };
  useEffect(() => {
    let getBuildingById = () => {
      buildingType().then((response) => {
        try {
          response.status === true;
          {
            setBuildingApi(response.data);
          }
        } catch (error) {}
      });
    };

    getBuildingById();
  }, []);

  //   for officeId
  const [officeApi, setOfficeApi] = useState("");
  const [officeValue, setOfficeValue] = useState("");
  const [officeMsg, setOfficeMsg] = useState("");

  const handleOffice = (e) => {
    setOfficeValue(e.target.value);
  };
  useEffect(() => {
    let getOfficeById = () => {
      office().then((response) => {
        try {
          response.status === true;
          {
            setOfficeApi(response.data);
            setLoading(false);
          }
        } catch (error) {}
      });
    };

    getOfficeById();
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

  // for state
  const [state, setState] = useState([]);
  const [stateValue, setStateValue] = useState("");
  const [stateMsg, setStateMsg] = useState("");
  const handleState = (e) => {
    setStateValue(e.target.value);
  };

  useEffect(() => {
    let getAllStateApiData = () => {
      getAllState().then((response) => {
        try {
          response.status === true;
          {
            setState(response.data);
          }
        } catch (error) {}
      });
    };
    getAllStateApiData();
  }, [setState]);

  // district

  const [district, setDistrict] = useState([]);
  const [districtValue, setDistrictValue] = useState("");
  const [districtMsg, setDistrictMsg] = useState("");

  const handleDistrict = (e) => {
    setDistrictValue(e.target.value);
  };

  useEffect(() => {
    let getDistrictByStateId = () => {
      if (stateValue !== "") {
        getDistrict(stateValue).then((response) => {
          try {
            response.status === true;
            {
              setDistrict(response.data);
            }
          } catch (error) {}
        });
      }
    };
    getDistrictByStateId();
  }, [stateValue]);

  // palika

  const [palika, setPalika] = useState([]);
  const [palikaValue, setPalikaValue] = useState("");
  const [palikaMsg, setPalikaMsg] = useState("");

  const handlePalika = (e) => {
    setPalikaValue(e.target.value);
  };
  useEffect(() => {
    let getPalikaByDistrictId = () => {
      if (districtValue !== "") {
        getPalika(districtValue).then((response) => {
          try {
            response.status === true;
            {
              setPalika(response.data);
            }
          } catch (error) {}
        });
      }
    };
    getPalikaByDistrictId();
  }, [districtValue]);

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

  //    for ऐलानी हो
  const [checked, setChecked] = useState(false);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  //    for स्थिति
  const [checked2, setChecked2] = useState(false);
  const handleCheckbox2 = () => {
    setChecked2(!checked2);
  };

  // for length
  const [totalLength, setTotalLength] = useState(0);
  const handleLength = (e) => {
    setTotalLength(e.target.value);
  };

  // for width
  const [totalWidth, setTotalWidth] = useState(0);
  const handleWidth = (e) => {
    setTotalWidth(e.target.value);
  };

  // for Area
  let totalArea = totalLength * totalWidth;

  //   for taxModuleId
  const [taxModuleId, setTaxModuleId] = useState([]);
  const [taxModuleValue, setTaxModuleValue] = useState("");
  const [taxModuleMsg, setTaxModuleMsg] = useState("");

  const handleTaxModule = (e) => {
    setTaxModuleValue(e.target.value);
  };
  useEffect(() => {
    let taxModuleData = () => {
      taxModule().then((response) => {
        try {
          response.status === true;
          {
            setTaxModuleId(response.data);
          }
        } catch (error) {}
      });
    };

    taxModuleData();
  }, []);

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"घर/तलाको विवरण राख्नुहोस"} />
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
              <label className="label text-blue-900 ">कार्यालय</label>
              <select
                onChange={handleOffice}
                value={officeValue}
                className="peer"
              >
                <option value={""} disabled>
                  Select the Office
                </option>

                {officeApi.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              {officeMsg}
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
                type="string"
                className="peer"
                {...register("jaggaSanketNo")}
                placeholder="."
              />
              <label className="label">जग्गाको संकेत नं.</label>
              <p> {errors?.jaggaSanketNo?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("bhawanSanketNo")}
                placeholder="."
              />
              <label className="label">भवनको संकेत नं.</label>
              <p> {errors?.bhawanSanketNo?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("wardNo")}
                placeholder="."
              />
              <label className="label">वडा नं.</label>
              <p> {errors?.wardNo?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("tole")}
                placeholder="."
              />
              <label className="label">टोल</label>
              <p> {errors?.tole?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("gharNo")}
                placeholder="."
              />
              <label className="label">घर नं. </label>
              <p> {errors?.gharNo?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">State</label>
              <select
                onChange={handleState}
                value={stateValue}
                className="peer"
              >
                {stateValue === "" ? (
                  <>
                    <option value="" disabled>
                      Select the State
                    </option>
                  </>
                ) : (
                  <>
                    <option value="" disabled>
                      Select the state
                    </option>
                  </>
                )}
                {state?.map((items, index) => {
                  return (
                    <option key={index} value={items?.stateId}>
                      {items.stateNameNep}
                    </option>
                  );
                })}
              </select>
              {stateMsg}
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">District</label>
              <select
                onChange={handleDistrict}
                value={districtValue}
                className="peer"
              >
                {stateValue === "" ? (
                  <>
                    <option value="" disabled>
                      Select First State
                    </option>
                  </>
                ) : (
                  <>
                    <option value="" disabled>
                      Select the District
                    </option>
                  </>
                )}
                {district.map((items, index) => {
                  return (
                    <option key={index} value={items?.districtId}>
                      {items.districtNameNep}
                    </option>
                  );
                })}
              </select>
              {districtMsg}
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Palika</label>
              <select
                onChange={handlePalika}
                value={palikaValue}
                className="peer"
              >
                {districtValue === "" ? (
                  <>
                    <option value="" disabled>
                      Select First District
                    </option>
                  </>
                ) : (
                  <>
                    <option value="" disabled>
                      Select the Palika
                    </option>
                  </>
                )}
                {palika.map((items, index) => {
                  return (
                    <option key={index} value={items?.palikaId}>
                      {items.palikaNameNep}
                    </option>
                  );
                })}
              </select>
              {palikaMsg}
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">कर मौल</label>
              <select onChange={handleTaxModule} className="peer">
                <option disabled selected value={""}>
                  Select The Tax Module
                </option>
                {taxModuleId.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items.name}
                    </option>
                  );
                })}
              </select>
              {taxModuleMsg}
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">घरको प्रकार</label>
              <select
                onChange={handleBuilding}
                value={buildingValue}
                className="peer"
              >
                <option value={""} disabled>
                  Select the Building Type
                </option>

                {buildingApi?.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              {buildingMsg}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("tallaSankhya")}
                placeholder="."
              />
              <label className="label">तल्लाको संख्या</label>
              <p> {errors?.tallaSankhya?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">कमुल्याङ्कन समूह</label>
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
              <label className="label text-blue-900 ">मुल्याङ्कन उपसमूह</label>
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

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                onChange={handleLength}
                placeholder="."
              />
              <label className="label">कुल लम्बाइ</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                onChange={handleWidth}
                placeholder="."
              />
              <label className="label">कुल चौडाइ</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input type="string" className="peer" value={totalArea} />
              <label className="label">कुल क्षेत्र</label>
            </div>

            <div className="relative  w-full mb-6 group">
              <label
                htmlFor=""
                className=" absolute text-[10px] text-blue-900 -top-[15%]"
              >
                पूरा मिती
              </label>

              <NepaliDatePicker
                value={startNepDate}
                className="peer"
                onChange={handelNepaliStartDate}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("floorNo")}
                placeholder="."
              />
              <label className="label">तल्ला नं</label>
              <p> {errors?.floorNo?.message}</p>
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
              label="ऐलानी हो ?"
            />
            <FormControlLabel
              className="pl-4"
              onChange={handleCheckbox2}
              control={<Checkbox value={checked2} color="primary" />}
              label="स्थिति ?"
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

export default CreateBuildingTaxById;

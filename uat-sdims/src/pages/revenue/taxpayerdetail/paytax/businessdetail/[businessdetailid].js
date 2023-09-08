import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import ViewPage from "../../../../../components/viewPage/ViewPage";
import CommonHeaderDesign from "../../../../../components/reusableDesign/CommonHeaderDesign";
import {
  getDistrict,
  getPalika,
} from "../../../../../services/apiServices/common/office/officeService";
import { businessType } from "../../../../../services/apiServices/revenue/businessType/businessTypeService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
const BS = require("bikram-sambat-js");
import BikramSambat from "bikram-sambat-js";
import { businessOwnershipType } from "../../../../../services/apiServices/revenue/businessOwnershipType/businessOwnershipTypeService";
import { fiscal } from "../../../../../services/apiServices/common/fiscal/fiscalService";
import { Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import { ward } from "../../../../../services/apiServices/common/ward/wardService";
import { businessStatus } from "../../../../../services/apiServices/revenue/businessStatus/businessStatusService";
import { businessCloseReason } from "../../../../../services/apiServices/revenue/businessCloseReason/businessCloseReasonService";
const CreateBusinessDetailRentTaxById = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("name", clickedIdData?.name);
    setValue("vatPanNo", clickedIdData?.vatPanNo);
    setValue("startMiti", clickedIdData?.startMiti);
    setValue("transferMiti", clickedIdData?.transferMiti);
    setValue("regOffice", clickedIdData?.regOffice);
    setValue("regMiti", clickedIdData?.regMiti);
    setValue("mcpRegNo", clickedIdData?.mcpRegNo);
    setValue("mcpRegMiti", clickedIdData?.mcpRegMiti);
    setValue("signboardWriter", clickedIdData?.signboardWriter);
    setValue("regNo", clickedIdData?.regNo);
    setValue("handoverFrom", clickedIdData?.handoverFrom);
    setValue("handoverMiti", clickedIdData?.handoverMiti);
    setValue("tole", clickedIdData?.tole);
    setValue("houseNo", clickedIdData?.houseNo);
    setValue("malingAddress", clickedIdData?.malingAddress);
    setValue("emailAddress", clickedIdData?.emailAddress);
    setValue("phoneNo", clickedIdData?.phoneNo);
    setValue("ownerCodeNo", clickedIdData?.ownerCodeNo);
    setValue("remarks", clickedIdData?.remarks);
    setValue("ownerCitizenshipNo", clickedIdData?.ownerCitizenshipNo);
    setValue("businessPurposeNature", clickedIdData?.businessPurposeNature);
    setValue("ownerPhoneNo", clickedIdData?.ownerPhoneNo);
    setValue("oldMcpRegNo", clickedIdData?.oldMcpRegNo);
    setValue("houseOwnerName", clickedIdData?.houseOwnerName);
    setValue("outstandingRemarks", clickedIdData?.outstandingRemarks);
    setValue("businessPurposeNature", clickedIdData?.businessPurposeNature);
  }, [clickedIdData, setValue]);

  const router = useRouter();
  const userId = router?.query?.businessdetailid;

  const [loading, setLoading] = useState(true);

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (businessTypeValue === 0) {
          setBusinessTypeMsg(<p>This field is required</p>);
        } else if (businessOwnershipyTypeValue === 0) {
          setBusinessOwnershipyTypeMsg(<p>This field is required</p>);
        } else if (fiscalValue === 0) {
          setFiscalMsg(<p>This field is required</p>);
        } else if (districtValue === 0) {
          setDistrictMsg(<p>This field is required</p>);
        } else if (palikaValue === "") {
          setPalikaMsg(<p>This field is required</p>);
        } else if (wardValue === 0) {
          setWardMsg(<p>This field is required</p>);
        } else if (businessStatusValue === 0) {
          setBusinessStatusMsg(<p>This field is required</p>);
        } else if (businessCloseReasonMsg === 0) {
          setBusinessCloseReasonMsg(<p>This field is required</p>);
        } else {
          data = {
            ...data,
            businessTypeId: businessTypeValue,
            businessOwnershipTypeId: businessOwnershipyTypeValue,
            startMiti: startMiti,
            transferMiti: nameSariMiti,
            regMiti : dartaMiti,
            taxStartFiscalYearId: fiscalValue,
            isNabikaran: checked,
            districtId: districtValue,
            palikaId: palikaValue,
            wardId: wardValue,
            isClosed: checkedBusiness,
            isOnRent : checkedRent,
            isRentOnRelatives : checkedRelatives,
            handoverMiti : handOverMiti,
            taxPayerId : userId,
            businessStatusId : businessStatusValue,
          };
        }
        // try {
        //   createBusinessCloseReason(data).then((response) => {
        //     if (response.status === true) {
        //       toast.success(response.message, {
        //         icon: "🚀",
        //         autoClose: 1000,
        //       });
        //       router.push("/revenue/businessclose");
        //     }
        //     return;
        //   });
        // } catch (error) {
        //   toast.error(error.message);
        // }
        resolve();
      }, 2000);
    });
  };

  // for length
  const [signboardLength, setSignboardLength] = useState(0);
  const handleSignBoardLength = (e) => {
    setSignboardLength(e.target.value);
  };

  // for width
  const [signboardWidth, setSignboardWidth] = useState(0);
  
  const handleSignBoardWidth = (e) => {
    setSignboardWidth(e.target.value);
  };

  // for Area
  let signboardSqFt = signboardLength * signboardWidth;

  //   for date
  const aa = new BikramSambat(new Date()).toBS();

  const [startNepDate, setStartNepDate] = useState(aa);
  const handelNepaliStartDate = (e) => {
    setStartNepDate(e);
  };

  // for start miti
  const [startMiti, setStartMiti] = useState(aa);
  const handelStartMiti = (e) => {
    setStartMiti(e);
  };

  // for namesarimiti
  const [nameSariMiti, setNameSariMiti] = useState(aa);
  const handelNameSariMiti = (e) => {
    setNameSariMiti(e);
  };
  // for darta miti
  const [dartaMiti, setDartaMiti] = useState(aa);
  const handelDartaMiti = (e) => {
    setDartaMiti(e);
  };

   // for namsari bhayeko miti (handover)
   const [handOverMiti, setHandOverMiti] = useState(aa);
   const handelHandOverMiti = (e) => {
    setHandOverMiti(e);
   };

  //   for businessType
  const [businessTypeId, setBusinessTypeId] = useState([0]);
  const [businessTypeValue, setBusinessTypeValue] = useState(0);
  const [businessTypeMsg, setBusinessTypeMsg] = useState("");

  const handleBusinessType = (e) => {
    setBusinessTypeValue(e.target.value);
  };
  useEffect(() => {
    let getBusinessTypeById = () => {
      businessType(0).then((response) => {
        try {
          response.status === true;
          setLoading(false);
          {
            setBusinessTypeId(response.data);
          }
        } catch (error) {}
      });
    };
    getBusinessTypeById();
  }, []);

  //   for businessOwnership
  const [businessOwnershipyTypeId, setBusinessOwnershipyTypeId] = useState([0]);
  const [businessOwnershipyTypeValue, setBusinessOwnershipyTypeValue] =
    useState(0);
  const [businessOwnershipyTypeMsg, setBusinessOwnershipyTypeMsg] =
    useState("");

  const handleBusinessOwnershipyType = (e) => {
    setBusinessOwnershipyTypeValue(e.target.value);
  };
  useEffect(() => {
    let getBusinessOwnershipyTypeById = () => {
      businessOwnershipType(0).then((response) => {
        try {
          response.status === true;
          setLoading(false);
          {
            setBusinessOwnershipyTypeId(response.data);
          }
        } catch (error) {}
      });
    };
    getBusinessOwnershipyTypeById();
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

  //    for nawikaran
  const [checked, setChecked] = useState(false);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  //  for business close
  const [checkedBusiness, setCheckedBusiness] = useState(false);
  const handleCheckboxBusiness = () => {
    setCheckedBusiness(!checkedBusiness);
  };

   //  for rent
   const [checkedRent, setCheckedRent] = useState(false);
   const handleCheckboxRent = () => {
     setCheckedRent(!checkedRent);
   };

    //  for relatives
  const [checkedRelatives, setCheckedRelatives] = useState(false);
  const handleCheckboxRelatives = () => {
    setCheckedRelatives(!checkedRelatives);
  };

  //   for district
  const [districtIdApi, setDistrictIdApi] = useState([0]);
  const [districtValue, setDistrictValue] = useState("");
  const [districtMsg, setDistrictMsg] = useState("");

  const handleDistrict = (e) => {
    setDistrictValue(e.target.value);
  };
  useEffect(() => {
    let districtIdData = () => {
      getDistrict(0).then((response) => {
        try {
          response.status === true;
          {
            setDistrictIdApi(response.data);
          }
        } catch (error) {}
      });
    };

    districtIdData();
  }, []);

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

  // for ward

  const [wardId, setWardId] = useState([]);
  const [wardValue, setWardValue] = useState(0);
  const [wardMsg, setWardMsg] = useState("");

  const handleWard = (e) => {
    setWardValue(e.target.value);
  };
  useEffect(() => {
    let getWardById = () => {
      ward().then((response) => {
        try {
          response.status === true;
          {
            setWardId(response.data);
          }
        } catch (error) {}
      });
    };

    getWardById();
  }, []);

  //   for bbusiness status

  const [businessStatusId, setBusinessStatusId] = useState([]);
  const [businessStatusValue, setBusinessStatusValue] = useState(0);

  const [businessStatusMsg, setBusinessStatusMsg] = useState("");

  const handleBusinessStatus = (e) => {
    setBusinessStatusValue(e.target.value);
  };
  useEffect(() => {
    let getBusinessStatusById = () => {
      businessStatus().then((response) => {
        try {
          response.status === true;
          {
            setBusinessStatusId(response.data);
          }
        } catch (error) {}
      });
    };

    getBusinessStatusById();
  }, []);

  //   for bbusiness close reason

  const [businessCloseReasonId, setBusinessCloseReasonId] = useState([]);
  const [businessCloseReasonValue, setBusinessCloseReasonValue] = useState(0);

  const [businessCloseReasonMsg, setBusinessCloseReasonMsg] = useState("");

  const handleBusinessCloseReason = (e) => {
    setBusinessCloseReasonValue(e.target.value);
  };
  useEffect(() => {
    let getBusinessCloseReasonById = () => {
      businessCloseReason().then((response) => {
        try {
          response.status === true;
          {
            setBusinessCloseReasonId(response.data);
          }
        } catch (error) {}
      });
    };

    getBusinessCloseReasonById();
  }, []);

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"Create Business Detail"} />
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
            <div className="bg-green-300 pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">व्यापार विवरण</div>
            </div>

            <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("mcpRegNo")}
                  placeholder="."
                />
                <label className="label">गा.पा./ न.पा. दर्ता नं.</label>
                <p> {errors?.mcpRegNo?.message}</p>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("oldMcpRegNo")}
                  placeholder="."
                />
                <label className="label">पुरानो गा.पा./ न.पा.दर्ता नं.</label>
                <p> {errors?.oldMcpRegNo?.message}</p>
              </div>

              <div className="relative  w-full mb-6 group">
                <label
                  htmlFor=""
                  className=" absolute text-[10px] text-blue-900 -top-[15%]"
                >
                  गा.पा./ न.पा. दर्ता मिति
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
                  type="string"
                  className="peer"
                  {...register("name")}
                  placeholder="."
                />
                <label className="label">नाम</label>
                <p> {errors?.name?.message}</p>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <label className="label text-blue-900 ">वडा न</label>
                <select
                  onChange={handleBusinessType}
                  value={businessTypeValue}
                  className="peer"
                >
                  <option value={0} disabled>
                    Select the Business Type
                  </option>

                  {businessTypeId.map((items, index) => {
                    return (
                      <option key={index} value={items?.id}>
                        {items.name}
                      </option>
                    );
                  })}
                </select>
                {businessTypeMsg}
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <label className="label text-blue-900 ">
                  व्यवसाय स्वामित्व किसिम
                </label>
                <select
                  onChange={handleBusinessOwnershipyType}
                  value={businessOwnershipyTypeValue}
                  className="peer"
                >
                  <option value={0} disabled>
                    Select the Business Onership Type
                  </option>

                  {businessOwnershipyTypeId.map((items, index) => {
                    return (
                      <option key={index} value={items?.id}>
                        {items.name}
                      </option>
                    );
                  })}
                </select>
                {businessOwnershipyTypeMsg}
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("businessPurposeNature")}
                  placeholder="."
                />
                <label className="label">व्यवसायको उद्देश्य /प्रकृति</label>
                <p> {errors?.businessPurposeNature?.message}</p>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("vatPanNo")}
                  placeholder="."
                />
                <label className="label">भ्याट/प्यान नं.</label>
                <p> {errors?.vatPanNo?.message}</p>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("chaluPuji")}
                  placeholder="."
                />
                <label className="label">चालु/पुंजी</label>
                <p> {errors?.chaluPuji?.message}</p>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("adhikirtaPuji")}
                  placeholder="."
                />
                <label className="label">अधिकृत पूँजी</label>
                <p> {errors?.adhikirtaPuji?.message}</p>
              </div>

              <div className="relative  w-full mb-6 group">
                <label
                  htmlFor=""
                  className=" absolute text-[10px] text-blue-900 -top-[15%]"
                >
                  सुरु मिति
                </label>

                <NepaliDatePicker
                  value={startMiti}
                  className="peer"
                  onChange={handelStartMiti}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </div>

              <div className="relative  w-full mb-6 group">
                <label
                  htmlFor=""
                  className=" absolute text-[10px] text-blue-900 -top-[15%]"
                >
                  नामसारी भएको मिति
                </label>

                <NepaliDatePicker
                  value={nameSariMiti}
                  className="peer"
                  onChange={handelNameSariMiti}
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
                <label className="label">दर्ता भएको कार्यालय</label>
                <p> {errors?.regOffice?.message}</p>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("regNo")}
                  placeholder="."
                />
                <label className="label">दर्ता नं.</label>
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
                control={<Checkbox value="remember" color="primary" />}
                label="नबिकरण हो ?"
              />
            </div>

            <div className="bg-green-300 pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">
                व्यवसाय रहेको स्थानको विवरण
              </div>
            </div>
            <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
              <div className="relative z-0 w-full mb-6 group">
                <label className="label text-blue-900 ">जिल्ला</label>
                <select
                  onChange={handleDistrict}
                  value={districtValue}
                  className="peer"
                >
                  <option value={""} disabled>
                    Select the District
                  </option>

                  {districtIdApi.map((items, index) => {
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
                <label className="label text-blue-900 ">पालिका</label>
                <select
                  onChange={handlePalika}
                  value={palikaValue}
                  className="peer"
                >
                  {districtValue === "" ? (
                    <>
                      <option value={""} disabled>
                        Select First District
                      </option>
                    </>
                  ) : (
                    <>
                      <option value={""} disabled>
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
                <label className="label text-blue-900 ">ward</label>
                <select
                  onChange={handleWard}
                  value={wardValue}
                  className="peer"
                >
                  <option value={0} disabled>
                    Select the ward
                  </option>

                  {wardId.map((items, index) => {
                    return (
                      <option key={index} value={items?.id}>
                        {items.name}
                      </option>
                    );
                  })}
                </select>
                {wardMsg}
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
                  {...register("houseNo")}
                  placeholder="."
                />
                <label className="label">घर नम्बर</label>
                <p> {errors?.houseNo?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  className="peer"
                  {...register("emailAddress")}
                  placeholder="."
                />
                <label className="label">इ-मेल</label>
                <p> {errors?.emailAddress?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  className="peer"
                  {...register("phoneNo")}
                  placeholder="."
                />
                <label className="label">फोन नम्बर</label>
                <p> {errors?.phoneNo?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("malingAddress")}
                  placeholder="."
                />
                <label className="label">MalingAddress</label>
                <p> {errors?.malingAddress?.message}</p>
              </div>
            </div>

            <div className="bg-green-300 pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">
                व्यवसायको विद्यमान अबस्था
              </div>
            </div>

            <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
              <div className="relative z-0 w-full mb-6 group">
                <label className="label text-blue-900 ">व्यवसायको अबस्था</label>
                <select
                  onChange={handleBusinessStatus}
                  value={businessStatusValue}
                  className="peer"
                >
                  <option value={0} disabled>
                    Select the business status
                  </option>

                  {businessStatusId.map((items, index) => {
                    return (
                      <option key={index} value={items?.id}>
                        {items.name}
                      </option>
                    );
                  })}
                </select>
                {businessStatusMsg}
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <label className="label text-blue-900 ">
                  बन्द गर्नुको कारण
                </label>
                <select
                  onChange={handleBusinessCloseReason}
                  value={businessCloseReasonValue}
                  className="peer"
                >
                  <option value={0} disabled>
                    Select the business Close Reason
                  </option>

                  {businessCloseReasonId.map((items, index) => {
                    return (
                      <option key={index} value={items?.id}>
                        {items.name}
                      </option>
                    );
                  })}
                </select>
                {businessCloseReasonMsg}
              </div>
              <FormControlLabel
                className="pl-4"
                onChange={handleCheckboxBusiness}
                control={<Checkbox value="remember" color="primary" />}
                label="व्यावसय बन्द हो ?"
              />
            </div>
            <div className="bg-green-300 pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">परिचयपाटीको विबरण</div>
            </div>
            <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("signboardWriter")}
                  placeholder="."
                />
                <label className="label">परिचयपाटी लेख्नेको नाम</label>
                <p> {errors?.signboardWriter?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  className="peer"
                  onChange={handleSignBoardLength}
                  placeholder="."
                />
                <label className="label">लम्बाई (फिटमा)</label>
                <p> {errors?.signboardLength?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  className="peer"
                  onChange={handleSignBoardWidth}
                  placeholder="."
                />
                <label className="label">चौडाई (फिटमा)</label>
                <p> {errors?.signboardWidth?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                 
                  className="peer"
                 value={signboardSqFt}
                 
                />
                <label className="label">Sq(फिटमा)</label>
                <p> {errors?.signboardSqFt?.message}</p>
              </div>
            </div>
            <div className="bg-green-300 pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">
                भाडाको विवरण (भाडामा भएमा मात्र)
              </div>
            </div>
            <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
              <FormControlLabel
                className="pl-4"
                onChange={handleCheckboxRent}
                control={<Checkbox value="remember" color="primary" />}
                label="भाडामा हो ?"
                
              />{" "}
              <FormControlLabel
                className="pl-4"
                onChange={handleCheckboxRelatives}
                control={<Checkbox value="remember" color="primary" />}
                label="IsRentOnRelatives ?"
              />
            </div>

            <div className="bg-green-300 pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">
              व्यवसायको नामसारी
              </div>
            </div>
            <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">

            <div className="relative  w-full mb-6 group">
                <label
                  htmlFor=""
                  className=" absolute text-[10px] text-blue-900 -top-[15%]"
                >
                  नामसारी भएको मिति
                </label>

                <NepaliDatePicker
                  value={handOverMiti}
                  className="peer"
                  onChange={handelHandOverMiti}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="string"
                  className="peer"
                  {...register("handoverFrom")}
                  placeholder="."
                />
                <label className="label">नामसारी गराउने व्यवसायीको नाम</label>
                <p> {errors?.handoverFrom?.message}</p>
              </div>

            </div>
            <div className="bg-green-300 pl-10 flex justify-between  py-3 rounded-xl  ">
              <div className="font-bold text-xl ">
              बिगत आर्थिक वर्षको बक्यौता बिवरण
              </div>
            </div>
            <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 ">
            <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  className="peer"
                  {...register("outstandingTaxAmount")}
                  placeholder="."
                />
                <label className="label">नामसारी गराउने व्यवसायीको नाम</label>
                <p> {errors?.outstandingTaxAmount?.message}</p>
              </div>

              <div className="flex flex-col gap-2">
                <label>बक्यौता बिवरण</label>

                <TextareaAutosize
                  type="string"
                  className="border-2 w-full pb-6 border-black"
                  {...register("outstandingRemarks")}
                  placeholder="write something here......"
                />
                <p> {errors?.outstandingRemarks?.message}</p>
              </div>
              
            </div>
          </>
        )}

<div className="bg-gray-300" >
                  <form >
                  <div className="text-2xl pl-10  py-4 font-bold  " >
                  मूल्याङ्कन विवरण
                  </div>
                  <div className="grid lg:grid-cols-7  gap-5 pl-10 ">
          <div className="relative z-0 w-full lg:mb-6 group  ">
            <input
              type="string"
              className="peer"
              {...register("taxPayerName")}
              placeholder="."
            />
            <label className="label">Tax Payer Name</label>
            <p> {errors?.taxPayerName?.message}</p>
          </div>

          <div className="relative z-0 w-full lg:mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("taxPayerName")}
              placeholder="."
            />
            <label className="label">Tax Payer Name</label>
            <p> {errors?.taxPayerName?.message}</p>
          </div>
          <div className="relative z-0 w-full lg:mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("taxPayerName")}
              placeholder="."
            />
            <label className="label">Tax Payer Name</label>
            <p> {errors?.taxPayerName?.message}</p>
          </div>
          <div className="relative z-0 w-full lg:mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("taxPayerName")}
              placeholder="."
            />
            <label className="label">Tax Payer Name</label>
            <p> {errors?.taxPayerName?.message}</p>
          </div><div className="relative z-0 w-full lg:mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("taxPayerName")}
              placeholder="."
            />
            <label className="label">Tax Payer Name</label>
            <p> {errors?.taxPayerName?.message}</p>
          </div>
          </div>
                  </form>
      </div>

        <div className="flex justify-end ">
          <div className="flex gap-2 bg-[#89bde1fd]  py-3 shadow-lg rounded-md w-32 justify-center hover:bg-blue-300 cursor-pointer ">
            <div className="pt-1">
              <FaPlus />
            </div>
            <button
              type="submit"
              className="text-sm font-extralight "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Business Close"}
            </button>
          </div>
        </div>
      </form>

     
    </React.Fragment>
  );
};

export default CreateBusinessDetailRentTaxById;

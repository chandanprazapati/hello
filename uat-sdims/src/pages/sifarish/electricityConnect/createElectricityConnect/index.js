import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";
import "nepali-datepicker-reactjs/dist/index.css";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import { FaMinus, FaPlus } from "react-icons/fa";
import AddButton from "../../../../components/reusableDesign/AddButton";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../../services/apiServices/common/office/officeService";
import { insertBidut } from "../../../../services/apiServices/sifarish/bidutJadan/bidutJadanService";
import { toast } from "react-toastify";
const aa = new BikramSambat(new Date()).toBS();

export default function createElectricityConnect(clickedIdData) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: awabihawitValidationResolver,
    // defaultValues: {
    //   id: clickedIdData?.id,
    //   fullName_Nepali: clickedIdData?.fullName_Nepali,
    //   fullName_English: clickedIdData?.fullName_English,
    // },
  });
  const onSubmit = async (data) => {
    data = {
      ...data,
      bidutPerviousConnectionDetailsInsert: {
        ...data.bidutPerviousConnectionDetailsInsert,
        previousConnectionDate_Np: previousConnectionDate_Np,
        previousConnectionDate_En: previousConnectionDate_En,
      },
      bidutJadanListInsert: bidutJadanListInsert,
    };
    console.log(data, "bidutData");
    try {
      const response = await insertBidut(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/electricityConnect");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //for dynamic form
  const [bidutJadanListInsert, setBidutJadanListInsert] = useState([
    {
      kiloWatt: "",
      bidutEquipmentID: "",
      totalNumber: "",
      watt: "",
      totalWatt: "",
    },
  ]);
  const handleAddPrevElectricConnected = () => {
    setBidutJadanListInsert([
      ...bidutJadanListInsert,
      {
        kiloWatt: "",
        bidutEquipmentID: "",
        totalNumber: "",
        watt: "",
        totalWatt: "",
      },
    ]);
  };

  const handleChangeKilowat = (e, index) => {
    const { name, value } = e.target;
    const list = [...bidutJadanListInsert];
    list[index][name] = value;
    setBidutJadanListInsert(list);
  };
  const handleChangeJadanHune = (e, index) => {
    const { name, value } = e.target;
    const list = [...bidutJadanListInsert];
    list[index][name] = value;
    setBidutJadanListInsert(list);
  };
  const handleChangeSankhya = (e, index) => {
    const { name, value } = e.target;
    const list = [...bidutJadanListInsert];
    list[index][name] = value;
    setBidutJadanListInsert(list);
  };
  const handleChangeWat = (e, index) => {
    const { name, value } = e.target;
    const list = [...bidutJadanListInsert];
    list[index][name] = value;
    setBidutJadanListInsert(list);
  };
  const handleChangeTotalWat = (e, index) => {
    const { name, value } = e.target;
    const list = [...bidutJadanListInsert];
    list[index][name] = value;
    setBidutJadanListInsert(list);
  };
  const handleDeletePrevElectricConnection = (index) => {
    const list = [...bidutJadanListInsert];
    list.splice(index, 1);
    setBidutJadanListInsert(list);
  };

  //for date picker
  const [previousConnectionDate_Np, setPreviousConnectionDate_Np] =
    useState(aa);
  useEffect(() => {
    if (clickedIdData) {
      setPreviousConnectionDate_Np(
        clickedIdData?.previousConnectionDate_Np || aa
      );
    }
  }, [clickedIdData]);
  const [previousConnectionDate_En, setPreviousConnectionDate_En] =
    useState(aa);
  useEffect(() => {
    if (clickedIdData) {
      setPreviousConnectionDate_En(
        clickedIdData?.previousConnectionDate_En || aa
      );
    }
  }, [clickedIdData]);

  const watchAllFields = watch();
  //for state
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getAllState();
        if (status === true) {
          setStateData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  const stateOption = stateData.map((item) => {
    return (
      <option
        key={item.stateId}
        value={item.stateId}
        selected={item.stateId === clickedIdData?.stateId}
      >
        {item.stateNameNep}
      </option>
    );
  });

  const watchFields = watch();
  // console.log(watchFields, "watch");
  //for district
  const [districtData, setDistrictData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getDistrict(watchFields?.stateId);
        if (status === true) {
          setDistrictData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchFields?.stateId]);
  const districtOption = districtData.map((item) => {
    return (
      <option
        key={item.districtId}
        value={item.districtId}
        selected={item.districtId === clickedIdData?.districtId}
      >
        {item.districtNameNep}
      </option>
    );
  });
  //for palika
  const [palikaData, setPalikaData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getPalika();
        if (status === true) {
          setPalikaData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const palikaOption = palikaData.map((item) => {
    return (
      <option
        key={item.palikaId}
        value={item.palikaId}
        selected={item.palikaId === clickedIdData?.palikaId}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"बिजुली जडान सिफारिस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. व्यक्तिगत विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              नाम(Nep)
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_English")}
              placeholder="."
            />
            <label className="label">नाम(Eng)</label>
            <p> {errors?.fullName_English?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("nagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">
              नागरिकता नं.
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.nagariktaPraPaNo?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              नागरिकता जारी जिल्ला
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("nagarkitaIssueDistrict")}
              className="peer requiredField"
            >
              <option value={""}>--- नागरिकता जिल्ला छान्नुहोस् ---</option>
              {districtOption}
            </select>
            <p> {errors?.nagarkitaIssueDistrict?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("occupationOrBusiness")}
              placeholder="."
            />
            <label className="label">
              पेशा वा संस्थाको किसिम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.occupationOrBusiness?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fatherOrHusbandName_Np")}
              placeholder="."
            />
            <label className="label">
              बाबु/पतिको नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fatherOrHusbandName_Np?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherOrHusbandName_En")}
              placeholder="."
            />
            <label className="label">बाबु/पतिको नाम(Eng)</label>
            <p> {errors?.fatherOrHusbandName_En?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("gFatherOrHusbandfatherName_Np")}
              placeholder="."
            />
            <label className="label">
              बाजे/ससुराको नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.gFatherOrHusbandfatherName_Np?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("gFatherOrHusbandfatherName_En")}
              placeholder="."
            />
            <label className="label">बाजे/ससुराको नाम(Eng)</label>
            <p> {errors?.gFatherOrHusbandfatherName_En?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("ownerName_Np")}
              placeholder="."
            />
            <label className="label">
              घर धनीको नाम
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.ownerName_Np?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("ownerName_En")}
              placeholder="."
            />
            <label className="label">घर धनीको नाम(Eng)</label>
            <p> {errors?.ownerName_En?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              बिजुली उपयोगीताको किसिम
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("bidutUseTypeID")}
              className="peer requiredField"
            >
              <option value={""}>
                --- बिजुली उपयोगीताको किसिम छान्नुहोस् ---
              </option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.bidutUseTypeID?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              आवश्यकताको किसिम
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("bidutLineTypeID")}
              className="peer requiredField"
            >
              <option value={""}>--- आवश्यकताको किसिम छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.bidutLineTypeID?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              विजुलीको किसिम
              <span className="requiredField">*</span>
            </label>
            <select {...register("bidutKismId")} className="peer requiredField">
              <option value={""}>--- विजुलीको किसिम छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.bidutKismId?.message}</p>
          </div>
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. विजुली जडान गर्ने संस्थाको पूरा ठेगाना
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("bidutAddressDetailsInsert.gharNumber")}
              placeholder="."
            />
            <label className="label">
              घर नं
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.gharNumber?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("bidutAddressDetailsInsert.tole")}
              placeholder="."
            />
            <label className="label">
              टोल
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.tole?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("bidutAddressDetailsInsert.ward")}
              placeholder="."
            />
            <label className="label">
              वडा नं
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.fullName_Nepali?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              प्रदेश
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("bidutAddressDetailsInsert.stateId")}
              className="peer requiredField"
            >
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOption}
            </select>
            <p> {errors?.stateId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              जिल्ला <span className="requiredField">*</span>
            </label>
            <select
              {...register("bidutAddressDetailsInsert.districtId")}
              className="peer requiredField"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOption}
            </select>
            <p> {errors?.districtId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              गा.पा./न.पा. <span className="requiredField">*</span>
            </label>
            <select
              {...register("bidutAddressDetailsInsert.palikaId")}
              className="peer requiredField"
            >
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOption}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("bidutAddressDetailsInsert.mobileNumber")}
              placeholder="."
            />
            <label className="label">
              मोबाइल नं
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.mobileNumber?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("bidutAddressDetailsInsert.phoneNumber")}
              placeholder="."
            />
            <label className="label">फोन नं</label>
            <p> {errors?.phoneNumber?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("bidutAddressDetailsInsert.eMail")}
              placeholder="."
            />
            <label className="label">इमेल</label>
            <p> {errors?.eMail?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register(
                "bidutOrganizationDetailsInsert.electricitianName_Np"
              )}
              placeholder="."
            />
            <label className="label">प्राविधिकको नाम</label>
            <p> {errors?.electricitianName_Np?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register(
                "bidutOrganizationDetailsInsert.electricitianName_En"
              )}
              placeholder="."
            />
            <label className="label">प्राविधिकको नाम (Eng)</label>
            <p> {errors?.electricitianName_En?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              {" "}
              घरको बनोट
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("bidutOrganizationDetailsInsert.gharTypeId")}
              className="peer requiredField"
            >
              <option value={""}>--- घरको बनोट छान्नुहोस् ---</option>
              {/* {nagritaDistrictOptions} */}
            </select>
            <p> {errors?.nagriktaJariJillaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("bidutOrganizationDetailsInsert.organizationStorey")}
              placeholder="."
            />
            <label className="label">तल्ला</label>
            <p> {errors?.organizationStorey?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("bidutOrganizationDetailsInsert.totalRooms")}
              placeholder="."
            />
            <label className="label">
              जम्मा कोठा संख्या
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.totalRooms?.message}</p>
          </div>
        </div>
        <div className=" pt-4 border border-black border-dashed border-t-0 ">
          <FormControlLabel
            className="pl-4"
            {...register("bidutPerviousConnectionDetailsInsert")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={
                  clickedIdData?.bidutPerviousConnectionDetailsInsert
                }
              />
            }
            label="उल्लेखित ठाउँमा पहिलेदेखिनै बत्ति भए सो को विवरण"
          />
          {watchAllFields?.bidutPerviousConnectionDetailsInsert && (
            <>
              <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
                ३. विजुली अघिल्लो जडान गर्ने संस्थाको पूरा ठेगाना
              </div>
              <div className="grid lg:grid-cols-4 shadow-2xl bg-gray-100 gap-5 px-5 pt-6 ">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register(
                      "bidutPerviousConnectionDetailsInsert.customerNumber"
                    )}
                    placeholder="."
                  />
                  <label className="label">ग्राहक नं</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register(
                      "bidutPerviousConnectionDetailsInsert.previousCustomerName_Np"
                    )}
                    placeholder="."
                  />
                  <label className="label">पहिले ग्राहको नाम</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register(
                      "bidutPerviousConnectionDetailsInsert.previousCustomerName_En"
                    )}
                    placeholder="."
                  />
                  <label className="label">पहिले ग्राहको नाम(Eng)</label>
                </div>
                <div className="relative  w-full mb-6 group">
                  <label
                    htmlFor=""
                    className=" absolute text-[10px] text-blue-900 -top-[15%]"
                  >
                    पहिले जडान भएको मिति(BS)
                  </label>
                  <NepaliDatePicker
                    value={previousConnectionDate_Np}
                    className="peer"
                    onChange={(e) => setPreviousConnectionDate_Np(e)}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </div>
                <div className="relative  w-full mb-6 group">
                  <label
                    htmlFor=""
                    className=" absolute text-[10px] text-blue-900 -top-[15%]"
                  >
                    पहिले जडान भएको मिति(BS)
                  </label>
                  <NepaliDatePicker
                    value={previousConnectionDate_En}
                    className="peer"
                    onChange={(e) => setPreviousConnectionDate_En(e)}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register(
                      "bidutPerviousConnectionDetailsInsert.address_Np"
                    )}
                    placeholder="."
                  />
                  <label className="label">पहिले जडान ठेगाना</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register(
                      "bidutPerviousConnectionDetailsInsert.address_En"
                    )}
                    placeholder="."
                  />
                  <label className="label">पहिले जडान ठेगाना(Eng)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register(
                      "bidutPerviousConnectionDetailsInsert.pC_FatherHusbandName_Np"
                    )}
                    placeholder="."
                  />
                  <label className="label">बाबु/पतिको नाम</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register(
                      "bidutPerviousConnectionDetailsInsert.pC_FatherHusbandName_En"
                    )}
                    placeholder="."
                  />
                  <label className="label">बाबु/पतिको नाम(Eng)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register(
                      "bidutPerviousConnectionDetailsInsert.pC_OwnerName_Np"
                    )}
                    placeholder="."
                  />
                  <label className="label">घरबेटीको नाम</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="string"
                    className="peer  "
                    {...register(
                      "bidutPerviousConnectionDetailsInsert.pC_OwnerName_En"
                    )}
                    placeholder="."
                  />
                  <label className="label">घरबेटीको नाम(Eng)</label>
                </div>
              </div>
            </>
          )}
        </div>
        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold text-white">
            ४. जडान विवरण
          </text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddPrevElectricConnected}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>
        <div className="text-lg font-bold pr-4 py-4 flex justify-between ">
          <div className=" ">किलो वाट</div>
          <div className=" ">जडान हुने सामान</div>
          <div className=" ">संख्या</div>
          <div className=" ">वाट</div>
          <div className=" ">जम्मा वाट</div>
          <div className=" ">कार्य </div>
        </div>
        {bidutJadanListInsert?.map((item, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-7 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1"
            >
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-32 "
                name="kiloWatt"
                value={item.kiloWatt}
                onChange={(e) => handleChangeKilowat(e, index)}
                placeholder="."
              />
              <select
                className="border border-gray-300 rounded-lg w-24"
                type="string"
                name="bidutEquipmentID"
                value={item.bidutEquipmentID}
                onChange={(e) => handleChangeJadanHune(e, index)}
              >
                <option value={""}>--सामान छानुहोस--</option>
                {/* {relationOption} */}
              </select>
              <p>{errors?.relationId?.message}</p>
              {/* <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-32 "
                name="jadanHune"
                value={item.jadanHune}
                onChange={(e) => handleChangeJadanHune(e, index)}
                placeholder="."
              /> */}
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-32 "
                name="totalNumber"
                value={item.totalNumber}
                onChange={(e) => handleChangeSankhya(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-32 "
                name="watt"
                value={item.watt}
                onChange={(e) => handleChangeWat(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300 mr-8 rounded-lg w-32 "
                name="totalWatt"
                value={item.totalWatt}
                onChange={(e) => handleChangeTotalWat(e, index)}
                placeholder="."
              />
              <div>
                {bidutJadanListInsert.length > 1 && (
                  <div className=" justify-end ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeletePrevElectricConnection(index)}
                    >
                      <FaMinus />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}

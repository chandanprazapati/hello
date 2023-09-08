import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../../reusableDesign/CommonHeaderDesign";
import { taxPayerDetailValidationResolver } from "../../../../utils/validateField";
import { fiscal } from "../../../../services/apiServices/common/fiscal/fiscalService";
import { createTaxPayerDetail } from "../../../../services/apiServices/revenue/taxPayerDetail/taxPayerDetailService";
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
import {
  getDistrict,
  getPalika,
} from "../../../../services/apiServices/common/office/officeService";
import AddButton from "../../../reusableDesign/AddButton";

export default function CreateTaxPayerDetail({ clickedIdData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: taxPayerDetailValidationResolver });

  // to set the incoming value to the respective fields
  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("fiscalYearId", clickedIdData?.fiscalYearId);
    setValue("genderId", clickedIdData?.genderId);
    setValue("dob", clickedIdData?.startNepDate);
    setValue("licenNo", clickedIdData?.licenNo);
    setValue("licenIssuFrom", clickedIdData?.licenIssuFrom);
    setValue("name", clickedIdData?.name);
    setValue("name_En", clickedIdData?.name_En);
    setValue("contactNo", clickedIdData?.contactNo);
    setValue("email", clickedIdData?.email);
    setValue("fatherName", clickedIdData?.fatherName);
    setValue("grandFatherName", clickedIdData?.grandFatherName);
    setValue("districtId", clickedIdData?.districtId);
    setValue("palikaId", clickedIdData?.palikaId);
    setValue("wardNoId", clickedIdData?.wardNoId);
    setValue("temproraryAddress", clickedIdData?.temproraryAddress);
    setValue(
      "citizenshipIssueDistrictId",
      clickedIdData?.citizenshipIssueDistrictId
    );
    setValue("citizenshipNo", clickedIdData?.citizenshipNo);
    setValue("photoPath", clickedIdData?.photoPath);
  }, [clickedIdData, setValue]);

  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (fiscalValue === 0) {
          setFiscalMsg(<p>This field is required</p>);
        } else if (issuedDistrictValue === 0) {
          setDistrictMsg(<p>This field is required</p>);
        } else if (genderValue === 0) {
          setGenderMsg(<p>This field is required</p>);
        } else if (wardValue === 0) {
          setWardMsg(<p>This field is required</p>);
        } else if (districtValue === 0) {
          setDistrictMsg(<p>This field is required</p>);
        } else if (palikaValue === 0) {
          setPalikaMsg(<p>This field is required</p>);
        } else {
          data = {
            ...data,
            fiscalYearId: fiscalValue,
            genderId: genderValue,
            dob: startNepDate,
            districtId: districtValue,
            palikaId: palikaValue,
            wardNoId: wardValue,
            citizenshipIssueDistrictId: issuedDistrictValue,
            citizenshipMiti: citizenshipJariMiti,
          };
        }
        try {
          createTaxPayerDetail(data).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                icon: "🚀",
                autoClose: 1000,
              });
              router.push("/revenue/taxpayerdetail");
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
  //   for fiscalyearId
  const [fiscalId, setFiscalId] = useState([0]);
  const [fiscalValue, setFiscalValue] = useState("");

  const handleFiscal = (e) => {
    setFiscalValue(e.target.value);
  };
  useEffect(() => {
    let fiscalYearId = () => {
      fiscal(0).then((response) => {
        try {
          response.status === true;
          {
            setFiscalId(response.data);
          }
        } catch (error) {}
      });
    };

    fiscalYearId();
  }, []);

  //   for gender
  const [genderId, setGenderId] = useState([0]);
  const [genderValue, setGenderValue] = useState(0);
  const [genderMsg, setGenderMsg] = useState("");

  const handleGender = (e) => {
    setGenderValue(e.target.value);
  };
  useEffect(() => {
    let genderId = () => {
      gender(0).then((response) => {
        try {
          response.status === true;
          {
            setGenderId(response.data);
          }
        } catch (error) {}
      });
    };

    genderId();
  }, []);

  //   for wardId from common
  const [wardId, setWardId] = useState([0]);
  const [wardValue, setWardValue] = useState(0);
  const [wardMsg, setWardMsg] = useState("");

  const handleWard = (e) => {
    setWardValue(e.target.value);
  };
  useEffect(() => {
    let wardIdData = () => {
      ward(0).then((response) => {
        try {
          response.status === true;
          {
            setWardId(response.data);
          }
        } catch (error) {}
      });
    };

    wardIdData();
  }, []);

  //   for district
  const [districtId, setDistrictId] = useState([0]);
  const [districtValue, setDistrictValue] = useState(0);
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
            setDistrictId(response.data);
          }
        } catch (error) {}
      });
    };

    districtIdData();
  }, []);

  //   for palika
  const [palikaId, setPalikaId] = useState([0]);
  const [palikaValue, setPalikaValue] = useState(0);
  const [palikaMsg, setPalikaMsg] = useState("");

  const handlePalika = (e) => {
    setPalikaValue(e.target.value);
  };
  useEffect(() => {
    let palikaIdData = () => {
      getPalika(0).then((response) => {
        try {
          response.status === true;
          {
            setPalikaId(response.data);
          }
        } catch (error) {}
      });
    };

    palikaIdData();
  }, []);

  //   for citizenship issued district
  const [issuedDistrictValue, setIssuedDistrictValue] = useState([0]);
  const handleIssuedDistrict = (e) => {
    setIssuedDistrictValue(e.target.value);
  };

  //   for dob
  const aa = new BikramSambat(new Date()).toBS();
  const [startNepDate, setStartNepDate] = useState(aa);
  const handelDob = (e) => {
    setStartNepDate(e);
  };

  //   for citizenship jarimiti
  const [citizenshipJariMiti, setCitizenshipJariMiti] = useState(aa);
  const handelCitizenshipJariMiti = (e) => {
    setCitizenshipJariMiti(e);
  };

  return (
    <>
      <CommonHeaderDesign title={"करदाता विवरण राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold ">
          व्यक्तिगत विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">आर्थिक वर्ष</label>
            <select
              onChange={handleFiscal}
              value={fiscalValue}
              className="peer"
              required
            >
              <option value={0} disabled>
                ---- आर्थिक वर्ष छान्नुहोस् ----
              </option>

              {fiscalId.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name")}
              placeholder="."
            />
            <label className="label">Name(नेपाली)</label>
            <p> {errors?.name?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name_En")}
              placeholder="."
            />
            <label className="label">Name(English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("contactNo")}
              placeholder="."
            />
            <label className="label">contactNo</label>
            <p> {errors?.contactNo?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              className="peer"
              {...register("email")}
              placeholder="."
            />

            <label className="label">Email</label>
            <p> {errors?.email?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherName")}
              placeholder="."
            />
            <label className="label">Father Name</label>

            <p> {errors?.fatherName?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("grandFatherName")}
              placeholder="."
            />
            <label className="label">Grandfather Name</label>

            <p> {errors?.grandFatherName?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("temproraryAddress")}
              placeholder="."
            />
            <label className="label">Temporary Address</label>

            <p> {errors?.temproraryAddress?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">Gender</label>
            <select
              onChange={handleGender}
              value={genderValue}
              className="peer"
            >
              <option value={0} disabled>
                Select The Gender
              </option>

              {genderId.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
            {genderMsg}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">Ward Id</label>
            <select onChange={handleWard} value={wardValue} className="peer">
              <option value={0} disabled>
                Select The Ward Id
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
            <label className="label text-blue-900 ">District</label>
            <select
              onChange={handleDistrict}
              value={districtValue}
              className="peer"
            >
              <option value={0} disabled>
                Select The district Id
              </option>

              {districtId.map((items, index) => {
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
              <option value={0} disabled>
                Select The Palika
              </option>

              {palikaId.map((items, index) => {
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
            <input
              type="file"
              className="peer"
              {...register("photoPath")}
              placeholder="."
            />
            <label className="label">Upload a photo</label>
            <p> {errors?.photoPath?.message}</p>
          </div>
        </div>
        <br />

        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold ">
          नागरिकता विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("citizenshipNo")}
              placeholder="."
            />
            <label className="label">Citizenship No</label>

            <p> {errors?.citizenshipNo?.message}</p>
          </div>
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              citizenship जारी मिति
            </label>

            <NepaliDatePicker
              value={citizenshipJariMiti}
              className="peer"
              onChange={handelCitizenshipJariMiti}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />

            {/* <p> {errors?.dateFrom?.message}</p> */}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Citizenship Issued District
            </label>
            <select
              onChange={handleIssuedDistrict}
              value={issuedDistrictValue}
              className="peer"
            >
              <option value={0} disabled>
                Select Citizenship Issued District
              </option>

              {districtId.map((items, index) => {
                return (
                  <option key={index} value={items?.districtId}>
                    {items.districtNameNep}
                  </option>
                );
              })}
            </select>
            {districtMsg}
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
}

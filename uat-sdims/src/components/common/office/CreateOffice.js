import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { officeValidationResolver } from "../../../utils/validateField";
import {
  createOffice,
  getAllState,
  getDistrict,
  getPalika,
} from "../../../services/apiServices/common/office/officeService";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";

export default function CreateOffice({ clickedIdData }) {
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [palika, setPalika] = useState([]);
  const [stateValue, setStateValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [palikaValue, setPalikaValue] = useState("");
  const [stateMsg, setStateMsg] = useState("");
  const [districtMsg, setDistrictMsg] = useState("");
  const [palikaMsg, setPalikaMsg] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: officeValidationResolver });

  useEffect(() => {
    getAllState().then((response) => {
      if (response.status === true) {
        setState(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (stateValue !== "") {
      getDistrict(stateValue).then((response) => {
        if (response.status === true) {
          setDistrict(response.data);
        }
      });
    }
  }, [stateValue]);

  useEffect(() => {
    if (districtValue !== "") {
      getPalika(districtValue).then((response) => {
        if (response.status === true) {
          setPalika(response.data);
        }
      });
    }
  }, [districtValue]);

  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("name", clickedIdData?.name);
    setValue("name_En", clickedIdData?.name_En);
    setValue("code", clickedIdData?.code);
    setValue("address", clickedIdData?.address);
    setValue("phoneNo", clickedIdData?.phoneNo);
    setValue("faxNo", clickedIdData?.faxNo);
    setValue("email", clickedIdData?.email);
    setValue("url", clickedIdData?.url);
    setPalikaValue(clickedIdData?.palikaId);
    setDistrictValue(clickedIdData?.districtId);
    setStateValue(clickedIdData?.stateId);
  }, [clickedIdData, setValue]);

  const handleState = (e) => {
    const selectedStateValue = e.target.value;
    setStateValue(selectedStateValue);
    setDistrictValue("");
    setPalikaValue("");
    setDistrict([]);
    setPalika([]);
  };

  const handleDistrict = (e) => {
    const selectedDistrictValue = e.target.value;
    setDistrictValue(selectedDistrictValue);
    setPalikaValue("");
    setPalika([]);
  };

  const handlePalika = (e) => {
    const selectedPalikaValue = e.target.value;
    setPalikaValue(selectedPalikaValue);
  };

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (!stateValue) {
          setStateMsg(<p>This field is required</p>);
          return;
        }
        if (!districtValue) {
          setDistrictMsg(<p>This field is required</p>);
          return;
        }
        if (!palikaValue) {
          setPalikaMsg(<p>This field is required</p>);
          return;
        }

        data = {
          ...data,
          stateId: stateValue,
          districtId: districtValue,
          palikaId: palikaValue,
        };

        const response = await createOffice(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/common/office");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, stateValue, districtValue, palikaValue]
  );

  return (
    <>
      <CommonHeaderDesign title={" कार्यालय "} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 shadow-2xl bg-gray-100 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("name")}
              placeholder="."
            />
            <label className="label">
              Name(नेपाली)
              <span className="requiredField">*</span>
            </label>
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

            <p> {errors?.name_En?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("code")}
              placeholder="."
            />
            <label className="label">Code</label>
            <p> {errors?.code?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("address")}
              placeholder="."
            />
            <label className="label">
              Address
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.address?.message}</p>
          </div>
          <div className="relative z-0 w-full  group">
            <input
              type="number"
              className="peer requiredField"
              {...register("phoneNo")}
              placeholder="."
            />
            <label className="label">
              Phone No
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.phoneNo?.message}</p>
          </div>
          <div className="relative  w-full z-0 group">
            <input
              type="number"
              className="peer"
              {...register("faxNo")}
              placeholder="."
            />
            <label className="label">Fax No</label>
            <p> {errors?.faxNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              className="peer requiredField"
              {...register("email")}
              placeholder="."
            />

            <label className="label">
              Email
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.email?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="Url"
              className="peer requiredField"
              {...register("url")}
              placeholder="."
            />

            <label className="label">
              Url
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.url?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              प्रदेश
              <span className="requiredField">*</span>
            </label>

            <select
              onChange={handleState}
              value={stateValue}
              className="peer requiredField"
            >
              {!stateValue ? (
                <>
                  <option value="" disabled>
                    ---प्रदेश छानुहोस---
                  </option>
                </>
              ) : (
                <>
                  <option value="" disabled>
                    ---प्रदेश छानुहोस---
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
            <label className="label text-blue-900 ">
              जिल्ला
              <span className="requiredField">*</span>
            </label>
            <select
              onChange={handleDistrict}
              value={districtValue}
              className="peer requiredField"
            >
              {!stateValue ? (
                <>
                  <option value="" disabled>
                    ---पहिला प्रदेश छानुहोस---
                  </option>
                </>
              ) : (
                <>
                  <option value="" disabled>
                    ---जिल्ला छानुहोस---
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
            <label className="label text-blue-900 ">
            पालिका
              <span className="requiredField">*</span>
            </label>
            <select
              onChange={handlePalika}
              value={palikaValue}
              className="peer requiredField"
            >
              {!districtValue ? (
                <>
                  <option value="" disabled>
                    ---पहिला जिल्ला छानुहोस---
                  </option>
                </>
              ) : (
                <>
                  <option value="" disabled>
                    ---पालिका छानुहोस---
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
        </div>

        <AddButton
          icon={<FaPlus />}
          disabled={isSubmitting}
          title={isSubmitting ? "Submitting..." : "सुरक्षित गर्नुहोस् "}
        />
      </form>
    </>
  );
}

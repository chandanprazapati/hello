import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { createComplaintDetailsService } from "../../../services/apiServices/complaint/complaintDetails/complaintDetailsService";
import AddButton from "../../reusableDesign/AddButton";
import {
  getAllState,
  getDistrict,
} from "../../../services/apiServices/common/office/officeService";

const CreateComplaintDetails = ({ clickedIdData }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      id: clickedIdData?.id,
      problemCreaterName: clickedIdData?.problemCreaterName,
      mobileNo: clickedIdData?.mobileNo,
      email: clickedIdData?.email,
      address: clickedIdData?.address,
      stateId: clickedIdData?.stateId,
    },
  });

  const watchState = watch("stateId");

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await createComplaintDetailsService(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/complaint/complaintDetails");
        } else if (response.status === false) {
          toast.error(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [router, isSubmitting]
  );

  // for state
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setStateData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const stateOptions = stateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.stateId}
      >
        {item.stateNameNep}
      </option>
    );
  });

  // district
  const [districtData, setDistrictData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchState);
        if (response.status === true) {
          setDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchState]);

  const districtOptions = districtData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.districtId}
      >
        {item.districtNameNep}
      </option>
    );
  });

  // palika
  const [palikaData, setPalikaData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(districtValue);
        if (response.status === true) {
          setPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchState]);

  const palikaOptions = palikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.palikaId}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  return (
    <React.Fragment>
      <CommonHeaderDesign title={"गुनासो सूची राख्नुहोस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("problemCreaterName")}
              placeholder="."
            />
            <label className="label">समस्या सिर्जनाकर्ता नाम</label>
            <p> {errors?.problemCreaterName?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("mobileNo")}
              placeholder="."
            />
            <label className="label">मोबाइल नम्बर</label>
            <p> {errors?.mobileNo?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("email")}
              placeholder="."
            />
            <label className="label">इमेल</label>
            <p> {errors?.email?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("address")}
              placeholder="."
            />
            <label className="label">ठेगाना</label>
            <p> {errors?.address?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">State</label>
            <select {...register("stateId")} className="peer">
              <option value={""}>Select the state</option>
              {stateOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">District</label>
            <select {...register("districtId")} className="peer">
              <option value={""}>Select the district</option>
              {districtOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">palika</label>
            <select {...register("palikaId")} className="peer">
              <option value={""}>Select the palika</option>
              {palikaOptions}
            </select>
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
};

export default CreateComplaintDetails;

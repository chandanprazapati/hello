import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import "nepali-datepicker-reactjs/dist/index.css";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../../services/apiServices/common/office/officeService";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
import { aadivasiValidationResolver } from "../../../../utils/validateField";
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import { Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import { insertGharBatoPramanit } from "../../../../services/apiServices/sifarish/gharBatoPramanit/gharBatoPramanitService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateGharBato({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aadivasiValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      name: clickedIdData?.name,
      area: clickedIdData?.area,
      landRate: clickedIdData?.landRate,
      houseRate: clickedIdData?.houseRate,
      kittaNo: clickedIdData?.kittaNo,
      sitNo: clickedIdData?.sitNo,
      gharKisim: clickedIdData?.gharKisim,
      batoPrakar: clickedIdData?.batoPrakar,
      kaifiyat: clickedIdData?.kaifiyat,
    },
  });

  const onSubmit = async (data) => {
    console.log(data, "GharBato--data");
    try {
      const response = await insertGharBatoPramanit(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/gharBato");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //watch fields
  const watchFields = watch();
  useEffect(() => {
    if (watchFields.isActive) {
      setValue("tempState", watchFields.perState);
      setValue("tempDistrict", watchFields.perDistrict);
      setValue("tempPalika", watchFields.perPalika);
      setValue("tempWard", watchFields.perWard);
    } else {
      setValue("tempState", "");
      setValue("tempDistrict", "");
      setValue("tempPalika", "");
      setValue("tempWard", "");
    }
  }, [
    setValue,
    watchFields.isActive,
    watchFields.perState,
    watchFields.perDistrict,
    watchFields.perPalika,
    watchFields.perWard,
  ]);

  // for state
  const [parmanentStateData, setParmanentStateData] = useState([]);
  const [temporaryStateData, setTemporaryStateData] = useState([]);
  const [landStateData, setLandStateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setParmanentStateData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const parmanentStateOptions = parmanentStateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.perState}
      >
        {item.stateNameNep}
      </option>
    );
  });
  //for land
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setLandStateData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const landStateOptions = landStateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.landState}
      >
        {item.stateNameNep}
      </option>
    );
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setTemporaryStateData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const temporaryStateOptions = temporaryStateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.tempState}
      >
        {item.stateNameNep}
      </option>
    );
  });
  // for district
  const [parmanentdistrictData, setParmanentDistrictData] = useState([]);
  const [temporarydistrictData, setTemporaryDistrictData] = useState([]);
  const [landdistrictData, setLandDistrictData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.perState);
        if (response.status === true) {
          setParmanentDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.perState]);
  const parmanentDistrictOptions = parmanentdistrictData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.perDistrict}
      >
        {item.districtNameNep}
      </option>
    );
  });
  //for land District
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.landState);
        if (response.status === true) {
          setLandDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.landState]);
  const landDistrictOptions = landdistrictData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.landDistrict}
      >
        {item.districtNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.tempState);
        if (response.status === true) {
          setTemporaryDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.tempState]);

  const temporaryDistrictOptions = temporarydistrictData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.tempDistrict}
      >
        {item.districtNameNep}
      </option>
    );
  });

  // for palika
  const [parmanentPalikaData, setParmanentPalikaData] = useState([]);
  const [temporaryPalikaData, setTemporaryPalikaData] = useState([]);
  const [landPalikaData, setLandPalikaData] = useState([]);

  //for land Palika
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.landDistrict);
        if (response.status === true) {
          setLandPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.landDistrict]);
  const landPalikaOptions = landPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.landPalika}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.perDistrict);
        if (response.status === true) {
          setParmanentPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.perDistrict]);
  const parmanentPalikaOptions = parmanentPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.perPalika}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.tempDistrict);
        if (response.status === true) {
          setTemporaryPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.tempDistrict]);

  const temporaryPalikaOptions = temporaryPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.tempPalika}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  //for ward
  const [parmanentWardData, setParmanentWardData] = useState([]);
  const [temporaryWardData, setTemporaryWardData] = useState([]);
  const [landWardData, setLandWardData] = useState([]);

  //for land Ward
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ward(watchFields?.landPalika);
        if (response.status === true) {
          setLandWardData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchFields?.landPalika]);
  const landWardOptions = landWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item?.id === clickedIdData?.landWard}
      >
        {item.name}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ward(watchFields?.perPalika);
        if (response.status === true) {
          setParmanentWardData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchFields?.perPalika]);
  const parmanentWardOptions = parmanentWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item?.id === clickedIdData?.perWard}
      >
        {item.name}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ward(watchFields?.tempPalika);
        if (response.status === true) {
          setTemporaryWardData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchFields?.tempPalika]);

  const temporaryWardOptions = temporaryWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item?.id === clickedIdData?.tempWard}
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"घर बाटो प्रमाणित सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १.व्यक्तिगत विवरण
        </div>

        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("name")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("area")}
              placeholder="."
            />
            <label className="label">क्षेत्रफल </label>
            <p> {errors?.area?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("landRate")}
              placeholder="."
            />
            <label className="label">जग्गाको मुल्य </label>
            <p> {errors?.landRate?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("houseRate")}
              placeholder="."
            />
            <label className="label">घरको मुल्य </label>
            <p> {errors?.houseRate?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("kittaNo")}
              placeholder="."
            />
            <label className="label  ">
              कित्ता नं <span className="text-red-500 text-lg ">*</span>{" "}
            </label>
            <p> {errors?.kittaNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("sitNo")}
              placeholder="."
            />
            <label className="label">सित नं. </label>
            <p> {errors?.sitNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("gharKisim")}
              placeholder="."
            />
            <label className="label">घर किसिम </label>
            <p> {errors?.gharKisim?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("batoPrakar")}
              placeholder="."
            />
            <label className="label">बाटो प्रकार </label>
            <p> {errors?.batoPrakar?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label>कैफियत</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("kaifiyat")}
              placeholder="write something here......"
            />
          </div>
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          (क).स्थायी ठेगाना
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("perState")} className="peer">
              <option value={""}>--- प्रदेश छानुहोस ---</option>
              {parmanentStateOptions}
            </select>
            <p> {errors?.perState?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("perDistrict")} className="peer">
              <option value={""}>--- जिल्ला छानुहोस ---</option>
              {parmanentDistrictOptions}
            </select>
            <p> {errors?.perDistrict?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("perPalika")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छानुहोस ---</option>
              {parmanentPalikaOptions}
            </select>
            <p> {errors?.perPalika?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label">वडा नं</label>
            <select className="peer" {...register("perWard")}>
              <option value={""}>--- वडा नं छानुहोस ---</option>
              {parmanentWardOptions}
            </select>
            <p> {errors?.perWard?.message}</p>
          </div>
          <FormControlLabel
            className="pl-3"
            {...register("isActive")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.isActive}
              />
            }
            label="स्थायी ठेगाना नै अस्थायी ठेगाना भए"
          />
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          (ख).अस्थायी ठेगाना
        </div>
        <div className="grid lg:grid-cols-4 shadow-2xl bg-gray-100 gap-5 px-5 pt-6 border border-black border-dashed border-t-0 ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("tempState")} className="peer">
              <option value={""}>--- प्रदेश छानुहोस ---</option>
              {temporaryStateOptions}
            </select>
            <p> {errors?.tempState?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("tempDistrict")} className="peer">
              <option value={""}>--- जिल्ला छानुहोस ---</option>
              {temporaryDistrictOptions}
            </select>
            <p> {errors?.tempDistrict?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("tempPalika")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छानुहोस ---</option>
              {temporaryPalikaOptions}
            </select>
            <p> {errors?.tempPalika?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label">वडा नं</label>
            <select className="peer" {...register("tempWard")}>
              <option value={""}>--- वडा नं छानुहोस ---</option>
              {temporaryWardOptions}
            </select>
            <p> {errors?.tempWard?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. जग्गाको पुरा ठेगाना
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("landState")} className="peer">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {landStateOptions}
            </select>
            <p> {errors?.landState?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("landDistrict")} className="peer">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {landDistrictOptions}
            </select>
            <p> {errors?.landDistrict?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वडा नं</label>
            <select {...register("landWard")} className="peer">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {landWardOptions}
            </select>
            <p> {errors?.landWard?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("landPalika")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {landPalikaOptions}
            </select>
            <p> {errors?.landPalika?.message}</p>
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

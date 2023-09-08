import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";
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
import { insertCharKilla } from "../../../../services/apiServices/sifarish/charKilla/charKillaService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateCharKilla(clickedIdData) {
  useEffect(() => {
    if (clickedIdData) {
      setCharKillaPlotDetailViewModelList(
        clickedIdData?.clickedIdData?.charKillaPlotDetailViewModelList || [
          {
            plotWardNo: "",
            plotArea: "",
            kittaNo: "",
            east: "",
            west: "",
            north: "",
            south: "",
          },
        ]
      );
    }
  }, [clickedIdData]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aadivasiValidationResolver,
    defaultValues: {
      id: clickedIdData?.clickedIdData?.id,
      fullName_Nepali: clickedIdData?.clickedIdData?.fullName_Nepali,
      fullName_English: clickedIdData?.clickedIdData?.fullName_English,
      sheetNo: clickedIdData?.clickedIdData?.sheetNo,
      charKillaDartaNo: clickedIdData?.clickedIdData?.charKillaDartaNo,
      karTireykoRasid: clickedIdData?.clickedIdData?.karTireykoRasid,
      nagariktaPraPaNo: clickedIdData?.clickedIdData?.nagariktaPraPaNo,
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      charKillaPlotDetailViewModelList: charKillaPlotDetailViewModelList,
    };
    try {
      const response = await insertCharKilla(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/charKilla");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //for date picker
  const [dateData, setDateData] = useState(aa);
  useEffect(() => {
    if (clickedIdData) {
      setDateData(clickedIdData?.dateData || aa);
    }
  });

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

  // permanent address

  const watchFields = watch();
  const stateValue = watch("stateId");
  const districtValue = watch("districtId");

  const stateOptions = stateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item?.id === clickedIdData?.permaState}
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
        const response = await getDistrict(watchFields?.permaState);
        if (response.status === true) {
          setDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [stateValue, watchFields?.permaState]);

  const districtOptions = districtData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item?.id === clickedIdData?.permaDistrict}
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
        const response = await getPalika(watchFields?.permaDistrict);
        if (response.status === true) {
          setPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [districtValue, watchFields?.permaDistrict]);

  const palikaOptions = palikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item?.id === clickedIdData?.permaPalika}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  // for ward
  const [wardData, setWardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setWardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const wardOptions = wardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item?.id === clickedIdData?.clickedIdData?.permaWard}
      >
        {item.name}
      </option>
    );
  });

  // dyanmic form form land details
  const [
    charKillaPlotDetailViewModelList,
    setCharKillaPlotDetailViewModelList,
  ] = useState([
    {
      plotWardNo: "",
      plotArea: "",
      kittaNo: "",
      east: "",
      west: "",
      north: "",
      south: "",
      kaifiyat: "",
    },
  ]);

  const handleAddLandDetails = () => {
    setCharKillaPlotDetailViewModelList([
      ...charKillaPlotDetailViewModelList,
      {
        plotWardNo: "",
        plotArea: "",
        kittaNo: "",
        east: "",
        west: "",
        north: "",
        south: "",
        kaifiyat: "",
      },
    ]);
  };

  const handleDeleteLandDetails = (index) => {
    const list = [...charKillaPlotDetailViewModelList];
    list.splice(index, 1);
    setCharKillaPlotDetailViewModelList(list);
  };

  const handleWardNoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...charKillaPlotDetailViewModelList];
    list[index][name] = value;
    setCharKillaPlotDetailViewModelList(list);
  };

  const handleAreaChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...charKillaPlotDetailViewModelList];
    list[index][name] = value;
    setCharKillaPlotDetailViewModelList(list);
  };

  const handleKittaNoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...charKillaPlotDetailViewModelList];
    list[index][name] = value;
    setCharKillaPlotDetailViewModelList(list);
  };

  const handleEastChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...charKillaPlotDetailViewModelList];
    list[index][name] = value;
    setCharKillaPlotDetailViewModelList(list);
  };

  const handleWestChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...charKillaPlotDetailViewModelList];
    list[index][name] = value;
    setCharKillaPlotDetailViewModelList(list);
  };

  const handleNorthChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...charKillaPlotDetailViewModelList];
    list[index][name] = value;
    setCharKillaPlotDetailViewModelList(list);
  };

  const handleSouthChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...charKillaPlotDetailViewModelList];
    list[index][name] = value;
    setCharKillaPlotDetailViewModelList(list);
  };
  const handleKaifiyatChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...charKillaPlotDetailViewModelList];
    list[index][name] = value;
    setCharKillaPlotDetailViewModelList(list);
  };

  return (
    <>
      <CommonHeaderDesign title={"चारकिल्ला सिफारिस फारम"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १.व्यक्तिगत विवरण
        </div>

        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_English")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर (In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("sheetNo")}
              placeholder="."
            />
            <label className="label">सिट नं</label>
            <p> {errors?.sheetNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("charKillaDartaNo")}
              placeholder="."
            />
            <label className="label">चारकिल्ला दर्ता न.</label>
            <p> {errors?.sheetNo?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("karTireykoRasid")}
              placeholder="."
            />
            <label className="label">कर तिरेको रसिद नं</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("permaState")} className="peer">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
            <p> {errors?.permaState?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("permaDistrict")} className="peer">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptions}
            </select>
            <p> {errors?.permaDistrict?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("permaPalika")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.permaPalika?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वडा नं</label>
            <select {...register("permaWard")} className="peer">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>

              {wardOptions}
            </select>
            <p> {errors?.permaWard?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">ना.प्र.प.नं. </label>
            <p> {errors?.nagariktaPraPaNo?.message}</p>
          </div>
        </div>

        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold">२. कित्ता विवरण</text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddLandDetails}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>

        <div className="text-lg font-bold pr-4  py-4 flex justify-around ">
          <div className=" ">वार्ड नं</div>
          <div className=" ">छेत्रफल </div>
          <div className=" ">कित्ता नं </div>
          <div className=" "> पूर्व </div>
          <div className=" ">पश्चिम </div>
          <div className=" ">उत्तर </div>
          <div className=" ">दक्षिण </div>
          <div className=" ">कैफ़ियत</div>
          <div className=" ">कार्य </div>
        </div>

        {charKillaPlotDetailViewModelList?.map((landDetail, index) => {
          console.log(landDetail, "hello");
          return (
            <div
              key={index}
              className="grid lg:grid-cols-9 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="plotWardNo"
                value={landDetail.plotWardNo}
                onChange={(e) => handleWardNoChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="plotArea"
                value={landDetail.plotArea}
                onChange={(e) => handleAreaChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="kittaNo"
                value={landDetail.kittaNo}
                onChange={(e) => handleKittaNoChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="east"
                value={landDetail.east}
                onChange={(e) => handleEastChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="west"
                value={landDetail.west}
                onChange={(e) => handleWestChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="north"
                value={landDetail.north}
                onChange={(e) => handleNorthChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="south"
                value={landDetail.south}
                onChange={(e) => handleSouthChange(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="kaifiyat"
                value={landDetail.kaifiyat}
                onChange={(e) => handleKaifiyatChange(e, index)}
                placeholder="."
              />
              <div className="py-2">
                {charKillaPlotDetailViewModelList.length > 1 && (
                  <div className=" justify-end ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeleteLandDetails(index)}
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

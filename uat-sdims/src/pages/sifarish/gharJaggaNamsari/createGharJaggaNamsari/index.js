import React, { useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import { englishToNepali } from "../../../../utils/utility";
const aa = new BikramSambat(new Date()).toBS();

export default function index() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aadivasiValidationResolver,
    //   defaultValues: {
    //     id: clickedIdData?.clickedIdData?.id,
    //     fullName_Nepali: clickedIdData?.clickedIdData?.fullName_Nepali,
    //     fullName_English: clickedIdData?.clickedIdData?.fullName_English,
    //     sheetNo: clickedIdData?.clickedIdData?.sheetNo,
    //     charKillaDartaNo: clickedIdData?.clickedIdData?.charKillaDartaNo,
    //     karTireykoRasid: clickedIdData?.clickedIdData?.karTireykoRasid,
    //     nagariktaPraPaNo: clickedIdData?.clickedIdData?.nagariktaPraPaNo,
    //   },
  });
  const onSubmit = async (data) => {
    data = {
      ...data,
      charKillaPlotDetailViewModelList: charKillaPlotDetailViewModelList,
    };
    //    try {
    //      const response = await insertCharKilla(data);
    //      if (response.status === true) {
    //        toast.success(response.message, {
    //          icon: "🚀",
    //          autoClose: 1000,
    //        });
    //        router.push("/sifarish/charKilla");
    //      }
    //    } catch (error) {
    //      console.error(error);
    //    }
  };

  // for darta miti
  const [dartaMiti, setDartaMiti] = useState(aa);
  const handelDartaMiti = (e) => {
    setDartaMiti(e);
  };

  //for dynamic form
  const [hakdarKoBibran, setHakdarKoBibran] = useState([
    {
      hakdarName: "",
      hakdarNameEng: "",
      nagriktaNo: "",
      nata: "",
      gharNo: "",
      kittaNo: "",
      fatherHusbName: "",
      fatherHusbNameEng: "",
      batoName: "",
    },
  ]);

  const handelAddHakdarKoBibran = () => {
    setHakdarKoBibran([
      ...hakdarKoBibran,
      {
        hakdarName: "",
        hakdarNameEng: "",
        nagriktaNo: "",
        nata: "",
        gharNo: "",
        kittaNo: "",
        fatherHusbName: "",
        fatherHusbNameEng: "",
        batoName: "",
      },
    ]);
  };
  const handleChangeName = (e, index) => {
    const { name, value } = e.target;
    const list = [...hakdarKoBibran];
    list[index][name] = value;
    setHakdarKoBibran(list);
  };
  const handleChangeNameEng = (e, index) => {
    const { name, value } = e.target;
    const list = [...hakdarKoBibran];
    list[index][name] = value;
    setHakdarKoBibran(list);
  };
  const handleChangeNagrikta = (e, index) => {
    const { name, value } = e.target;
    const list = [...hakdarKoBibran];
    list[index][name] = value;
    setHakdarKoBibran(list);
  };
  const handleChangeNata = (e, index) => {
    const { name, value } = e.target;
    const list = [...hakdarKoBibran];
    list[index][name] = value;
    setHakdarKoBibran(list);
  };
  const handleChangeGharNo = (e, index) => {
    const { name, value } = e.target;
    const list = [...hakdarKoBibran];
    list[index][name] = value;
    setHakdarKoBibran(list);
  };
  const handleChangekittaNo = (e, index) => {
    const { name, value } = e.target;
    const list = [...hakdarKoBibran];
    list[index][name] = value;
    setHakdarKoBibran(list);
  };
  const handleChangefatherHusbName = (e, index) => {
    const { name, value } = e.target;
    const list = [...hakdarKoBibran];
    list[index][name] = value;
    setHakdarKoBibran(list);
  };
  const handleChangefatherHusbNameEng = (e, index) => {
    const { name, value } = e.target;
    const list = [...hakdarKoBibran];
    list[index][name] = value;
    setHakdarKoBibran(list);
  };
  const handleChangebatoName = (e, index) => {
    const { name, value } = e.target;
    const list = [...hakdarKoBibran];
    list[index][name] = value;
    setHakdarKoBibran(list);
  };

  const handleDeleteHakdarBibran = (index) => {
    const list = [...hakdarKoBibran];
    list.splice(index, 1);
    setHakdarKoBibran(list);
  };
  const [gharKoBibran, setGharKoBibran] = useState([
    {
      ward: "",
      seatNo: "",
      kitta: "",
      nata: "",
      chetrafal: "",
      gharNo: "",
      kittaNo: "",
      batoNameType: "",
      kafiyat: "",
    },
  ]);

  const handleAddGharBibran = () => {
    setGharKoBibran([
      ...gharKoBibran,
      {
        ward: "",
        seatNo: "",
        kitta: "",
        nata: "",
        chetrafal: "",
        gharNo: "",
        kittaNo: "",
        batoNameType: "",
        kafiyat: "",
      },
    ]);
  };
  const handleChangeWard = (e, index) => {
    const { name, value } = e.target;
    const list = [...gharKoBibran];
    list[index][name] = value;
    setGharKoBibran(list);
  };
  const handleChangeSeatNo = (e, index) => {
    const { name, value } = e.target;
    const list = [...gharKoBibran];
    list[index][name] = value;
    setGharKoBibran(list);
  };
  const handleChangeKitta = (e, index) => {
    const { name, value } = e.target;
    const list = [...gharKoBibran];
    list[index][name] = value;
    setGharKoBibran(list);
  };
  const handleChangeGharNata = (e, index) => {
    const { name, value } = e.target;
    const list = [...gharKoBibran];
    list[index][name] = value;
    setGharKoBibran(list);
  };
  const handleChangeChetrafal = (e, index) => {
    const { name, value } = e.target;
    const list = [...gharKoBibran];
    list[index][name] = value;
    setGharKoBibran(list);
  };
  const handleChangeGharGharNo = (e, index) => {
    const { name, value } = e.target;
    const list = [...gharKoBibran];
    list[index][name] = value;
    setGharKoBibran(list);
  };
  const handleChangeKittaNo = (e, index) => {
    const { name, value } = e.target;
    const list = [...gharKoBibran];
    list[index][name] = value;
    setGharKoBibran(list);
  };
  const handleChangeBatoNameType = (e, index) => {
    const { name, value } = e.target;
    const list = [...gharKoBibran];
    list[index][name] = value;
    setGharKoBibran(list);
  };
  const handleChangeKafiyat = (e, index) => {
    const { name, value } = e.target;
    const list = [...gharKoBibran];
    list[index][name] = value;
    setGharKoBibran(list);
  };
  const handleDeleteGharBibran = (index) => {
    const list = [...gharKoBibran];
    list.splice(index, 1);
    setGharKoBibran(list);
  };

  return (
    <>
      <CommonHeaderDesign title={"घरजग्गा नामसारी फारम"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              कर तिरेको रसिद नं. <span className="requiredField">*</span>
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              मालपोत तिरेको रसिद नं.<span className="requiredField">*</span>
            </label>
          </div>
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १.व्यक्तिगत विवरण
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
              पूरा नाम थर <span className="requiredField">*</span>
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर(Eng)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("fullName_Nepali")}
              placeholder="."
            />
            <label className="label">
              नागरिकता नं.<span className="requiredField">*</span>
            </label>
          </div>
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              नागरिकता जारी मिति
            </label>

            <NepaliDatePicker
              value={dartaMiti}
              onChange={handelDartaMiti}
              className="peer"
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">नागरिकता जारी जिल्ला</label>
            <select {...register("districtId")} className="peer">
              <option value={""}>
                --- नागरिकता जारी जिल्ला छान्नुहोस् ---
              </option>
              {/* {districtOption} */}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>
        </div>
        <div>
          <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
            स्थायी ठेगाना
          </div>
          <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                प्रदेश <span className="requiredField">*</span>
              </label>
              <select {...register("stateId")} className="peer requiredField">
                <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
                {/* {stateOption} */}
              </select>
              <p> {errors?.stateId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                जिल्ला <span className="requiredField">*</span>
              </label>
              <select
                {...register("districtId")}
                className="peer requiredField"
              >
                <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
                {/* {districtOption} */}
              </select>
              <p> {errors?.districtId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                गा.पा./न.पा. <span className="requiredField">*</span>
              </label>
              <select {...register("palikaId")} className="peer requiredField">
                <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
                {/* {palikaOption} */}
              </select>
              <p> {errors?.palikaId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                वडा नं. <span className="requiredField">*</span>
              </label>
              <select {...register("wardNo")} className="peer requiredField">
                <option value={""}>--- वडा नं. छान्नुहोस् ---</option>
                {/* {wardOption} */}
              </select>
              <p> {errors?.palikaId?.message}</p>
            </div>
          </div>
        </div>
        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold text-white">
            २. मृतकका हकदारको विवरण
          </text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handelAddHakdarKoBibran}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>
        <div className="text-lg font-bold pr-4  py-4 flex justify-around ">
          <div className=" ">क्र.सं.</div>
          <div className=" ">हकदारको पुरा नाम </div>
          <div className=" ">हकदारको पुरा नाम(Eng) </div>
          <div className=" "> नागरिकता न. </div>
          <div className=" ">नाता </div>
          <div className=" ">घर न. </div>
          <div className=" ">कित्ता न. </div>
          <div className=" ">बाबु/पति को नाम</div>
          <div className=" ">बाबु/पति को नाम(Eng) </div>
          <div className=" ">बाटोको नाम </div>
          <div className=" ">कार्य </div>
        </div>
        {hakdarKoBibran.map((items, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-11 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <div>{index + 1}</div>
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="hakdarName"
                value={items.hakdarName}
                onChange={(e) => handleChangeName(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="hakdarNameEng"
                value={items.hakdarNameEng}
                onChange={(e) => handleChangeNameEng(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="nagriktaNo"
                value={items.nagriktaNo}
                onChange={(e) => handleChangeNagrikta(e, index)}
                placeholder="."
              />
              <select
                className="border border-gray-300 rounded-lg w-24"
                type="string"
                name="nata"
                value={items.nata}
                onChange={(e) => handleChangeNata(e, index)}
              >
                <option value={""}>---नाता छानुहोस---</option>
                {/* {relationOption} */}
              </select>
              <p>{errors?.relationId?.message}</p>
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="gharNo"
                value={items.gharNo}
                onChange={(e) => handleChangeGharNo(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="kittaNo"
                value={items.kittaNo}
                onChange={(e) => handleChangekittaNo(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="fatherHusbName"
                value={items.fatherHusbName}
                onChange={(e) => handleChangefatherHusbName(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="fatherHusbNameEng"
                value={items.fatherHusbNameEng}
                onChange={(e) => handleChangefatherHusbNameEng(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="batoName"
                value={items.batoName}
                onChange={(e) => handleChangebatoName(e, index)}
                placeholder="."
              />
              <div className="py-2">
                {hakdarKoBibran.length > 1 && (
                  <div className=" justify-end ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeleteHakdarBibran(index)}
                    >
                      <FaMinus />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-xl pt-2 font-bold text-white">
            ३. नामसारी गर्ने घर/जग्गाको विवरण
          </text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddGharBibran}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>
        <div className="text-lg font-bold pr-4  py-4 flex justify-around ">
          <div className=" ">क्र.सं.</div>
          <div className=" ">वाडा नं </div>
          <div className=" ">सिट नं </div>
          <div className=" "> कित्ता</div>
          <div className=" ">क्षेत्रफल </div>
          <div className=" ">घर न. </div>
          <div className=" ">कित्ता न. </div>
          <div className=" ">बाटोको नाम/बाटोको प्रकार</div>
          <div className=" ">कैफियत </div>
          <div className=" ">कार्य </div>
        </div>
        {gharKoBibran.map((items, index) => {
          return (
            <div
              key={index}
              className="grid lg:grid-cols-11 gap-1 py-4 border border-black border-dashed shadow-2xl bg-gray-100 px-1  "
            >
              <div>{index + 1}</div>
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="ward"
                value={items.ward}
                onChange={(e) => handleChangeWard(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="seatNo"
                value={items.seatNo}
                onChange={(e) => handleChangeSeatNo(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="kitta"
                value={items.kitta}
                onChange={(e) => handleChangeKitta(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="chetrafal"
                value={items.chetrafal}
                onChange={(e) => handleChangeChetrafal(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="gharNo"
                value={items.gharNo}
                onChange={(e) => handleChangeGharGharNo(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="kittaNo"
                value={items.kittaNo}
                onChange={(e) => handleChangeKittaNo(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="batoNameType"
                value={items.batoNameType}
                onChange={(e) => handleChangeBatoNameType(e, index)}
                placeholder="."
              />
              <input
                type="string"
                className="border-2 border-gray-300  rounded-lg w-20"
                name="kafiyat"
                value={items.kafiyat}
                onChange={(e) => handleChangeKafiyat(e, index)}
                placeholder="."
              />
              <div className="py-2">
                {gharKoBibran.length > 1 && (
                  <div className=" justify-end ">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeleteGharBibran(index)}
                    >
                      <FaMinus />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </form>
    </>
  );
}

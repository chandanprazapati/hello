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
import { aayaShrotValidationResolver } from "../../../../utils/validateField";
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import { englishToNepali } from "../../../../utils/utility";
import { insertAayaShrot } from "../../../../services/apiServices/sifarish/aayaShrot/aayaShrotService";
const aa = new BikramSambat(new Date()).toBS();

export default function CreateAayaShrot({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aayaShrotValidationResolver,
    // defaultValues: {
    //   id: clickedIdData?.id,
    //   nivedakNaamThar: clickedIdData?.nivedakNaamThar,
    //   nivedakFullName: clickedIdData?.nivedakFullName,
    //   genderId: clickedIdData?.genderId,
    //   stateId: clickedIdData?.stateId,
    //   districtId: clickedIdData?.districtId,
    //   palikaId: clickedIdData?.palikaId,
    //   wardNo: clickedIdData?.wardNo,
    //   infNaamThar: clickedIdData?.infNaamThar,
    //   infFullName: clickedIdData?.infFullName,
    //   infStateId: clickedIdData?.infStateId,
    //   infDistrictId: clickedIdData?.infDistrictId,
    //   infPalikaId: clickedIdData?.infPalikaId,
    //   infWardNo: clickedIdData?.infWardNo,
    //   infNagariktaPraPaNo: clickedIdData?.infNagariktaPraPaNo,
    //   infNagariktaIssueDistrictId: clickedIdData?.infNagariktaIssueDistrictId,
    // },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      dartaMiti: dartaMiti,
      aayaShrotNivedak: {
        ...data.aayaShrotNivedak,
        infNagariktaIssueDate: infNagariktaIssueDate,
      },
      aayaShrotDetailModelList: aayaShrotDetailModelList,
    };
    console.log(data, "data");
    try {
      const response = await insertAayaShrot(data);
      console.log(data, "status");
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/aayaShrot");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // watching the values
  const stateValueVivaran = watch("stateId");
  const stateValueNivedak = watch("aayaShrotNivedak.infStateId");
  const districtValueVirvaran = watch("districtId");
  const districtValueNivedak = watch("aayaShrotNivedak.infDistrictId");
  // console.log(stateValueVivaran, districtValueVirvaran, "Vivaran");
  // console.log(stateValueNivedak, districtValueNivedak, "Nivedak");

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
  const [districtDataVivaran, setDistrictDataVivaran] = useState([]);
  const [districtDataNivedak, setDistrictDataNivedak] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict();
        if (response.status === true) {
          setDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(stateValueNivedak);
        if (response.status === true) {
          setDistrictDataNivedak(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [stateValueNivedak]);

  const districtOptionsNivedak = districtDataNivedak.map((item) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(stateValueVivaran);
        if (response.status === true) {
          setDistrictDataVivaran(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [stateValueVivaran]);

  const districtOptionsVivaran = districtDataVivaran.map((item) => {
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
  const [palikaDataNivedak, setPalikaDataNivedak] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(districtValueVirvaran);
        if (response.status === true) {
          setPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [districtValueVirvaran]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(districtValueNivedak);
        if (response.status === true) {
          setPalikaDataNivedak(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [districtValueNivedak]);

  const palikaOptionsNivedak = palikaDataNivedak.map((item) => {
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
        selected={item.id === clickedIdData?.wardId}
      >
        {item.name}
      </option>
    );
  });

  // for gender
  const [genderData, setGenderData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await gender();
        if (status) {
          setGenderData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const genderOptions = genderData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.genderId}
      >
        {item.name}
      </option>
    );
  });
  // for darta miti
  const [dartaMiti, setDartaMiti] = useState(aa);
  const handelDartaMiti = (e) => {
    setDartaMiti(e);
  };

  // For date picker // for nagrikta Issue Date
  const [infNagariktaIssueDate, setInfNagariktaIssueDate] = useState(aa);
  const handeNagriktaIssueDate = (e) => {
    setInfNagariktaIssueDate(e);
    setvalue;
  };

  useEffect(() => {
    if (clickedIdData) {
      setInfNagariktaIssueDate(clickedIdData?.infNagariktaIssueDate || aa);
    }
  }, [clickedIdData]);

  //   for dynamic form  for aayaShrotDetails
  const [aayaShrotDetailModelList, setAayaShrotDetailModelList] = useState([
    {
      vivaran: "",
      annualIncome: "",
    },
  ]);

  const handleAddAayaShrotDetails = () => {
    setAayaShrotDetailModelList([
      ...aayaShrotDetailModelList,
      {
        vivaran: "",
        annualIncome: "",
      },
    ]);
  };

  const handleDeleteVivaran = (index) => {
    const list = [...aayaShrotDetailModelList];
    list.splice(index, 1);
    setAayaShrotDetailModelList(list);
  };

  const handleVivaranChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...aayaShrotDetailModelList];
    list[index][name] = value;
    setAayaShrotDetailModelList(list);
  };

  const handleAmountChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...aayaShrotDetailModelList];
    list[index][name] = value;
    setAayaShrotDetailModelList(list);
  };

  let totalIncome = 0;
  aayaShrotDetailModelList.forEach((item) => {
    totalIncome += parseInt(item.annualIncome);
  });

  return (
    <>
      <CommonHeaderDesign title={"आयश्रोत सिफारिस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. विवरण
        </div>

        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aayaShrotDartaNo")}
              placeholder="."
            />
            <label className="label">DartaNo</label>
            <p> {errors?.aayaShrotDartaNo?.message}</p>
          </div> */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("verify")}
              placeholder="."
            />
            <label className="label">verify</label>
            <p> {errors?.verify?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nivedakNaamThar")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर</label>
            <p> {errors?.nivedakNaamThar?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("nivedakFullName")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर (In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 "> लिङ्ग</label>
            <select {...register("genderId")} className="peer">
              <option value={""}>--- लिङ्ग छान्नुहोस् ---</option>
              {genderOptions}
            </select>
            <p> {errors?.genderId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("stateId")} className="peer">
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
            <p> {errors?.stateId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("districtId")} className="peer">
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptionsVivaran}
            </select>
            <p> {errors?.districtId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("palikaId")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptions}
            </select>
            <p> {errors?.palikaId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वडा नं</label>
            <select {...register("wardNo")} className="peer">
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>
              {wardOptions}
            </select>
            <p> {errors?.wardNo?.message}</p>
          </div>
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              darta मिति
            </label>

            <NepaliDatePicker
              value={dartaMiti}
              onChange={handelDartaMiti}
              className="peer"
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <input type="hidden" {...register("grossIncome")} />
        </div>

        <div className=" bg-[#5197d1] py-3 rounded-xl flex justify-between px-4  ">
          <text className="text-lg font-bold">क) आय श्रोतको विवरण</text>

          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer "
            onClick={handleAddAayaShrotDetails}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>

        <div className="text-lg font-bold pl-6 pt-4 flex gap-48 ">
          <div className=" ">क्र.स.</div>
          <div className=" ">विवरण </div>
          <div className=" ">वार्षिक आय श्रोत</div>
          <div className=" "> कार्य </div>
        </div>

        {aayaShrotDetailModelList.map((item, index) => {
          return (
            <div className="flex" key={index}>
              <div>
                <input
                  className="border-2 text-xl font-bold text-center border-gray-300 p-2 rounded-lg m-2 w-16 h-16"
                  value={englishToNepali(index + 1)}
                />
              </div>
              <div>
                <textarea
                  type="string"
                  className="border-2 border-gray-300 p-2 rounded-lg m-2 w-96"
                  name="vivaran"
                  value={item.vivaran}
                  onChange={(e) => handleVivaranChange(e, index)}
                  placeholder="."
                />
              </div>

              <div className="pt-2">
                <input
                  type="string"
                  className="border-2 border-gray-300 p-4 rounded-lg m-2 w-60"
                  name="annualIncome"
                  value={item.annualIncome}
                  onChange={(e) => handleAmountChange(e, index)}
                  placeholder="."
                />
              </div>

              <div className="py-4">
                {aayaShrotDetailModelList.length > 1 && (
                  <div className=" justify-end p-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded py-2 "
                      onClick={() => handleDeleteVivaran(index)}
                    >
                      Delete Form
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="flex">
          <div>
            <input
              className="border-2 border-gray-300 p-2 rounded-lg m-2 w-96 h-16 text-center font-bold text-lg "
              value={"जम्मा आय श्रोतको विवरण रकम "}
            />
          </div>

          <div className="pt-2">
            <input
              {...register("grossIncome")}
              type="string"
              className="border-2 border-gray-300 p-4 rounded-lg m-2 w-60"
              placeholder="."
              name="grossIncome"
              value={totalIncome || 0.0}
            />
          </div>
        </div>

        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. निवेदकको विवरण
        </div>
        <div className="grid lg:grid-cols-5  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aayaShrotNivedak.infNaamThar")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aayaShrotNivedak.infFullName")}
              placeholder="."
            />
            <label className="label">पूरा नाम थर(In English)</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select
              {...register("aayaShrotNivedak.infStateId")}
              className="peer"
            >
              <option value={""}>--- प्रदेश छान्नुहोस् ---</option>
              {stateOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select
              {...register("aayaShrotNivedak.infDistrictId")}
              className="peer"
            >
              <option value={""}>--- जिल्ला छान्नुहोस् ---</option>
              {districtOptionsNivedak}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select
              {...register("aayaShrotNivedak.infPalikaId")}
              className="peer"
            >
              <option value={""}>--- गा.पा./न.पा. छान्नुहोस् ---</option>
              {palikaOptionsNivedak}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">वडा नं</label>
            <select
              {...register("aayaShrotNivedak.infWardNo")}
              className="peer"
            >
              <option value={""}>--- वडा नं छान्नुहोस् ---</option>

              {wardOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("aayaShrotNivedak.infNagariktaPraPaNo")}
              placeholder="."
            />
            <label className="label">ना.प्र.प.नं.</label>
          </div>

          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              ना.प्र.प जारी मिति
            </label>

            <NepaliDatePicker
              value={infNagariktaIssueDate}
              className="peer"
              onChange={(e) => handeNagriktaIssueDate(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">ना.प्र.प जारी जिल्ला</label>
            <select
              {...register("aayaShrotNivedak.infNagariktaIssueDistrictId")}
              className="peer"
            >
              <option value={""}>
                --- ना.प्र.प जारी जिल्ला छान्नुहोस् ---
              </option>
              {districtOptions}
            </select>
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

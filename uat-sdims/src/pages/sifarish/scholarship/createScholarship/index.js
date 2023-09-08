import React, { useEffect, useState } from "react";
import CommonHeaderDesign from "../../../../components/reusableDesign/CommonHeaderDesign";
import { useForm } from "react-hook-form";
import {
  getAllState,
  getDistrict,
  getPalika,
} from "../../../../services/apiServices/common/office/officeService";
import BikramSambat from "bikram-sambat-js";
import { ward } from "../../../../services/apiServices/common/ward/wardService";
import { FaMinus, FaPlus } from "react-icons/fa";
import { relation } from "../../../../services/apiServices/common/relation/realtionService";
import { gender } from "../../../../services/apiServices/common/gender/genderService";
import { education } from "../../../../services/apiServices/common/education/educationService";
import { insertScholarship } from "../../../../services/apiServices/sifarish/scholarship/scholarshipService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AddButton from "../../../../components/reusableDesign/AddButton";
import { Checkbox, FormControlLabel } from "@mui/material";
const dd = new BikramSambat(new Date()).toBS();

export default function index(clickedIdData) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: aayaShrotValidationResolver,
    // defaultValues: {
    //   id: clickedIdData?.clickedIdData?.id,
    //   name_Nep: clickedIdData?.clickedIdData?.name_Nep,
    // },
  });
  const onSubmit = async (data) => {
    data = {
      ...data,
      schlolarshipChildrenViewModelList: schlolarshipChildrenViewModelList,
    };
    console.log(data, "Scholarship");
    try {
      const response = await insertScholarship(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/sifarish/scholarship");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //for date picker
  const [dateData, setDateData] = useState(dd);
  useEffect(() => {
    if (clickedIdData) {
      setDateData(clickedIdData?.dateData || dd);
    }
  });

  const [
    schlolarshipChildrenViewModelList,
    setSchlolarshipChildrenViewModelList,
  ] = useState([
    {
      sonDaughterEng: "",
      sonDaughterNep: "",
      relation: "",
      education: "",
      age: "",
      dateBirth: "",
      gender: "",
    },
  ]);

  const handleAddScholarship = () => {
    setSchlolarshipChildrenViewModelList([
      ...schlolarshipChildrenViewModelList,
      {
        sonDaughterEng: "",
        sonDaughterNep: "",
        relation: "",
        education: "",
        age: "",
        dateBirth: "",
        gender: "",
      },
    ]);
  };
  const changesonDaughterEng = (e, index) => {
    const { name, value } = e.target;
    const list = [...schlolarshipChildrenViewModelList];
    list[index][name] = value;
    setSchlolarshipChildrenViewModelList(list);
  };

  const changeSonDaughterNep = (e, index) => {
    const { name, value } = e.target;
    const list = [...schlolarshipChildrenViewModelList];
    list[index][name] = value;
    setSchlolarshipChildrenViewModelList(list);
  };

  const changeRelation = (e, index) => {
    const { name, value } = e.target;
    const list = [...schlolarshipChildrenViewModelList];
    list[index][name] = value;
    setSchlolarshipChildrenViewModelList(list);
  };

  const changeEducation = (e, index) => {
    const { name, value } = e.target;
    const list = [...schlolarshipChildrenViewModelList];
    list[index][name] = value;
    setSchlolarshipChildrenViewModelList(list);
  };
  const changeAge = (e, index) => {
    const { name, value } = e.target;
    const list = [...schlolarshipChildrenViewModelList];
    list[index][name] = value;
    setSchlolarshipChildrenViewModelList(list);
  };

  const changeDateBirth = (e, index) => {
    const { name, value } = e.target;
    const list = [...schlolarshipChildrenViewModelList];
    list[index][name] = value;
    setSchlolarshipChildrenViewModelList(list);
  };

  const changeGender = (e, index) => {
    const { name, value } = e.target;
    const list = [...schlolarshipChildrenViewModelList];
    list[index][name] = value;
    setSchlolarshipChildrenViewModelList(list);
  };

  const handleDeleteScholarship = (index) => {
    const list = [...schlolarshipChildrenViewModelList];
    list.splice(index, 1);
    setSchlolarshipChildrenViewModelList(list);
  };

  //for relation
  const [relationApi, setRelationApi] = useState([]);
  useEffect(() => {
    const fetchRelation = async () => {
      try {
        const { status, data } = await relation();
        if (status) {
          setRelationApi(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRelation();
  }, []);
  const relationOption = relationApi.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.relationId}
      >
        {item.name}
      </option>
    );
  });

  //for gender
  const [genderApi, setGenderApi] = useState([]);
  useEffect(() => {
    const fetchGender = async () => {
      try {
        const { status, data } = await gender();
        if (status) {
          setGenderApi(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGender();
  }, []);
  const genderOption = genderApi.map((item) => {
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

  //for education
  const [educationApi, setEducationApi] = useState([]);
  console.log(educationApi, "edu");
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { status, data } = await education();
        if (status) {
          setEducationApi(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchEducation();
  }, []);
  const educationOption = educationApi.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.educationId}
      >
        {item.name}
      </option>
    );
  });

  //watch fields
  const watchFields = watch();
  useEffect(() => {
    if (watchFields.verify) {
      setValue("temporaryState", watchFields.permanentState);
      setValue("temporaryDistrict", watchFields.permanentDistrict);
      setValue("temporaryPalika", watchFields.permanentPalika);
      setValue("temporaryWard", watchFields.permanentWard);
    } else {
      setValue("temporaryState", "");
      setValue("temporaryDistrict", "");
      setValue("temporaryPalika", "");
      setValue("temporaryWard", "");
    }
  }, [
    setValue,
    watchFields.verify,
    watchFields.permanentState,
    watchFields.permanentDistrict,
    watchFields.permanentPalika,
    watchFields.permanentWard,
  ]);

  // for state
  const [parmanentStateData, setParmanentStateData] = useState([]);
  const [temporaryStateData, setTemporaryStateData] = useState([]);

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
        selected={
          item.stateId === clickedIdData?.clickedIdData?.permanentState?.stateId
        }
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
        selected={
          item.stateId === clickedIdData?.clickedIdData?.temporaryState?.stateId
        }
      >
        {item.stateNameNep}
      </option>
    );
  });
  // for district
  const [parmanentdistrictData, setParmanentDistrictData] = useState([]);
  const [temporarydistrictData, setTemporaryDistrictData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.permanentState);
        if (response.status === true) {
          setParmanentDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.permanentState]);
  const parmanentDistrictOptions = parmanentdistrictData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={
          item.districtId ===
          clickedIdData?.clickedIdData?.permanentDistrict?.districtId
        }
      >
        {item.districtNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(watchFields?.temporaryState);
        if (response.status === true) {
          setTemporaryDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.temporaryState]);

  const temporaryDistrictOptions = temporarydistrictData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={
          item.districtId ===
          clickedIdData?.clickedIdData?.permanentDistrict?.districtId
        }
      >
        {item.districtNameNep}
      </option>
    );
  });

  // for palika
  const [parmanentPalikaData, setParmanentPalikaData] = useState([]);
  const [temporaryPalikaData, setTemporaryPalikaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.permanentDistrict);
        if (response.status === true) {
          setParmanentPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.permanentDistrict]);
  const parmanentPalikaOptions = parmanentPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={
          item.palikaId ===
          clickedIdData?.clickedIdData?.permanentPalika?.palikaId
        }
        defaultValue={
          item.palikaId ===
          clickedIdData?.clickedIdData?.permanentPalika?.palikaId
        }
      >
        {item.palikaNameNep}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(watchFields?.temporaryDistrict);
        if (response.status === true) {
          setTemporaryPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [watchFields?.temporaryDistrict]);

  const temporaryPalikaOptions = temporaryPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={
          item.palikaId ===
          clickedIdData?.clickedIdData?.temporaryPalika?.palikaId
        }
      >
        {item.palikaNameNep}
      </option>
    );
  });

  //for ward
  const [parmanentWardData, setParmanentWardData] = useState([]);
  const [temporaryWardData, setTemporaryWardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ward(watchFields?.permanentPalika);
        if (response.status === true) {
          setParmanentWardData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchFields?.permanentPalika]);
  const parmanentWardOptions = parmanentWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={
          item?.id === clickedIdData?.clickedIdData?.permanentWard?.wardNo
        }
        defaultValue={
          item.id ===
          clickedIdData?.clickedIdData?.permanentPalika?.permanentWard?.wardNo
        }
      >
        {item.name}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ward(watchFields?.temporaryPalika);
        if (response.status === true) {
          setTemporaryWardData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchFields?.temporaryPalika]);

  const temporaryWardOptions = temporaryWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={
          item?.id === clickedIdData?.clickedIdData?.temporaryWard?.wardNo
        }
      >
        {item.name}
      </option>
    );
  });

  return (
    <>
      <CommonHeaderDesign title={"छात्रवृत्ति सिफारिस"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          १. बाबु/आमा को विवरण
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherName_Nep")}
              placeholder="."
            />
            <label className="label">बाबुको नाम</label>
            <p> {errors?.fatherName_Nep?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherName_Eng")}
              placeholder="."
            />
            <label className="label">बाबुको नाम(Eng)</label>
            <p> {errors?.fatherName_Eng?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("motherName_Nep")}
              placeholder="."
            />
            <label className="label">आमाको नाम</label>
            <p> {errors?.motherName_Nep?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("motherName_Eng")}
              placeholder="."
            />
            <label className="label">आमाको नाम(Eng)</label>
            <p> {errors?.motherName_Eng?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("citizenNo_Father")}
              placeholder="."
            />
            <label className="label">बाबुको नागरिकता प्रमाणपत्र नं.</label>
            <p> {errors?.citizenNo_Father?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("citizenNo_Mother")}
              placeholder="."
            />
            <label className="label">आमाको नागरिकता प्रमाणपत्र नं.</label>
            <p> {errors?.citizenNo_Mother?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("houseNo")}
              placeholder="."
            />
            <label className="label">घर न.</label>
            <p> {errors?.houseNo?.message}</p>
          </div>
        </div>
        <div className=" bg-[#5197d1] text-center text-white text-2xl py-3 rounded-xl font-bold ">
          २. स्थायी ठेगाना
        </div>
        <div className="grid lg:grid-cols-4  gap-5 px-5 pt-10 border border-black border-dashed shadow-2xl bg-gray-100  ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("permanentState")} className="peer">
              <option value={""}>--- प्रदेश छानुहोस ---</option>
              {parmanentStateOptions}
            </select>
            <p> {errors?.stateId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("permanentDistrict")} className="peer">
              <option value={""}>--- जिल्ला छानुहोस ---</option>
              {parmanentDistrictOptions}
            </select>
            <p> {errors?.districtId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("permanentPalika")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छानुहोस ---</option>
              {parmanentPalikaOptions}
            </select>
            <p> {errors?.permanentPalika?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label">वडा नं</label>
            <select className="peer" {...register("permanentWard")}>
              <option value={""}>--- वडा नं छानुहोस ---</option>
              {parmanentWardOptions}
            </select>
            <p> {errors?.permanentWard?.message}</p>
          </div>
          <FormControlLabel
            className="pl-3"
            {...register("verify")}
            control={
              <Checkbox
                color="primary"
                defaultChecked={clickedIdData?.isActive}
              />
            }
            label="स्थायी ठेगाना नै अस्थायी ठेगाना भए"
          />
        </div>
        <div className="grid lg:grid-cols-4 shadow-2xl bg-gray-100 gap-5 px-5 pt-6 border border-black border-dashed border-t-0 ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">प्रदेश</label>
            <select {...register("temporaryState")} className="peer">
              <option value={""}>--- प्रदेश छानुहोस ---</option>
              {temporaryStateOptions}
            </select>
            <p> {errors?.temporaryState?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">जिल्ला</label>
            <select {...register("temporaryDistrict")} className="peer">
              <option value={""}>--- जिल्ला छानुहोस ---</option>
              {temporaryDistrictOptions}
            </select>
            <p> {errors?.temporaryDistrict?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">गा.पा./न.पा.</label>
            <select {...register("temporaryPalika")} className="peer">
              <option value={""}>--- गा.पा./न.पा. छानुहोस ---</option>
              {temporaryPalikaOptions}
            </select>
            <p> {errors?.temporaryPalika?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label">वडा नं</label>
            <select className="peer" {...register("temporaryWard")}>
              <option value={""}>--- वडा नं छानुहोस ---</option>
              {temporaryWardOptions}
            </select>
            <p> {errors?.temporaryWard?.message}</p>
          </div>
        </div>

        <div className="bg-[#5197d1] text-white items-center py-3 px-2 rounded-xl flex justify-between">
          <text className="font-bold text-lg">छोरा/छोरी को विवरण</text>
          <div
            className="bg-green-300 hover:bg-green-500 px-6 py-3 rounded shadow-lg cursor-pointer"
            onClick={handleAddScholarship}
          >
            <div className="flex  gap-2 ">
              <FaPlus size={20} />
              <text>थप्नुहोस्</text>
            </div>
          </div>
        </div>
        <div className=" overflow-x-scroll w-full">
          <table class="border-collapse border border-slate-400 w-full">
            <thead>
              <tr>
                <th class="border border-slate-300">छोरा/छोरी को पूरा नाम</th>
                <th class="border border-slate-300">
                  छोरा/छोरी को पूरा नाम(Eng)
                </th>
                <th class="border border-slate-300">नाता</th>
                <th class="border border-slate-300">शैक्षिक</th>
                <th class="border border-slate-300">उमेर</th>
                <th class="border border-slate-300">जन्म मिति</th>
                <th class="border border-slate-300">लिङ्ग</th>
                <th class="border border-slate-300">कार्य</th>
              </tr>
            </thead>
            {schlolarshipChildrenViewModelList.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td class="border border-slate-300 text-center">
                      <input
                        className="border border-gray-300 rounded-lg w-52 peer"
                        type="string"
                        name="sonDaughterEng"
                        value={item.sonDaughterEng}
                        onChange={(e) => changesonDaughterEng(e, index)}
                        placeholder="."
                      />
                      <label className="label">
                        <span className="requiredField">*</span>
                      </label>
                    </td>
                    <td class="border border-slate-300 text-center">
                      <input
                        className="border border-gray-300 rounded-lg w-52"
                        type="string"
                        name="sonDaughterNep"
                        value={item.sonDaughterNep}
                        onChange={(e) => changeSonDaughterNep(e, index)}
                        placeholder="."
                      />
                    </td>
                    <td class="border border-slate-300 text-center">
                      <select
                        className="border border-gray-300 rounded-lg w-24"
                        type="string"
                        name="relation"
                        value={item.relation}
                        onChange={(e) => changeRelation(e, index)}
                      >
                        <option value={""}>---नाता छानुहोस---</option>
                        {relationOption}
                      </select>
                      <p>{errors?.relationId?.message}</p>
                    </td>
                    <td class="border border-slate-300 text-center">
                      <select
                        className="border border-gray-300 rounded-lg w-24"
                        type="string"
                        name="education"
                        value={item.education}
                        onChange={(e) => changeEducation(e, index)}
                      >
                        <option value={""}>---सिछ छानुहोस---</option>
                        {educationOption}
                      </select>
                      <p>{errors?.educationId?.message}</p>
                    </td>
                    <td class="border border-slate-300 text-center">
                      <input
                        className="border border-gray-300 rounded-lg w-24"
                        type="string"
                        name="age"
                        value={item.age}
                        onChange={(e) => changeAge(e, index)}
                        placeholder="."
                      />
                    </td>
                    <td class="border border-slate-300 text-center">
                      <input
                        className="border border-gray-300 rounded-lg w-24"
                        type="string"
                        name="dateBirth"
                        value={item.dateBirth}
                        onChange={(e) => changeDateBirth(e, index)}
                        placeholder="."
                      />
                    </td>
                    <td class="border border-slate-300 text-center">
                      <select
                        className="border border-gray-300 rounded-lg w-24"
                        type="string"
                        name="gender"
                        value={item.gender}
                        onChange={(e) => changeGender(e, index)}
                      >
                        <option value={""}>---लिङ्ग छानुहोस---</option>
                        {genderOption}
                      </select>
                      <p>{errors?.genderId?.message}</p>
                    </td>
                    <td class="border border-slate-300 text-center">
                      {schlolarshipChildrenViewModelList.length > 1 && (
                        <div>
                          <button
                            onClick={() => handleDeleteScholarship(index)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold px-3 rounded py-2"
                          >
                            <FaMinus />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
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

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
const BS = require("bikram-sambat-js");
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import { createEmployee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { employeeValidationResolver } from "../../../utils/validateField";
import { appointment } from "../../../services/apiServices/common/appointment/appointmentService";
import { padPurtiType } from "../../../services/apiServices/common/padPurtiType/padPurtiTypeService";
import { gender } from "../../../services/apiServices/common/gender/genderService";
import "nepali-datepicker-reactjs/dist/index.css";
import {
  GetAllNationality,
  getAllState,
  getDistrict,
  getPalika,
} from "../../../services/apiServices/common/office/officeService";
import { getReligion } from "../../../services/apiServices/common/religion/religionService";
import { cast } from "../../../services/apiServices/common/cast/castService";
import { department } from "../../../services/apiServices/common/department/departmentService";
import { subDepartment } from "../../../services/apiServices/common/subDepartment/subDepartmentService";
import { ward } from "../../../services/apiServices/common/ward/wardService";
import { attOffice } from "../../../services/apiServices/common/attOffice/attOfficeService";
import { group } from "@/services/apiServices/common/group/groupService";
import { subGroup } from "@/services/apiServices/common/subGroup/subGroupService";
import { post } from "@/services/apiServices/common/post/postService";
import { sewa } from "@/services/apiServices/common/sewa/sewaService";
const aa = new BikramSambat(new Date()).toBS();

const CreateEmployee = ({ clickedIdData }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: employeeValidationResolver,
    defaultValues: {
      id: clickedIdData?.id,
      firstName: clickedIdData?.firstName,
      middleName: clickedIdData?.middleName,
      lastName: clickedIdData?.lastName,
      firstName_Eng: clickedIdData?.firstName_Eng,
      middleName_Eng: clickedIdData?.middleName_Eng,
      lastName_Eng: clickedIdData?.lastName_Eng,
      empCode: clickedIdData?.empCode,
      appointmentId: clickedIdData?.appointmentId,
      padPurtiTypeId: clickedIdData?.padPurtiTypeId,
      genderId: clickedIdData?.genderId,
      religionId: clickedIdData?.religionId,
      email: clickedIdData?.email,
      castId: clickedIdData?.castId,
      phoneNo: clickedIdData?.phoneNo,
      mobileNo: clickedIdData?.mobileNo,
      departmentId: clickedIdData?.departmentId,
      subDepartmentId: clickedIdData?.subDepartmentId,
      attOfficeId: clickedIdData?.attOfficeId,
      citizenNo: clickedIdData?.citizenNo,
      citizenJariJillaId: clickedIdData?.citizenJariJillaId,
      nationalId: clickedIdData?.nationalId,
      groupId: clickedIdData?.groupId,
      subGroupId: clickedIdData?.subGroupId,
      postId: clickedIdData?.postId,
      sewaId: clickedIdData?.sewaId,

      permanentAddesss: {
        houseNo: clickedIdData?.permanentAddesss?.houseNo,
        address: clickedIdData?.permanentAddesss?.address,
      },
      tempoaryAddesss: {
        houseNo: clickedIdData?.tempoaryAddesss?.houseNo,
        address: clickedIdData?.tempoaryAddesss?.address,
      },
    },
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      dobNep: dobNep,
      dob: new Date(BS.BSToAD(dobNep)).toISOString(),
      citizenJariMiti: citizenJariMiti,
    };
    try {
      const response = await createEmployee(data);
      if (response.status === true) {
        toast.success(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
        router.push("/employeeSetup/employee");
      } else if (response.status === false) {
        toast.error(response.message, {
          icon: "🚀",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // for state
  const [permanentStateData, setPermanentStateData] = useState([]);
  const [temporaryStateData, setTemporaryStateData] = useState([]);

  const permanentStateValue = watch("permanentAddesss.stateId");
  const temporaryStateValue = watch("temporaryAddesss.stateId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllState();
        if (response.status === true) {
          setPermanentStateData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const permanentStateOptions = permanentStateData.map((item) => {
    return (
      <option
        value={item.stateId}
        key={item.stateId}
        selected={item.stateId === clickedIdData?.permanentAddesss?.stateId}
        defaultValue={item.stateId === clickedIdData?.permanentAddesss?.stateId}
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
        selected={item.stateId === clickedIdData?.tempoaryAddesss?.stateId}
      >
        {item.stateNameNep}
      </option>
    );
  });

  // district
  const [districtData, setDistrictData] = useState([]);
  const [districtDataT, setDistrictDataT] = useState([]);
  const [citizenJilla, setCitizenJilla] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(permanentStateValue);
        if (response.status === true) {
          setDistrictData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [permanentStateValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict();
        if (response.status === true) {
          setCitizenJilla(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDistrict(temporaryStateValue);
        if (response.status === true) {
          setDistrictDataT(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [temporaryStateValue]);

  const districtOptions = districtData.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.permanentAddesss?.distId}
      >
        {item.districtNameNep}
      </option>
    );
  });

  const citizenJillaOptions = citizenJilla.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.citizenJariJillaId}
      >
        {item.districtNameNep}
      </option>
    );
  });

  const districtOptionsT = districtDataT.map((item) => {
    return (
      <option
        value={item.districtId}
        key={item.districtId}
        selected={item.districtId === clickedIdData?.tempoaryAddesss?.distId}
      >
        {item.districtNameNep}
      </option>
    );
  });

  // palika
  const [permanentPalikaData, setPermanentPalikaData] = useState([]);
  const [temporaryPalikaData, setTemporaryPalikaData] = useState([]);

  const permanentDistrictValue = watch("permanentAddesss.distId");
  const temporaryDistrictValue = watch("temporaryAddesss.distId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(permanentDistrictValue);
        if (response.status === true) {
          setPermanentPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [permanentDistrictValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPalika(temporaryDistrictValue);
        if (response.status === true) {
          setTemporaryPalikaData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [temporaryDistrictValue]);

  const permanentPalikaOptions = permanentPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.permanentAddesss?.palikaId}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  const temporaryPalikaOptions = temporaryPalikaData.map((item) => {
    return (
      <option
        value={item.palikaId}
        key={item.palikaId}
        selected={item.palikaId === clickedIdData?.tempoaryAddesss?.palikaId}
      >
        {item.palikaNameNep}
      </option>
    );
  });

  //   for appointmentId
  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await appointment();
        if (response.status === true) {
          setAppointmentData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const appointmentOptions = appointmentData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.appointmentId}
      >
        {item.name}
      </option>
    );
  });

  //   for padPurtiId
  const [padPurtiData, setPadPurtiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await padPurtiType();
        if (response.status === true) {
          setPadPurtiData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const padPurtiOptions = padPurtiData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.padPurtiTypeId}
      >
        {item.name}
      </option>
    );
  });

  //   for gender
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await gender();
        if (response.status === true) {
          setGenderData(response.data);
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
        selected={item.id === clickedIdData?.id}
      >
        {item.name}
      </option>
    );
  });

  // for attOffice
  const [attOfficeData, setAttOfficeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await attOffice();
        if (status) {
          setAttOfficeData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const attOfficeOptions = attOfficeData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.attOfficeId}
      >
        {item.name}
      </option>
    );
  });

  // for ward
  const [permanentWardData, setPermanentWardData] = useState([]);
  const [temporaryWardData, setTemporaryWardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setPermanentWardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const permanentWardOptions = permanentWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.permanentAddesss?.wardId}
      >
        {item.name}
      </option>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await ward();
        if (status) {
          setTemporaryWardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const temporaryWardOptions = temporaryWardData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.tempoaryAddesss?.wardId}
      >
        {item.name}
      </option>
    );
  });

  //   for religion
  const [religionData, setReligionData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getReligion();
        if (status) {
          setReligionData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const religionOptions = religionData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.religionId}
      >
        {item.name}
      </option>
    );
  });

  //   for cast
  const [castData, setCastData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await cast();
        if (status) {
          setCastData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const castOptions = castData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.castId}
      >
        {item.name}
      </option>
    );
  });

  //   for department
  const [departData, setDepartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await department();
        if (status) {
          setDepartData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const departOptions = departData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.postId}
      >
        {item.name}
      </option>
    );
  });

  //   for sub-department
  const [supDepartData, setSupDepartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await subDepartment();
        if (status) {
          setSupDepartData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const subDepartOptions = supDepartData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.subDepartmentId}
      >
        {item.name}
      </option>
    );
  });

  //   for group
  const [groupData, setGroupData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await group();
        if (status) {
          setGroupData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const groupOptions = groupData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.groupId}
      >
        {item.name}
      </option>
    );
  });

  //   for subGroup
  const [subGroupData, setSubGroupData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await subGroup();
        if (status) {
          setSubGroupData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const subGroupOptions = subGroupData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.subGroupId}
      >
        {item.name}
      </option>
    );
  });

  //   for post
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await post();
        if (status) {
          setPostData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const postOptions = postData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.postId}
      >
        {item.name}
      </option>
    );
  });

  //   for sewa
  const [sewaData, setSewaData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await sewa();
        if (status) {
          setSewaData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const sewaOptions = sewaData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.sewaId}
      >
        {item.name}
      </option>
    );
  });

  //   for nationality
  const [nationalityData, setNationalityData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllNationality();
        if (response.status === true) {
          setNationalityData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const nationalityOptions = nationalityData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.nationalityId}
      >
        {item.name}
      </option>
    );
  });

  // date of birth
  const [dobNep, setDobNep] = useState(aa);
  const [citizenJariMiti, setCitizenJariMiti] = useState(aa);
  useEffect(() => {
    if (clickedIdData) {
      setDobNep(clickedIdData?.dobNep || aa);
      setCitizenJariMiti(clickedIdData?.citizenJariMiti || aa);
    }
  }, [clickedIdData]);

  return (
    <React.Fragment>
      <CommonHeaderDesign title={" कर्मचारी राख्नुहोस  "} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#2d8cccfd] text-center text-white text-2xl py-3 rounded-xl font-bold  ">
          सामान्य विवरण
        </div>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("firstName")}
              placeholder="."
            />
            <label className="label">
              First Name(नेपाली)
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.firstName?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("middleName")}
              placeholder="."
            />
            <label className="label">Middle Name(नेपाली)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("lastName")}
              placeholder="."
            />
            <label className="label">
              Last Name(नेपाली)
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.lastName?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("firstName_Eng")}
              placeholder="."
            />
            <label className="label">First Name(Eng)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("middleName_Eng")}
              placeholder="."
            />
            <label className="label">Middle Name(Eng)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("lastName_Eng")}
              placeholder="."
            />
            <label className="label">Last Name(Eng)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("empCode")}
              placeholder="."
            />
            <label className="label">Employee Code</label>
            <p> {errors?.empCode?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select Apppointment
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("appointmentId")}
              className="peer requiredField"
            >
              <option value={""}>Select the appointment</option>
              {appointmentOptions}
            </select>
            <p> {errors?.appointmentId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select Padpurti Type
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("padPurtiTypeId")}
              className="peer requiredField"
            >
              <option value={""}>Select the padpurti</option>

              {padPurtiOptions}
            </select>
            <p> {errors?.padPurtiTypeId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">लिङ्ग </label>
            <select {...register("genderId")} className="peer">
              <option value={""} selected disabled>
                लिङ्ग छानुहोस
              </option>

              {genderOptions}
            </select>
            <p> {errors?.genderId?.message}</p>
          </div>
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%]"
            >
              Date of birth (नेपाली मिति)
            </label>

            <NepaliDatePicker
              value={dobNep}
              className="peer"
              onChange={(e) => setDobNep(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={new Date(BS.BSToAD(dobNep)).toLocaleDateString("en-US")}
              className="peer"
            />
            <label className="label">Date of birth</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              className="peer requiredField"
              {...register("email")}
              placeholder="."
            />
            <label className="label">
              Email Address
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.email?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select Religion
              <span className="requiredField">*</span>
            </label>
            <select {...register("religionId")} className="peer requiredField">
              <option value={""} disabled selected>
                Select the Religion
              </option>
              {religionOptions}
            </select>
            <p> {errors?.religionId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select Cast
              <span className="requiredField">*</span>
            </label>
            <select {...register("castId")} className="peer requiredField">
              <option value={""}>Select the Religion</option>
              {castOptions}
            </select>
            <p> {errors?.castId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("phoneNo")}
              placeholder="."
            />
            <label className="label">Phone No.</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("mobileNo")}
              placeholder="."
            />
            <label className="label">
              Mobile No. <span className="requiredField">*</span>
            </label>
            <p> {errors?.mobileNo?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select Department
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("departmentId")}
              className="peer requiredField"
            >
              <option value={""} disabled selected>
                Select the department
              </option>

              {departOptions}
            </select>
            <p> {errors?.departmentId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select Sub-Department
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("subDepartmentId")}
              className="peer requiredField"
            >
              <option value={""} disabled selected>
                Select the Sub-department
              </option>

              {subDepartOptions}
            </select>
            <p> {errors?.subDepartmentId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select attOffice
              <span className="requiredField">*</span>
            </label>
            <select {...register("attOfficeId")} className="peer requiredField">
              <option value={""} disabled selected>
                Select the AttOffice
              </option>

              {attOfficeOptions}
            </select>
            <p> {errors?.attOfficeId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select group
              <span className="requiredField">*</span>
            </label>
            <select {...register("groupId")} className="peer requiredField">
              <option value={""} disabled selected>
                Select the Group
              </option>

              {groupOptions}
            </select>
            <p> {errors?.groupId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select sub group
              <span className="requiredField">*</span>
            </label>

            <select {...register("subGroupId")} className="peer requiredField">
              <option value={""} disabled selected>
                Select the sub Group
              </option>

              {subGroupOptions}
            </select>
            <p> {errors?.subGroupId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select post
              <span className="requiredField">*</span>
            </label>
            <select {...register("postId")} className="peer requiredField">
              <option value={""} disabled selected>
                Select the post
              </option>

              {postOptions}
            </select>
            <p> {errors?.postId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Select sewa
              <span className="requiredField">*</span>
            </label>
            <select {...register("sewaId")} className="peer requiredField">
              <option value={""} disabled selected>
                Select the sewa
              </option>

              {sewaOptions}
            </select>
            <p> {errors?.sewaId?.message}</p>
          </div>
        </div>

        <div className="bg-[#2d8cccfd] text-white text-center text-2xl py-3 rounded-xl font-bold ">
          नागरिकता विवरण
        </div>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("citizenNo")}
              placeholder="."
            />
            <label className="label">
              Citizenship No
              <span className="requiredField">*</span>
            </label>
            <p> {errors?.citizenNo?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Issued District
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("citizenJariJillaId")}
              className="peer requiredField"
            >
              <option value={""}>Select Issued District</option>

              {citizenJillaOptions}
            </select>
            <p> {errors?.citizenJariJillaId?.message}</p>
          </div>
          <div className="relative  w-full mb-6 group">
            <label
              htmlFor=""
              className=" absolute text-[10px] text-blue-900 -top-[15%] "
            >
              Citizenship जारी मिति
            </label>

            <NepaliDatePicker
              value={citizenJariMiti}
              className="peer"
              onChange={(e) => setCitizenJariMiti(e)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">Select Nationality</label>
            <select
              {...register("nationalityId")}
              className="peer requiredField"
            >
              <option value={""} disabled selected>
                Select the nationality
                <span className="requiredField">*</span>
              </option>

              {nationalityOptions}
            </select>
          </div>
        </div>

        <div className="bg-[#2d8cccfd] text-center text-white text-2xl py-3 rounded-xl font-bold  ">
          स्थाई ठेगाना
        </div>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              State
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("permanentAddesss.stateId")}
              className="peer requiredField"
            >
              <option value={""} selected>
                Select the State
              </option>
              {permanentStateOptions}
            </select>
            <p>{errors?.permanentAddesss?.stateId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              District
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("permanentAddesss.distId")}
              className="peer requiredField"
            >
              <option value={""} selected>
                Select the District
              </option>
              {districtOptions}
            </select>
            <p> {errors?.permanentAddesss?.distId?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Palika
              <span className="requiredField">*</span>
            </label>
            <select
              {...register("permanentAddesss.palikaId")}
              className="peer requiredField"
            >
              <option value="">Select the Palika</option>
              {permanentPalikaOptions}
            </select>
            <p>{errors?.permanentAddesss?.palikaId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              ward <span className="requiredField">*</span>
            </label>
            <select
              {...register("permanentAddesss.wardId")}
              className="peer requiredField"
            >
              <option value={""}>Select the ward</option>

              {permanentWardOptions}
            </select>
            <p> {errors?.permanentAddesss?.wardId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer "
              {...register("permanentAddesss.houseNo")}
              placeholder="."
            />
            <label className="label">
              House No. 
            </label>
            <p> {errors?.permanentAddesss?.houseNo?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer requiredField"
              {...register("permanentAddesss.address")}
              placeholder="."
            />
            <label className="label">
              Address <span className="requiredField">*</span>
            </label>
            <p> {errors?.permanentAddesss?.address?.message}</p>
          </div>
        </div>
        <div className="bg-[#2d8cccfd] text-center text-white text-2xl py-3 rounded-xl font-bold  ">
          अस्थायी ठेगाना
        </div>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">State</label>
            <select {...register("tempoaryAddesss.stateId")} className="peer">
              <option value="">Select the State</option>
              {temporaryStateOptions}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">District</label>
            <select {...register("tempoaryAddesss.distId")} className="peer">
              <option value="">Select First State</option>
              {districtOptionsT}
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">Palika</label>
            <select {...register("tempoaryAddesss.palikaId")} className="peer">
              <option value="">Select the Palika</option>
              {temporaryPalikaOptions}
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">ward</label>
            <select {...register("tempoaryAddesss.wardId")} className="peer">
              <option value={""}>Select the ward</option>
              {temporaryWardOptions}
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("tempoaryAddesss.houseNo")}
            />
            <label className="label">House No.</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("tempoaryAddesss.address")}
              placeholder="."
            />
            <label className="label">Address</label>
          </div>
        </div>

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "Add Employee"}
          disabled={isSubmitting}
        />
      </form>
    </React.Fragment>
  );
};
export default CreateEmployee;

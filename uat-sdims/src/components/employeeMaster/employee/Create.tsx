import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import AddButton from "../../reusableDesign/AddButton";
import { EmployeeFormValidationSchema, EmployeeInterface } from "@/models/Employee";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import { appointment } from "../../../services/apiServices/common/appointment/appointmentService";
import { padPurtiType } from "../../../services/apiServices/common/padPurtiType/padPurtiTypeService";
import { gender } from "../../../services/apiServices/common/gender/genderService";
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
import { post } from "../../../services/apiServices/common/post/postService";
import { sewa } from "../../../services/apiServices/common/sewa/sewaService";
import { group } from "../../../services/apiServices/common/group/groupService";
import { subGroup } from "../../../services/apiServices/common/subGroup/subGroupService";
import { attOffice } from "../../../services/apiServices/common/attOffice/attOfficeService";
import { createEmployee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
const BS = require("bikram-sambat-js");

const Create = (employee: EmployeeInterface, loading: boolean) => {
  const [fetchEmplyee, setFetchEmplyee] = useState<EmployeeInterface>()
  const [isLoading, setisLoading] = useState<boolean>(loading);
  const [appointmentData, setAppointmentData] = useState<any>();
  const [padPurtiTypeData, setPadPurtiTypeData] = useState<any>();
  const [districtJariJilla, setDistrictJariJilla] = useState<any>();
  const [countries, setCountries] = useState<any>();
  const [genderData, setGenderData] = useState<any>();
  const [religion, setReligion] = useState<any>();
  const [castData, setCastData] = useState<any>();
  const [departmentData, setDepartmentData] = useState<any>();
  const [departmentId, setDepartmentId] = useState<number>(employee.departmentId);
  const [subdepartmentData, setSubdepartmentData] = useState<any>();
  const [attOffiecData, setAttOffiecData] = useState<any>();
  const [wardData, setwardData] = useState<any>();
  const [postData, setPostData] = useState<any>();
  const [sewaData, setSewaData] = useState<any>();
  const [groupData, setGroupData] = useState<any>();
  const [sewaId, setSewaId] = useState<number>(employee.sewaId);
  const [groupId, setGroupId] = useState<number>(employee.groupId);
  const [subGroupData, setSubGroupData] = useState<any>();
  const [stateData, setStateData] = useState<any>();
  const [districtData, setDistrictData] = useState<any>();
  const [palikaData, setPalikaData] = useState<any>();
  const [districtTempData, setDistrictTempData] = useState<any>();
  const [palikaTempData, setPalikaTempData] = useState<any>();
  const [stateId, setStateId] = useState<number>(employee.permanentAddesss?.stateId)
  const [distId, setDistId] = useState<number>(employee.permanentAddesss?.distId)
  const [stateTempId, setStateTempId] = useState<number>(employee.tempoaryAddesss?.stateId)
  const [distTempId, setDistTempId] = useState<number>(employee.tempoaryAddesss?.distId)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeInterface>({
    defaultValues: employee,
    resolver : yupResolver(EmployeeFormValidationSchema)
  });

  const onSubmit = async (formData: any) => {
    try {
      let res = await createEmployee(formData).then((response) => {
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/employeesetup/employee");
          return;
        } else response.status === false;
        {
          toast.error(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
        }
        return;
      });
    } catch (error) {}
  };
  
  useEffect(() => {
    setFetchEmplyee(employee)
    setValue("id", employee.id | 0)
    setisLoading(false);
    reset(employee)
  }, [ employee, reset, setValue, setisLoading ]);

  useEffect(() => {
    setValue("dobNep", BS.ADToBS(new Date()));
    let getappointmentById = () => {
      appointment().then((response) => {
        try {
          response.status === true;
          {
            setAppointmentData(response.data);
          }
        } catch (error) {}
      });
    };
    getappointmentById();
  }, [setValue]);
  useEffect(() => {
    let getPadPurtiById = () => {
      padPurtiType().then((response) => {
        try {
          response.status === true;
          {
            setPadPurtiTypeData(response.data);
          }
        } catch (error) {}
      });
    };
    getPadPurtiById();
  }, []);
  useEffect(() => {
    let getPadPurtiById = () => {
      getDistrict(0).then((response) => {
        try {
          response.status === true;
          {
            setDistrictJariJilla(response.data);
          }
        } catch (error) {}
      });
    };
    getPadPurtiById();
  }, []);
  useEffect(() => {
    let genderIdData = () => {
      gender().then((response) => {
        try {
          response.status === true;
          {
            setGenderData(response.data);
          }
        } catch (error) {}
      });
    };
    genderIdData();
  }, []);
  useEffect(() => {
    let NationalityData = () => {
      GetAllNationality().then((response) => {
        try {
          response.status === true;
          {
            setCountries(response.data);
          }
        } catch (error) {}
      });
    };
    NationalityData();
  }, []);
  useEffect(() => {
    let religionData = () => {
      getReligion().then((response) => {
        try {
          response.status === true;
          {
            setReligion(response.data);
          }
        } catch (error) {}
      });
    };
    religionData();
  }, []);
  useEffect(() => {
    let castData = () => {
      cast().then((response) => {
        try {
          response.status === true;
          {
            setCastData(response.data);
          }
        } catch (error) {}
      });
    };
    castData();
  }, []);
  useEffect(() => {
    let departmentData = () => {
      department().then((response) => {
        try {
          response.status === true;
          {
            setDepartmentData(response.data);
          }
        } catch (error) {}
      });
    };
    departmentData();
  }, []);
  useEffect(() => {
    let subDepartmentData = () => {
      subDepartment(departmentId).then((response) => {
        try {
          response.status === true;
          {
            setSubdepartmentData(response.data);
          }
        } catch (error) {}
      });
    };
    subDepartmentData();
  }, [departmentId]);
  useEffect(() => {
    let attOfficeData = () => {
      attOffice().then((response) => {
        try {
          response.status === true;
          {
            setAttOffiecData(response.data);
          }
        } catch (error) {}
      });
    };
    attOfficeData();
  }, []);
  useEffect(() => {
    let setwardDa = () => {
      ward().then((response) => {
        try {
          response.status === true;
          {
            setwardData(response.data);
          }
        } catch (error) {}
      });
    };
    setwardDa();
  }, []);
  useEffect(() => {
    let postData = () => {
      post().then((response) => {
        try {
          response.status === true;
          {
            setPostData(response.data);
          }
        } catch (error) {}
      });
    };
    postData();
  }, []);
  useEffect(() => {
    let sewaData = () => {
      sewa().then((response) => {
        try {
          response.status === true;
          {
            setSewaData(response.data);
          }
        } catch (error) {}
      });
    };
    sewaData();
  }, []);
  useEffect(() => {
    let groupData = () => {
      group(sewaId).then((response) => {
        try {
          response.status === true;
          {
            setGroupData(response.data);
          }
        } catch (error) {}
      });
    };
    groupData();
  }, [sewaId]);
  useEffect(() => {
    let subgroupData = () => {
      subGroup(groupId).then((response) => {
        try {
          response.status === true;
          {
            setSubGroupData(response.data);
          }
        } catch (error) {}
      });
    };
    subgroupData();
  }, [sewaId, groupId]);
  useEffect(() => {
    let getAllStateApiData = () => {
      getAllState().then((response) => {
        try {
          response.status === true;
          {
            setStateData(response.data);
          }
        } catch (error) {}
      });
    };
    getAllStateApiData();
  }, []);
  useEffect(() => {
    let getDistrictByStateId = () => {
      getDistrict(stateId).then((response) => {
        try {
          response.status === true;
          {
            setDistrictData(response.data);
          }
        } catch (error) {}
      });
    };
    getDistrictByStateId();
  }, [stateId]);
  useEffect(() => {
    let getPalikaByDistrictId = () => {
      getPalika(distId).then((response) => {
        try {
          response.status === true;
          {
            setPalikaData(response.data);
          }
        } catch (error) {}
      });
    };
    getPalikaByDistrictId();
  }, [distId]);
  useEffect(() => {
    let getDistrictByStateIdTemp = () => {
      getDistrict(stateTempId).then((response) => {
        try {
          response.status === true;
          {
            setDistrictTempData(response.data);
          }
        } catch (error) {}
      });
    };
    getDistrictByStateIdTemp();
  }, [stateTempId]);
  useEffect(() => {
    let getPalikaByDistrictIdTemp = () => {
      getPalika(distTempId).then((response) => {
        try {
          response.status === true;
          {
            setPalikaTempData(response.data);
          }
        } catch (error) {}
      });
    };
    getPalikaByDistrictIdTemp();
  }, [distTempId]);
 

  return (
    <>
      <CommonHeaderDesign title={"Create Employee"} />
      {isLoading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
            Loading...
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold">
            सामान्य विवरण
            {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          </div>
          <div className="grid lg:grid-cols-6 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
            <div className="relative z-0 w-full mb-6 group">
              <input type="hidden" {...register("id")} />
              <input
                type="string"
                className="peer"
                {...register("firstName")}
                placeholder="."
              />
              <label className="label">First Name(नेपाली)</label>
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
                className="peer"
                {...register("lastName")}
                placeholder="."
              />
              <label className="label">Last Name(नेपाली)</label>
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
              <label className="label">Attendance User Id</label>
              <p> {errors?.empCode?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                Select Attendance Office
              </label>
              <select {...register("attOfficeId")} className="peer">
                <option value={""} disabled selected>
                  Select the Attendance Office
                </option>
                {attOffiecData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.attOfficeId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                Select Apppointment
              </label>
              <select {...register("appointmentId")} className="peer">
                <option key={0} value={""} disabled>
                  Select the appointment
                </option>
                {appointmentData?.map((items: any, index: any) => {
                  return (
                    <option key={items.id + 1} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.appointmentId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                Select Padpurti Type
              </label>
              <select {...register("padPurtiTypeId")} className="peer">
                <option value={""} disabled>
                  Select the padpurti
                </option>
                {padPurtiTypeData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.padPurtiTypeId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Gender</label>
              <select {...register("genderId")} className="peer">
                <option value={""} selected disabled>
                  Select The Gender
                </option>

                {genderData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
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
                {...register("dobNep")}
                className="peer"
                onChange={(value) => {
                  setValue("dobNep", value);
                  setValue("dob", BS.BSToAD(value));
                }}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                value={new Date().toLocaleDateString("en-CA")}
                {...register("dob")}
                className="peer"
              />
              <label className="label">Date of birth</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                className="peer"
                {...register("email")}
                placeholder="."
              />
              <label className="label">Email Address</label>
              <p> {errors?.email?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("mobileNo")}
                placeholder="."
              />
              <label className="label">Mobile No</label>
              <p> {errors?.mobileNo?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="peer"
                {...register("phoneNo")}
                placeholder="."
              />
              <label className="label">Phone No</label>
              <p> {errors?.phoneNo?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="string"
                className="peer"
                {...register("citizenNo")}
                placeholder="."
              />
              <label className="label">Citizenship No</label>
              <p> {errors?.citizenNo?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Citizenship Issued District</label>
              <select {...register("citizenJariJillaId")} className="peer">
                <option value={""} selected disabled>
                  Select Citizenship Issued District
                </option>
                {districtJariJilla?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.districtId}>
                      {items?.districtNameNep}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.citizenJariJillaId?.message}</p>
            </div>
            <div className="relative  w-full mb-6 group">
              <label
                htmlFor=""
                className=" absolute text-[10px] text-blue-900 -top-[15%]"
              >
                नागरिकता जारी मिति
              </label>
              <NepaliDatePicker
                {...register("citizenJariMiti")}
                className="peer"
                onChange={(value) => setValue("citizenJariMiti", value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
              <p> {errors?.citizenJariMiti?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">नागरिकता देश</label>
              <select {...register("nationalityId")} className="peer">
                <option value={""} selected disabled>
                  नागरिकता देश
                </option>
                {countries?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.nationalityId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Select Religion</label>
              <select {...register("religionId")} className="peer">
                <option value={""} disabled selected>
                  Select the Religion
                </option>
                {religion?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.religionId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Select Cast</label>
              <select {...register("castId")} className="peer">
                <option value={""} disabled selected>
                  Select the Cast
                </option>
                {castData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.castId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Select Departmentt</label>
              <select
                {...register("departmentId")}
                className="peer"
                onChange={(e) => setDepartmentId(parseInt(e.target.value))}
              >
                <option value={""} disabled selected>
                  Select the Departmentt
                </option>
                {departmentData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.departmentId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">
                Select Sub Departmentt
              </label>
              <select {...register("subDepartmentId")} className="peer">
                <option value={""} disabled selected>
                  Select the Sub Departmentt
                </option>
                {subdepartmentData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.subDepartmentId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Select Post</label>
              <select {...register("postId")} className="peer">
                <option value={""} disabled selected>
                  Select the Post
                </option>
                {postData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.postId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Select Sewa</label>
              <select
                {...register("sewaId")}
                className="peer"
                onChange={(e) => setSewaId(parseInt(e.target.value))}
              >
                <option value={""} disabled>
                  Select the sewa
                </option>
                {sewaData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.sewaId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Select Group</label>
              <select
                {...register("groupId")}
                className="peer"
                onChange={(e) => setGroupId(parseInt(e.target.value))}
              >
                <option value={""} selected>
                  Select the Group
                </option>
                {groupData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.groupId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">Select Sub Group</label>
              <select {...register("subGroupId")} className="peer">
                <option value={""} selected>
                  Select the Sub Group
                </option>
                {subGroupData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.subGroupId?.message}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold">
            स्थाई ठेगाना
          </div>
          <div className="grid lg:grid-cols-6 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed">
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">प्रदेश</label>
              <select
                {...register("permanentAddesss.stateId")}
                className="peer"
                onChange={(e)=> setStateId(parseInt(e.target.value))}
              >
                <option value={""}>
                  Select the प्रदेश
                </option>
                {stateData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.stateId}>
                      {items?.stateNameNep}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.permanentAddesss?.stateId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">जिल्ला</label>
              <select {...register("permanentAddesss.distId")} className="peer"
                onChange={(e)=> setDistId(parseInt(e.target.value))}
                >
                <option value={""}>
                  Select the जिल्ला
                </option>
                {districtData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.districtId}>
                      {items?.districtNameNep}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.permanentAddesss?.distId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">गा.पा/न.पा.</label>
              <select
                {...register("permanentAddesss.palikaId")}
                className="peer"
              >
                <option value={""} >
                  Select the गा.पा/न.पा.
                </option>
                {palikaData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.palikaId}>
                      {items?.palikaNameNep}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.permanentAddesss?.palikaId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900">वडा न.</label>
              <select {...register("permanentAddesss.wardId")} className="peer">
                <option value={""} selected disabled>
                  Select the वडा न.
                </option>
                {wardData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.permanentAddesss?.wardId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("permanentAddesss.houseNo")}
                placeholder="."
              />
              <label className="label">House No.</label>
              <p> {errors?.permanentAddesss?.houseNo?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="peer"
                {...register("permanentAddesss.address")}
                placeholder="."
              />
              <label className="label">Address</label>
              <p> {errors?.permanentAddesss?.address?.message}</p>
            </div>


          </div>
          <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold">
            अस्थाई ठेगाना
          </div>
          <div className="grid lg:grid-cols-6 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed">
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">प्रदेश</label>
              <select
                {...register("tempoaryAddesss.stateId")}
                className="peer"
                onChange={(e)=> setStateTempId(parseInt(e.target.value))}
              >
                <option value={""} >
                  Select the प्रदेश
                </option>
                {stateData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.stateId}>
                      {items?.stateNameNep}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.tempoaryAddesss?.stateId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">जिल्ला</label>
              <select {...register("tempoaryAddesss.distId")} 
              className="peer"
              onChange={(e)=> setDistTempId(parseInt(e.target.value))}
              >
                <option value={""} >
                  Select the जिल्ला
                </option>
                {districtTempData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.districtId}>
                      {items?.districtNameNep}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.tempoaryAddesss?.distId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">गा.पा/न.पा.</label>
              <select
                {...register("tempoaryAddesss.palikaId")}
                className="peer"
              >
                <option value={""} >
                  Select the गा.पा/न.पा.
                </option>
                {palikaTempData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.palikaId}>
                      {items?.palikaNameNep}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.tempoaryAddesss?.palikaId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="label text-blue-900 ">वडा न.</label>
              <select {...register("tempoaryAddesss.wardId")} className="peer">
                <option value={""} selected disabled>
                  Select the वडा न.
                </option>
                {wardData?.map((items: any, index: any) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
              <p> {errors?.tempoaryAddesss?.wardId?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="peer"
                {...register("tempoaryAddesss.houseNo")}
                placeholder="."
              />
              <label className="label">House No.</label>
              <p> {errors?.tempoaryAddesss?.houseNo?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="peer"
                {...register("tempoaryAddesss.address")}
                placeholder="."
              />
              <label className="label">Address</label>
              <p> {errors?.tempoaryAddesss?.address?.message}</p>
            </div>


          </div>
          <AddButton
            icon={<FaPlus />}
            title={isSubmitting ? "Submitting..." : "Add Employee"}
            
          />
        </form>
      )}
    </>
  );
};

export default Create;

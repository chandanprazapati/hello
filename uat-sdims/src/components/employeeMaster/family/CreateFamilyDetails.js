import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";

import { occupation } from "../../../services/apiServices/common/occupation/occupationService";

import {createFamilyDetails} from "../../../services/apiServices/employee/familyDetails/familyDetailsService"
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { TextareaAutosize } from "@mui/material";


const CreateFamilyDetails = ({ clickedIdData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(true);

  //   to set the incoming value to the respective fields
  useEffect(() => {
    // setValue("id", clickedIdData?.id);
    // setValue("firstName", clickedIdData?.firstName);
    // setValue("middleName", clickedIdData?.middleName);
    // setValue("lastName", clickedIdData?.lastName);
    // setValue("firstName_Eng", clickedIdData?.firstName_Eng);
    // setValue("lastName_Eng", clickedIdData?.lastName_Eng);
    // setValue("empCode", clickedIdData?.empCode);
    // setValue("citizenNo", clickedIdData?.citizenNo);
    // setValue("nationalId", clickedIdData?.nationalId);
    // setValue("email", clickedIdData?.email);
    // setValue("phoneNo", clickedIdData?.phoneNo);
    // setValue("mobileNo", clickedIdData?.mobileNo);
  }, [clickedIdData]);

  const router = useRouter();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (fatherOccupationValue === "") {
          setFatherOccupationMsg(<p>This field is required</p>);
        } 
        else if (motherOccupationValue === "") {
          setMotherOccupationMsg(<p>This field is required</p>);
        }
        else if (grandFatherOccupationValue === "") {
          setGrandFatherOccupationMsg(<p>This field is required</p>);
        }
        else if (husbandOrWifeOccupationValue === "") {
          setHusbandOrWifeOccupationMsg(<p>This field is required</p>);
        }
        else if (employeeValue === "") {
          setEmployeeMsg(<p>This field is required</p>);
        }
        else {
          data = {
            ...data,
            fatherOccupationId : fatherOccupationValue,
            motherOccupationId : motherOccupationValue,
            grandFatherOccupationId : grandFatherOccupationValue,
            employeeId : employeeValue,

          };
          try {
            createFamilyDetails(data).then((response) => {
              if (response.status === true) {
                toast.success(response.message, {
                  icon: "🚀",
                  autoClose: 1000,
                });
                router.push("/employeesetup/familydetails");
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
        }
        resolve();
      }, 2000);
    });
  };

    // for faher occupation
    const [fatherOccupationValue, setFatherOccupationValue] = useState("");
    const [fatherOccupationMsg, setFatherOccupationMsg] = useState("");
    const handleFatherOccupation = (e) => {
      setFatherOccupationValue(e.target.value);
    };
    // for mother occupation
    const [motherOccupationValue, setMotherOccupationValue] = useState("");
    const [motherOccupationMsg, setMotherOccupationMsg] = useState("");
    const handleMotherOccupation = (e) => {
      setMotherOccupationValue(e.target.value);
    };

    // for grandFather occupation
    const [grandFatherOccupationValue, setGrandFatherOccupationValue] = useState("");
    const [grandFatherOccupationMsg, setGrandFatherOccupationMsg] = useState("");
    const handleGrandFatherOccupation = (e) => {
      setGrandFatherOccupationValue(e.target.value);
    };

    // for husbandOrWife occupation
    const [husbandOrWifeOccupationValue, setHusbandOrWifeOccupationValue] = useState("");
    const [husbandOrWifeOccupationMsg, setHusbandOrWifeOccupationMsg] = useState("");
    const handleHusbandOrWifeOccupation = (e) => {
      setHusbandOrWifeOccupationValue(e.target.value);
    };
    const [occupationApi, setOccupationApi] = useState([]);
    useEffect(() => {
      let occupationById = () => {
        occupation().then((response) => {
          try {
            response.status === true;
            {
              setOccupationApi(response.data);
            }
          } catch (error) {}
        });
      };
  
      occupationById();
    }, []);

    const [apiData, setApiData] = useState([]);
    const [employeeValue,setEmployeeValue] = useState("")
    const [employeeMsg,setEmployeeMsg] = useState("")

    const handleEmployee = (e) => {
      setEmployeeValue(e.target.value)
    }

    useEffect(() => {
      let employeeApiData = () => {
        employee().then((response) => {
          try {
            response.status === true;
            {
              setApiData(response.data);
            }
          } catch (error) {
            toast.error(response.message, {
              autoClose: 1000,
            });
          }
        });
      };
      employeeApiData();
    }, [setApiData]);

  return (
    <>
      <CommonHeaderDesign title={"कर्मचारी परिवार राख्नुहोस"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold  ">
          कर्मचारी विवरण
        </div>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("husbandOrWife")}
              placeholder="."
            />
            <label className="label">पति / पत्नी नाम (नेपाली)</label>
            <p> {errors?.husbandOrWife?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("middleName")}
              placeholder="."
            />
            <label className="label">पति / पत्नी नाम (English)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("totalSon")}
              placeholder="."
            />
            <label className="label">कुल छोरा</label>
            <p> {errors?.totalSon?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("firstName_Eng")}
              placeholder="."
            />
            <label className="label">कुल छोरी</label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">पेशा</label>
            <select onChange={handleHusbandOrWifeOccupation} value={husbandOrWifeOccupationValue} className="peer">
              <option value={""} disabled>
            ---  पेशा चयन गर्नुहोस् ---
              </option>

              {occupationApi.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
            {husbandOrWifeOccupationMsg}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">कर्मचारी</label>
            <select onChange={handleEmployee} value={employeeValue} className="peer">
              <option value={""} disabled>
            ---  कर्मचारी चयन गर्नुहोस् ---
              </option>

              {apiData.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.firstName} {items.middleName} {items.lastName}
                  </option>
                );
              })}
            </select>
            {employeeMsg}
          </div>

          <div className="flex flex-col gap-2">
            <label>कैफियत</label>

            <TextareaAutosize
              type="string"
              className="border-2 w-full pb-6 border-black"
              {...register("remarks")}
              placeholder="write something here......"
            />
          </div>
         
        </div>

        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold ">
        बुबाको विवरण

        </div>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherName")}
              placeholder="."
            />
            <label className="label">बुबाको नाम (नेपाली)</label>
            <p> {errors?.fatherName?.message}</p>
          </div>

        
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="peer"
              {...register("fatherNameEng")}
              placeholder="."
            />
            <label className="label">बुबाको नाम (English)</label>
            <p> {errors?.fatherNameEng?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">पेशा</label>
            <select onChange={handleFatherOccupation} value={fatherOccupationValue} className="peer">
              <option value={""} disabled>
            ---  पेशा चयन गर्नुहोस् ---
              </option>

              {occupationApi.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
            {fatherOccupationMsg}
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold  ">
        आमाको विवरण
        </div>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
        <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("motherName")}
              placeholder="."
            />
            <label className="label">आमाको नाम (नेपाली) </label>

            <p> {errors?.motherName?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("motherNameEng")}
              placeholder="."
            />
            <label className="label">आमाको नाम (English) </label>

            <p> {errors?.motherNameEng?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">पेशा</label>
            <select onChange={handleMotherOccupation} value={motherOccupationValue} className="peer">
              <option value={""} disabled>
            ---  पेशा चयन गर्नुहोस् ---
              </option>

              {occupationApi.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
            {motherOccupationMsg}
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% text-center text-2xl py-3 rounded-xl font-bold  ">
        हजुरबुबाको विवरण

        </div>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 pb-2 border border-black border-dashed ">
        <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("grandFatherName")}
              placeholder="."
            />
            <label className="label">हजुरबुबाको नाम (नेपाली) </label>

            <p> {errors?.grandFatherName?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="peer"
              {...register("grandFatherNameEng")}
              placeholder="."
            />
            <label className="label">हजुरबुबाको नाम (English) </label>

            <p> {errors?.grandFatherNameEng?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">पेशा</label>
            <select onChange={handleGrandFatherOccupation} value={grandFatherOccupationValue} className="peer">
              <option value={""} disabled>
            ---  पेशा चयन गर्नुहोस् ---
              </option>

              {occupationApi.map((items, index) => {
                return (
                  <option key={index} value={items?.id}>
                    {items.name}
                  </option>
                );
              })}
            </select>
            {grandFatherOccupationMsg}
          </div>
        </div>

        <AddButton
          icon={<FaPlus />}
          title={isSubmitting ? "Submitting..." : "Add Employee"}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};

export default CreateFamilyDetails;

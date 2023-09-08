import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { userRegisterValidateResolver } from "../../../utils/validateField";
import CommonHeaderDesign from "../../reusableDesign/CommonHeaderDesign";
import AddButton from "../../reusableDesign/AddButton";
import {
  registerUser,
  role,
} from "../../../services/apiServices/employee/user/userService";
import { department } from "../../../services/apiServices/common/department/departmentService";
import { subDepartment } from "../../../services/apiServices/common/subDepartment/subDepartmentService";
import { ward } from "../../../services/apiServices/common/ward/wardService";
import { counter } from "../../../services/apiServices/common/counter/counterService";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { englishToNepali } from "../../../utils/utility";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";

export default function RegisterUser({ clickedIdData }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: userRegisterValidateResolver,
    defaultValues: {
      id: clickedIdData?.id,
      employeeId: clickedIdData?.employeeId,
      email: clickedIdData?.email,
      wardId: clickedIdData?.wardId,
      departMentId: clickedIdData?.departMentId,
      subDepartmentId: clickedIdData?.subDepartmentId,
      counterId: clickedIdData?.counter,
      role: clickedIdData?.role,
      password: clickedIdData?.password,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (isSubmitting) return;
        const response = await registerUser(data);
        if (response.status === true) {
          toast.success(response.message, {
            icon: "🚀",
            autoClose: 1000,
          });
          router.push("/employeeSetup/user");
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

  // for counter
  const [counterData, setCounterData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await counter();
        if (status) {
          setCounterData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const counterOptions = counterData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.counterId}
      >
        {item.name}
      </option>
    );
  });

  // for employee register user
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await employee();
        if (status) {
          setEmployeeData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const employeeOptions = employeeData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.id}
      >
        {item.firstName} {item.middleName} {item.lastName} [
        {englishToNepali(item.empCode)}]
      </option>
    );
  });

  // for role
  const [roleData, setRoleData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await role();
        if (status) {
          setRoleData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const roleOptions = roleData.map((item) => {
    return (
      <option
        value={item.id}
        key={item.id}
        selected={item.id === clickedIdData?.id}
      >
        {item}
      </option>
    );
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <React.Fragment>
      <CommonHeaderDesign title={" कर्मचारी प्रयोगकर्ता राख्नुहोस "} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-5 shadow-2xl bg-gray-100 gap-5 px-5 pt-10 border border-black border-dashed ">
          <div>
            <label className="block uppercase mb-2 text-sm font-medium text-gray-700">
              Enter Email <span className="requiredField">*</span>
            </label>

            <input
              className={`w-full px-3 py-2 mb-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...register("email")}
              type="email"
            />
            <p> {errors?.email?.message}</p>
          </div>

          <div>
            <label className="block uppercase mb-2 text-sm font-medium text-gray-700">
              Enter Password <span className="requiredField">*</span>
            </label>

            <input
              className={`w-full px-3 py-2 mb-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...register("password")}
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className=" text-red-500 absolute right-[93vh] top-[38vh] text-lg "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
            <p> {errors?.password?.message}</p>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Employee
              <span className="requiredField">*</span>
            </label>
            <select {...register("employeeId")} className="peer requiredField">
              <option value={""}>Select the employee</option>

              {employeeOptions}
            </select>
            <p> {errors?.employeeId?.message}</p>
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
              ward
              <span className="requiredField">*</span>
            </label>
            <select {...register("wardId")} className="peer requiredField">
              <option value={""}>Select the ward</option>

              {wardOptions}
            </select>
            <p> {errors?.wardId?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              role
              <span className="requiredField">*</span>
            </label>
            <select {...register("role")} className="peer requiredField">
              <option value={""} disabled selected>
                Select the role
              </option>

              {roleOptions}
            </select>
            <p> {errors?.role?.message}</p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="label text-blue-900 ">
              Counter
              <span className="requiredField">*</span>
            </label>
            <select {...register("counterId")} className="peer requiredField">
              <option value={""}>Select the counter</option>

              {counterOptions}
            </select>
            <p> {errors?.counterId?.message}</p>
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
}

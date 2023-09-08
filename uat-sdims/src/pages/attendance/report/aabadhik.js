import React, { useEffect, useState } from "react";
import SeoOptimization from "@/components/reusableDesign/SeoOptimzation";
import { attOffice } from "../../../services/apiServices/common/attOffice/attOfficeService";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { set, useForm } from "react-hook-form";
import AddButton from "@/components/reusableDesign/AddButton";
import { FaSearch } from "react-icons/fa";
import { aabadhik } from "../../../services/apiServices/attendance/attendanceService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { yupResolver } from "@hookform/resolvers/yup";
const BS = require("bikram-sambat-js");
import * as yup from "yup";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { apiCallForFetchingData } from "@/services/apiHelpers";
import { toast } from "react-toastify";
import { dateRegExp } from "@/models/commonMatcher";

const Aabadhik = () => {
  const [loading, setLoading] = useState(false);
  const [attOffiecData, setAttOffiecData] = useState();
  const [employeeData, setEmployeeData] = useState();
  const [featchData, setFeatchData] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        attOfficeId: yup.number().required(),
        employeeId: yup.number().required(),
        startDate: yup
          .string()
          .required("Date of Birth is required")
          .matches(
            dateRegExp,
            "Date must be a valid date in the format YYYY-MM-DD"
          ),
        endDate: yup
          .string()
          .required("Date of Birth is required")
          .matches(
            dateRegExp,
            "Date must be a valid date in the format YYYY-MM-DD"
          ),
      })
    ),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      let response = await aabadhik(formData).then((res) => {
        setLoading(false);
        if (res.status === true) {
          setFeatchData(res.data);
        }
      });
    } catch (error) {
      setLoading(false);
      toast.error("Server error Please try again!", {
        icon: "🚀",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    setValue("startDate", new Date());
    setValue("endDate", new Date());
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
  }, [setValue]);
  useEffect(() => {
    let employee_Data = () => {
      employee().then((response) => {
        try {
          response.status === true;
          {
            setEmployeeData(response.data);
          }
        } catch (error) {}
      });
    };
    employee_Data();
  }, []);
  return (
    <>
      <SeoOptimization title={"aabhadhik Report"} />
      <div className=" rounded-2xl shadow-2xl pb-4 pt-2 px-5 flex flex-col gap-1  divide-black   ">
        <div className="text-4xl font-bold items-center flex justify-center py-5 ">
          आवधिक हाजिरी रिपोर्ट हेर्नुहोस
        </div>
        <hr />
        <hr />

        <div className="flex container pt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="w-[95%]">
            <div className="flex w-full grid-flow-row bg-transparent gap-3 px-5 py-10 bg-gray-100 border border-black border-dashed">
              <div className="relative z-0 w-full mb-6 group">
                <label className="label">अफिस् छान्नुस</label>
                <select
                  {...register("attOfficeId")}
                  className="peer  bg-transparent"
                >
                  <option value={""} className="text-black">
                    {" "}
                    --- छान्नुस ---
                  </option>
                  {attOffiecData?.map((items, index) => {
                    return (
                      <option
                        key={index}
                        value={items?.id}
                        className="text-black"
                      >
                        {items?.name}
                      </option>
                    );
                  })}
                </select>
                <p>{errors.attOfficeId?.message}</p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label className="label ">कर्मचारी छान्नुस</label>
                <select
                  {...register("employeeId")}
                  className="peer  bg-transparent"
                >
                  <option value={""} className="text-black">
                    {" "}
                    --- छान्नुस ---
                  </option>
                  {employeeData?.map((items, index) => {
                    return (
                      <option
                        key={index}
                        value={items?.id}
                        className="text-black"
                      >
                        {`${items?.firstName} ${items?.lastName} [${items.empCode}]`}
                      </option>
                    );
                  })}
                </select>
                <p>{errors.employeeId?.message}</p>
              </div>
              <div className="relative  w-full mb-6 group">
                <label
                  htmlFor=""
                  className=" absolute text-[10px] text-blue-900 -top-[15%]"
                >
                  अबधि मिति
                </label>
                <NepaliDatePicker
                  className="peer"
                  onChange={(value) => {
                    setValue("startDate", BS.BSToAD(value));
                  }}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
                <input type="hidden" {...register("startDate")} />
                <p>{errors.startDate?.message}</p>
              </div>
              <div className="relative  w-full mb-6 group">
                <label
                  htmlFor=""
                  className=" absolute text-[10px] text-blue-900 -top-[15%]"
                >
                  अबधि मिति
                </label>
                <NepaliDatePicker
                  className="peer"
                  onChange={(value) => {
                    setValue("endDate", BS.BSToAD(value));
                  }}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
                <input type="hidden" {...register("endDate")} />
                <p>{errors.endDate?.message}</p>
              </div>
              <AddButton
                icon={<FaSearch />}
                title={isSubmitting ? "खोज्दै..." : "देखाउनुहोस"}
              />
            </div>
          </form>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            {/* loading text */}
            <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
              Loading...
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between p-5 text-red-500 mx-5">
              <div className="">नाम : {featchData?.employeeName} </div>
              <div className="">पद : {featchData?.postName}</div>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow className="bg-[#3e8dc1fd]">
                    <TableCell sx={{ fontSize: "20px" }}>सि.न:</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>मिति</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>आएको समय</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>गएको समय</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      जम्मा कार्य घण्टा
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      बिदाका प्रकार
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      काजको प्रकार
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>कैफियत</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {featchData?.aabaDhikReports?.map((item, index) => {
                    return (
                      <TableRow key={index} className="hover:bg-[#a0cae7fd]">
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell>{BS.ADToBS(item.date)}</TableCell>
                        <TableCell>{item.checkInTime}</TableCell>
                        <TableCell>{item.checkOutTime}</TableCell>
                        <TableCell>
                          {item.totalWorkingHour.toFixed(2)}
                        </TableCell>
                        <TableCell>{item.leaveType}</TableCell>
                        <TableCell>{item.kajType}</TableCell>
                        <TableCell>{item.remark}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </>
  );
};

export default Aabadhik;

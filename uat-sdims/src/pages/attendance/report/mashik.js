import React, { useEffect, useState } from "react";
import SeoOptimization from "@/components/reusableDesign/SeoOptimzation";
import ViewPage from "@/components/viewPage/ViewPage";
import { attOffice } from "../../../services/apiServices/common/attOffice/attOfficeService";
import { employee } from "../../../services/apiServices/employee/employeesetup/employeeService";
import { set, useForm } from "react-hook-form";
import AddButton from "@/components/reusableDesign/AddButton";
import { FaSearch } from "react-icons/fa";

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
import { daysWeakToNepaliDaysWeak, englishToNepali } from "@/utils/utility";
import { mashik } from "@/services/apiServices/attendance/attendanceService";

const MashikReport = () => {
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
        employeeId: yup.number(),
        startDate: yup.date().required(),
        endDate: yup
          .date()
          .max(new Date(), "कृपया आज वा आजको भन्दा अगाडिको मिति चयन गर्नुहोस")
          .required(),
      })
    ),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      await mashik(formData).then((res) => {
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
        <div className="text-4xl font-bold items-center flex justify-center pt-5 ">
          मासिक हाजिरी रिपोर्ट
        </div>
        <div className="flex container pt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="w-[95%]">
            <div className="flex w-full grid-flow-row bg-transparent gap-3 px-5 py-10 bg-gray-100 border border-black border-dashed">
              <div className="relative z-0 w-full mb-6 group">
                <label className="label ">अफिस् छान्नुस</label>
                <select
                  {...register("attOfficeId")}
                  className="peer  bg-transparent"
                >
                  <option value={""} className="text-black">
                    {" "}
                    ---छान्नुस---
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
                  <option value={0} className="text-black">
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow className="bg-[#3e8dc1fd]">
                    <TableCell sx={{ fontSize: "16px" }}>सि.न:</TableCell>
                    <TableCell sx={{ fontSize: "16px" }}>नाम</TableCell>
                    <TableCell sx={{ fontSize: "16px" }}>पद</TableCell>
                    {featchData?.heading?.map((item, index) => {
                      return (
                        <TableCell key={index}>
                          <p>
                            {englishToNepali(item.day)}.
                            {daysWeakToNepaliDaysWeak(item.weekDays)}
                          </p>
                          {item.weekDays}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {featchData?.mashikData?.map((item, index) => {
                    return (
                      <TableRow key={index} className="hover:bg-[#a0cae7fd]">
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell>{item.employeeName}</TableCell>
                        <TableCell>{item.postName}</TableCell>
                        {item?.dateWiseReport?.map((dayReport) => {
                          return (
                            <TableCell sx={{ fontSize: "10px" }} key={index}>
                              {dayReport.bida !== null ? (
                                <p>{dayReport.bida}</p>
                              ) : (
                                <>
                                  <p>{dayReport.checkInTime}</p>
                                  <p>{dayReport.checkOutTime}</p>
                                </>
                              )}
                            </TableCell>
                          );
                        })}
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

export default MashikReport;

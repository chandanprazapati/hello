import { attendanceApi } from "../../apiHelpers";
import apiUrls from "../../apiUrls";

export const aabadhik = async () => {
    let response = await attendanceApi(
      apiUrls.attendance.report.aabadhik.method,
      apiUrls.attendance.report.aabadhik.url,
    );
    return response
  };

  export const mashik = async () => {
    let response = await attendanceApi(
      apiUrls.attendance.report.mashik.method,
      apiUrls.attendance.report.mashik.url,
    );
    return response
  }

  export const overViewHajiri = async () => {
    let response = await attendanceApi(
      apiUrls.attendance.report.overViewHajiri.method,
      apiUrls.attendance.report.overViewHajiri.url,
    );
    return response
  }

  export const arrivalEarlyDepartureLate = async () => {
    let response = await attendanceApi(
      apiUrls.attendance.report.arrivalEarlyDepartureLate.method,
      apiUrls.attendance.report.arrivalEarlyDepartureLate.url,
    );
    return response
  }

  export const absentEmployee = async () => {
    let response = await attendanceApi(
      apiUrls.attendance.report.absentEmployee.method,
      apiUrls.attendance.report.absentEmployee.url,
    );
    return response
  }
import apiUrls from "../../../apiUrls";
import {  pisCommonApi } from "../../../apiHelpers";

export const leaveType = async () => {
  let response = await pisCommonApi(
    apiUrls.pis.leaveType.leaveType.method,
    apiUrls.pis.leaveType.leaveType.url,
  );
  return response
};
export const createLeaveType= async (data) => {
  let response = await pisCommonApi(
    apiUrls.pis.leaveType.createLeaveType.method,
    apiUrls.pis.leaveType.createLeaveType.url,
    data
  );
  return response;
};
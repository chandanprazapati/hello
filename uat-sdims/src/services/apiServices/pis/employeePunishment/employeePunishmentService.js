import apiUrls from "../../../apiUrls";
import {  pisApi } from "../../../apiHelpers";

export const employeePunishment = async () => {
  let response = await pisApi(
    apiUrls.pis.employeePunishment.employeePunishment.method,
    apiUrls.pis.employeePunishment.employeePunishment.url,
  );
  return response
};
export const CreateEmployeePunishment = async (data) => {
  let response = await pisApi(
    apiUrls.pis.employeePunishment.createEmployeePunishment.method,
    apiUrls.pis.employeePunishment.createEmployeePunishment.url,
    data
  );
  return response;
};
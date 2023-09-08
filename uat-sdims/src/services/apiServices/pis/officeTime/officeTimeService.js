import apiUrls from "../../../apiUrls";
import {  pisCommonApi } from "../../../apiHelpers";

export const officeTime = async () => {
  let response = await pisCommonApi(
    apiUrls.pis.officeTime.officeTime.method,
    apiUrls.pis.officeTime.officeTime.url,
  );
  return response
};
export const createOfficeTime= async (data) => {
  let response = await pisCommonApi(
    apiUrls.pis.officeTime.createOfficeTime.method,
    apiUrls.pis.officeTime.createOfficeTime.url,
    data
  );
  return response;
};
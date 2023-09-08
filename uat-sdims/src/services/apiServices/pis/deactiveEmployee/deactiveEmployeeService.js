import apiUrls from "../../../apiUrls";
import {  pisApi } from "../../../apiHelpers";

export const deactiveEmployee = async () => {
  let response = await pisApi(
    apiUrls.pis.deactiveEmployee.deactiveEmployee.method,
    apiUrls.pis.deactiveEmployee.deactiveEmployee.url,
  );
  return response
};
export const createDeactiveEmployee = async (data) => {
  let response = await pisApi(
    apiUrls.pis.deactiveEmployee.createDeactiveEmployee.method,
    apiUrls.pis.deactiveEmployee.createDeactiveEmployee.url,
    data
  );
  return response;
};
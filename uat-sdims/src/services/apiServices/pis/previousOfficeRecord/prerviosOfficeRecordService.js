import apiUrls from "../../../apiUrls";
import {  pisApi } from "../../../apiHelpers";

export const previousOffice = async () => {
  let response = await pisApi(
    apiUrls.pis.previousOffice.previousOffice.method,
    apiUrls.pis.previousOffice.previousOffice.url,
  );
  return response
};
export const createPreviousOffice = async (data) => {
  let response = await pisApi(
    apiUrls.pis.previousOffice.createPreviousOffice.method,
    apiUrls.pis.previousOffice.createPreviousOffice.url,
    data
  );
  return response;
};
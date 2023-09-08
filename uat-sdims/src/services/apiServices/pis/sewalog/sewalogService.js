import apiUrls from "../../../apiUrls";
import {  sewalogApi } from "../../../apiHelpers";

export const sewalog = async () => {
  let response = await sewalogApi(
    apiUrls.pis.sewalog.sewalog.method,
    apiUrls.pis.sewalog.sewalog.url,
  );
  return response
};
export const createSewalog= async (data) => {
  let response = await sewalogApi(
    apiUrls.pis.sewalog.createSewalog.method,
    apiUrls.pis.sewalog.createSewalog.url,
    data
  );
  return response;
};
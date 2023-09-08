import apiUrls from "../../../apiUrls";
import {  pisCommonApi } from "../../../apiHelpers";

export const kajType = async () => {
  let response = await pisCommonApi(
    apiUrls.pis.kajType.kajType.method,
    apiUrls.pis.kajType.kajType.url,
  );
  return response
};
export const createKajType= async (data) => {
  let response = await pisCommonApi(
    apiUrls.pis.kajType.createKajType.method,
    apiUrls.pis.kajType.createKajType.url,
    data
  );
  return response;
};
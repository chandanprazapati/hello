import apiUrls from "../../../apiUrls";
import {  pisApi } from "../../../apiHelpers";

export const awardDetail = async () => {
  let response = await pisApi(
    apiUrls.pis.awardDetail.awardDetail.method,
    apiUrls.pis.awardDetail.awardDetail.url,
  );
  return response
};
export const createAwardDetail = async (data) => {
  let response = await pisApi(
    apiUrls.pis.awardDetail.createAwardDetail.method,
    apiUrls.pis.awardDetail.createAwardDetail.url,
    data
  );
  return response;
};
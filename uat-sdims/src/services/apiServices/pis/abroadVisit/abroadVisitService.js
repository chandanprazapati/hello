import apiUrls from "../../../apiUrls";
import {  pisApi } from "../../../apiHelpers";

export const abroadVisit = async () => {
  let response = await pisApi(
    apiUrls.pis.abroadVisit.abroadVisit.method,
    apiUrls.pis.abroadVisit.abroadVisit.url,
  );
  return response
};
export const createAbroadVisit = async (data) => {
  let response = await pisApi(
    apiUrls.pis.abroadVisit.createAbroadVisit.method,
    apiUrls.pis.abroadVisit.createAbroadVisit.url,
    data
  );
  return response;
};
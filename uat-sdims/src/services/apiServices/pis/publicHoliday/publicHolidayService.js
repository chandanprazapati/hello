import apiUrls from "../../../apiUrls";
import {  pisCommonApi } from "../../../apiHelpers";

export const publicHoliday = async () => {
  let response = await pisCommonApi(
    apiUrls.pis.publicHoliday.publicHoliday.method,
    apiUrls.pis.publicHoliday.publicHoliday.url,
  );
  return response
};
export const createPublicHoliday= async (data) => {
  let response = await pisCommonApi(
    apiUrls.pis.publicHoliday.createPublicHoliday.method,
    apiUrls.pis.publicHoliday.createPublicHoliday.url,
    data
  );
  return response;
};
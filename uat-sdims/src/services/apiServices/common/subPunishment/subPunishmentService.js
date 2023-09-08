import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const subPunishment = async () => {
  let response = await commonApi(
    apiUrls.common.subPunishment.subPunishment.method,
    apiUrls.common.subPunishment.subPunishment.url,
  );
  return response
};
export const createSubPunishment = async (data) => {
  let response = await commonApi(
    apiUrls.common.subPunishment.createSubPunishment.method,
    apiUrls.common.subPunishment.createSubPunishment.url,
    data
  );
  return response;
};



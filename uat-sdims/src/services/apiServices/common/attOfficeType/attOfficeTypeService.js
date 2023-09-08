import apiUrls from "../../../apiUrls";
import { commonApi } from "../../../apiHelpers";

export const attOfficeType = async () => {
  let response = await commonApi(
    apiUrls.common.attOfficeType.attOfficeType.method,
    apiUrls.common.attOfficeType.attOfficeType.url,
  );
  return response
};
export const createAttOfficeType = async (data) => {
  let response = await commonApi(
    apiUrls.common.attOfficeType.createAttOfficeType.method,
    apiUrls.common.attOfficeType.createAttOfficeType.url,
    data
  );
  return response;
};
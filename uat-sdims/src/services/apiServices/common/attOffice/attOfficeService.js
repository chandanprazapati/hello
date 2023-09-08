import apiUrls from "../../../apiUrls";
import { commonApi } from "../../../apiHelpers";

export const attOffice = async () => {
  let response = await commonApi(
    apiUrls.common.attOffice.attOffice.method,
    apiUrls.common.attOffice.attOffice.url,
  );
  return response
};
export const createAttOffice = async (data) => {
  let response = await commonApi(
    apiUrls.common.attOffice.createAttOffice.method,
    apiUrls.common.attOffice.createAttOffice.url,
    data
  );
  return response;
};
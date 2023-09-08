import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const ward = async () => {
  let response = await commonApi(
    apiUrls.common.ward.ward.method,
    apiUrls.common.ward.ward.url,
  );
  return response
};
export const createWard = async (data) => {
  let response = await commonApi(
    apiUrls.common.ward.createward.method,
    apiUrls.common.ward.createward.url,
    data
  );
  return response;
};



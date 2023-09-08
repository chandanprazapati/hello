import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const bodartha = async () => {
  let response = await commonApi(
    apiUrls.common.bodartha.bodartha.method,
    apiUrls.common.bodartha.bodartha.url,
  );
  return response
};
export const createBodartha = async (data) => {
  let response = await commonApi(
    apiUrls.common.bodartha.createBodartha.method,
    apiUrls.common.bodartha.createBodartha.url,
    data
  );
  return response;
};



import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const sewa = async () => {
  let response = await commonApi(
    apiUrls.common.sewa.sewa.method,
    apiUrls.common.sewa.sewa.url,
  );
  return response
};
export const createSewa = async (data) => {
  let response = await commonApi(
    apiUrls.common.sewa.createSewa.method,
    apiUrls.common.sewa.createSewa.url,
    data
  );
  return response;
};



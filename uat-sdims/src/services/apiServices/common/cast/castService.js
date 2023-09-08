import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const cast = async () => {
  let response = await commonApi(
    apiUrls.common.cast.cast.method,
    apiUrls.common.cast.cast.url,
  );
  return response
};
export const createCast = async (data) => {
  let response = await commonApi(
    apiUrls.common.cast.createCast.method,
    apiUrls.common.cast.createCast.url,
    data
  );
  return response;
};



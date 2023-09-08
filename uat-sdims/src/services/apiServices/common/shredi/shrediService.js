import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const shredi = async () => {
  let response = await commonApi(
    apiUrls.common.shredi.shredi.method,
    apiUrls.common.shredi.shredi.url,
  );
  return response
};
export const createShredi = async (data) => {
  let response = await commonApi(
    apiUrls.common.shredi.createShredi.method,
    apiUrls.common.shredi.createShredi.url,
    data
  );
  return response;
};



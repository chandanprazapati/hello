import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const fiscal = async () => {
  let response = await commonApi(
    apiUrls.common.fiscal.fiscal.method,
    apiUrls.common.fiscal.fiscal.url,
  );
  return response
};
export const createFiscal = async (data) => {
  let response = await commonApi(
    apiUrls.common.fiscal.createFiscal.method,
    apiUrls.common.fiscal.createFiscal.url,
    data
  );
  return response;
};



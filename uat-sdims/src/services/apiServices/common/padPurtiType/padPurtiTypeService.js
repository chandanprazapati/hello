import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const padPurtiType = async () => {
  let response = await commonApi(
    apiUrls.common.padPurtiType.padPurtiType.method,
    apiUrls.common.padPurtiType.padPurtiType.url,
  );
  return response
};
export const createPadPurtiType = async (data) => {
  let response = await commonApi(
    apiUrls.common.padPurtiType.createPadPurtiType.method,
    apiUrls.common.padPurtiType.createPadPurtiType.url,
    data
  );
  return response;
};



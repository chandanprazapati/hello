import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const oldVdc = async () => {
  let response = await commonApi(
    apiUrls.common.oldVdc.oldVdc.method,
    apiUrls.common.oldVdc.oldVdc.url,
  );
  return response
};
export const createoldVdc = async (data) => {
  let response = await commonApi(
    apiUrls.common.oldVdc.createOldVdc.method,
    apiUrls.common.oldVdc.createOldVdc.url,
    data
  );
  return response;
};



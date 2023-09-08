import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const subGroup = async (id) => {
  let response = await commonApi(
    apiUrls.common.subGroup.subGroup.method,
    apiUrls.common.subGroup.subGroup.url + '/' + (id | 0),
  );
  return response
};
export const createSubGroup = async (data) => {
  let response = await commonApi(
    apiUrls.common.subGroup.createSubGroup.method,
    apiUrls.common.subGroup.createSubGroup.url,
    data
  );
  return response;
};



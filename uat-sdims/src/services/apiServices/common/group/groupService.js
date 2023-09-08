import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const group = async (id) => {
  let response = await commonApi(
    apiUrls.common.group.group.method,
    apiUrls.common.group.group.url + '/' + (id | 0),
  );
  return response
};
export const createGroup = async (data) => {
  let response = await commonApi(
    apiUrls.common.group.createGroup.method,
    apiUrls.common.group.createGroup.url,
    data
  );
  return response;
};



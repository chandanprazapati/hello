import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const subDepartment = async (id) => {
  let response = await commonApi(
    apiUrls.common.subDepartment.subDepartment.method,

    apiUrls.common.subDepartment.subDepartment.url + '/' + (id | 0) ,

    apiUrls.common.subDepartment.subDepartment.url + id,

  );
  return response
};
export const createSubDepartment = async (data) => {
  let response = await commonApi(
    apiUrls.common.subDepartment.createSubDepartment.method,
    apiUrls.common.subDepartment.createSubDepartment.url,
    data
  );
  return response;
};



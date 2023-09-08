import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const department = async () => {
  let response = await commonApi(
    apiUrls.common.department.department.method,
    apiUrls.common.department.department.url,
  );
  return response
};
export const createDepartment = async (data) => {
  let response = await commonApi(
    apiUrls.common.department.createDepartment.method,
    apiUrls.common.department.createDepartment.url,
    data
  );
  return response;
};



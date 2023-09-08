import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const faculty = async () => {
  let response = await commonApi(
    apiUrls.common.faculty.faculty.method,
    apiUrls.common.faculty.faculty.url,
  );
  return response
};
export const createFaculty = async (data) => {
  let response = await commonApi(
    apiUrls.common.faculty.createFaculty.method,
    apiUrls.common.faculty.createFaculty.url,
    data
  );
  return response;
};
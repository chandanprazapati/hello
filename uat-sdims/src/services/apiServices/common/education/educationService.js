import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const education = async () => {
  let response = await commonApi(
    apiUrls.common.education.education.method,
    apiUrls.common.education.education.url,
  );
  return response
};
export const createEducation = async (data) => {
  let response = await commonApi(
    apiUrls.common.education.createEducation.method,
    apiUrls.common.education.createEducation.url,
    data
  );
  return response;
};



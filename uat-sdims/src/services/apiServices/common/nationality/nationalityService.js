import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const nationality = async () => {
  let response = await commonApi(
    apiUrls.common.nationality.nationality.method,
    apiUrls.common.nationality.nationality.url,
  );
  return response
};
export const createNationality = async (data) => {
  let response = await commonApi(
    apiUrls.common.nationality.createNationality.method,
    apiUrls.common.nationality.createNationality.url,
    data
  );
  return response;
};



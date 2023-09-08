import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const occupation = async () => {
  let response = await commonApi(
    apiUrls.common.occupation.occupation.method,
    apiUrls.common.occupation.occupation.url,
  );
  return response
};
export const createOccupation = async (data) => {
  let response = await commonApi(
    apiUrls.common.occupation.createOccupation.method,
    apiUrls.common.occupation.createOccupation.url,
    data
  );
  return response;
};



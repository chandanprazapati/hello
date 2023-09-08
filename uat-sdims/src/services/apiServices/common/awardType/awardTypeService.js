import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const awardType = async () => {
  let response = await commonApi(
    apiUrls.common.awardType.awardType.method,
    apiUrls.common.awardType.awardType.url,
  );
  return response
};
export const createAwardType = async (data) => {
  let response = await commonApi(
    apiUrls.common.awardType.createAwardType.method,
    apiUrls.common.awardType.createAwardType.url,
    data
  );
  return response;
};



import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const talimType = async () => {
  let response = await commonApi(
    apiUrls.common.talimType.talimType.method,
    apiUrls.common.talimType.talimType.url,
  );
  return response
};
export const createTalimType = async (data) => {
  let response = await commonApi(
    apiUrls.common.talimType.createTalimType.method,
    apiUrls.common.talimType.createTalimType.url,
    data
  );
  return response;
};



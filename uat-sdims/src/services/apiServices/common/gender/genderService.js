import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const gender = async () => {
  let response = await commonApi(
    apiUrls.common.gender.gender.method,
    apiUrls.common.gender.gender.url,
  );
  return response
};




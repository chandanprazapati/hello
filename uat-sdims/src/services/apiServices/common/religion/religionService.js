import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const getReligion = async () => {
  let response = await commonApi(
    apiUrls.common.religion.religion.method,
    apiUrls.common.religion.religion.url,
  );
  return response
};




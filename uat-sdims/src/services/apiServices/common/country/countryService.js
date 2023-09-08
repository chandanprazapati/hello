import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const country = async () => {
  let response = await commonApi(
    apiUrls.common.country.country.method,
    apiUrls.common.country.country.url,
  );
  return response
};




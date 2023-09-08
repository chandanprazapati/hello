import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const language = async () => {
  let response = await commonApi(
    apiUrls.common.language.language.method,
    apiUrls.common.language.language.url,
  );
  return response
};
export const createLanguage = async (data) => {
  let response = await commonApi(
    apiUrls.common.language.createLanguage.method,
    apiUrls.common.language.createLanguage.url,
    data
  );
  return response;
};



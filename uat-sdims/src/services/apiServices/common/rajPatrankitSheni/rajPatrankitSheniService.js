import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const rajPatrankitSheni = async () => {
  let response = await commonApi(
    apiUrls.common.rajPatrankitSheni.rajPatrankitSheni.method,
    apiUrls.common.rajPatrankitSheni.rajPatrankitSheni.url,
  );
  return response
};
export const createRajPatrankitSheni = async (data) => {
  let response = await commonApi(
    apiUrls.common.rajPatrankitSheni.createRajPatrankitSheni.method,
    apiUrls.common.rajPatrankitSheni.createRajPatrankitSheni.url,
    data
  );
  return response;
};



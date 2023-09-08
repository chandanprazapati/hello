import { commonApi } from "../../../apiHelpers";
import apiUrls from "../../../apiUrls";

export const punishment = async () => {
  let response = await commonApi(
    apiUrls.common.punishment.punishment.method,
    apiUrls.common.punishment.punishment.url,
  );
  return response
};
export const createPunishment = async (data) => {
  let response = await commonApi(
    apiUrls.common.punishment.createPunishment.method,
    apiUrls.common.punishment.createPunishment.url,
    data
  );
  return response;
};



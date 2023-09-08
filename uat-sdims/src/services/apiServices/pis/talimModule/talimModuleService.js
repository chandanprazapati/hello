import apiUrls from "../../../apiUrls";
import { pisApi, talimModuleApi } from "../../../apiHelpers";

export const talimModule = async () => {
  let response = await talimModuleApi(
    apiUrls.pis.talimModule.talimModule.method,
    apiUrls.pis.talimModule.talimModule.url
  );
  return response;
};
export const createTalimModule = async (data) => {
  let response = await pisApi(
    apiUrls.pis.talimModule.createTalimModule.method,
    apiUrls.pis.talimModule.createTalimModule.url,
    data
  );
  return response;
};

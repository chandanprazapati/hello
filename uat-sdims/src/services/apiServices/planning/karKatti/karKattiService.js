import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const karKatti = async () => {
  let response = await planningApi(
    apiUrls.planning.karKatti.karKatti.method,
    apiUrls.planning.karKatti.karKatti.url,
  );
  return response
};
export const createKarKatti = async (data) => {
  let response = await planningApi(
    apiUrls.planning.karKatti.createKarKatti.method,
    apiUrls.planning.karKatti.createKarKatti.url,
    data
  );
  return response;
};
export const deleteKarKatti = async (id) => {
    let response = await planningApi(
      apiUrls.planning.karKatti.deleteKarKatti.method,
      apiUrls.planning.karKatti.deleteKarKatti.url + `${id}`,
    );
    return response;
  };
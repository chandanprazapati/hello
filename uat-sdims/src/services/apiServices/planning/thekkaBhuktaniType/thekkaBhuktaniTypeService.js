import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const thekkaBhuktaniType = async () => {
  let response = await planningApi(
    apiUrls.planning.thekkaBhuktaniType.thekkaBhuktaniType.method,
    apiUrls.planning.thekkaBhuktaniType.thekkaBhuktaniType.url,
  );
  return response
};
export const createThekkaBhuktaniType = async (data) => {
  let response = await planningApi(
    apiUrls.planning.thekkaBhuktaniType.createThekkaBhuktaniType.method,
    apiUrls.planning.thekkaBhuktaniType.createThekkaBhuktaniType.url,
    data
  );
  return response;
};
export const deleteThekkaBhuktaniType = async (id) => {
    let response = await planningApi(
      apiUrls.planning.thekkaBhuktaniType.deleteThekkaBhuktaniType.method,
      apiUrls.planning.thekkaBhuktaniType.deleteThekkaBhuktaniType.url + `${id}`,
    );
    return response;
  };
import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const sartaSetup = async () => {
  let response = await planningApi(
    apiUrls.planning.sartaSetup.sartaSetup.method,
    apiUrls.planning.sartaSetup.sartaSetup.url,
  );
  return response
};
export const createSarta = async (data) => {
  let response = await planningApi(
    apiUrls.planning.sartaSetup.createSartaSetup.method,
    apiUrls.planning.sartaSetup.createSartaSetup.url,
    data
  );
  return response;
};
export const deleteSartaSetup = async (id) => {
    let response = await planningApi(
      apiUrls.planning.sartaSetup.deleteSartaSetup.method,
      apiUrls.planning.sartaSetup.deleteSartaSetup.url + `${id}`,
    );
    return response;
  };
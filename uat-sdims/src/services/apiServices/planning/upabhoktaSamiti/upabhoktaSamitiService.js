import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const upabhoktaSamiti = async () => {
  let response = await planningApi(
    apiUrls.planning.upavokataSamiti.upavokataSamiti.method,
    apiUrls.planning.upavokataSamiti.upavokataSamiti.url,
  );
  return response
};
export const createUpabhoktaSamiti = async (data) => {
  let response = await planningApi(
    apiUrls.planning.upavokataSamiti.createUpavokataSamiti.method,
    apiUrls.planning.upavokataSamiti.createUpavokataSamiti.url,
    data
  );
  return response;
};
export const deleteUpabhoktaSamiti = async (id) => {
    let response = await planningApi(
      apiUrls.planning.upavokataSamiti.deleteUpavokataSamiti.method,
      apiUrls.planning.upavokataSamiti.deleteUpavokataSamiti.url + `${id}` ,
    );
    return response;
  };
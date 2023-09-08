import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const thekkaKarKatti = async () => {
  let response = await planningApi(
    apiUrls.planning.thekkaKarKatti.thekkaKarKatti.method,
    apiUrls.planning.thekkaKarKatti.thekkaKarKatti.url,
  );
  return response
};
export const createThekkaKarKatti = async (data) => {
  let response = await planningApi(
    apiUrls.planning.thekkaKarKatti.createThekkaKarKatti.method,
    apiUrls.planning.thekkaKarKatti.createThekkaKarKatti.url,
    data
  );
  return response;
};
export const deleteThekkaKarKatti = async (id) => {
    let response = await planningApi(
      apiUrls.planning.thekkaKarKatti.deleteThekkaKarKatti.method,
      apiUrls.planning.thekkaKarKatti.deleteThekkaKarKatti.url + `${id}`,
    );
    return response;
  };
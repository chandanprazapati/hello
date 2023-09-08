import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const thekkaShortType = async () => {
  let response = await planningApi(
    apiUrls.planning.thekkaShortType.thekkaShortType.method,
    apiUrls.planning.thekkaShortType.thekkaShortType.url,
  );
  return response
};
export const createThekkaShortType = async (data) => {
  let response = await planningApi(
    apiUrls.planning.thekkaShortType.createThekkaShortType.method,
    apiUrls.planning.thekkaShortType.createThekkaShortType.url,
    data
  );
  return response;
};
export const deleteThekkaShortType = async (id) => {
    let response = await planningApi(
      apiUrls.planning.thekkaShortType.deleteThekkaShortType.method,
      apiUrls.planning.thekkaShortType.deleteThekkaShortType.url + `${id}` ,
    );
    return response;
  };
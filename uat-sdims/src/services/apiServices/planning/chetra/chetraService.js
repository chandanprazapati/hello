import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const chetra = async () => {
  let response = await planningApi(
    apiUrls.planning.chetra.chetra.method,
    apiUrls.planning.chetra.chetra.url,
  );
  return response
};
export const createChetra = async (data) => {
  let response = await planningApi(
    apiUrls.planning.chetra.createChetra.method,
    apiUrls.planning.chetra.createChetra.url,
    data
  );
  return response;
};
export const deleteChetra = async (id) => {
    let response = await planningApi(
      apiUrls.planning.chetra.deleteChetra.method,
      apiUrls.planning.chetra.deleteChetra.url + `${id}` ,
    );
    return response;
  };
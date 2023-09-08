import apiUrls from "../../../apiUrls";
import { planningApi } from "../../../apiHelpers";

export const tolBikashSanstha = async () => {
  let response = await planningApi(
    apiUrls.planning.tolBikashSanstha.tolBikashSanstha.method,
    apiUrls.planning.tolBikashSanstha.tolBikashSanstha.url,
  );
  return response
};
export const createTolBikashSanstha = async (data) => {
  let response = await planningApi(
    apiUrls.planning.tolBikashSanstha.createTolBikashSanstha.method,
    apiUrls.planning.tolBikashSanstha.createTolBikashSanstha.url,
    data
  );
  return response;
};
export const deleteTolBikashSanstha = async (id) => {
    let response = await planningApi(
      apiUrls.planning.tolBikashSanstha.deleteTolBikashSanstha.method,
      apiUrls.planning.tolBikashSanstha.deleteTolBikashSanstha.url + `${id}` ,
    );
    return response;
  };